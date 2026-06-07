import asyncHandler from "express-async-handler";
import Product from "../Models/Product.js";
import Seller from "../Models/Seller.js";
import crypto from "crypto";
import mongoose from "mongoose";

{
  /*Admin will create a new product  as of now */
}
export const createdProduct = asyncHandler(async (req, res) => {
  const {
    name,
    category,
    subcategory,
    partNumber,
    partType,
    fitments,
    price,
    mrp,
    stock,
    oemPartNumber,
    brand,
    images,
  } = req.body;

  //seller id will come from jwt
  const userId = req.user.id;

  //now basic required fields check

  if (
    !name ||
    !category ||
    !subcategory ||
    !partNumber ||
    !partType ||
    price === undefined ||
    mrp === undefined ||
    stock === undefined
  ) {
    res.status(400);
    throw new Error("Missing required product fields");
  }
  // Validate seller existence
  const seller = await Seller.findOne({ userId: req.user.id });

  if (!seller) {
    res.status(404);
    throw new Error("Seller not found");
  }
  //seller approval check
  if (seller.status !== "approved") {
    res.status(403);
    throw new Error("Seller is not approved to list products");
  }


  //fitment validation
  if (!Array.isArray(fitments) || fitments.length === 0) {
    res.status(400);
    throw new Error("Atleast one vehicle fitment is required");
  }
  /*Generate idempotency key (sellerId+partNumber+partNumberType)
because client didint send us idempotency key
we have to make and then insert it into the product */

  const idempotencyKey = crypto
    .createHash("sha256")
    .update(`${seller._id}-${partNumber}-${partType}`)
    .digest("hex");

  //create product
  const product = await Product.create({
    sellerId: seller._id,
    name,
    category,
    subcategory,
    partNumber,
    partType,
    fitments,
    price,
    mrp,
    stock,
    oemPartNumber,
    brand,
    images,
    idempotencyKey,
  });

  //remove internal field before sending response because we dont want to show that key in frontend
  const responseProduct = product.toObject(); //it will make a plain JS and its a copy for response
  delete responseProduct.idempotencyKey;

  res.status(201).json({
    message: "Product created successfully",
    product: responseProduct,
  });
});
//get product
export const getProducts = asyncHandler(async (req, res) => {
  console.log("[getProducts] req.user =", req.user);
  console.log("[getProducts] roles =", req.user?.roles);
  let { page, limit, view } = req.query;
  //deafults+sanitzation
  page = Math.max(parseInt(page) || 1, 1);
  limit = Math.min(parseInt(limit) || 20, 100);
  const skip = (page - 1) * limit; //pagination maths if in page 2 then skip 20

  const roles = req.user?.roles || [];
  let filter = {};

  // view=public forces buyer/public filter regardless of role.
  // Used by the public storefront so logged-in sellers see all approved products
  // instead of only their own listings.
  if (view === "public") {
    filter["approval.status"] = "approved";
    console.log("[getProducts] Branch: PUBLIC override — approved products only");
  }
  //Admin sees everything
  else if (roles.includes("admin")) {
    filter = {};
    console.log("[getProducts] Branch: ADMIN — returning all products (no filter)");
  }
  //Seller dashboard view
  else if (roles.includes("seller")) {
    const seller = await Seller.findOne({ userId: req.user.id });
    if (!seller) {
      res.status(403);
      throw new Error("Seller profile not found");
    }
    filter.sellerId = seller._id;
    console.log("[getProducts] Branch: SELLER — filtering by sellerId:", seller._id);
  }

  //buyer view (by default)
  else {
    filter["approval.status"] = "approved";
    console.log("[getProducts] Branch: BUYER/PUBLIC — only approved products returned");
  }

  const products = await Product.find(filter)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .populate("sellerId", "shopName city state phone");

  const total = await Product.countDocuments(filter); //all ,matching products
  const totalPages = Math.ceil(total / limit);

  res.status(200).json({
    products,
    page,
    limit,
    total,
    totalPages,
  });
}); //sarch and category filter will be implemented here

export const getProductById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  //first Validate productId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400);
    throw new Error("Invalid product id");
  }
  //second is Fetch product
  const product = await Product.findById(id).populate("sellerId", "shopName city state phone");

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  const roles = req.user?.roles || [];
  //third Admin can see everything
  if (roles.includes("admin")) {
    return res.status(200).json({ product });
  }

  //fourth is that seller can see own product and status
  if (roles.includes("seller")) {
    const seller = await Seller.findOne({ userId: req.user.id });
    if (seller && product.sellerId._id.toString() === seller._id.toString()) {
      return res.status(200).json({ product });
    }
    res.status(403);
    throw new Error("Not allowed to view this product");
  }

  //fifth is that buyer can see only approved product
  if (product.approval.status !== "approved") {
    res.status(403);
    throw new Error("Product not available");
  }
  res.status(200).json({ product });
});

