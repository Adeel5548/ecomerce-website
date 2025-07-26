import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Layout from "../components/Layout";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


const ProductDetail = () => {
  const { slug } = useParams();
  const [auth] = useAuth();
  const navigate = useNavigate(); // ✅ Add this line

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/v1/product/get-product/${slug}`
      );
      setProduct(data?.product);
    } catch (err) {
      console.error("Error fetching product", err);
    }
  };

  useEffect(() => {
    getProduct();
  }, [slug]);

  const handleAddToCart = async () => {
    if (auth?.user) {
      try {
        await axios.post(
          "http://localhost:5000/api/v1/cart/add",
          { productId: product._id, quantity },
          { headers: { Authorization: `Bearer ${auth.token}` } }
        );
        toast.success("Added to cart ");
      } catch (error) {
        console.error("Cart error:", error.response?.data || error.message);
        toast.error(" Failed to add to cart ");
      }
    } else {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      const existing = cart.find((item) => item._id === product._id);
      if (existing) existing.quantity += quantity;
      else cart.push({ ...product, quantity });
      localStorage.setItem("cart", JSON.stringify(cart));
      toast.success("Add to cart  successfully");
    }
  };

  const handleAddToWishlist = async () => {
    if (!auth?.user) {
      toast.alert("🔒 Please login to add to wishlist.");
      return;
    }

    try {
      await axios.post(
        "http://localhost:5000/api/v1/wishlist/add",
        { productId: product._id },
        { headers: { Authorization: `Bearer ${auth.token}` } }
      );
      toast.success("Added to wishlist");
    } catch (err) {
      toast.error("Failed to add to wishlist");
    }
  };

  const handleBuyNow = async () => {
    if (!auth?.user) {
    return navigate("/login");
    }

    try {
      await axios.post(
        "http://localhost:5000/api/v1/order/create",
        {
          productId: product._id,
          quantity,
          direct: true, // ✅ direct buy flag
        },
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      toast.success("✅ Order placed successfully!");
    } catch (err) {
      console.error("Buy now error:", err.response?.data || err.message);
      toast.error("Failed to place order");
    }
  };

  if (!product) return <div className="text-center py-10">Loading...</div>;

  return (
    <Layout>
      <div className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 min-h-screen py-10 px-4 sm:px-10">
        <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden flex flex-wrap">
          {/* Product Image */}
          <div className="w-full md:w-1/2 bg-white p-6 flex items-center justify-center">
            <img
              src={`http://localhost:5000/api/v1/product/product-photo/${product._id}`}
              alt={product.name}
              className="w-full h-auto rounded-lg shadow-lg hover:scale-105 transition duration-300"
              onError={(e) =>
                (e.target.src = "https://via.placeholder.com/300x300?text=No+Image")
              }
            />
          </div>

          {/* Product Info */}
          <div className="w-full md:w-1/2 p-6 md:p-10 bg-white">
            <h2 className="text-4xl font-bold text-gray-800 mb-2">{product.name}</h2>
            <p className="text-gray-500 mb-3 text-sm">
              Category: {product.category?.name}
            </p>

            <div className="mb-4">
              <span className="text-2xl font-bold text-indigo-600 mr-2">
                PKR {product.price}
              </span>
              <span className="text-gray-400 line-through">
                PKR {product.price + 500}
              </span>
            </div>

            <div className="flex items-center mb-4 text-yellow-500 text-xl">
              ★★★★☆
              <span className="ml-2 text-sm text-gray-600">(120 reviews)</span>
            </div>

            <p className="text-gray-700 mb-6 text-sm leading-relaxed">
              {product.description}
            </p>

            <div className="mb-4">
              <label
                htmlFor="quantity"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Quantity:
              </label>
              <input
                type="number"
                id="quantity"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
                className="w-16 text-center rounded border border-gray-300 shadow-sm focus:ring-indigo-300 focus:ring focus:ring-opacity-50"
              />
            </div>

            <div className="flex flex-wrap gap-4 mb-6">
              <button
                onClick={handleAddToCart}
                className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition transform hover:scale-105"
              >
                🛒 Add to Cart
              </button>
              <button
                onClick={handleAddToWishlist}
                className="bg-gray-200 text-gray-800 px-6 py-2 rounded-md hover:bg-gray-300 transition transform hover:scale-105"
              >
                ❤️ Wishlist
              </button>
              <button
                onClick={handleBuyNow}
                className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition transform hover:scale-105"
              >
                💳 Buy Now
              </button>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2 text-gray-800">Key Features:</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
                <li>High-quality material</li>
                <li>Fast delivery</li>
                <li>Secure packaging</li>
                <li>Return policy available</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetail;
