import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import AuthContext from "./AuthContext";

const FavoritesContext = createContext();

export const useFavorites = () => useContext(FavoritesContext);

export const FavoritesProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

  const fetchFavorites = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE_URL}/api/favorites`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setFavorites(res.data.products || res.data);
    } catch (error) {
      console.error("Error fetching favorites:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchFavorites();
    } else {
      setFavorites([]);
    }
  }, [user]);

  const addFavorite = async (productId) => {
    try {
      await axios.post(
        `${API_BASE_URL}/api/favorites/add`,
        { productId },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      await fetchFavorites();
    } catch (error) {
      console.error("Error adding to favorites:", error);
    }
  };

  const removeFavorite = async (productId) => {
    try {
      await axios.delete(`${API_BASE_URL}/api/favorites/remove`, {
        data: { productId },
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      await fetchFavorites();
    } catch (error) {
      console.error("Error removing from favorites:", error);
    }
  };

  const toggleFavorite = async (productId) => {
    const isFav = favorites.some((item) => item._id === productId);
    if (isFav) {
      await removeFavorite(productId);
    } else {
      await addFavorite(productId);
    }
  };

  const isFavorite = (productId) =>
    favorites.some((item) => item._id === productId);

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        loading,
        addFavorite,
        removeFavorite,
        toggleFavorite,
        isFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
