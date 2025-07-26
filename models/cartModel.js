import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    user: { type: mongoose.ObjectId, ref: "User", required: true },
    product: { type: mongoose.ObjectId, ref: "Products", required: true },
    quantity: { type: Number, required: true, default: 1 },
  },
  { timestamps: true }
);

export default mongoose.model("Cart", cartSchema);
