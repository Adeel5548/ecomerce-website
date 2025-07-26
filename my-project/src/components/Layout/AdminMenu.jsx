import React from 'react';
import { NavLink } from 'react-router-dom';
import Logo from "../../assets/Logo.png";
import { useAuth } from "../../context/auth";

const AdminMenu = () => {
  const [auth] = useAuth();

  return (
    <div className="flex h-screen flex-col justify-between border-e border-gray-100 bg-white">
      {/* Logo and Menu */}
      <div className="px-4 py-6">
        <div className="flex justify-center">
          <img src={Logo} alt="Brand Logo" className="h-12" />
        </div>

        <ul className="mt-6 space-y-1">
          <li>
            <NavLink
              to="/dashboard/admin"
              className="block rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700"
            >
              Dashboard Home
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/dashboard/admin/category"
              className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
            >
              Create Category
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/dashboard/admin/product"
              className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
            >
              Create Product
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/dashboard/admin/products"
              className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
            >
              Manage Product
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/dashboard/admin/user"
              className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
            >
              Create User
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/dashboard/admin/orders"
              className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
            >
              All Orders
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Footer with User Info */}
      <div className="sticky inset-x-0 bottom-0 border-t border-gray-100">
        <div className="flex items-center gap-2 bg-white p-4">
          <img
            alt="User"
            src="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-1.2.1&auto=format&fit=crop&w=1770&q=80"
            className="size-10 rounded-full object-cover"
          />

          <div>
            <p className="text-xs">
              <strong className="block font-medium">{auth?.user?.name || "Admin User"}</strong>
              <span> {auth?.user?.email || "admin@example.com"} </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminMenu;
