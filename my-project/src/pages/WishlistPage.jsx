import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";
import { useAuth } from "../context/auth";

const WishlistPage = () => {
  const [auth] = useAuth();
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  const getWishlist = async () => {
    try {
      if (!auth?.token) return;
      const { data } = await axios.get(
        "http://localhost:5000/api/v1/wishlist/items",
        {
          headers: { Authorization: `Bearer ${auth.token}` },
        }
      );
      setWishlist(data?.wishlist || []);
    } catch (err) {
      console.error("Error loading wishlist", err);
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (wishlistItemId) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/v1/wishlist/remove/${wishlistItemId}`,
        {
          headers: { Authorization: `Bearer ${auth.token}` },
        }
      );
      setWishlist(wishlist.filter((item) => item._id !== wishlistItemId));
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  useEffect(() => {
    getWishlist();
  }, [auth]);

  return (
    <Layout title="Your Wishlist">
      <div className="max-w-5xl mx-auto py-10">
        <h2 className="text-2xl font-bold mb-6">💖 Your Wishlist</h2>

        {loading ? (
          <p>Loading...</p>
        ) : wishlist.length === 0 ? (
          <p>No items in wishlist.</p>
        ) : (
          wishlist.map((item) => (
            <div
              key={item._id}
              className="flex items-center justify-between border-b py-4"
            >
              <div className="flex items-center gap-4">
                <img
                  src={`http://localhost:5000/api/v1/product/product-photo/${item.product._id}`}
                  alt={item.product.name}
                  className="w-20 h-20 object-cover rounded"
                />
                <div>
                  <h3 className="text-lg font-semibold">{item.product.name}</h3>
                  <p className="text-indigo-600">PKR {item.product.price}</p>
                </div>
              </div>
              <button
                onClick={() => handleRemove(item._id)}
                className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          ))
        )}
      </div>
    </Layout>
  );
};

export default WishlistPage;