export const getFeaturedProducts = asyncHandler(async (req, res) => {

  const products = await Product.find({
    "approval.status": "approved"
  })
    .sort({ createdAt: -1 })
    .limit(8)
    .populate("sellerId", "shopName city state");

  res.status(200).json({
    products
  });
});

{
  /*Admin : approve product */
}
export const approveProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);

  if (!req.user.roles.includes("admin")) {
    res.status(403);
    throw new Error("Only admin can perform this action");
  }
  if (!product) {
    res.status(404);
    throw new Error(" Product not found");
  }
  if (product.approval.status !== "pending") {
    res.status(409);
    throw new Error("Product cannot be approved");
  }
  product.approval.status = "approved";
  product.approval.approvedAt = new Date();
  product.approval.rejectedAt = null;
  product.approval.rejectionReason = null;

  //Snapshot for security purpose
  product.approval.lastActionBy = {
    adminId: req.user?.id || null,
    adminName: req.user?.name || "Admin",
  };

  await product.save();

  res.status(200).json({
    message: " Product approved successfully",
  });
});
{
  /*Admin : reject product */
}
export const rejectProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { reason } = req.body;

  const product = await Product.findById(id);
  if (!req.user.roles.includes("admin")) {
    res.status(403);
    throw new Error("Only admin can perform this action");
  }

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  if (product.approval.status !== "pending") {
    res.status(409);
    throw new Error("Product cannot be rejected");
  }

  if (!reason) {
    res.status(400);
    throw new Error("Rejection reason is required");
  }

  product.approval.status = "rejected";
  product.approval.rejectedAt = new Date();
  product.approval.rejectionReason = reason;

  //snapshot
  product.approval.lastActionBy = {
    adminId: req.user?.id || null,
    adminName: req.user?.name || "Admin",
  };

  await product.save();

  res.status(200).json({
    message: "Product rejected successfully",
    productId: product._id,
  });
});

//Admin can update product stock
export const updateProductStock = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { stock } = req.body;

  //validate product Id
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400);
    throw new Error("Invalid product id");
  }

  //validate stock
  if (stock === undefined || !Number.isInteger(stock) || stock < 0) {
    res.status(400);
    throw new Error("Stock must be a non negative integer");
  }
  //Fetch product
  const product = await Product.findById(id);

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }
  //admin can update any product
  if (req.user.roles.includes("admin")) {
    product.stock = stock;
    await product.save();
  }
  if (
    !req.user.roles.includes("admin") &&
    product.approval.status !== "approved"
  ) {
    res.status(409);
    throw new Error("Stock can only be updated for approved products");
  }
  //seller can update only own products
  else if (req.user.roles.includes("seller")) {
    const seller = await Seller.findOne({ userId: req.user.id });
    if (!seller || product.sellerId.toString() !== seller._id.toString()) {
      res.status(403);
      throw new Error("Not allowed to update this product");
    }
    product.stock = stock;
    await product.save();
  } else {
    res.status(403);
    throw new Error("Not authorized");
  }

  res.status(200).json({
    message: "Stock updated successfully",
    productId: product._id,
    stock: product.stock,
  });
});

// Update Product Details (Seller)
export const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400);
    throw new Error("Invalid product id");
  }

  const product = await Product.findById(id);
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  const seller = await Seller.findOne({ userId: req.user.id });
  if (!seller) {
    res.status(404);
    throw new Error("Seller not found");
  }

  if (product.sellerId.toString() !== seller._id.toString()) {
    res.status(403);
    throw new Error("Not authorized to edit this product");
  }

  const {
    name,
    category,
    subcategory,
    partNumber,
    partType,
    fitments,
    price,
    stock,
    oemPartNumber,
    brand,
    images,
  } = req.body;

  if (name) product.name = name;
  if (category) product.category = category;
  if (subcategory) product.subcategory = subcategory;
  if (partNumber) product.partNumber = partNumber;
  if (partType) product.partType = partType;
  if (fitments) product.fitments = fitments;
  if (price !== undefined) product.price = price;
  if (stock !== undefined) product.stock = stock;
  if (oemPartNumber !== undefined) product.oemPartNumber = oemPartNumber;
  if (brand) product.brand = brand;
  if (images) product.images = images;

  // Reset to pending upon update
  product.approval = {
    status: "pending",
    approvedAt: null,
    rejectedAt: null,
    rejectionReason: null,
    lastActionBy: null
  };

  await product.save();

  res.status(200).json({
    message: "Product updated successfully and is pending approval",
    product,
  });
});

// Delete Product (Seller)
export const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400);
    throw new Error("Invalid product id");
  }

  const product = await Product.findById(id);
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  // Allow admin OR the owning seller to delete
  if (!req.user.roles.includes("admin")) {
    const seller = await Seller.findOne({ userId: req.user.id });
    if (!seller || product.sellerId.toString() !== seller._id.toString()) {
      res.status(403);
      throw new Error("Not authorized to delete this product");
    }
  }

  await Product.findByIdAndDelete(id);

  res.status(200).json({
    message: "Product deleted successfully",
  });
});
