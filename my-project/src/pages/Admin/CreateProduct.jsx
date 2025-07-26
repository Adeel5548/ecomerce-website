import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { toast } from "react-toastify";
import axios from "axios";

const CreateProduct = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState(null);
  const [categories, setCategories] = useState([]);

  // Fetch categories
  const getAllCategories = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/v1/category/allCategory"
      );
      if (data?.category) setCategories(data.category);
    } catch (error) {
      toast.error("Failed to load categories");
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  // Submit handler
  const handleCreate = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("quantity", quantity);
      formData.append("shipping", shipping);
      formData.append("photo", photo);

      const { data } = await axios.post(
        "http://localhost:5000/api/v1/product/create-product",
        formData
      );

      if (data?.success) {
        toast.success("Product created successfully");
        setName("");
        setDescription("");
        setPrice("");
        setQuantity("");
        setShipping("");
        setCategory("");
        setPhoto(null);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout>
      <div className="grid grid-cols-4 gap-4 px-4 py-6">
        <div>
          <AdminMenu />
        </div>
        <div className="col-span-3">
          <h1 className="text-2xl font-bold mb-6">Create New Product</h1>

          <form onSubmit={handleCreate} className="space-y-6 bg-white p-6 rounded-lg shadow-md">
            {/* Image Upload */}
            <div>
              <label className="block font-semibold mb-1">Upload Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setPhoto(e.target.files[0])}
                className="w-full border p-2 rounded"
                required
              />
              {photo && (
                <img
                  src={URL.createObjectURL(photo)}
                  alt="Product Preview"
                  className="mt-4 h-40 object-cover rounded border"
                />
              )}
            </div>

            {/* Product Name */}
            <div>
              <label className="block font-semibold mb-1">Product Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter product name"
                className="w-full border p-2 rounded"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block font-semibold mb-1">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter product description"
                className="w-full border p-2 rounded"
                required
              />
            </div>

            {/* Price */}
            <div>
              <label className="block font-semibold mb-1">Price</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Enter price"
                className="w-full border p-2 rounded"
                required
              />
            </div>

            {/* Category */}
            <div>
              <label className="block font-semibold mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full border p-2 rounded"
                required
              >
                <option value="">Select category</option>
                {categories.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Quantity */}
            <div>
              <label className="block font-semibold mb-1">Quantity</label>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="w-full border p-2 rounded"
                required
              />
            </div>

            {/* Shipping */}
            <div>
              <label className="block font-semibold mb-1">Shipping</label>
              <select
                value={shipping}
                onChange={(e) => setShipping(e.target.value)}
                className="w-full border p-2 rounded"
                required
              >
                <option value="">Select</option>
                <option value="1">Yes</option>
                <option value="0">No</option>
              </select>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded transition"
              >
                Create Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;
