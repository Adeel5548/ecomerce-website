import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import { ClipLoader } from "react-spinners";

const CategoryProduct = () => {
  const [products, setProducts] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [loading, setLoading] = useState(true);
  const { slug } = useParams();

  const getCategoryProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `http://localhost:5000/api/v1/product/category-products/${slug}`
      );
      if (data?.success) {
        setProducts(data.products);
        setCategoryName(data.category.name);
      }
    } catch (error) {
      console.error("❌ Failed to load category products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCategoryProducts();
  }, [slug]);

  return (
    <Layout title={`Category - ${categoryName}`}>
      <div className="bg-gray-50 min-h-screen py-10 px-4 sm:px-10">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Products in "{categoryName}" Category
        </h2>

        {/* Loader */}
        {loading ? (
          <div className="flex justify-center items-center min-h-[300px]">
            <ClipLoader
              color="#0ea5e9"
              loading={loading}
              size={80}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
        ) : products.length === 0 ? (
          <p className="text-center text-gray-500">No products found in this category.</p>
        ) : (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {products.map((product) => (
              <div
                key={product._id}
                className="rounded-lg shadow hover:shadow-md bg-white overflow-hidden transition-transform hover:scale-105"
              >
                <img
                  src={`http://localhost:5000/api/v1/product/product-photo/${product._id}`}
                  alt={product.name}
                  onError={(e) =>
                    (e.target.src =
                      "https://via.placeholder.com/300x200.png?text=No+Image")
                  }
                  className="w-full h-48 object-cover"
                />
                <div className="p-4 text-center">
                  <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
                  <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                    {product.description}
                  </p>
                  <p className="text-blue-600 font-semibold mb-2">
                    PKR {product.price}
                  </p>
                  <button
                    onClick={() =>
                      (window.location.href = `/product/${product.slug}`)
                    }
                    className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 transition"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CategoryProduct;
