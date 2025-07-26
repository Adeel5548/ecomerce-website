import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";
import { useAuth } from "../context/auth";

const CartPage = () => {
  const [auth] = useAuth();
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true); // ✅ new

  const getCartItems = async () => {
    try {
      if (!auth?.token) return; // ✅ wait for token
      const { data } = await axios.get("http://localhost:5000/api/v1/cart/get", {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      setCart(data?.cart || []);
    } catch (err) {
      console.error("Error loading cart", err);
    } finally {
      setLoading(false); // ✅ after load
    }
  };

  const handleRemove = async (productId) => {
    try {
      await axios.delete(`http://localhost:5000/api/v1/cart/remove/${productId}`, {
        headers: { Authorization: `Bearer ${auth.token}` },
      });
      setCart(cart.filter((item) => item.product._id !== productId));
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  useEffect(() => {
    getCartItems();
  }, [auth]); // ✅ important: wait for auth to be ready

  return (
    <Layout title="Your Cart">
      <div className="max-w-5xl mx-auto py-10">
        <h2 className="text-2xl font-bold mb-6">🛒 Your Cart</h2>

        {loading ? (
          <p>Loading...</p>
        ) : cart.length === 0 ? (
          <p>No items in cart.</p>
        ) : (
          cart.map((item) => (
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
                  <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                  <p className="text-indigo-600">PKR {item.product.price}</p>
                </div>
              </div>
              <button
                onClick={() => handleRemove(item.product._id)}
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

export default CartPage;
