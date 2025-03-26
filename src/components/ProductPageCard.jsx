import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoMdCheckmark } from "react-icons/io";
import { FaRegComment, FaShoppingBasket } from "react-icons/fa";
import { MdOutlineVerifiedUser } from "react-icons/md";
import { CiGlobe } from "react-icons/ci";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { FaRegHeart } from "react-icons/fa";
import { HiXMark } from "react-icons/hi2";
import StarRating from "./StarRating";
import AuthContext from "../context/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useCart } from "../context/CartContext";

const ProductPageCard = ({ product }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedImage, setSelectedImage] = useState(product.image);
  const [isAdding, setIsAdding] = useState(false);

  const { user } = useContext(AuthContext);
  const { fetchCartItems, addToCart } = useCart();

  const userId = user ? user._id : null;
  // console.log("userid:",userId);

  const navigate = useNavigate();

  useEffect(() => {
    setSelectedImage(product.image);
  }, [product]);

  const handleAddToCart = async () => {
    if (!userId) {
      toast.info("You have to login first.", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        theme: "light",
      });
      navigate("/login");
      return;
    }

    if (product.stock <= 0) return; // Prevent adding out-of-stock items

    setIsAdding(true);

    try {
      const success = await addToCart(product._id, userId);
      if (success) {
        toast.success(
          <div className="flex justify-center items-center">
            <span>Product added to cart! 🛒</span>
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
      setIsAdding(false);
    }
  };

  return (
    <div>
      <div className="bg-white border border-[#E0E0E0] rounded-lg p-6 max-[350px]:p-3 grid grid-cols-1 w-full min-[950px]:grid-cols-20 gap-6">
        {/* Image Section */}
        <aside className="min-[950px]:col-span-6">
          <figure className="flex flex-col items-center justify-center h-full">
            {/* Main Product Image */}
            <img
              src={selectedImage}
              alt="Product"
              className="w-[345px] max-[950px]:w-full h-[440px] border border-[#E0E0E0] object-contain rounded-md"
            />

            {/* Thumbnails */}
            {/* <div className="flex gap-2 mt-3 max-[1024px]:max-w-[300px] max-[950px]:max-w-fit min-[950px]:self-start overflow-auto custom-scrollbar">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => {
                const thumbnailSrc = `/Sample/thumb1.jpg`;

                return (
                  <img
                    key={num}
                    src={thumbnailSrc}
                    alt={`Thumbnail ${num}`}
                    className={`w-16 h-16 p-1 mb-0.5 object-contain border rounded cursor-pointer ${
                      selectedImage === thumbnailSrc
                        ? "border-blue-500"
                        : "border-[#E0E0E0]"
                    }`}
                    onClick={() => setSelectedImage(thumbnailSrc)}
                  />
                );
              })}
            </div> */}
          </figure>
        </aside>

        {/* Product Info */}
        <main className="min-[950px]:col-span-9">
          {product.stock > 0 ? (
            <p className="text-green-600 font-medium flex gap-1 items-center">
              <IoMdCheckmark className="text-2xl" /> In Stock
            </p>
          ) : (
            <p className="text-red-600 font-medium flex gap-1 items-center">
              <HiXMark className="text-2xl" /> Out of Stock
            </p>
          )}
          <h4 className="text-lg font-semibold">{product.name}</h4>

          <div className="flex items-center space-x-2 my-3 text-gray-500 text-sm">
            {/* Star Rating */}
            <div className="flex text-yellow-400">
              <StarRating rating={product.rating} />
            </div>

            {/* Score */}
            <span className="text-yellow-500 font-semibold">
              {product.rating}
            </span>

            {/* Dot Separator */}
            <span className="text-gray-300">•</span>

            {/* Reviews */}
            <div className="flex items-center space-x-1">
              <FaRegComment />
              <span>{product.reviews}</span>
            </div>

            {/* Dot Separator */}
            <span className="text-gray-300">•</span>

            {/* Sales */}
            <div className="flex items-center space-x-1">
              <FaShoppingBasket />
              <span>{product.orders} sold</span>
            </div>
          </div>

          {/* Pricing */}
          {/* <div className="bg-[#FFEDCD] p-4 rounded flex justify-around">
            <div>
              <span className="text-red-500 font-bold text-lg">
                ${product.bulkPricing[0].price.toFixed(2)}
              </span>
              <p className="text-sm">
                {product.bulkPricing[0].minQuantity}-
                {product.bulkPricing[0].maxQuantity} pcs
              </p>
            </div>
            <div className="border-l pl-2 border-gray-400">
              <span className="text-lg font-semibold">
                ${product.bulkPricing[1].price.toFixed(2)}
              </span>
              <p className="text-sm">
                {product.bulkPricing[1].minQuantity}-
                {product.bulkPricing[1].maxQuantity} pcs
              </p>
            </div>
            <div className="border-l pl-2 border-gray-400">
              <span className="text-lg font-semibold">
                ${product.bulkPricing[2].price.toFixed(2)}
              </span>
              <p className="text-sm">
                {product.bulkPricing[2].minQuantity}+ pcs
              </p>
            </div>
          </div> */}

          {/* Pricing */}
          <div className="bg-[#FFEDCD] p-4 rounded flex justify-around">
            {product?.bulkPricing && product.bulkPricing.length > 0 ? (
              product.bulkPricing.map((item, index) => (
                <div
                  key={index}
                  className={index > 0 ? "border-l pl-2 border-gray-400" : ""}
                >
                  <span
                    className={`text-lg font-semibold ${
                      index === 0 ? "text-red-500 font-bold" : ""
                    }`}
                  >
                    ${item.price.toFixed(2)}
                  </span>
                  <p className="text-sm">
                    {item.maxQuantity && item.maxQuantity !== item.minQuantity
                      ? `${item.minQuantity} - ${item.maxQuantity}`
                      : `${item.minQuantity}+`}{" "}
                    pcs
                  </p>
                </div>
              ))
            ) : (
              <div className="text-gray-500 text-center w-full">
                No bulk prices available
              </div>
            )}
          </div>

          {/* Details */}
          <div className="mt-4 text-gray-600">
            <div className="grid grid-cols-[auto,1fr] gap-x-4 gap-y-2">
              <p className="text-gray-400 text-lg">Price:</p>
              <span className="flex items-center space-x-2">
                <span className="text-black text-lg font-semibold">
                  ${product.currentPrice.toFixed(2)}
                </span>
                <span className="text-gray-400 line-through">
                {product?.previousPrice ? `$${product.previousPrice.toFixed(2)}` : ""}
                </span>
              </span>

              <div className="col-span-2 border-t border-[#E0E0E0] my-2"></div>

              <p className="text-gray-400">Type:</p>
              <p className="text-black">{product.type}</p>

              <p className="text-gray-400">Material:</p>
              <p className="text-black">{product.material}</p>

              {/* <p className="text-gray-400">Design:</p>
              <p className="text-black">Modern nice</p> */}

              <p className="text-gray-400">Sizes:</p>
              <p className="text-black">
                {Array.isArray(product.sizes) && product.sizes.length > 0 ? (
                  product.sizes.map((size, index) => (
                    <span key={index} className="">
                      {size}
                      {index < product.sizes.length - 1 ? ", " : ""}
                    </span>
                  ))
                ) : (
                  <span className="text-gray-500">No sizes available</span>
                )}
              </p>

              <div className="col-span-2 border-t border-[#E0E0E0] my-2"></div>

              <p className="text-gray-400">Customization:</p>
              <p className="text-black">{product.customization}</p>

              <p className="text-gray-400">Protection:</p>
              <p className="text-black">{product.protection}</p>

              <p className="text-gray-400">Warranty:</p>
              <p className="text-black">{product.warranty}</p>
              <div className="col-span-2 border-t border-[#E0E0E0] my-2"></div>
            </div>
          </div>
        </main>

        {/* Seller Info */}
        <aside className="min-[950px]:col-span-5 bg-white">
          <div className="border border-[#E0E0E0] rounded-md w-full p-4">
            <div className="flex items-center gap-3">
              <img
                src="/company.jpg"
                alt="Supplier Logo"
                className="w-12 h-12 rounded"
              />
              <div>
                <p className="text-gray-700">Supplier:</p>
                <p className="font-semibold">{product.supplier.name}</p>
              </div>
            </div>
            <hr className="my-2" />
            <ul className="text-gray-600 space-y-1">
              <li>{product.supplier.location}</li>
              <li className="flex items-center gap-1">
                <MdOutlineVerifiedUser />{" "}
                {product.supplier.verified ? "Verified" : "Not Verified"}
              </li>
              <li className="flex items-center gap-1">
                <CiGlobe />{" "}
                {product.supplier.worldwideShipping
                  ? "Worldwide Shipping"
                  : "Local Shipping"}
              </li>
            </ul>
            <div className="mt-3 space-y-2">
              <button className="w-full cursor-pointer bg-blue-600 hover:bg-blue-700 transition rounded-md font-semibold text-white py-2">
                Send Inquiry
              </button>
              <button className="w-full bg-white hover:bg-gray-100 transition cursor-pointer py-2 rounded-md border border-[#E0E0E0] font-semibold text-blue-600">
                Seller's Profile
              </button>
            </div>
          </div>
          <div className="border border-[#E0E0E0] rounded-md w-full p-4 pt-2 space-y-1 mt-4">
            {/* Wishlist Button */}
            <div className="flex justify-center items-center w-full">
              <button
                className="cursor-pointer p-2 flex justify-center gap-2 items-center w-fit bg-white"
                onClick={() => setIsFavorite(!isFavorite)}
              >
                {isFavorite ? (
                  <BsHeartFill className="text-red-500 text-xl font-semibold translate-y-[1px]" />
                ) : (
                  <FaRegHeart className="text-red-500 text-xl font-semibold translate-y-[1px]" />
                )}
                <p className="text-red-500 text-base font-semibold">
                  Save for later
                </p>
              </button>
            </div>
            <div>
              <button
                className="w-full cursor-pointer bg-green-600 hover:bg-green-700 transition rounded-md font-semibold text-white py-2 disabled:bg-gray-400 disabled:cursor-auto"
                disabled={product.stock <= 0 || isAdding}
                onClick={handleAddToCart}
              >
                {isAdding
                  ? "Adding..."
                  : product.stock > 0
                  ? "Add To Cart"
                  : "Out of Stock"}
              </button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default ProductPageCard;
