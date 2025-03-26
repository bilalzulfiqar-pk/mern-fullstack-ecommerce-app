import React, { useContext, useEffect, useRef, useState } from "react";
import SearchBar from "./SearchBar";
import { FaUser, FaHeart } from "react-icons/fa";
import { MdMessage, MdShoppingCart } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { IoMenu } from "react-icons/io5";
import Sidebar from "./Sidebar";
import { useCart } from "../context/CartContext";
import AuthContext from "../context/AuthContext";

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { cartItems } = useCart();
  const cartCount = cartItems.reduce((count, item) => count + item.qty, 0);
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  console.log("🚀 ~ Navbar ~ user:", user?.isAdmin);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Function to handle navigation and close the dropdown
  const handleNavigation = (path) => {
    setIsOpen(false); // Close dropdown before navigation
    navigate(path);
  };

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

        {/* Icons */}

        <div className="flex justify-center items-center gap-5 max-[680px]:hidden">
          {/* {Profile} */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex cursor-pointer justify-center items-center flex-col text-gray-400 hover:text-black focus:outline-none"
            >
              <FaUser className="text-xl" />
              <p className="max-[840px]:hidden">Profile</p>
            </button>

            {isOpen && (
              <div className="absolute border z-10 w-28 border-[#E0E0E0] rounded-md bg-white p-2 mt-2 max-[840px]:right-0 max-[840px]:left-auto left-0 shadow-md">
                {user ? (
                  <>
                    {user?.isAdmin && (
                      <button
                        onClick={() => handleNavigation("/admin")}
                        className="block text-center cursor-pointer text-gray-700 hover:bg-gray-100 rounded-lg py-2 text-sm w-full"
                      >
                        Admin
                      </button>
                    )}
                    <button
                      onClick={() => handleNavigation("/#")}
                      className="block text-center cursor-pointer text-gray-700 hover:bg-gray-100 rounded-lg py-2 text-sm w-full"
                    >
                      Settings
                    </button>
                    <button
                      onClick={() => {
                        setIsOpen(false); // Close before logout action
                        logout();
                      }}
                      className="cursor-pointer block text-center w-full hover:bg-red-50 bg-white text-red-500 rounded-lg py-2 text-sm mt-1"
                    >
                      Log Out
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => handleNavigation("/login")}
                    className="block cursor-pointer text-center text-blue-500 hover:bg-blue-50 rounded-lg py-2 text-sm w-full"
                  >
                    Log In
                  </button>
                )}
              </div>
            )}
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
          <div className="relative">
            <Link
              to="/cart"
              className="flex justify-center max-[680px]:hidden items-center flex-col text-gray-400 hover:text-black"
            >
              <MdShoppingCart className="text-xl" />
              <p className="max-[840px]:hidden">My Cart</p>

              {/* Notification Badge */}
              {user && cartCount > 0 && (
                <span className="absolute -top-3 -right-0 max-[840px]:-right-3 max-[840px]:-top-3 bg-red-500 text-white text-xs w-6 h-6 flex justify-center items-center rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
