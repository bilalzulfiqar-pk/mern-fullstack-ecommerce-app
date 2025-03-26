import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import AuthContext from "./AuthContext";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useContext(AuthContext); // Get the logged-in user
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  const fetchCartItems = async () => {
    if (user && token) {
      axios
        .get("http://localhost:5000/api/cart", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          // console.log("CART ITEMS AT API",res.data.items);

          // Filter out items where productId is null (removed items)
          const filteredItems = res.data.items.filter(item => item.productId);

          setCartItems(filteredItems);
          setLoading(false);
        })
        .catch((err) => console.error("Error fetching cart:", err));
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, [user]);

  const updateQty = async (id, qty) => {
    try {
      const response = await axios.patch(
        `http://localhost:5000/api/cart/update/${id}`,
        { qty: parseInt(qty) },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        // or simply use fetchCartItems(); but it would be bit slow i think
        setCartItems((prevItems) =>
          prevItems.map((item) =>
            item.productId._id === id ? { ...item, qty: parseInt(qty) } : item
          )
        );
        // fetchCartItems();
      } else {
        console.error("Failed to update quantity:", response.data.message);
      }
    } catch (error) {
      console.error("Error updating quantity:", error.response?.data || error);
    }
  };

  const removeItem = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/cart/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.success) {
        // or simply use fetchCartItems(); but it would be bit slow i think
        setCartItems((prevItems) =>
          prevItems.filter((item) => item.productId._id !== id)
        );
      } else {
        console.error("Failed to remove item:", response.data.message);
      }
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  const clearCart = async () => {
    try {
      const response = await axios.delete(
        "http://localhost:5000/api/cart/clear",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.success) {
        // or simply use fetchCartItems(); but it would be bit slow i think
        setCartItems([]);
      } else {
        console.error("Failed to clear cart:", response.data.message);
      }
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  };

  // can also be done without passing userId and changing a bit code of function. bcoz userid is also in token
  const addToCart = async (productId, userId) => {
    if (user && token) {
      try {
        const response = await axios.patch(
          "http://localhost:5000/api/cart/add",
          { productId, userId },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (response.data.success) {
          // or update the cartItems state
          fetchCartItems(); // Refresh cart after success
          return true;
        } else {
          return false;
        }
      } catch (error) {
        console.error("Error adding to cart:", error.response?.data || error);
        return false;
      }
    }
  };

  // const saveCartToDB = async (updatedItems) => {
  //   if (!user) return;

  //   try {
  //     await axios.put(
  //       "http://localhost:5000/api/cart",
  //       { items: updatedItems },
  //       { headers: { Authorization: `Bearer ${token}` } }
  //     );
  //   } catch (error) {
  //     console.error("Error saving cart:", error);
  //   }
  // };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        loading,
        updateQty,
        removeItem,
        clearCart,
        setCartItems,
        fetchCartItems,
        addToCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
