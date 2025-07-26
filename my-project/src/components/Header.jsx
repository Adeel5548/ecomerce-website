import React, { useEffect, useState } from "react";
import Logo from "../assets/Logo.png";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/auth";
import axios from "axios";

const Navbar = () => {
  const [auth, setAuth] = useAuth();
  const [categories, setCategories] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // ✅ Fetch categories from backend
  const getAllCategories = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/v1/category/allCategory"
      );
      if (data?.success) {
        setCategories(data.category);
      }
    } catch (error) {
      console.log("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  // ✅ Logout function
  const logOut = () => {
    setAuth({ ...auth, user: null, token: "" });
    localStorage.removeItem("auth");
  };

  return (
    <header className="bg-gradient-to-r from-teal-500 via-green-400 to-green-600 shadow-lg">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* ✅ Logo */}
          <NavLink to="/" className="flex items-center gap-2">
            <img src={Logo} alt="Logo" className="h-10 w-auto" />
            <span className="text-white text-2xl font-bold tracking-wide">
              MyShop
            </span>
          </NavLink>

          {/* ✅ Desktop Menu */}
          <nav className="hidden md:flex items-center gap-6">
            <NavLink
              to="/"
              className="text-white font-medium hover:text-yellow-200 transition duration-300"
            >
              Home
            </NavLink>
            <NavLink
              to="/about"
              className="text-white font-medium hover:text-yellow-200 transition duration-300"
            >
              About
            </NavLink>
            <NavLink
              to="/contactus"
              className="text-white font-medium hover:text-yellow-200 transition duration-300"
            >
              Contact Us
            </NavLink>
            <NavLink
              to="/policy"
              className="text-white font-medium hover:text-yellow-200 transition duration-300"
            >
              Policy
            </NavLink>

            {/* ✅ Dynamic Category Dropdown */}
            <div className="relative group">
              <span className="text-white font-medium cursor-pointer hover:text-yellow-200 transition duration-300">
                Categories ▾
              </span>
              <div className="absolute left-0 hidden group-hover:grid bg-white shadow-lg rounded-lg mt-2 p-3 z-50 grid-cols-2 gap-2 w-72 max-h-64 overflow-y-auto animate-fadeIn">
                {categories.map((cat) => (
                  <NavLink
                    key={cat._id}
                    to={`/category/${cat.slug}`}
                    className="block text-gray-700 text-sm border border-gray-200 hover:border-teal-400 hover:bg-green-50 rounded-md p-2 transition"
                  >
                    {cat.name}
                  </NavLink>
                ))}
              </div>
            </div>

            {/* ✅ Dashboard */}
            {auth.user && (
              <NavLink
                to={`/dashboard/${auth.user.role === 1 ? "admin" : "user"}`}
                className="text-white font-medium hover:text-yellow-200 transition duration-300"
              >
                Dashboard
              </NavLink>
            )}
          </nav>

          {/* ✅ Buttons */}
          <div className="hidden md:flex gap-4">
            {!auth.user ? (
              <>
                <NavLink
                  to="/login"
                  className="bg-yellow-400 text-gray-900 font-semibold px-4 py-2 rounded-lg hover:bg-yellow-500 transition duration-300 shadow-md"
                >
                  Login
                </NavLink>
                <NavLink
                  to="/register"
                  className="bg-white text-teal-700 font-semibold px-4 py-2 rounded-lg hover:bg-gray-100 transition duration-300 shadow-md"
                >
                  Register
                </NavLink>
              </>
            ) : (
              <NavLink
                onClick={logOut}
                to="/login"
                className="bg-red-500 text-white font-semibold px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300 shadow-md"
              >
                Logout
              </NavLink>
            )}
          </div>

          {/* ✅ Mobile Menu Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white focus:outline-none"
          >
            ☰
          </button>
        </div>

        {/* ✅ Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white rounded-lg shadow-lg mt-2 p-4 space-y-4">
            <NavLink
              to="/"
              className="block text-gray-700 hover:text-green-500"
            >
              Home
            </NavLink>
            <NavLink
              to="/about"
              className="block text-gray-700 hover:text-green-500"
            >
              About
            </NavLink>
            <NavLink
              to="/contactus"
              className="block text-gray-700 hover:text-green-500"
            >
              Contact Us
            </NavLink>
            <NavLink
              to="/policy"
              className="block text-gray-700 hover:text-green-500"
            >
              Policy
            </NavLink>
            {/* ✅ Categories in Mobile */}
            <div>
              <p className="font-semibold text-gray-800">Categories:</p>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {categories.map((cat) => (
                  <NavLink
                    key={cat._id}
                    to={`/category/${cat.slug}`}
                    className="block text-sm text-gray-600 hover:text-green-500"
                  >
                    {cat.name}
                  </NavLink>
                ))}
              </div>
            </div>
            {!auth.user ? (
              <>
                <NavLink
                  to="/login"
                  className="block bg-teal-500 text-white text-center py-2 rounded-md"
                >
                  Login
                </NavLink>
                <NavLink
                  to="/register"
                  className="block bg-gray-200 text-center py-2 rounded-md"
                >
                  Register
                </NavLink>
              </>
            ) : (
              <NavLink
                onClick={logOut}
                to="/login"
                className="block bg-red-500 text-white text-center py-2 rounded-md"
              >
                Logout
              </NavLink>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
