import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import User from "../Models/User.js";
import generateToken from "../utils/generateToken.js";
import crypto from "crypto";
import sendEmail from "../utils/sendEmail.js";

//Register
export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, phone, roles } = req.body;

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
    roles: ["buyer"],
    isActive: true,
  });
//auto login 
  const token = generateToken(user);
  res.status(201).json({
    message: "User registered successfully",
    token,
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
  if (!user.isActive) {
  res.status(403);
  throw new Error("Account is deactivated");
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

//forgot password
export const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    res.status(400);
    throw new Error("Email is required");
  }
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(200).json({
      message: "Check email the reset link has been sent",
    });
  }
  //generate reset token , it will be plain
  const resetToken = crypto.randomBytes(32).toString("hex");

  const hashedToken = crypto //hash token before saving it
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  user.resetPasswordToken = hashedToken;
  user.resetPasswordExpire = Date.now() + 15 * 60 * 1000; //15 min

  await user.save({ validateBeforeSave: false });

  const resetURL = `${req.protocol}://${req.get(
    "host"
  )}/api/auth/reset-password/${resetToken}`;

  const message = `
  <h2>Password Reset</h2>
  <p>You requested a password reset.</p>
  <p>Click below to reset your password:</p>
  <a href="${resetURL}">${resetURL}</a>
  <p>This link will expire in 15 minutes.</p>
`;

await sendEmail({
  to: user.email,
  subject: "Reset your GearBazar password",
  html: message,
});

res.status(200).json({
  message: "Password reset link sent to email",
});
});

export const resetPassword = asyncHandler(async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  if (!password) {
    res.status(400);
    throw new Error("New password is required");
  }
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  const user = await User.findOne({
    resetPasswordToken: hashedToken,
    resetPasswordExpire: { $gt: Date.now() },
  }).select("+password");

  if (!user) {
    res.status(400);
    throw new Error("Token is Inavlid or expired");
  }
  //set new password
  user.password = password;

  //here reset fields will be clear
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  res.status(200).json({
    message: "Password reset successful",
  });
});
