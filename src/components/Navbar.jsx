import React, { useState } from "react";
import SearchBar from "./SearchBar";
import { FaUser, FaHeart } from "react-icons/fa";
import { MdMessage, MdShoppingCart } from "react-icons/md";
import { Link } from "react-router-dom";
import { IoMenu } from "react-icons/io5";
import Sidebar from "./Sidebar";

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="w-full border-b border-[#E0E0E0]">
      <div className="max-w-[1580px] m-auto h-22 max-[680px]:h-fit border-b border-[#E0E0E0] flex max-[680px]:flex-wrap justify-between px-5 min-[1080px]:px-32 items-center max-[680px]:flex-col">
        {/* Sidebar */}

        <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

        {/* Logo */}
        <div className="flex justify-center max-[680px]:w-full max-[680px]:justify-start items-center gap-2">
          <IoMenu
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-4xl translate-y-1 hidden max-[840px]:block cursor-pointer"
          />
          <Link to={"/"}>
            <div className="logo text-4xl text-[#8cb7f5] font-semibold">
              eStore
            </div>
          </Link>
        </div>
        {/* SearchBar */}

        <SearchBar />

        <div className="flex justify-center items-center gap-5 max-[680px]:hidden">
          <div className="">
            <Link
              to="#"
              className="flex justify-center items-center flex-col text-gray-400 hover:text-black"
            >
              <FaUser className="text-xl" />
              <p className="max-[840px]:hidden">Profile</p>
            </Link>
          </div>
          <div className="max-[840px]:hidden">
            <Link
              to="#"
              className="flex justify-center items-center flex-col text-gray-400 hover:text-black"
            >
              <MdMessage className="text-xl" />
              <p>Message</p>
            </Link>
          </div>
          <div className="max-[840px]:hidden">
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
              to="/checkout"
              className="flex justify-center max-[680px]:hidden items-center flex-col text-gray-400 hover:text-black"
            >
              <MdShoppingCart className="text-xl" />
              <p className="max-[840px]:hidden">My Cart</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
