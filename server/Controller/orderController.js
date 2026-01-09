import asyncHandler from "express-async-handler";
import mongoose from "mongoose";
import Order from "../Models/Order.js";
import Product from "../Models/Product.js";
import Buyer from "../Models/Buyer.js";

//CREATED
export const createOrder = asyncHandler(async (req, res) => {
  const { productId, quantity, address, buyerId } = req.body; //later when jwt will come then request will be from user (req.user)

  //basic validations
  if (!productId || !quantity || !address || !buyerId) {
    res.status(400);
    throw new Error("Missing required fields");
  }

  if (!mongoose.Types.ObjectId.isValid(productId)) {
    res.status(400);
    throw new Error("Invalid product");
  }

  if (!mongoose.Types.ObjectId.isValid(buyerId)) {
    res.status(400);
    throw new Error("Invalid buyer");
  }

  if (quantity < 1) {
    res.status(400);
    throw new Error("Quantity must be atleast 1");
  }

  //fetch buyer
  const buyer = await Buyer.findById(buyerId);

  if (!buyer) {
    res.status(404);
    throw new Error("Buyer not found");
  }

  //fetch product
  const product = await Product.findById(productId);

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
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
  const priceAtOrderTime = product.price;
  const totalAmount = priceAtOrderTime * quantity;

  const order = await Order.create({
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
  });

  //Response
  res.status(201).json({
    message: "Order created successfully",
    order,
  });
});

//READ  
//GET /api/orders
export const getOrders= asyncHandler(async(req,res)=>{
  let{page,limit,buyerId,sellerId,admin}= req.query;

  //pagination 
  page = Math.max(parseInt(page) || 1, 1);
  limit = Math.min(parseInt(limit) || 10, 50);
  const skip = (page - 1) * limit;

  let filter={isDeleted: false};
  let projection={};

  //admin view(highest priority)
  if(admin === "true"){
    filter={} //No filter at all it even includes soft-deleted
    projection=null; //admin sees full order 
  }

  //seller view
  else if(sellerId) {
    if(!mongoose.Types.ObjectId.isValid(sellerId)){
      res.status(400);
      throw new Error("Invalid sellerId");
    }
    filter={
      sellerId,
      isDeleted: false,
    };
    projection={
      "buyerSnapshot.phone": 0,  //hides phone number
      confirmedBy:0,
    };
  }

  //Buyer view (default)
  else if(buyerId){
    if(!mongoose.Types.ObjectId.isValid(buyerId)) {
      res.status(400);
      throw new Error("Invalid buyerId");
    }
    filter={
      buyerId,
      isDeleted: false,
    };

    projection={
      confirmedBy: 0,
    };
  }

  //no role info then reject
  else{
    res.status(400);
    throw new Error("Role information missing");
  }

  const orders= await Order.find(filter,projection)
  .sort({createdAt: -1}) //newest first
  .skip(skip)
  .limit(limit)
  .populate("sellerId","shopName");

  const total= await Order.countDocuments(filter);
  const totalPages = Math.ceil(total/limit);

  res.status(200).json({
    orders,page,limit,total,totalPages,
  });
});

//CONFIRMED
export const confirmOrder = asyncHandler(async (req, res) => {
  const { id } = req.params;

  //validate order id
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400);
    throw new Error("Invalid orderId");
  }

  //fetch order
  const order = await Order.findById(id);

  if (!order || order.isDeleted) {
    res.status(404);
    throw new Error("Order not found");
  }
  if (order.orderStatus !== "CREATED") {
    res.status(409);
    throw new Error("Only CREATED orders can be confirmed");
  }

  //fetch product
  const product = await Product.findById(order.productId);

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }
  if (product.approval.status !== "approved") {
    res.status(403);
    throw new Error("Product is no longer approved");
  }

  //re-check stock
  if (product.stock < order.quantity) {
    res.status(409);
    throw new Error("Insufficient stock to confirm order");
  }

  //deduct stock
  product.stock = product.stock - order.quantity;
  await product.save();

  //update order state
  order.orderStatus = "CONFIRMED";
  order.confirmedAt = new Date();
  order.confirmedBy = req.user?.id || null; // admin later via JWT

  await order.save();

  //respond
  res.status(200).json({
    message: "Order confirmed successfully",
    orderId: order._id,
    newStock: product.stock,
  });
});

//CANCELLED
export const cancelOrder = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { reason } = req.body;

  //validate order id
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400);
    throw new Error("Invalid orderId");
  }

  //fetch order
  const order = await Order.findById(id);
  if (!order || order.isDeleted) {
    res.status(404);
    throw new Error("Order not found");
  }

  if (order.orderStatus === "DELIVERED") {
    res.status(409);
    throw new Error("Delivered orders cannot be cancelled");
  }

  //authorization rules (who can cancel at what point)
  const isAdmin = Boolean(req.user?.isAdmin); //in future jwt

  //now buyer will be authorized to cancel CREATED order
  // and this code will remove later on once we add JWT
  const isBuyer =
    req.user?.id?.toString() === order.buyerId.toString() ||
    req.body.buyerId?.toString() === order.buyerId.toString();

  if (order.orderStatus === "CONFIRMED" && !isAdmin) {
    res.status(403);
    throw new Error("Only admin can cancel a confirmed order");
  }

  if (order.orderStatus === "CREATED" && !isAdmin && !isBuyer) {
    res.status(403);
    throw new Error("Not authorized to cancel this order");
  }

  //restore stock if needed
  if (order.orderStatus === "CONFIRMED") {
    const product = await Product.findById(order.productId);

    if (!product) {
      res.status(500);
      throw new Error("Product missing while restoring stock");
    }

    product.stock = product.stock + order.quantity;
    await product.save();
  }

  //update order state
  order.orderStatus = "CANCELLED";
  order.cancelledAt = new Date();
  order.cancelReason = reason || null;

  await order.save();

  //respond
  res.status(200).json({
    message: "Order cancelled successfully",
    orderId: order._id,
    status: order.orderStatus,
  });
});

//DELIVERED
export const deliverOrder = asyncHandler(async (req, res) => {
  const { id } = req.params;

  //validate order id
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400);
    throw new Error("Invalid orderId");
  }

  //fetch order
  const order = await Order.findById(id);

  if (!order || order.isDeleted) {
    res.status(404);
    throw new Error("Order not found");
  }

  //state validation
  if (order.orderStatus !== "CONFIRMED") {
    res.status(409);
    throw new Error("Only CONFIRMED orders can be delivered");
  }

  //update order state
  order.orderStatus = "DELIVERED";
  order.deliveredAt = new Date();

  await order.save();

  //respond
  res.status(200).json({
    message: "Order marked as delivered",
    orderId: order._id,
    status: order.orderStatus,
  });
});

