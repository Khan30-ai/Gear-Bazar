import express from "express";
import {
  createSellerProfile,
  getMySellerProfile,
  updateMysellerProfile,
  getAllSellers,
  approveSeller,
} from "../Controller/sellerController.js";
import auth from "../Middleware/auth.js";
import authorize from "../Middleware/authorize.js";

const router = express.Router();
//seller routes
router.post("/profile", auth, authorize("seller","admin"), createSellerProfile); //both admin and seller can create seller but in futurre remove admin
router.get("/profile", auth, authorize("seller"), getMySellerProfile);
router.put("/profile", auth , authorize("seller"),updateMysellerProfile);

//admin routes
router.get("/",auth, authorize("admin"),getAllSellers);
router.put("/:id/approve", auth, authorize, approveSeller);

export default router;
