import express from "express";
import{ getMe, updateMe, changePassword} from "../Controller/userController.js";
import auth from "../Middleware/auth.js";

const router = express.Router();

router.get("/me",auth, getMe);
//update profile (name and phone only)
router.put("/me",auth, updateMe);
router.put("/change-password", auth,changePassword);

export default router;