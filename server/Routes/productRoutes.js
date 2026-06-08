import express from "express";
import { createdProduct, approveProduct, rejectProduct, getProducts, getProductById, getFeaturedProducts, updateProductStock, updateProduct, deleteProduct } from "../Controller/productController.js";
import auth from "../Middleware/auth.js";
import authorize from "../Middleware/authorize.js";
import optionalAuth from "../Middleware/optionalAuthMiddleware.js";

const router = express.Router();

//seller/admin can create product (only visible after approval)
router.post("/", auth, authorize("seller", "admin"), createdProduct);

// optionalAuth: populates req.user when a valid token is sent (admin/seller),
// but does NOT block unauthenticated buyers. The controller branches on req.user.roles.
router.get("/", optionalAuth, getProducts);
router.get("/featured", getFeaturedProducts);
router.get("/:id", optionalAuth, getProductById);
router.put("/:id", auth, authorize("seller", "admin"), updateProduct);
router.delete("/:id", auth, authorize("seller", "admin"), deleteProduct);

//admin will approve product
router.put("/:id/approve", auth, authorize("admin"), approveProduct);

//admin will reject product
router.put("/:id/reject", auth, authorize("admin"), rejectProduct);

//stock update can be done by both admin and seller
router.put("/:id/stock", auth, authorize("seller", "admin"), updateProductStock);


export default router;