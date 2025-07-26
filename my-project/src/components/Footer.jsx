import React, { useState } from "react";
import Logo from "../assets/Logo.png";
import axios from "axios";
import { toast } from "react-toastify";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email.trim()) return toast.error("Please enter an email.");
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!valid) return toast.error("Invalid email address.");

    try {
      setSubmitting(true);
      const { data } = await axios.post(
        "http://localhost:5000/api/v1/newsletter/subscribe",
        { email }
      );
      if (data?.success) {
        toast.success("Subscribed successfully!");
        setEmail("");
      } else {
        toast.error(data?.message || "Subscription failed.");
      }
    } catch (err) {
      console.error("Newsletter error:", err);
      toast.error("Server error. Try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const year = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-teal-500 via-green-400 to-green-600 text-white ">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* ✅ Top Row: Logo & Tagline */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-10">
          <div className="flex items-center gap-3 justify-center md:justify-start">
            <img src={Logo} alt="Logo" className="h-12 w-auto" />
            <h2 className="text-2xl font-bold tracking-wide">MyShop</h2>
          </div>
          <p className="mt-4 md:mt-0 text-center md:text-left max-w-lg text-gray-100">
            Your one-stop destination for top-quality products, fast delivery,
            and unbeatable prices. Shop smart, shop with MyShop!
          </p>
        </div>

        {/* ✅ Footer Links Grid */}
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 border-t border-white/20 pt-10">
          {/* About */}
          <div>
            <h3 className="font-semibold text-lg mb-4">About Us</h3>
            <ul className="space-y-3 text-sm">
              <li><a href="/about" className="hover:text-yellow-200 transition">Our Story</a></li>
              <li><a href="/team" className="hover:text-yellow-200 transition">Meet the Team</a></li>
              <li><a href="/careers" className="hover:text-yellow-200 transition">Careers</a></li>
            </ul>
          </div>

          {/* Shop */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Shop</h3>
            <ul className="space-y-3 text-sm">
              <li><a href="/categories" className="hover:text-yellow-200 transition">All Categories</a></li>
              <li><a href="/products" className="hover:text-yellow-200 transition">New Arrivals</a></li>
              <li><a href="/offers" className="hover:text-yellow-200 transition">Special Offers</a></li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Help & Support</h3>
            <ul className="space-y-3 text-sm">
              <li><a href="/contactus" className="hover:text-yellow-200 transition">Contact Us</a></li>
              <li><a href="/faq" className="hover:text-yellow-200 transition">FAQs</a></li>
              <li><a href="/returns" className="hover:text-yellow-200 transition">Return Policy</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Legal</h3>
            <ul className="space-y-3 text-sm">
              <li><a href="/policy" className="hover:text-yellow-200 transition">Privacy Policy</a></li>
              <li><a href="/terms" className="hover:text-yellow-200 transition">Terms & Conditions</a></li>
              <li><a href="/shipping" className="hover:text-yellow-200 transition">Shipping Info</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="col-span-2">
            <h3 className="font-semibold text-lg mb-4">Stay Updated</h3>
            <p className="text-sm mb-4 text-gray-100">
              Subscribe to get exclusive deals & latest product updates.
            </p>
            <form onSubmit={handleSubscribe} className="flex gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-full px-4 py-2 text-gray-800 placeholder-gray-400 focus:outline-none  border-2"
                disabled={submitting}
              />
              <button
                type="submit"
                disabled={submitting}
                className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-6 py-3 rounded-full shadow-lg transition"
              >
                {submitting ? "..." : "Subscribe"}
              </button>
            </form>
          </div>
        </div>

        {/* ✅ Bottom Bar */}
        <div className="mt-10 border-t border-white/20 pt-6 flex flex-col md:flex-row items-center justify-between">
          <p className="text-sm text-gray-100">
            © {year} MyShop. All rights reserved.
          </p>
          {/* ✅ Social Links */}
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-yellow-200 transition">
              <i className="fab fa-facebook-f text-lg"></i>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-yellow-200 transition">
              <i className="fab fa-instagram text-lg"></i>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-yellow-200 transition">
              <i className="fab fa-twitter text-lg"></i>
            </a>
            <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-yellow-200 transition">
              <i className="fab fa-github text-lg"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
