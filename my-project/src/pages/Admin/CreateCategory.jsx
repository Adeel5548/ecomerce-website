import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../../components/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { toast } from "react-toastify";

const CreateCategory = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [categories, setCategories] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [updatedName, setUpdatedName] = useState("");
  const [updatedImage, setUpdatedImage] = useState("");

  // Fetch all categories
  const getAllCategories = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/v1/category/allCategory"
      );
      setCategories(data?.category || []);
    } catch (error) {
      console.log(error);
      toast.error("Error fetching categories");
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/v1/category/createCategory",
        { name, image }
      );
      if (res.data?.success) {
        toast.success("Category Created");
        setName("");
        setImage("");
        getAllCategories();
      } else {
        toast.error(res.data?.message || "Error");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  // Handle delete
  const handleDelete = async (id) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/v1/category/delteCategory/${id}`
      );
      if (res.data?.success) {
        toast.success("Category Deleted");
        getAllCategories();
      } else {
        toast.error("Error deleting category");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  // Handle update
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `http://localhost:5000/api/v1/category/updateCategory/${editingId}`,
        { name: updatedName, image: updatedImage }
      );
      if (res.data?.success) {
        toast.success("Category Updated");
        setEditingId(null);
        setUpdatedName("");
        setUpdatedImage("");
        getAllCategories();
      } else {
        toast.error("Update failed");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout>
      <div className="grid grid-cols-4 gap-4 px-4 py-6">
        {/* Sidebar */}
        <div>
          <AdminMenu />
        </div>

        {/* Main Content */}
        <div className="col-span-3">
          <h1 className="text-xl font-bold mb-4">Create Category</h1>

          {/* Create Form */}
          <form onSubmit={handleSubmit} className="space-y-3 mb-6">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter category name"
              className="border border-gray-300 rounded px-3 py-2 w-full"
              required
            />
            <input
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="Enter image URL"
              className="border border-gray-300 rounded px-3 py-2 w-full"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Create
            </button>
          </form>

          {/* Scrollable Cards */}
          <div className="max-h-[500px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-blue-100">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {categories.map((cat) => (
                <div
                  key={cat._id}
                  className="p-4 border rounded shadow hover:shadow-lg transition relative flex flex-col items-center text-center bg-white"
                >
                  <img
                    src={
                      cat.image || "https://via.placeholder.com/300x200?text=No+Image"
                    }
                    alt="category"
                    className="w-full h-[180px] object-cover rounded mb-3"
                  />
                  {editingId === cat._id ? (
                    <form onSubmit={handleUpdate} className="w-full space-y-2">
                      <input
                        type="text"
                        value={updatedName}
                        onChange={(e) => setUpdatedName(e.target.value)}
                        className="w-full border px-2 py-1 rounded"
                      />
                      <input
                        type="text"
                        value={updatedImage}
                        onChange={(e) => setUpdatedImage(e.target.value)}
                        placeholder="Enter image URL"
                        className="w-full border px-2 py-1 rounded"
                      />
                      <div className="flex justify-center gap-2">
                        <button
                          type="submit"
                          className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                        >
                          Save
                        </button>
                        <button
                          type="button"
                          onClick={() => setEditingId(null)}
                          className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  ) : (
                    <>
                      <div className="font-semibold text-lg">{cat.name}</div>
                      <div className="text-sm text-gray-500 mt-1">
                        Slug: {cat.slug}
                      </div>
                      <div className="mt-3 flex justify-center gap-2">
                        <button
                          onClick={() => {
                            setEditingId(cat._id);
                            setUpdatedName(cat.name);
                            setUpdatedImage(cat.image || "");
                          }}
                          className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(cat._id)}
                          className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                        >
                          Delete
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
