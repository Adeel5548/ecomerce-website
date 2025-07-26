import React from "react";
import Layout from "../../components/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { useAuth } from "../../context/auth";

const AdminDashboard = () => {
  const [auth] = useAuth();

  return (
    <Layout>
      <div className="grid grid-cols-1 md:grid-cols-4">
        {/* Left Side: Admin Menu */}
        <div className="col-span-1">
          <AdminMenu />
        </div>

        {/* Right Side: Dashboard Content */}
        <div className="col-span-3 p-8 w-full bg-gradient-to-tr from-sky-100 via-sky-200 to-sky-100 min-h-screen">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 animate-fade-in-down">
              Welcome, {auth?.user?.name || "Admin"}!
            </h1>
            <p className="mt-2 text-lg text-gray-600">
              Manage your platform efficiently and effortlessly.
            </p>
          </div>

          {/* Dashboard Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="rounded-2xl bg-white p-6 shadow-xl hover:scale-105 transition">
              <h2 className="text-xl font-semibold text-gray-800">Products</h2>
              <p className="mt-2 text-gray-600">
                Create, update, and manage all products.
              </p>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-xl hover:scale-105 transition">
              <h2 className="text-xl font-semibold text-gray-800">Categories</h2>
              <p className="mt-2 text-gray-600">
                Organize your store with categories.
              </p>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-xl hover:scale-105 transition">
              <h2 className="text-xl font-semibold text-gray-800">Users</h2>
              <p className="mt-2 text-gray-600">
                Manage user accounts and permissions.
              </p>
            </div>
          </div>

          {/* Bottom Banner */}
          <div className="mt-12 p-6 bg-sky-300 rounded-xl text-center text-white shadow-xl">
            <h3 className="text-2xl font-bold">
              Have a productive day, {auth?.user?.name || "Admin"}! 🌟
            </h3>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
