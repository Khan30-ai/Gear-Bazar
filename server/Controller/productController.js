import asyncHandler from "express-async-handler";
import Product from "../Models/Product.js";
import Seller from "../Models/Seller.js";
import User from "../Models/User.js";
import crypto from "crypto";
import mongoose from "mongoose";
import { resolveSoa } from "dns";

{
  /*Admin will create a new product  as of now */
}
export const createdProduct = asyncHandler(async (req, res) => {
  const {
    name,
    category,
    subcategory,
    partNumber,
    partNumberType,
    fitments,
    price,
    stock,
    oemPartNumber,
    aftermarketBrand,
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
    !partNumberType ||
    price === undefined ||
    stock === undefined
  ) {
    res.status(400);
    throw new Error("Missing required product fields");
  }
  // Validate seller existence
  const seller = await Seller.findById(userId);

  if (!seller) {
    res.status(404);
    throw new Error("Seller not found");
  }
  //seller approval check
  if (!seller.isApproved) {
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
    .update(`${seller._id}-${partNumber}-${partNumberType}`)
    .digest("hex");

  //create product
  const product = await Product.create({
    sellerId: seller._id,
    name,
    category,
    subcategory,
    partNumber,
    partNumberType,
    fitments,
    price,
    stock,
    oemPartNumber,
    aftermarketBrand,
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
  let { page, limit} = req.query;
  //deafults+sanitzation
  page = Math.max(parseInt(page) || 1, 1);
  limit = Math.min(parseInt(limit) || 20, 20);
  const skip = (page - 1) * limit; //pagination maths if in page 2 then skip 20

  const roles = req.user?.roles || [];
  let filter = {};

  //Admin sees everything 
  if (roles.includes("admin")) {
    filter = {};
  }
  //Seller dashboard view
  else if (roles.includes("seller")) {
    const seller =  await Seller.findOne({userId: req.user.id});
    if (!seller) {
      res.status(403);
      throw new Error("Seller profile not found");
    }
    filter.sellerId = seller._id;
  }

  //buyer view (by default)
  else {
    filter["approval.status"] = "approved";
  }

  const products = await Product.find(filter)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .populate("sellerId", "shopName");

  const total = await Product.countDocuments(filter); //all ,matching products
  const totalPages = Math.ceil(total / limit);

  res.status(200).json({
    products,
    page,
    limit,
    total,
    totalPages,
  });
});    //sarch and category filter will be implemented here

export const getProductById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  //first Validate productId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400);
    throw new Error("Invalid product id");
  }
  //second is Fetch product
  const product = await Product.findById(id).populate("sellerId", "shopName");

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
    const seller = await Seller.findOne({userId: req.user.id})
    if (seller && product.sellerId._id.toString()=== seller._id.toString()) {
      return res.status(200).json({product})
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

{
  /*Admin : approve product */
}
export const approveProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);

  if(!req.user.roles.includes("admin")){
    res.status(403);
    throw new Error("Only admin can perform this action")
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
  if(!req.user.roles.includes("admin")){
    res.status(403);
    throw new Error("Only admin can perform this action")
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
export const updateProductStock= asyncHandler(async(req,res)=>{
  const {id}= req.params;
  const {stock}= req.body;

  //validate product Id
  if(!mongoose.Types.ObjectId.isValid(id)){
    res.status(400);
    throw new Error("Invalid product id");
  }

  //validate stock
  if(stock === undefined || !Number.isInteger(stock)|| stock<0){
    res.status(400);
    throw new Error("Stock must be a non negative integer");
  }
  //Fetch product
  const product = await Product.findById(id);

  if(!product){
    res.status(404);
    throw new Error("Product not found");
  }
  //admin can update any product
  if(req.user.roles.includes("admin")){
    product.stock= stock;
    await product.save();
  }
          //seller can approve only own products
  else if (req.user.roles.incliudes("seller")){
    const seller = await Seller.findOne({userId: req.user.id});
    if(!seller || product.sellerId.toString() !== seller._id.toString()){
      res.status(403);
      throw new Error("Not allowed to update this product");
    }
    product.stock=stock;
    await product.save();
  } else{
    res.status(403);
    throw new Error("Not authorized")
  }

  res.status(200).json({
    message: "Stock updated successfully",
    productId: product._id,
    stock: product.stock,
  })

})