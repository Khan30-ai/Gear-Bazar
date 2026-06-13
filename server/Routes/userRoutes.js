import express from "express";
import { getMyProfile, updateMyProfile, changePassword } from "../Controller/userController.js";
import auth from "../Middleware/auth.js";

const router = express.Router();

router.get("/me", auth, getMyProfile);
//update profile (name and phone only)
router.put("/me", auth, updateMyProfile);
router.put("/change-password", auth, changePassword);

export default router;