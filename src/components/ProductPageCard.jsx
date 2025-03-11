import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IoMdCheckmark } from "react-icons/io";
import {
  FaStar,
  FaStarHalfAlt,
  FaRegComment,
  FaShoppingBasket,
} from "react-icons/fa";
import { MdOutlineVerifiedUser } from "react-icons/md";
import { CiGlobe } from "react-icons/ci";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { FaRegHeart } from "react-icons/fa";

const ProductPageCard = () => {

    const [isFavorite, setIsFavorite] = useState(false);

  return (
    <div>
      <div className="bg-white border border-[#E0E0E0] rounded-lg p-6 grid lg:grid-cols-20 gap-6">
        {/* Image Section */}
        <aside className="lg:col-span-6">
          <figure>
            <img
              src="/Sample/big.jpg"
              alt="Product"
              className="w-full h-auto border border-[#E0E0E0] object-contain rounded-md"
            />
            <div className="flex gap-2 mt-3 overflow-auto">
              {[1, 2, 3, 4].map((num) => (
                <img
                  key={num}
                  src={`/Sample/thumb${num}.jpg`}
                  alt="Thumbnail"
                  className="w-16 h-16 p-1 object-cover border border-[#E0E0E0] rounded cursor-pointer"
                />
              ))}
            </div>
          </figure>
        </aside>

        {/* Product Info */}
        <main className="lg:col-span-9">
          <p className="text-green-600 font-medium flex gap-1 items-center">
            <IoMdCheckmark className="text-2xl" /> In Stock
          </p>
          <h4 className="text-lg font-semibold">
            Mens Long Sleeve T-shirt Cotton Base Layer Slim Muscle
          </h4>
          {/* <div className="flex items-center gap-2 my-2 text-yellow-500">
                ⭐⭐⭐⭐☆{" "}
                <span className="text-gray-500">
                  (4.5 | 34 reviews | 154 sold)
                </span>
              </div> */}

          <div className="flex items-center space-x-2 my-3 text-gray-500 text-sm">
            {/* Star Rating */}
            <div className="flex text-yellow-400">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStarHalfAlt />
            </div>

            {/* Score */}
            <span className="text-yellow-500 font-semibold">9.3</span>

            {/* Dot Separator */}
            <span className="text-gray-300">•</span>

            {/* Reviews */}
            <div className="flex items-center space-x-1">
              <FaRegComment />
              <span>32 reviews</span>
            </div>

            {/* Dot Separator */}
            <span className="text-gray-300">•</span>

            {/* Sales */}
            <div className="flex items-center space-x-1">
              <FaShoppingBasket />
              <span>154 sold</span>
            </div>
          </div>

          {/* Pricing */}
          <div className="bg-[#FFEDCD] p-4 rounded flex justify-around">
            <div>
              <span className="text-red-500 font-bold text-lg">$98.00</span>
              <p className="text-sm">50-100 pcs</p>
            </div>
            <div className="border-l pl-2 border-gray-400">
              <span className="text-lg font-semibold">$90.00</span>
              <p className="text-sm">100-700 pcs</p>
            </div>
            <div className="border-l pl-2 border-gray-400">
              <span className="text-lg font-semibold">$78.00</span>
              <p className="text-sm">700+ pcs</p>
            </div>
          </div>

          {/* Details */}
          <div className="mt-4 text-gray-600">
            <div className="grid grid-cols-[auto,1fr] gap-x-4 gap-y-2">
              <p className="text-gray-400">Price:</p>
              <p className="text-black">Negotiable</p>

              <div className="col-span-2 border-t border-[#E0E0E0] my-2"></div>

              <p className="text-gray-400">Type:</p>
              <p className="text-black">Classic shoes</p>

              <p className="text-gray-400">Material:</p>
              <p className="text-black">Plastic material</p>

              <p className="text-gray-400">Design:</p>
              <p className="text-black">Modern nice</p>

              <div className="col-span-2 border-t border-[#E0E0E0] my-2"></div>

              <p className="text-gray-400">Customization:</p>
              <p className="text-black">
                Customized logo and design custom packages
              </p>

              <p className="text-gray-400">Protection:</p>
              <p className="text-black">Refund Policy</p>

              <p className="text-gray-400">Warranty:</p>
              <p className="text-black">2 years full warranty</p>
              <div className="col-span-2 border-t border-[#E0E0E0] my-2"></div>
            </div>
          </div>
        </main>

        {/* Seller Info */}
        <aside className="lg:col-span-5 bg-white">
          <div className="border border-[#E0E0E0] rounded-md w-full p-4">
            <div className="flex items-center gap-3">
              <img
                src="/company.jpg"
                alt="Supplier Logo"
                className="w-12 h-12 rounded"
              />
              <div>
                <p className="text-gray-700">Supplier:</p>
                <p className="font-semibold">Guanjoi Trading LLC</p>
              </div>
            </div>
            <hr className="my-2" />
            <ul className="text-gray-600 space-y-1">
              <li>🇩🇪 Berlin, Germany</li>
              <li className="flex items-center gap-1">
                <MdOutlineVerifiedUser /> Verified Seller
              </li>
              <li className="flex items-center gap-1">
                <CiGlobe /> Worldwide shipping
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
          <div>
            {/* Wishlist Button */}
            <div className="flex justify-center items-center w-full">
              <button
                className="cursor-pointer p-2 flex justify-center gap-2 items-center w-fit bg-white mt-4"
                onClick={() => setIsFavorite(!isFavorite)}
              >
                {isFavorite ? (
                  <BsHeartFill className="text-red-500 text-xl font-semibold translate-y-[1px]" />
                ) : (
                  <FaRegHeart className="text-blue-500 text-xl font-semibold translate-y-[1px]" />
                )}
                <p className="text-blue-500 text-base font-semibold">
                  Save for later
                </p>
              </button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default ProductPageCard;
