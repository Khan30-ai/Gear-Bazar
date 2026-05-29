import asyncHandler from "express-async-handler";
import Seller from "../Models/Seller.js";
import User from "../Models/User.js";
import mongoose from "mongoose";

//create seller (only user with role "seller")
export const createSellerProfile = asyncHandler(async (req, res) => {
  const {
    shopName,
    ownerName,
    gstNumber,
    phone,
    address,
    city,
    state,
    pincode,
  } = req.body;
  const userId = req.user.id;

  if (!shopName) {
    res.status(400);
    throw new Error("Shop name is required");
  }
  const user = await User.findById(userId);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  const existingSeller = await Seller.findOne({ userId });
  if (existingSeller) {
    res.status(409);
    throw new Error("Seller profile already exists");
  }
  const seller = await Seller.create({
    userId,
    shopName,
    ownerName,
    gstNumber,
    phone,
    address,
    city,
    state,
    pincode,
    status: "pending",
  });
  res.status(201).json({
    message: "Seller profile created successfully, pending platform approval",
    seller,
  });
})

//GET my seller profile
export const getMySellerProfile = asyncHandler(async (req, res) => {
  const seller = await Seller.findOne({ userId: req.user.id });

  if (!seller) {
    res.status(404);
    throw new Error("Seller profile not found");
  }

  res.status(200).json({ seller });
});

//Update my seller profile
export const updateMySellerProfile = asyncHandler(async (req, res) => {
  const { shopName } = req.body;

  const seller = await Seller.findOne({ userId: req.user.id });
  if (!seller) {
    res.status(404);
    throw new Error("Seller profile not found");
  }
  if (shopName) seller.shopName = shopName;
  await seller.save();

  res.status(200).json({
    message: "Seller profile updated successfully",
    seller,
  });
});

//admin get all sellers
export const getAllSellers = asyncHandler(async (req, res) => {
  const sellers = await Seller.find()
    .populate("userId", "name email roles");

  res.status(200).json({
    count: sellers.length,
    sellers,
  });
});

//admin will approve all seller
export const approveSeller = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400);
    throw new Error("Invalid sellerId");
  }

  const seller = await Seller.findById(id);
  if (!seller) {
    res.status(404);
    throw new Error("Seller not found");
  }

  seller.status = "approved";
  await seller.save();
  const user = await User.findById(seller.userId);

  if (!user.roles.includes("seller")) {
    user.roles.push("seller");
    await user.save();
  }
  res.status(200).json({
    message: "Seller approved successfully",
    sellerId: seller._id,
  });
});