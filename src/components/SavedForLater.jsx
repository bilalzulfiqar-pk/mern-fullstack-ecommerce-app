import { FiShoppingCart } from "react-icons/fi";
import { useFavorites } from "../context/FavoritesContext";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useCart } from "../context/CartContext";
import { useContext, useEffect, useRef, useState } from "react";
import AuthContext from "../context/AuthContext";

const SavedForLater = () => {
  const { favorites, loading } = useFavorites();
  const [addingProductId, setAddingProductId] = useState(null);
  const { addToCart, cartItems } = useCart();
  const { user } = useContext(AuthContext);

  const userId = user ? user._id : null;

  const [randomFavorites, setRandomFavorites] = useState([]);

  useEffect(() => {
    if (!loading && favorites.length > 0) {
      const randomFour = [...favorites]
        .sort(() => 0.5 - Math.random())
        .slice(0, 4);
      setRandomFavorites(randomFour);
    }
  }, [loading, favorites]);

  //   console.log(favorites, loading);

  //   const randomFourFavorites = [...localFavorites]
  //     .sort(() => 0.5 - Math.random())
  //     .slice(0, 4);

  const handleAddToCart = async (product) => {
    if (product.stock <= 0) return; // Prevent adding out-of-stock items

    setAddingProductId(product._id);

    // console.log(cartItems);

    // Check if the product is already in the cart
    const cartItem = cartItems.find(
      (item) => item.productId._id === product._id
    );

    // Get current quantity in cart or 0 if not present
    const currentQty = cartItem ? cartItem.qty : 0;

    // Check if current quantity has reached stock
    if (currentQty >= product.stock) {
      toast.error(
        `Cannot add more. Only ${product.stock} item(s) available in stock.`,
        {
          position: "top-right",
          autoClose: 3000,
        }
      );
      setAddingProductId(null);
      return;
    }

    try {
      const success = await addToCart(product._id, userId);
      if (success) {
        toast.success(
          <div className="flex justify-center items-center">
            <span>Product added to cart!</span>
            <Link to="/cart">
              <button className="ml-3 mr-5 cursor-pointer px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-700">
                View Cart
              </button>
            </Link>
          </div>,
          {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "light",
            style: { width: "auto", paddingRight: "10px" }, // Increase width
          }
        );
      } else {
        toast.error("Failed to add product to cart. ❌", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
        });
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Failed to add product to cart.");
    } finally {
      setAddingProductId(null);
    }
  };

  if (loading) {
    return <div className="text-center py-10">Loading saved items...</div>;
  }
  return (
    <div className="p-6 mb-5 bg-white rounded-lg border border-[#E0E0E0]">
      <h2 className="text-2xl px-2 font-bold mb-4">Saved for later</h2>
      <div className="flex gap-2 overflow-x-auto">
        {randomFavorites.map((item) => (
          <div
            key={item._id}
            className="rounded-lg p-4 px-2 min-w-[260px] basis-1/4 flex flex-col text-start"
          >
            <Link to={`/product/${item._id}`} className="self-center w-full">
              <div className="bg-gray-100 w-full rounded-lg p-2 mb-4 flex justify-center items-center">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-58 mix-blend-multiply aspect-square object-contain mb-4"
                />
              </div>
            </Link>
            <p className="space-x-1.5 mb-2 font-medium">
              <span className="text-black text-lg font-semibold">
                ${item.currentPrice.toFixed(2)}
              </span>
              <span className="text-gray-400 text-base line-through">
                {item?.previousPrice ? `$${item.previousPrice.toFixed(2)}` : ""}
              </span>
            </p>
            <p className="text-base text-gray-600 text-start">{item.name}</p>
            <div className="mt-auto w-full">
              <button
                disabled={item.stock <= 0 || addingProductId === item._id}
                onClick={() => handleAddToCart(item)}
                // was w-[155px]
                className={`w-full mt-2 flex items-center justify-center gap-2 px-4 py-2 rounded border text-sm font-medium transition-all
    ${
      item.stock <= 0
        ? "text-gray-500 cursor-not-allowed"
        : addingProductId === item._id
        ? "bg-blue-100 text-blue-600 cursor-wait"
        : "text-blue-600 hover:bg-blue-50 cursor-pointer"
    }
  `}
              >
                {addingProductId === item._id ? (
                  <>
                    <svg
                      className="animate-spin h-4 w-4 text-blue-600"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                      ></path>
                    </svg>
                    Adding...
                  </>
                ) : item.stock > 0 ? (
                  <>
                    <FiShoppingCart />
                    Move To Cart
                  </>
                ) : (
                  "Out of Stock"
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SavedForLater;
