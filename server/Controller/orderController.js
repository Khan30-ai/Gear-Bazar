import asyncHandler from "express-async-handler";
import mongoose from "mongoose";
import Order from "../Models/Order.js";
import Product from "../Models/Product.js";
import Buyer from "../Models/Buyer.js";

export const createOrder = asyncHandler(async (req, res) => {
  const { productId, quantity, address, buyerId } = req.body;  //later when jwt will come then request will be from user (req.user)

  //basic validations
  if (!productId || !quantity || !address || !buyerId) {
    res.status(400);
    throw new Error("Missing required fields");
  }

  if (!mongoose.Schema.Types.ObjectId.isValid(productId)) {
    res.status(400);
    throw new Error("Invalid product");
  }

  if (mongoose.Schema.Types.ObjectId.isValid(buyerId)) {
    res.status(400);
    throw new Error("Invalid buyer");
  }

  if (quantity<1) {
    res.status(400);
    throw new Error("Quantity must be atleast 1");
  }

  //fetch buyer
  const buyer = await Buyer.findById(buyerId);

  if(!buyer) {
    res.status(404);
    throw new Error("Buyer not found")
  }

  //fetch product
  const product= await Product.findById(productId);

  if(!product){
    res.status(404);
    throw new Error("Product nor found")
  }
  if (product.approval.status !== "approved") {
    res.status(403);
    throw new Error("Product is not approved");
  }
    if (product.stock < quantity) {
    res.status(409);
    throw new Error("Insufficient stock");
  }

  //build order data 
  const priceAtOrderTime= product.price;
  const totalAmount= priceAtOrderTime * quantity;

  const order= await Order.create({
    buyerId: buyer._id,
    sellerId: product.sellerId,
    productId: product._id,

    productSnapshot: {
        name: product.name,
        partNumber: product.partNumber,
        partNumberType: product.partNumberType,
        fitments: product.fitments,
        priceAtOrderTime,
    },

    buyerSnapshot: {
        name: buyer.name,
        phone: buyer.phone,
        address,
    },

    quantity,
    priceAtOrderTime,
    totalAmount,
    orderStatus: "CREATED",
  });

  //Response
  res.status(201).json({
    message: "Order created successfully",
    order,
  });
});
