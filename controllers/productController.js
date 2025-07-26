import slugify from "slugify";
import Products from "../models/productModel.js";
import fs from "fs";

export const createProduct = async (req, res) => {
  try {
    const { name, description, price, category, quantity, shipping } = req.fields;
    const { photo } = req.files;

    // ✅ Validation
    if (!name || !description || !price || !category || !quantity) {
      return res.status(400).send({ error: "All fields are required" });
    }

    if (photo && photo.size > 1000000) {
      return res.status(400).send({ error: "Photo should be less than 1MB" });
    }

    // ✅ Create product instance
    const product = new Products({
      name,
      description,
      price,
      category,
      quantity,
      shipping,
      slug: slugify(name),
    });

    // ✅ Attach photo data
    if (photo && photo.path) {
      try {
        product.photo.data = fs.readFileSync(photo.path);
        product.photo.contentType = photo.type;
      } catch (err) {
        console.error("❌ Error reading photo:", err.message);
        return res.status(500).send({ error: "Error reading photo file" });
      }
    }

    // ✅ Save to DB
    await product.save();

    res.status(201).send({
      success: true,
      message: "Product created successfully",
      product: {
        _id: product._id,
        name: product.name,
        slug: product.slug,
        price: product.price,
        category: product.category,
        quantity: product.quantity,
        shipping: product.shipping,
        description: product.description,
        createdAt: product.createdAt,
      },
    });

  } catch (error) {
    console.error("❌ Product creation error:", error);
    res.status(500).send({
      success: false,
      error: error.message,
      message: "Error in product creation",
    });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const products = await Products.find({})
      .select("-photo")
      .populate("category")
      .limit(12)
      .sort({ createdAt: -1 });

    res.status(200).send({
      success: true,
      count: products.length,
      message: "All products",
      products,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, message: "Error in getting products", error });
  }
};
export const getSingleProduct = async (req, res) => {
  try {
    const product = await Products.findOne({ slug: req.params.slug })
      .select("-photo")
      .populate("category");

    res.status(200).send({
      success: true,
      message: "Single product fetched",
      product,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, message: "Error fetching product", error });
  }
};
export const getProductPhoto = async (req, res) => {
  try {
    const product = await Products.findById(req.params.pid).select("photo");
    if (product.photo.data) {
      res.set("Content-Type", product.photo.contentType);
      return res.status(200).send(product.photo.data);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, message: "Error fetching photo", error });
  }
};
export const deleteProduct = async (req, res) => {
  try {
    await Products.findByIdAndDelete(req.params.pid).select("-photo");
    res.status(200).send({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, message: "Error deleting product", error });
  }
};
export const updateProduct = async (req, res) => {
  try {
    const { name, description, price, category, quantity, shipping } = req.fields;
    const { photo } = req.files;

    const existingProduct = await Products.findById(req.params.pid);

    if (!existingProduct) {
      return res.status(404).send({ success: false, message: "Product not found" });
    }

    const updatedProduct = Object.assign(existingProduct, {
      name,
      description,
      price,
      category,
      quantity,
      shipping,
      slug: slugify(name),
    });

    if (photo && photo.size > 1000000) {
      return res.status(400).send({ error: "Photo should be less than 1MB" });
    }

    if (photo && photo.path) {
      updatedProduct.photo.data = fs.readFileSync(photo.path);
      updatedProduct.photo.contentType = photo.type;
    }

    await updatedProduct.save();

    res.status(200).send({
      success: true,
      message: "Product updated successfully",
      product: {
        _id: updatedProduct._id,
        name: updatedProduct.name,
        slug: updatedProduct.slug,
        price: updatedProduct.price,
        quantity: updatedProduct.quantity,
        category: updatedProduct.category,
        shipping: updatedProduct.shipping,
        description: updatedProduct.description,
      },
    });
  } catch (error) {
    console.error("❌ Update error:", error);
    res.status(500).send({
      success: false,
      message: "Error in updating product",
      error,
    });
  }
};
