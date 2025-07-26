import express from "express";
import formidable from "express-formidable";
import {
  createProduct,
  getAllProducts,
  getSingleProduct,
  getProductPhoto,
  deleteProduct,
  updateProduct,
} from "../controllers/productController.js";

// ✅ Import for category-wise products
import Products from "../models/productModel.js";
import Category from "../models/categoryModel.js";

const router = express.Router();

// ==============================
// 💾 PRODUCT ROUTES
// ==============================

// Create Product
router.post("/create-product", formidable(), createProduct);

// Get All Products
router.get("/get-products", getAllProducts);

// Get Single Product
router.get("/get-product/:slug", getSingleProduct);

// Get Product Photo
router.get("/product-photo/:pid", getProductPhoto);

// Delete Product
router.delete("/delete-product/:pid", deleteProduct);

// Update Product
router.put("/update-product/:pid", formidable(), updateProduct);

// ==============================
// 📦 CATEGORY-WISE PRODUCT ROUTE
// ==============================
router.get("/category-products/:slug", async (req, res) => {
  try {
    const category = await Category.findOne({ slug: req.params.slug });
    if (!category) {
      return res.status(404).send({ success: false, message: "Category not found" });
    }

    const products = await Products.find({ category: category._id }).populate("category");

    res.status(200).send({
      success: true,
      category,
      products,
    });
  } catch (error) {
    console.error("❌ Category products error:", error);
    res.status(500).send({
      success: false,
      message: "Failed to fetch category products",
      error,
    });
  }
});

export default router;
