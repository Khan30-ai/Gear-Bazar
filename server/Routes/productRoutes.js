import express from "express";
import { createdProduct,approveProduct,rejectProduct,getProducts, getProductById, updateProductStock } from "../Controller/productController.js";
import auth from "../Middleware/auth.js";
import authorize from "../Middleware/authorize.js";

const router = express.Router();

//seller/admin can create product (only visible after approval)
router.post("/",auth,authorize("seller","admin"),createdProduct);

router.get("/", getProducts);
router.get("/:id", getProductById);

//admin will approve product
router.put("/:id/approve",auth,authorize("admin"), approveProduct);

//admin will reject product
router.put("/:id/reject", auth,authorize("admin"),rejectProduct);

//stock update can be done by both admin and seller
router.put("/:id/stock",auth , authorize("seller","admin"), updateProductStock);


export default router;