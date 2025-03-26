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

const ProtectedRoute = ({ element, adminOnly }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading)
    return (
      <div className="text-xl h-[65vh] flex justify-center items-center">
        Verifying User...
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
          path="/cart"
          element={<ProtectedRoute element={<CartPage />} />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/admin"
          element={<ProtectedRoute element={<AdminPanel />} adminOnly />}
        />
        <Route
          path="/admin/add-product"
          element={<ProtectedRoute element={<AddProduct />} adminOnly />}
        />
        <Route
          path="/admin/edit-product/:id"
          element={<ProtectedRoute element={<EditProduct />} />}
        />
      </Routes>
      {!isAdminPage ? <Footer /> : <BottomSection />} {/* Hide Footer in Admin Pages */}
    </>
  );
};

export default AppRoutes;
