import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/auth";
import Logo from "../../assets/Logo.png";
import {
  Home,
  ShoppingCart,
  UserCircle,
  LogOut,
  ListOrdered,
} from "lucide-react";

const UserMenu = () => {
  const [auth] = useAuth();

  return (
    <div className="h-full flex flex-col justify-between bg-gradient-to-b from-blue-50 to-blue-100 border-r border-blue-200 shadow-md">
      {/* Logo */}
      <div className="px-6 py-6">
        <div className="flex justify-center mb-6">
          <img src={Logo} alt="Logo" className="h-12" />
        </div>

        <nav className="space-y-4">
          <NavLink
            to="/dashboard/user"
            end
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 
              ${isActive ? "bg-blue-500 text-white" : "text-blue-800 hover:bg-blue-200"}`
            }
          >
            <Home className="w-5 h-5" />
            Dashboard
          </NavLink>


          <NavLink
            to="/dashboard/user/my-orders"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 
              ${isActive ? "bg-blue-500 text-white" : "text-blue-800 hover:bg-blue-200"}`
            }
          >
            <ListOrdered className="w-5 h-5" />
            My Orders
          </NavLink>
                    <NavLink
            to="/"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 
              ${isActive ? "bg-blue-500 text-white" : "text-blue-800 hover:bg-blue-200"}`
            }
          >
            <ShoppingCart className="w-5 h-5" />
            Home
          </NavLink>

          <NavLink
            to="/dashboard/user/profile"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 
              ${isActive ? "bg-blue-500 text-white" : "text-blue-800 hover:bg-blue-200"}`
            }
          >
            <UserCircle className="w-5 h-5" />
            Profile
          </NavLink>

        </nav>
      </div>

      {/* Footer */}
      <div className="p-4 bg-blue-200 flex items-center gap-3">
        <img
          src="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?auto=format&fit=crop&w=1770&q=80"
          alt="User"
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="flex-1">
          <p className="text-sm font-semibold">{auth?.user?.name || "User"}</p>
          <p className="text-xs text-blue-700">{auth?.user?.email || "user@example.com"}</p>
        </div>
        <LogOut className="w-5 h-5 text-blue-700 cursor-pointer hover:text-red-600" />
      </div>
    </div>
  );
};

export default UserMenu;
