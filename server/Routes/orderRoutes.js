import express from "express"
import { createOrder,confirmOrder,cancelOrder,deliverOrder,getOrders} from "../Controller/orderController.js"
import auth from "../Middleware/auth.js";
import authorize from "../Middleware/authorize.js";

const router = express.Router();

//READ order from buyer/seller/admin
router.get("/",auth,authorize("buyer","seller","admin"),getOrders);

//buyer & admin creates order
router.post("/",auth,authorize("buyer","admin"), createOrder);

//admin confirms order
router.put("/:id/confirm", auth,authorize("admin"),confirmOrder);

//buyer or admin cancels order
router.put("/:id/cancel",auth,authorize("admin","buyer"), cancelOrder);

//admin marks order as delivered
router.put("/:id/deliver",auth,authorize("admin"), deliverOrder);

export default router;