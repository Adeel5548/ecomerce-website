// routes/cart.js
import express from "express";
import { requireSignIn } from "../middleware/authMidleware.js";
import {
  handleAddToCart,
  getCartItemsController,
  removeFromCart,
} from "../controllers/cartController.js";

const router = express.Router();

// Add to cart
router.post("/add", requireSignIn, handleAddToCart);

// Get all items
router.get("/get", requireSignIn, getCartItemsController);

// Remove item
router.delete("/remove/:productId", requireSignIn, removeFromCart);

export default router;
