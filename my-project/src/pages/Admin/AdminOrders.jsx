import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../../components/Layout";
import { useAuth } from "../../context/auth";

const AdminOrders = () => {
  const [auth] = useAuth();
  const [orders, setOrders] = useState([]);
  const statuses = ["Processing", "Shipped", "Delivered", "Cancelled"];

  const fetchAllOrders = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/v1/order/admin", {
        headers: { Authorization: `Bearer ${auth.token}` },
      });
      setOrders(data.orders);
    } catch (error) {
      console.error("Admin orders error:", error);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await axios.patch(
        `http://localhost:5000/api/v1/order/update-status/${orderId}`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      fetchAllOrders(); // Refresh orders after update
    } catch (error) {
      console.error("Status update failed:", error);
    }
  };

  useEffect(() => {
    if (auth?.token) fetchAllOrders();
  }, [auth]);

  return (
    <Layout title="All Orders - Admin">
      <div className="max-w-6xl mx-auto py-10">
        <h2 className="text-2xl font-bold mb-6">📦 All Orders</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="py-2 px-4 border-b">#</th>
                <th className="py-2 px-4 border-b">Buyer</th>
                <th className="py-2 px-4 border-b">Email</th>
                <th className="py-2 px-4 border-b">Status</th>
                <th className="py-2 px-4 border-b">Products</th>
                <th className="py-2 px-4 border-b">Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, idx) => (
                <tr key={order._id} className="border-b">
                  <td className="py-2 px-4">{idx + 1}</td>
                  <td className="py-2 px-4">{order.buyer?.name}</td>
                  <td className="py-2 px-4">{order.buyer?.email}</td>
                  <td className="py-2 px-4">
                    <select
                      className="border rounded px-2 py-1"
                      value={order.status}
                      onChange={(e) => handleStatusChange(order._id, e.target.value)}
                    >
                      {statuses.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="py-2 px-4">
                    <ul className="list-disc pl-4 text-sm">
                      {order.products.map((p, i) => (
                        <li key={i}>
                          {p.product.name} - {p.quantity}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="py-2 px-4">
                    {new Date(order.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default AdminOrders;
