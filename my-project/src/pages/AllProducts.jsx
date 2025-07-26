import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const getAllProducts = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/v1/product/get-products");
      setProducts(data?.products || []);
    } catch (error) {
      console.error("Error fetching all products:", error);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <Layout title="All Products">
      <div className="bg-gray-50 py-10 px-4 sm:px-8 min-h-screen">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">All Products</h2>

        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <div
              key={product._id}
              className="relative group rounded-xl overflow-hidden shadow-md hover:shadow-lg bg-white border border-gray-200 transition-all duration-300 hover:scale-105"
            >
              {/* Product Image */}
              <img
                className="w-full h-52 object-cover transition duration-300"
                src={`http://localhost:5000/api/v1/product/product-photo/${product._id}`}
                alt={product.name}
                onError={(e) =>
                  (e.target.src = "https://via.placeholder.com/300x200.png?text=No+Image")
                }
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-white/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4 text-center">
                <h5 className="text-lg font-semibold text-gray-800 mb-1">{product.name}</h5>
                <p className="text-sm text-gray-600 mb-2 line-clamp-2">{product.description}</p>
                <p className="text-blue-700 font-bold text-md mb-3">PKR {product.price}</p>
                <button
                  onClick={() => navigate(`/product/${product.slug}`)}
                  className="px-4 py-1 text-sm rounded-full bg-blue-100 text-blue-800 font-medium hover:bg-blue-200 transition"
                >
                  View Details
                </button>
              </div>

              {/* Name below image */}
              <div className="p-3 text-center transition-opacity duration-300 bg-yellow-400 group-hover:opacity-0">
                <h5 className="text-md font-medium text-gray-700">{product.name}</h5>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default AllProducts;
