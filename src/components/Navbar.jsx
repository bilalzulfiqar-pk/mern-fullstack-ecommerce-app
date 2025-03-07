import React from "react";
import SearchBar from "./SearchBar";
import { FaUser, FaHeart } from "react-icons/fa";
import { MdMessage, MdShoppingCart } from "react-icons/md";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="w-full h-22 border-b border-[#E0E0E0] flex justify-between px-32 items-center">
      <div className="logo text-4xl text-[#8cb7f5] font-semibold">eStore</div>
      <SearchBar />
      <div className="flex justify-center items-center gap-5">
        <div>
          <Link
            to="#"
            className="flex justify-center items-center flex-col text-gray-400 hover:text-black"
          >
            <FaUser className="text-xl" />
            <p>Profile</p>
          </Link>
        </div>
        <div>
          <Link
            to="#"
            className="flex justify-center items-center flex-col text-gray-400 hover:text-black"
          >
            <MdMessage className="text-xl" />
            <p>Message</p>
          </Link>
        </div>
        <div>
          <Link
            to="#"
            className="flex justify-center items-center flex-col text-gray-400 hover:text-black"
          >
            <FaHeart className="text-xl" />
            <p>Orders</p>
          </Link>
        </div>
        <div>
          <Link
            to="#"
            className="flex justify-center items-center flex-col text-gray-400 hover:text-black"
          >
            <MdShoppingCart className="text-xl" />
            <p>My Cart</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
