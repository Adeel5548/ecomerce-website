// controllers/cartController.js
import cartModel from "../models/cartModel.js";

// ✅ Add item to DB cart
export const handleAddToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user._id;

    const existingItem = await cartModel.findOne({ user: userId, product: productId });

    if (existingItem) {
      existingItem.quantity += quantity;
      await existingItem.save();
    } else {
      const cartItem = new cartModel({ user: userId, product: productId, quantity });
      await cartItem.save();
    }

    res.status(200).send({ success: true, message: "✅ Product added to cart" });
  } catch (error) {
    console.error("Cart Error:", error.message);
    res.status(500).send({ success: false, message: "❌ Failed to add to cart", error: error.message });
  }
};

// ✅ Get user cart
// ✅ Get all cart items for a user
export const getCartItemsController = async (req, res) => {
  try {
    const userId = req.user._id;

    const cart = await cartModel
      .find({ user: userId })
      .populate("product"); // Populate product details

    res.status(200).send({
      success: true,
      cart,
    });
  } catch (error) {
    console.error("❌ Cart fetch error:", error);
    res.status(500).send({
      success: false,
      message: "Failed to fetch cart items",
      error: error.message,
    });
  }
};


// ✅ Remove item from cart
export const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;
    await cartModel.findOneAndDelete({ user: req.user._id, _id: req.params.productId });
    res.status(200).send({ success: true, message: "🗑️ Removed from cart" });
  } catch (error) {
    console.error("Remove Cart Error:", error.message);
    res.status(500).send({ success: false, message: "❌ Failed to remove item from cart", error: error.message });
  }
};
