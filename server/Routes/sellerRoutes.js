import express from "express";
import {
  getSellers,
  getSellerById,
  updateSeller,
  deleteSeller,
  loginSeller,
  registerSeller,
} from "../Controller/sellerController.js";

const router = express.Router();

//Crud
router.get("/", getSellers);
router.get("/:id", getSellerById);
router.put("/:id", updateSeller);
router.delete("/:id", deleteSeller);

//Auth
router.post("/register", registerSeller);
router.post("/login", loginSeller);

export default router;
