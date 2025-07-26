import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import axios from "axios";
import { toast } from "react-toastify";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editedProduct, setEditedProduct] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    quantity: "",
    photo: null,
  });

  // Fetch products
  const fetchProducts = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/v1/product/get-products");
      setProducts(data.products || []);
    } catch (error) {
      toast.error("Failed to fetch products");
    }
  };

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/v1/category/allCategory");
      setCategories(data.category || []);
    } catch (error) {
      toast.error("Failed to fetch categories");
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  // Delete product
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/v1/product/delete-product/${id}`);
      toast.success("Product deleted");
      fetchProducts();
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  // Update product
  const handleUpdate = async (id) => {
    try {
      const formData = new FormData();
      formData.append("name", editedProduct.name);
      formData.append("price", editedProduct.price);
      formData.append("description", editedProduct.description);
      formData.append("category", editedProduct.category);
      formData.append("quantity", editedProduct.quantity);
      if (editedProduct.photo) {
        formData.append("photo", editedProduct.photo);
      }

      await axios.put(`http://localhost:5000/api/v1/product/update-product/${id}`, formData);
      toast.success("Product updated successfully");
      setEditingId(null);
      fetchProducts();
    } catch (error) {
      console.error("❌ Update error:", error);
      toast.error("Update failed. Make sure all fields are filled.");
    }
  };

  // Start editing product
  const startEditing = (p) => {
    setEditingId(p._id);
    setEditedProduct({
      name: p.name,
      price: p.price,
      description: p.description || "",
      category: p.category?._id || "",
      quantity: p.quantity || "",
      photo: null,
    });
  };

  return (
    <Layout>
      <div className="grid grid-cols-4 gap-4 p-6">
        <div>
          <AdminMenu />
        </div>
        <div className="col-span-3">
          <h1 className="text-2xl font-bold mb-4">Manage Products</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((p) => (
              <div key={p._id} className="p-4 border rounded shadow bg-white relative">
                <img
                  src={`http://localhost:5000/api/v1/product/product-photo/${p._id}`}
                  alt={p.name}
                  className="h-40 w-full object-cover rounded mb-3"
                />
                {editingId === p._id ? (
                  <>
                    <input
                      type="text"
                      value={editedProduct.name}
                      onChange={(e) =>
                        setEditedProduct({ ...editedProduct, name: e.target.value })
                      }
                      placeholder="Name"
                      className="w-full px-3 py-1 border mb-2 rounded"
                    />
                    <input
                      type="number"
                      value={editedProduct.price}
                      onChange={(e) =>
                        setEditedProduct({ ...editedProduct, price: e.target.value })
                      }
                      placeholder="Price"
                      className="w-full px-3 py-1 border mb-2 rounded"
                    />
                    <input
                      type="text"
                      value={editedProduct.description}
                      onChange={(e) =>
                        setEditedProduct({ ...editedProduct, description: e.target.value })
                      }
                      placeholder="Description"
                      className="w-full px-3 py-1 border mb-2 rounded"
                    />
                    <select
                      value={editedProduct.category}
                      onChange={(e) =>
                        setEditedProduct({ ...editedProduct, category: e.target.value })
                      }
                      className="w-full px-3 py-1 border mb-2 rounded"
                    >
                      <option value="">Select Category</option>
                      {categories.map((c) => (
                        <option key={c._id} value={c._id}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                    <input
                      type="number"
                      value={editedProduct.quantity}
                      onChange={(e) =>
                        setEditedProduct({ ...editedProduct, quantity: e.target.value })
                      }
                      placeholder="Quantity"
                      className="w-full px-3 py-1 border mb-2 rounded"
                    />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        setEditedProduct({ ...editedProduct, photo: e.target.files[0] })
                      }
                      className="mb-2"
                    />
                    <div className="flex justify-center gap-2">
                      <button
                        className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                        onClick={() => handleUpdate(p._id)}
                      >
                        Save
                      </button>
                      <button
                        className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500"
                        onClick={() => setEditingId(null)}
                      >
                        Cancel
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <h2 className="text-lg font-semibold">{p.name}</h2>
                    <p className="text-sm text-gray-600">Price: ${p.price}</p>
                    <div className="mt-2 flex justify-center gap-2">
                      <button
                        className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                        onClick={() => startEditing(p)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                        onClick={() => handleDelete(p._id)}
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
    </Layout>
  );
};

export default ManageProducts;
