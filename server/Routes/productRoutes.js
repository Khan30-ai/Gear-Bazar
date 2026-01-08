import express from "express";
import { createdProduct,approveProduct,rejectProduct,getProducts, getProductById } from "../Controller/productController.js";
import Seller from "../Models/Seller.js";

const router = express.Router();

//seller/admin can create product (only visible after approval)
router.post("/",createdProduct);

router.get("/", getProducts);

//admin will approve product
router.put("/:id/approve", approveProduct);

//admin will reject product
router.put("/:id/reject", rejectProduct);

//getting product by id
router.get("/:id", getProductById);


export default router;