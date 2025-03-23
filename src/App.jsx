import { useState } from "react";
import Navbar from "./components/Navbar";
import Menubar from "./components/Menubar";
import { BrowserRouter } from "react-router-dom";
import Mainpage from "./pages/Mainpage";
import Footer from "./components/Footer";
import NewsletterSection from "./components/NewsletterSection";
import SearchPage from "./pages/SearchPage";
import ProductPage from "./pages/ProductPage";
import CheckoutPage from "./pages/CheckoutPage";
import AppRoutes from "./routes/AppRoutes";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <>
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
    </>
  );
}

export default App;
