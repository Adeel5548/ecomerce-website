import React, { useState } from "react";
import Layout from "../../components/Layout";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { useAuth } from "../../context/auth";
import LoginPage from "../../assets/loginPage.jpg";
import Logo from "../../assets/Logo.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  const HandleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/v1/auth/login", {
        email,
        password,
      });

      if (res.data.success) {
        toast.success(res.data.message);

        // Save user & token in context and localStorage
        setAuth({
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));

        // ✅ Always go to Home page after login
        navigate("/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title={"User Login"}>
      <div
        className="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg lg:max-w-4xl mt-7"
        style={{ backgroundColor: "#97B067" }}
      >
        <div
          className="hidden bg-cover lg:block lg:w-1/2"
          style={{ backgroundImage: `url(${LoginPage})` }}
        ></div>

        <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
          <div className="flex justify-center mx-auto">
            <img className="w-auto h-7 sm:h-8" src={Logo} alt="Logo" />
          </div>

          <p className="mt-3 text-2xl text-center text-gray-600 dark:text-gray-200">
            Welcome back!
          </p>

          <form onSubmit={HandleSubmit}>
            <div className="mt-4">
              <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300"
              />
            </div>

            <div className="mt-4">
              <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="********"
                className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300"
              />
            </div>

            <div className="mt-6">
              <button
                type="submit"
                className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize bg-gray-800 rounded-lg hover:bg-gray-700"
              >
                Sign In
              </button>
            </div>
          </form>

          <div className="flex items-center justify-between mt-4">
            <NavLink
              to="/register"
              className="text-xs text-white uppercase hover:underline"
            >
              or sign up
            </NavLink>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
