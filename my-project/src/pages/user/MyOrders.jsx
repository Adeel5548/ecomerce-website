import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../../components/Layout";
import { useAuth } from "../../context/auth";

const MyOrders = () => {
  const [auth] = useAuth();
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/v1/order/user", {
        headers: { Authorization: `Bearer ${auth.token}` },
      });
      setOrders(data.orders);
    } catch (error) {
      console.error("Error fetching orders", error);
    }
  };

  useEffect(() => {
    if (auth?.token) fetchOrders();
  }, [auth]);

  return (
    <Layout title="My Orders">
      <div className="max-w-4xl mx-auto py-10">
        <h2 className="text-2xl font-bold mb-6">🧾 My Orders</h2>
        {orders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          orders.map((order, idx) => (
            <div key={idx} className="border p-4 mb-4 rounded shadow">
              <p className="font-semibold">Status: {order.status}</p>
              <ul className="mt-2 list-disc pl-6">
                {order.products.map((p, i) => (
                  <li key={i}>
                    {p.product.name} - Qty: {p.quantity} - PKR {p.product.price}
                  </li>
                ))}
              </ul>
              <p className="text-xs text-gray-500 mt-1">
                Date: {new Date(order.createdAt).toLocaleString()}
              </p>
            </div>
          ))
        )}
      </div>
    </Layout>
  );
};

export default MyOrders;
