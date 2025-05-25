import React, { useContext } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import SearchPage from "../pages/SearchPage";
import ProductPage from "../pages/ProductPage";
import CartPage from "../pages/CartPage";
import Navbar from "../components/Navbar";
import Menubar from "../components/Menubar";
import Footer from "../components/Footer";
import Mainpage from "../pages/Mainpage";
import Login from "../pages/login";
import Register from "../pages/register";
import AuthContext from "../context/AuthContext";
import AdminPanel from "../pages/AdminPanel";
import AddProduct from "../pages/AddProduct";
import EditProduct from "../pages/EditProduct";
import BottomSection from "../components/BottomSection";
import CheckoutPage from "../pages/CheckoutPage";
import AdminOrdersPage from "../pages/AdminOrdersPage";
import AdminOrderDetails from "../pages/AdminOrderDetails";
import FavoritesPage from "../pages/FavoritesPage";
import MyOrdersPage from "../pages/MyOrdersPage";
import UserOrderDetails from "../pages/UserOrderDetails";
import UserSettings from "../pages/UserSettings";
import ContactUs from "../pages/ContactUs";

const ProtectedRoute = ({ element, adminOnly }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading)
    return (
      <div
        className={`text-xl ${
          !adminOnly ? "h-[90vh] h-dvh-90" : "h-[90vh] h-dvh-90"
        } flex justify-center bg-[#F7FAFC] items-center`}
      >
        <div className="-translate-y-17">Verifying User...</div>
      </div>
    );

  if (!user) return <Navigate to="/login" />;

  if (adminOnly && !user.isAdmin) return <Navigate to="/" />;

  return element;
};

const AppRoutes = () => {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith("/admin");

  return (
    <>
      <Navbar />
      <Menubar />
      <Routes>
        <Route path="/" element={<Mainpage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route
          path="/favorites"
          element={<ProtectedRoute element={<FavoritesPage />} />}
        />
        <Route
          path="/cart"
          element={<ProtectedRoute element={<CartPage />} />}
        />
        <Route
          path="/checkout"
          element={<ProtectedRoute element={<CheckoutPage />} />}
        />
        <Route
          path="/orders"
          element={<ProtectedRoute element={<MyOrdersPage />} />}
        />
        <Route
          path="/orders/:id"
          element={<ProtectedRoute element={<UserOrderDetails />} />}
        />
        <Route
          path="/settings"
          element={<ProtectedRoute element={<UserSettings />} />}
        />

        <Route path="/contact" element={<ContactUs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* Admin Routes */}
        <Route
          path="/admin"
          element={<ProtectedRoute element={<AdminPanel />} adminOnly />}
        />
        <Route
          path="/admin/orders"
          element={<ProtectedRoute element={<AdminOrdersPage />} adminOnly />}
        />
        <Route
          path="/admin/orders/:id"
          element={<ProtectedRoute element={<AdminOrderDetails />} adminOnly />}
        />
        <Route
          path="/admin/add-product"
          element={<ProtectedRoute element={<AddProduct />} adminOnly />}
        />
        <Route
          path="/admin/edit-product/:id"
          element={<ProtectedRoute element={<EditProduct />} adminOnly />}
        />
      </Routes>
      {!isAdminPage ? <Footer /> : <BottomSection />}{" "}
      {/* Hide Footer in Admin Pages */}
    </>
  );
};

export default AppRoutes;
