import { useState } from "react";
import { FaRegHeart, FaStar } from "react-icons/fa";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const navigate = useNavigate();

  if (!product) return <p>Loading...</p>;

  return (
    <div
      onClick={() => navigate(`/product/${product._id}`)} // Navigate when clicking anywhere except button
      className={`flex cursor-pointer group h-full border relative border-[#E0E0E0] rounded-lg p-4 max-[680px]:flex-col shadow-xs items-center space-x-4 w-full transition-all duration-300 bg-white ${
        loaded ? "opacity-100 scale-100" : "opacity-0 min-h-[170px] scale-95"
      }`}
    >
      {/* Product Image */}
      <img
        src={product.image}
        alt={product.name}
        onLoad={() => setLoaded(true)}
        className=" h-40 rounded-md object-cover group-hover:scale-107 transition-transform duration-300 ease-in-out"
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
        <p className="text-blue-600 font-semibold mt-2 inline-block">
          View details
        </p>
      </div>

      {/* Wishlist Button */}
      <button
        className="cursor-pointer max-[680px]:absolute max-[680px]:top-4 max-[680px]:right-4 p-2 bg-white shadow-sm border border-[#E0E0E0] rounded-lg"
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
  );
};

export default ProductCard;
