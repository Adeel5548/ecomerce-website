import orderModel from "../models/orderModel.js";
import cartModel from "../models/cartModel.js";
import productModel from "../models/productModel.js";
import userModel from "../models/userModel.js"; // required so 'user' model is registered

// ✅ Create Order (Buy Now or from Cart)
export const createOrder = async (req, res) => {
  try {
    const userId = req.user._id;
    let products = [];

    if (req.body.direct) {
      const { productId, quantity } = req.body;
      products.push({ product: productId, quantity });
    } else {
      const cartItems = await cartModel.find({ user: userId }).populate("product");
      if (!cartItems.length) {
        return res.status(400).send({ success: false, message: "Cart is empty" });
      }

      products = cartItems.map((item) => ({
        product: item.product._id,
        quantity: item.quantity,
      }));

      await cartModel.deleteMany({ user: userId });
    }

    const order = new orderModel({
      buyer: userId,
      products,
    });

    await order.save();
    res.status(201).send({ success: true, message: "✅ Order placed", order });
  } catch (error) {
    console.error("Order Error:", error.message);
    res.status(500).send({ success: false, message: "❌ Order failed" });
  }
};

// ✅ User: Get own orders
export const getUserOrders = async (req, res) => {
  try {
    const orders = await orderModel
      .find({ buyer: req.user._id })
      .populate("products.product", "name price")
      .sort({ createdAt: -1 });

    res.status(200).send({ success: true, orders });
  } catch (error) {
    console.error("User Order Error:", error.message);
    res.status(500).send({ success: false, message: "Failed to get your orders" });
  }
};

// ✅ Admin: Get all orders
export const getAllOrders = async (req, res) => {
  try {
    const orders = await orderModel
      .find()
      .populate("products.product", "name price")
      .populate("buyer", "name email")
      .sort({ createdAt: -1 });

    res.status(200).send({ success: true, orders });
  } catch (error) {
    console.error("Admin Order Error:", error.message);
    res.status(500).send({ success: false, message: "Failed to get all orders" });
  }
};

// ✅ Admin: Update Order Status
export const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const updated = await orderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );

    res.status(200).send({ success: true, updated });
  } catch (error) {
    console.error("Update Status Error:", error.message);
    res.status(500).send({ success: false, message: "Failed to update order status" });
  }
};
