// controllers/wishlistController.js
import wishlistModel from "../models/wishlistModel.js";

// ✅ Add item to wishlist
export const addToWishlistController = async (req, res) => {
  try {
    const { productId } = req.body;
    const userId = req.user._id;

    const existing = await wishlistModel.findOne({ user: userId, product: productId });
    if (existing) {
      return res.status(200).send({ success: true, message: "🔁 Already in wishlist" });
    }

    const wishlistItem = new wishlistModel({ user: userId, product: productId });
    await wishlistItem.save();

    res.status(200).send({ success: true, message: "💖 Added to wishlist" });
  } catch (error) {
    console.error("Wishlist Error:", error.message);
    res.status(500).send({ success: false, message: "❌ Failed to add to wishlist", error: error.message });
  }
};

// ✅ Get all wishlist items for a user
export const getWishlistItems = async (req, res) => {
  try {
    const userId = req.user._id;
    const wishlist = await wishlistModel
      .find({ user: userId })
      .populate("product"); // Populate product details

    res.status(200).send({
      success: true,
      wishlist,
    });
  } catch (error) {
    console.error("Get Wishlist Error:", error.message);
    res.status(500).send({
      success: false,
      message: "❌ Failed to get wishlist",
      error: error.message,
    });
  }
};

// ✅ Remove item from wishlist by wishlist item _id (not productId)
export const removeFromWishlist = async (req, res) => {
  try {
    await wishlistModel.findOneAndDelete({
      user: req.user._id,
      _id: req.params.productId, // same as Cart (using _id of wishlist item)
    });

    res.status(200).send({
      success: true,
      message: "🗑️ Removed from wishlist",
    });
  } catch (error) {
    console.error("Remove Wishlist Error:", error.message);
    res.status(500).send({
      success: false,
      message: "❌ Failed to remove item",
      error: error.message,
    });
  }
};
