import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ReactTyped } from "react-typed";

const AllCategories = () => {
  const [categories, setCategories] = useState([]);

  // Fetch all categories
  const getCategories = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/v1/category/allCategory");
      if (data?.success) {
        setCategories(data.category);
      }
    } catch (err) {
      console.error("Error fetching categories", err);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  const typedStrings = useMemo(() => {
    if (!categories?.length) {
      return ["Search for products", "Search for categories", "Search for brands"];
    }
    const names = categories.map((c) => c.name);
    return names.length > 6 ? [...names.slice(0, 5), "More..."] : names;
  }, [categories]);

  return (
    
    <div className="min-h-screen bg-purple-100 px-4 sm:px-10 py-10">
      {/* Animated heading */}
      <h2 className="text-4xl p-2 font-extrabold text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 animate-pulse">
        <ReactTyped
          strings={["Browse Categories", "Shop by Category", "Find What You Love ❤️"]}
          typeSpeed={50}
          backSpeed={30}
          backDelay={2000}
          smartBackspace
          loop
        />
      </h2>

      <p className="text-center text-gray-600 mb-10 text-lg">
        Explore amazing <span className="font-semibold text-purple-600">categories</span> just for you!
      </p>

      {/* Search bar with typed placeholder */}
      <div className="max-w-md mx-auto mb-10">
        <ReactTyped
          strings={typedStrings}
          typeSpeed={40}
          backSpeed={30}
          backDelay={1500}
          loop
          attr="placeholder"
        >
          <input
            type="text"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-4 focus:ring-indigo-300 shadow-sm"
          />
        </ReactTyped>
      </div>

      {/* Category Cards */}
      {categories.length === 0 ? (
        <p className="text-center text-gray-500">No categories found.</p>
      ) : (
        <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {categories.map((cat) => (
            <Link
              key={cat._id}
              to={`/category/${cat.slug}`}
              className="relative rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group"
            >
              {/* Image */}
              <img
                src={cat.image || "https://via.placeholder.com/300x200?text=No+Image"}
                alt={cat.name}
                className="w-full h-44 object-cover transform group-hover:scale-110 transition duration-500"
                loading="lazy"
              />

              {/* Overlay with centered text */}
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <h3 className="text-white text-xl font-bold px-2 text-center drop-shadow-md">
                  {cat.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllCategories;
