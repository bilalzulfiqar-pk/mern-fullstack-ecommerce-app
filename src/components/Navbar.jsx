import React, { useContext, useEffect, useRef, useState } from "react";
import SearchBar from "./SearchBar";
import { FaUser, FaHeart } from "react-icons/fa";
import { MdMessage, MdShoppingCart } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { IoMenu } from "react-icons/io5";
import Sidebar from "./Sidebar";
import { useCart } from "../context/CartContext";
import AuthContext from "../context/AuthContext";
import { AnimatePresence, motion } from "framer-motion";

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { cartItems } = useCart();
  const cartCount = cartItems.reduce((count, item) => count + item.qty, 0);
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // console.log("🚀 ~ Navbar ~ user:", user?.isAdmin);

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
      <div className="max-w-[1324px] m-auto h-22 max-[680px]:h-fit border-b border-[#E0E0E0] flex max-[680px]:flex-wrap justify-between px-5 min-[1100px]:px-10 items-center max-[680px]:flex-col">
        {/* Sidebar */}

        <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

        {/* Logo */}
        <div className="relative flex justify-center max-[680px]:w-full max-[680px]:justify-center items-center gap-4">
          <IoMenu
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-4xl translate-y-1 hidden max-[880px]:block cursor-pointer max-[680px]:absolute max-[680px]:left-0"
          />
          <Link
            to={"/"}
            className="flex justify-center items-center gap-1 max-[680px]:pt-3"
          >
            <img src="/logo.png" alt="" className="w-10 h-10" />
            <div className="logo text-3xl text-[#8cb7f5] -tracking-wider font-bold">
              Brand
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
              className={`flex cursor-pointer justify-center items-center flex-col hover:text-black focus:outline-none transition-all duration-200 ${
                isOpen ? "text-black" : "text-gray-400"
              }`}
            >
              <FaUser className="text-xl" />
              <p className="max-[880px]:hidden">Profile</p>
            </button>

            <AnimatePresence>
              {isOpen && (
                <motion.div
                  key="user-menu" // helps AnimatePresence track it
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.2 }}
                  className="absolute border z-10 w-28 border-[#E0E0E0] rounded-md bg-white p-2 mt-0.5 max-[880px]:right-0 max-[880px]:left-auto left-0 shadow-md"
                >
                  {user ? (
                    <>
                      {user.isAdmin && (
                        <button
                          onClick={() => handleNavigation("/admin")}
                          className="block text-left pl-3 cursor-pointer text-gray-700 hover:bg-gray-100 rounded-lg py-2 text-sm w-full transition-all duration-200"
                        >
                          Admin
                        </button>
                      )}
                      <button
                        onClick={() => handleNavigation("/orders")}
                        className="block text-left pl-3 cursor-pointer text-gray-700 hover:bg-gray-100 rounded-lg py-2 text-sm w-full transition-all duration-200"
                      >
                        My Orders
                      </button>
                      <button
                        onClick={() => handleNavigation("/settings")}
                        className="block text-left pl-3 cursor-pointer text-gray-700 hover:bg-gray-100 rounded-lg py-2 text-sm w-full transition-all duration-200"
                      >
                        Settings
                      </button>
                      <button
                        onClick={() => {
                          setIsOpen(false);
                          logout();
                        }}
                        className="cursor-pointer block text-left pl-3 w-full hover:bg-red-50 bg-white text-red-500 rounded-lg py-2 text-sm mt-1 transition-all duration-200"
                      >
                        Log Out
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => handleNavigation("/login")}
                      className="block cursor-pointer text-center text-blue-500 hover:bg-blue-50 rounded-lg py-2 text-sm w-full transition-all duration-200"
                    >
                      Log In
                    </button>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* {isOpen && (
              <div className="absolute border z-10 w-28 border-[#E0E0E0] rounded-md bg-white p-2 mt-2 max-[880px]:right-0 max-[880px]:left-auto left-0 shadow-md">
                {user ? (
                  <>
                    {user?.isAdmin && (
                      <button
                        onClick={() => handleNavigation("/admin")}
                        className="block text-left pl-3 cursor-pointer text-gray-700 hover:bg-gray-100 rounded-lg py-2 text-sm w-full transition-all duration-200"
                      >
                        Admin
                      </button>
                    )}
                    <button
                      onClick={() => handleNavigation("/orders")}
                      className="block text-left pl-3 cursor-pointer text-gray-700 hover:bg-gray-100 rounded-lg py-2 text-sm w-full transition-all duration-200"
                    >
                      My Orders
                    </button>
                    <button
                      onClick={() => handleNavigation("/settings")}
                      className="block text-left pl-3 cursor-pointer text-gray-700 hover:bg-gray-100 rounded-lg py-2 text-sm w-full transition-all duration-200"
                    >
                      Settings
                    </button>
                    <button
                      onClick={() => {
                        setIsOpen(false); // Close before logout action
                        logout();
                      }}
                      className="cursor-pointer block text-left pl-3 w-full hover:bg-red-50 bg-white text-red-500 rounded-lg py-2 text-sm mt-1 transition-all duration-200"
                    >
                      Log Out
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => handleNavigation("/login")}
                    className="block cursor-pointer text-center text-blue-500 hover:bg-blue-50 rounded-lg py-2 text-sm w-full transition-all duration-200"
                  >
                    Log In
                  </button>
                )}
              </div>
            )} */}
          </div>

          <div className="max-[880px]:hidden">
            <Link
              to="#"
              className="flex justify-center items-center flex-col text-gray-400 hover:text-black transition-all duration-200"
            >
              <MdMessage className="text-xl" />
              <p>Message</p>
            </Link>
          </div>
          <div className="max-[880px]:hidden">
            <Link
              to="/favorites"
              className="flex justify-center items-center flex-col text-gray-400 hover:text-black transition-all duration-200"
            >
              <FaHeart className="text-xl" />
              <p>Favorites</p>
            </Link>
          </div>
          <div className="relative">
            <Link
              to="/cart"
              className="flex justify-center max-[680px]:hidden items-center flex-col text-gray-400 hover:text-black transition-all duration-200"
            >
              <MdShoppingCart className="text-xl" />
              <p className="max-[880px]:hidden">My Cart</p>

              {/* Notification Badge */}
              {user && cartCount > 0 && (
                <span className="absolute -top-3 -right-0 max-[880px]:-right-3 max-[880px]:-top-3 bg-red-500 text-white text-xs w-6 h-6 flex justify-center items-center rounded-full">
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
