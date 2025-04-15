import { useFavorites } from "../context/FavoritesContext";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import Swal from "sweetalert2";

const FavoriteButton = ({ productId }) => {
  const { favorites, toggleFavorite } = useFavorites();
  const { user } = useContext(AuthContext);
  const isFavorite = favorites.some((item) => item._id === productId);

  const handleClick = (e) => {
    e.stopPropagation();

    if (!user) {
      Swal.fire({
        icon: "info",
        title: "Login Required",
        text: "Please login to add products to favorites.",
        showConfirmButton: true,
        confirmButtonColor: "#2563EB",
      });
      return;
    }

    toggleFavorite(productId);
  };

  return (
    <button
      onClick={handleClick}
      className="p-2 pb-1.5 bg-white shadow-sm border border-gray-300 rounded-lg hover:bg-gray-100 transition-all duration-200 cursor-pointer"
    >
      {isFavorite ? (
        <BsHeartFill className="text-red-500 text-lg" />
      ) : (
        <BsHeart className="text-blue-500 text-lg" />
      )}
    </button>
  );
};

export default FavoriteButton;
