import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    products: [
      {
        product: {
          type: mongoose.ObjectId,
          ref: "product", // must match lowercase model name used in productModel
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    buyer: {
      type: mongoose.ObjectId,
      ref: "user", // must match lowercase model name used in userModel
      required: true,
    },
    status: {
      type: String,
      default: "Processing",
      enum: ["Processing", "Shipped", "Delivered", "Cancelled"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("order", orderSchema);
