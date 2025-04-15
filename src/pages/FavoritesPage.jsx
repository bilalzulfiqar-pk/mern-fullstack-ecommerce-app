import React, { useEffect, useState } from "react";
import { useFavorites } from "../context/FavoritesContext";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const FavoritesPage = () => {
  const { favorites, loading, removeFavorite } = useFavorites();
  const [localFavorites, setLocalFavorites] = useState([]);
  const [loadedItems, setLoadedItems] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    setLocalFavorites(favorites); // sync once favorites change
  }, [favorites]);

  if (loading && localFavorites.length === 0) {
    return <div className="text-center py-10">Loading favorites...</div>;
  }

  const handleRemove = async (e, product) => {
    e.stopPropagation();

    const confirmRemove = await Swal.fire({
        title: "Remove from Favorites?",
        text: "This item will no longer appear in your favorites list.",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, remove it!",
        cancelButtonText: "Cancel",
      });
      

    if (!confirmRemove.isConfirmed) return;

    setLocalFavorites((prev) =>
      prev.filter((item) => item._id !== product._id)
    );
    removeFavorite(product._id);
  };

  if (localFavorites.length === 0) {
    return (
      <div className="mx-5 min-[1080px]:mx-32 text-xl py-10 text-gray-500 min-h-[75vh]">
        You haven’t added anything to favorites yet.
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-5 min-[1080px]:mx-32 p-4 min-h-[100vh]">
      <h1 className="text-2xl font-semibold mb-6">Your Favorites</h1>
      <div className="grid gap-6 grid-cols-[repeat(auto-fill,minmax(250px,1fr))]">
        {localFavorites.map((product) => (
          <div
            key={product._id}
            onClick={() => navigate(`/product/${product._id}`)}
            className={`border p-4 group h-full rounded-lg border-[#E0E0E0] cursor-pointer flex flex-col bg-white transition-all overflow-hidden duration-300 ${
              loadedItems[product._id]
                ? "opacity-100 scale-100"
                : "opacity-0 scale-95 min-h-[400px]"
            }`}
          >
            <img
              src={product.image}
              alt={product.name}
              onLoad={() =>
                setLoadedItems((prev) => ({ ...prev, [product._id]: true }))
              }
              className="aspect-square object-cover rounded-md group-hover:scale-103 transition-transform duration-300 ease-in-out"
            />
            <h2 className="text-lg font-medium mb-2">{product.name}</h2>
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-lg font-bold text-gray-900">
                ${product.currentPrice}
              </span>
              {product.previousPrice > 0 && (
                <span className="text-gray-400 line-through text-sm">
                  ${product.previousPrice}
                </span>
              )}
            </div>
            <button
              onClick={(e) => handleRemove(e, product)}
              className="mt-auto bg-red-500 hover:bg-red-600 text-white py-2 px-4 cursor-pointer transition rounded"
            >
              Remove from Favorites
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoritesPage;
