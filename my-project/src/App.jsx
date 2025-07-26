import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Policy from "./pages/Policy";
import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";
import Private from "./components/Routes/Private";
import AdminRoutes from "./components/Routes/AdminRoutes";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import UserDashboard from "./pages/user/UserDashbord";
import CreateProduct from "./pages/Admin/CreateProduct";
import CreateCategory from "./pages/Admin/CreateCategory";
import ManageProducts from "./pages/Admin/ManageProducts";
import User from "./pages/Admin/User";
import Profile from "./pages/user/Profile";
import Order from "./pages/user/Order";
import ProductDetail from "./pages/ProductDetail";
import AllProducts from "./pages/AllProducts";
import CategoryProduct from "./pages/CategoryProduct";
import AllCategories from "./pages/AllCategories";


// ✅ Newly added pages
import CartPage from "./pages/CartPage";
import WishlistPage from "./pages/WishlistPage";

// ✅ Import your new components
import MyOrders from "./pages/user/MyOrders";
import AdminOrders from "./pages/Admin/AdminOrders";

function App() {
  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/product/:slug" element={<ProductDetail />} />
        <Route path="/contactus" element={<Contact />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/products" element={<AllProducts />} />
        <Route path="/category/:slug" element={<CategoryProduct />} />
        <Route path="/categories" element={<AllCategories />} />



        {/*  Cart & Wishlist Routes */}
        <Route path="/cart" element={<CartPage />} />
        <Route path="/wishlist" element={<WishlistPage />} />

        {/* Private Routes for Users */}
        <Route path="/dashboard/user" element={<Private />}>
          <Route element={<UserDashboard />}>
            <Route index element={<Profile />} />
            <Route path="profile" element={<Profile />} />
            <Route path="order" element={<Order />} />
            {/*  Added MyOrders route */}
            <Route path="my-orders" element={<MyOrders />} />
          </Route>
        </Route>

        {/* Private Routes for Admin */}
        <Route path="/dashboard/admin" element={<AdminRoutes />}>
          <Route index element={<AdminDashboard />} />
          <Route path="/dashboard/admin/product" element={<CreateProduct />} />
          <Route path="/dashboard/admin/products" element={<ManageProducts />} />
          <Route path="/dashboard/admin/category" element={<CreateCategory />} />
          <Route path="/dashboard/admin/user" element={<User />} />

          {/* Added AdminOrders route */}
          <Route path="/dashboard/admin/orders" element={<AdminOrders />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
