import React, { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
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

const ProtectedRoute = ({ element }) => {
  const { user, loading } = useContext(AuthContext);
  // console.log(user);

  if (loading)
    return (
      <div className="text-xl h-[65vh] flex justify-center items-center">
        Verifying User...
      </div>
    );

  return user ? element : <Navigate to="/" />;
};

const AppRoutes = () => {
  return (
    <>
      <Navbar />
      <Menubar />
      <Routes>
        <Route path="/" element={<Mainpage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        {/* <Route path="/cart" element={<CartPage />} /> */}
        <Route
          path="/cart"
          element={<ProtectedRoute element={<CartPage />} />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <Footer />
    </>
  );
};

export default AppRoutes;
