import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ProductProvider } from "./context/ProductContext.jsx";
import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "./context/CartContext.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { FavoritesProvider } from "./context/FavoritesContext.jsx";
import ErrorBoundary from "./components/ErrorBoundary.jsx";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY); // from .env file

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <ProductProvider>
        <CartProvider>
          <FavoritesProvider>
            <BrowserRouter>
              <Elements stripe={stripePromise}>
                <ErrorBoundary>
                  <App />
                </ErrorBoundary>
              </Elements>
            </BrowserRouter>
          </FavoritesProvider>
        </CartProvider>
      </ProductProvider>
    </AuthProvider>
  </StrictMode>
);
