import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import User from "../Models/User.js";
import generateToken from "../utils/generateToken.js";

//Register
export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password,phone, roles } = req.body;

  //validation
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Name ,email and password are required");
  }
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    res.status(409);
    throw new Error("User already exists with this email");
  }
  //create user
  const user = await User.create({
    name,
    email,
    password,
    phone,
    roles: roles || ["buyer"],
    isActive: true,
  });
  res.status(201).json({
    message: "User registered successfully",
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      roles: user.roles,
    },
  });
});

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Email and password required");
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    res.status(401);
    throw new Error("Invalid email or password");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  //password match
  if (!isMatch) {
    res.status(401);
    throw new Error("Invalid email or password");
  }

  //generate JWT
  const token = generateToken(user);

  res.status(200).json({
    message: "Login successful",
    token,
    user: {
      _id: user._id,
      name: user.name,
      roles: user.roles,
    },
  });
});
