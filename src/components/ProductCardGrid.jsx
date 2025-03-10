import { useState } from "react";
import { FaStar } from "react-icons/fa";
import { BsHeart, BsHeartFill } from "react-icons/bs";

const ProductCardGrid = ({ product }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <div className="border rounded-lg border-[#E0E0E0] bg-white">
      {/* Product Image */}
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full object-cover rounded-md"
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
          className="absolute cursor-pointer right-4 p-2 bg-white shadow-sm border border-[#E0E0E0] rounded-lg"
          onClick={() => setIsFavorite(!isFavorite)}
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
