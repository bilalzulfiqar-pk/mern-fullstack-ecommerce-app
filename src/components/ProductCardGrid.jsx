import { useState } from "react";
import { FaStar } from "react-icons/fa";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const ProductCardGrid = ({ product }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const navigate = useNavigate();

  if (!product) return <p>Loading...</p>;

  return (
      <div
      onClick={() => navigate(`/product/${product._id}`)} // Navigate when clicking anywhere except button
        className={`border group h-full rounded-lg border-[#E0E0E0] cursor-pointer bg-white transition-all overflow-hidden duration-300 ${
          loaded ? "opacity-100 scale-100" : "opacity-0 min-h-[400px] scale-95"
        }`}
      >
        {/* Product Image */}
        <div className="relative">
          <img
            src={product.image}
            alt={product.name}
            onLoad={() => setLoaded(true)}
            className="w-full object-cover rounded-md group-hover:scale-103 transition-transform duration-300 ease-in-out"
          />
        </div>

        {/* Product Details */}
        <div className="mt-3 relative p-4 border-t border-[#E0E0E0]">
          {/* Price */}
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-gray-900">
              ${product.currentPrice}
            </span>
            {product.previousPrice && (
              <span className="text-gray-400 line-through text-sm">
                ${product.previousPrice}
              </span>
            )}

            {/* Favorite Button */}
            <button
              className="absolute cursor-pointer right-4 max-[840px]:-top-12 p-2 bg-white shadow-sm border border-[#E0E0E0] rounded-lg"
              onClick={(e) => {
                e.stopPropagation(); // Prevents event from bubbling up to the Link
                setIsFavorite(!isFavorite);
              }}
            >
              {isFavorite ? (
                <BsHeartFill className="text-red-500 text-lg translate-y-[1px]" />
              ) : (
                <BsHeart className="text-blue-500 text-lg translate-y-[1px]" />
              )}
            </button>
          </div>

          {/* Rating */}
          <div className="flex items-center space-x-1 mt-1">
            {[...Array(5)].map((_, index) => (
              <FaStar
                key={index}
                className={`text-sm ${
                  index < Math.floor(product.rating)
                    ? "text-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))}
            <span className="text-base text-gray-500">{product.rating}</span>
          </div>

          {/* Product Name */}
          <p className="text-gray-700 mt-1 text-base">{product.name}</p>
        </div>
      </div>
  );
};

export default ProductCardGrid;
