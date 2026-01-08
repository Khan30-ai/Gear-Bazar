import express from "express";
import { createdProduct,approveProduct,rejectProduct,getProducts } from "../Controller/productController.js";

const router = express.Router();

//seller/admin can create product (only visible after approval)
router.post("/",createdProduct);

router.get("/", getProducts);


//admin will approve product
router.put("/:id/approve", approveProduct);

//admin will reject product
router.put("/:id/reject", rejectProduct);

export default router;