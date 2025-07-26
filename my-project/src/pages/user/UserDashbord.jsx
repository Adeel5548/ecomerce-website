import React from "react";
import { Outlet } from "react-router-dom";
import UserMenu from "../../components/Layout/UserMenu";

const UserDashboard = () => {
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-4">
      {/* Sidebar */}
      <div className="col-span-1 md:block hidden">
        <UserMenu />
      </div>

      {/* Page Content */}
      <div className="col-span-3 p-6 bg-white">
        <Outlet />
      </div>
    </div>
  );
};

export default UserDashboard;
