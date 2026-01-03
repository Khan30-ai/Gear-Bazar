import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import Seller from "../Models/Seller.js";

// GET all sellers, also isme async handler se wrap kardiye now we dont need to write try and catch
export const getSellers = asyncHandler(async (req, res) => {
  const sellers = await Seller.find();
  res.status(200).json({
    message: "All sellers fetched successfully",
    sellers: sellers, 
  });
});

// GET single seller by id from URL params
export const getSellerById = asyncHandler(async (req, res) => {
  const {id}=req.params;
  const seller = await Seller.findById(id);
  if (!seller) {
    res.status(404);
    throw new Error("Seller not found");
  }
  res.status(200).json({
    message: `Seller fetched successfully`,
    seller,
  });
});
// PUT (update seller)
export const updateSeller = asyncHandler(async (req, res) => {
  const {id}=req.params;

  const allowedUpdates = {
  name: req.body.name,
  shopName: req.body.shopName,
};

const updatedSeller = await Seller.findByIdAndUpdate(
  id,
  allowedUpdates,
  { new: true }
);


  if (!updatedSeller) {
    res.status(404);
    throw new Error("Seller not found");
  }

  res.status(200).json({
    message: `Seller updated successfully`,
    seller: updatedSeller,
  });
});
// DELETE seller
export const deleteSeller = asyncHandler(async (req, res) => {
  const {id}=req.params;
  const seller = await Seller.findById(id);

  if (!seller) {
    res.status(404);
    throw new Error("Seller not found");
  }
  await seller.deleteOne();

  res.status(200).json({
    message: `Seller deleted successfully`,
  });
});

// POST (register seller)
export const registerSeller = asyncHandler(async (req, res) => {
  const { name, email, password, shopName } = req.body;
  if (!name || !email || !password || !shopName) {
    res.status(400);
    throw new Error("All fields are required");
  }

  const sellerExists = await Seller.findOne({ email });
  if (sellerExists) {
    res.status(400);
    throw new Error("Seller already exists");
  }
    //Creates new seller
  const seller = await Seller.create({
    name,
    email,
    password, // bcrypt model will handle middleware
    shopName,
  });

  res.status(201).json({
    message: "Seller registered successfully",
    sellerId: seller._id,
  });
});

// POST (login seller)
export const loginSeller = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Email and password are required");
  }
  
  const seller = await Seller.findOne({ email });

  if (!seller) {
    res.status(400);
    throw new Error("Invalid email or password");
  }
  const isPasswordMatch = await bcrypt.compare(password, seller.password);

  if (!isPasswordMatch) {
    res.status(400);
    throw new Error("Invalid email or password");
  }
  res.status(200).json({
    message: "Login Successfull",
    sellerId: seller._id,
  });
});
