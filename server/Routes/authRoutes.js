import express from "express";
import auth from "../Middleware/auth.js";
import { loginUser, registerUser, forgotPassword, resetPassword, changePassword } from "../Controller/authController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/forgot-password", forgotPassword);
router.put("/reset-password/:token", resetPassword);
router.put("/change-password", auth, changePassword);
export default router;
