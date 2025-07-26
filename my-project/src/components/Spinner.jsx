import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Spinner = () => {
  const [count, setCount] = useState(5);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => prev - 1);
    }, 1500);

    if (count === 0) {
      navigate("/login", {
        state: location.pathname,
      });
    }

    return () => clearInterval(interval);
  }, [count, navigate, location]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600">
      <div className="text-center space-y-6">
        <h1 className="text-white text-3xl md:text-4xl font-bold animate-pulse">
          Redirecting you to Login Page in
        </h1>
        <div className="text-6xl font-extrabold text-yellow-400 animate-bounce">
          {count}s
        </div>

        <div className="flex justify-center mt-8">
          <div
            className="w-16 h-16 border-8 border-dashed rounded-full animate-spin border-t-transparent border-white"
            style={{
              animation: "spin 1s linear infinite, colorChange 4s linear infinite",
            }}
          ></div>
        </div>

        <p className="text-gray-200 mt-6">Please wait while we redirect you...</p>
      </div>
    </div>
  );
};

export default Spinner;
