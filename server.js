import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import connectDb from "./config/db.js";

// Route Imports
import authRoutes from "./routes/auth.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productsRoutes from "./routes/productsRoutes.js";
import cartRoutes from "./routes/cart.js";
import wishlistRoutes from "./routes/wishlist.js";
import orderRoutes from "./routes/order.js";

// Config
dotenv.config();
const app = express();
const PORT = process.env.PORT || 8080;

// DB Connection
connectDb();

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productsRoutes);
app.use("/api/v1/cart", cartRoutes);
app.use("/api/v1/wishlist", wishlistRoutes);
app.use("/api/v1/order", orderRoutes);

// Root Route
app.get("/", (req, res) => {
  res.send("<h1>Welcome to E-commerce App</h1>");
});

// Start
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`.green.bold);
});
