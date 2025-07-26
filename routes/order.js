import express from "express";
import { requireSignIn, isAddmin } from "../middleware/authMidleware.js";
import {
  createOrder,
  getUserOrders,
  getAllOrders,
  updateOrderStatus,
} from "../controllers/orderController.js";

const router = express.Router();

router.post("/create", requireSignIn, createOrder);
router.get("/user", requireSignIn, getUserOrders);
router.get("/admin", requireSignIn, isAddmin, getAllOrders);
router.patch("/update-status/:orderId", requireSignIn, isAddmin, updateOrderStatus);

export default router;
