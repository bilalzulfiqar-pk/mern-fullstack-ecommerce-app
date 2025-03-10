import { useState } from "react";
import { FaRegHeart, FaStar } from "react-icons/fa";
import { BsHeart, BsHeartFill } from "react-icons/bs";

const ProductCard = ({ product }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  if (!product) return <p>Loading...</p>;

  return (
    <div className="flex border relative border-[#E0E0E0] rounded-lg p-4 shadow-xs items-center space-x-4 w-full bg-white">
      {/* Product Image */}
      <img
        src={product.image}
        alt={product.name}
        className=" h-40 rounded-md object-cover"
      />

      {/* Product Info */}
      <div className="flex-1">
        <h2 className="text-lg font-semibold text-gray-800">{product.name}</h2>

        {/* Pricing */}
        <div className="flex items-center space-x-2 mt-1">
          <span className="text-xl font-bold text-black">
            ${product.currentPrice.toFixed(2)}
          </span>
          {product.previousPrice && (
            <span className="text-gray-500 line-through">
              ${product.previousPrice.toFixed(2)}
            </span>
          )}
        </div>

        {/* Rating, Orders, and Shipping */}
        <div className="flex items-center space-x-2 text-sm mt-1">
          <div className="flex items-center text-yellow-500">
            <FaStar />
            <span className="ml-1 text-gray-700">
              {product.rating.toFixed(1)}
            </span>
          </div>
          <span className="text-gray-500">• {product.orders} orders</span>
          <span className="text-green-600 font-semibold">
            • {product.shipping}
          </span>
        </div>

        {/* Description */}
        <p className="text-gray-600 mt-2">{product.description}</p>

        {/* View Details Link */}
        <a href="#" className="text-blue-600 font-semibold mt-2 inline-block">
          View details
        </a>
      </div>

      {/* Wishlist Button */}
      <button
        className="cursor-pointer p-2 bg-white shadow-sm border border-[#E0E0E0] rounded-lg"
        onClick={() => setIsFavorite(!isFavorite)}
      >
        {isFavorite ? (
          <BsHeartFill className="text-red-500 text-lg translate-y-[1px]" />
        ) : (
          <BsHeart className="text-blue-500 text-lg translate-y-[1px]" />
        )}
      </button>
    </div>
  );
};

export default ProductCard;
