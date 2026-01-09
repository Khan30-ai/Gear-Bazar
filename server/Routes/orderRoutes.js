import express from "express"
import { createOrder,confirmOrder,cancelOrder,deliverOrder,getOrders} from "../Controller/orderController.js"

const router = express.Router();

//READ order from buyer/seller/admin
router.get("/",getOrders);

//buyer creates order
router.post("/", createOrder);

//admin confirms order
router.put("/:id/confirm", confirmOrder);

//buyer or admin cancels order
router.put("/:id/cancel", cancelOrder);

//admin marks order as delivered
router.put("/:id/deliver", deliverOrder);

export default router;