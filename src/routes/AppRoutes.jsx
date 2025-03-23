import React, { useContext } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import SearchPage from "../pages/SearchPage";
import ProductPage from "../pages/ProductPage";
import CheckoutPage from "../pages/CheckoutPage";
import Navbar from "../components/Navbar";
import Menubar from "../components/Menubar";
import Footer from "../components/Footer";
import Mainpage from "../pages/Mainpage";
import Login from "../pages/login";
import Register from "../pages/register";
import AuthContext from "../context/AuthContext";


const ProtectedRoute = ({ element }) => {
  const { user } = useContext(AuthContext);
  // console.log(user);
  return user ? element : <Navigate to="/" />;
};

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Menubar />
      <Routes>
        <Route path="/" element={<Mainpage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        {/* <Route path="/checkout" element={<CheckoutPage />} /> */}
        <Route path="/checkout" element={<ProtectedRoute element={<CheckoutPage />} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default AppRoutes;
