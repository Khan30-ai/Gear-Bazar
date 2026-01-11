import asyncHandler from "express-async-handler";
import User from "../Models/User.js";
import bcrypt from "bcryptjs";

//Get view profile
export const getMe= asyncHandler(async(req,res)=>{
    const user = await User.findById(req.user.id);

    if(!user){
        res.status(404);
        throw new Error("User not found");
    }

    res.status(200).json({
        user:{
            _id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            roles: user.roles,
            isActive: user.isActive,
            createdAt: user.createdAt,
        },
    });
});

//PUT update profile
export const updateMe =  asyncHandler(async(req,res)=>{
    const { name,phone } = req.body;
    const user = await User.findById(req.user.id);

    if(!user){
        res.status(404);
        throw new Error("User not found");
    }
    if(name) user.name = name;
    if(phone) user.phone= phone; 

    await user.save();

    res.status(200).json({
        message: "Profile updated successfully",
        user: {
            _id: user._id,
            name: user.name,
            phone: user.phone,
            email: user.email,
        }
    })  //in future add phone and email otp verification vefore updating 
})

//PUT change password
export const changePassword= asyncHandler(async(req,res)=>{
    const { currentPassword, newPassword }= req.body;

    if (!currentPassword || !newPassword) {
    res.status(400);
    throw new Error("Both current and new password are required");
  }
  const user= await User.findById(req.user.id).select("+password");

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }
  const isMatch = await bcrypt.compare(currentPassword, user.password);

  if (!isMatch) {
    res.status(401);
    throw new Error("Current password is incorrect");
  }
  user.password = newPassword;
  await user.save();

  res.status(200).json({
    message: "Password updated successfully",
  })
})