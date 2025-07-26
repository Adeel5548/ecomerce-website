// routes/wishlist.js
import express from "express";
import { requireSignIn } from "../middleware/authMidleware.js";
import {
  addToWishlistController,
  getWishlistItems,
  removeFromWishlist,
} from "../controllers/wishlistController.js";

const router = express.Router();

// Add to wishlist
router.post("/add", requireSignIn, addToWishlistController);

// Get wishlist
router.get("/items", requireSignIn, getWishlistItems);

// Remove item
router.delete("/remove/:productId", requireSignIn, removeFromWishlist);

export default router;
