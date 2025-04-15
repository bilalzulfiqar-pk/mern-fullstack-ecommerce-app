import { useContext, useEffect, useRef } from "react";
import {
  FaUserCircle,
  FaGlobe,
  FaHeadphones,
  FaBuilding,
  FaBars,
  FaUser,
} from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { FiHeart, FiBox, FiList } from "react-icons/fi";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { useCart } from "../context/CartContext";

const Sidebar = ({ isOpen, setIsOpen }) => {
  const sidebarRef = useRef(null);
  const { user, logout } = useContext(AuthContext);
  const { cartItems } = useCart();
  const cartCount = cartItems.reduce((count, item) => count + item.qty, 0);

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isOpen, setIsOpen]);

  return (
    <>
      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed top-0 left-0 h-full w-72 bg-white shadow-lg border-r border-gray-300 p-4 transition-transform transform z-50 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Close Button */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-3 right-3 text-gray-500 cursor-pointer hover:text-black"
        >
          <AiOutlineClose size={25} />
        </button>

        {/* User Section */}
        <div className="flex items-start justify-center flex-col space-y-2 p-4 border-b border-[#8B96A5]">
          {/* <FaUserCircle size={32} className="text-gray-500" /> */}
          <img
            src="/avatar.jpg"
            className="w-11 h-11 rounded-full mr-2 border border-[#E0E0E0]"
            alt="User Avatar"
          />
          {user ? (
            <span>
              <span className="text-gray-800 font-medium line-clamp-2">
                {user.name}
              </span>
              <button
                onClick={handleLogout}
                className="hover:underline cursor-pointer"
              >
                Sign out
              </button>
            </span>
          ) : (
            <span className="text-gray-800 font-medium">
              <Link
                to={"/login"}
                onClick={() => setIsOpen(false)}
                className="hover:underline"
              >
                Sign in
              </Link>{" "}
              |{" "}
              <Link
                to={"/register"}
                onClick={() => setIsOpen(false)}
                className="hover:underline"
              >
                Register
              </Link>
            </span>
          )}
        </div>

        {/* Menu Items */}
        <ul className="mt-3 space-y-3">
          <li className="flex items-center space-x-3 text-[#8B96A5] hover:text-blue-500 cursor-pointer p-2">
            <FiList size={20} />{" "}
            <Link to={"/search"} onClick={() => setIsOpen(false)}>
              <span className="text-black hover:text-blue-500">Categories</span>
            </Link>
          </li>
          <li className="flex items-center space-x-3 text-[#8B96A5] hover:text-blue-500 cursor-pointer p-2">
            <FiHeart size={20} />{" "}
            <Link to={"/favorites"} onClick={() => setIsOpen(false)}>

            <span className="text-black hover:text-blue-500">Favorites</span>
            </Link>
          </li>
          <li className="flex relative items-center space-x-3 text-[#8B96A5] hover:text-blue-500 cursor-pointer p-2">
            <FiBox size={20} />{" "}
            <Link
              to={"/cart"}
              onClick={() => setIsOpen(false)}
              className="relative"
            >
              <span className="text-black hover:text-blue-500">My Cart</span>
              {/* Notification Badge */}
              {user && cartCount > 0 && (
                <span className="absolute pr-[1px] -top-1/2 -right-1/3 bg-red-500 text-white text-[10px] w-5 h-5 flex justify-center items-center rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>
          </li>
          {user?.isAdmin && (
            <li className="flex relative items-center space-x-3 text-[#8B96A5] hover:text-blue-500 cursor-pointer p-2">
            <FaUser size={20} />{" "}
            <Link
              to={"/admin"}
              onClick={() => setIsOpen(false)}
              className="relative"
            >
              <span className="text-black hover:text-blue-500">Admin Panel</span>
            </Link>
          </li>
          )}

          <li className="flex items-center space-x-3 text-[#8B96A5] hover:text-blue-500 cursor-pointer p-2 border-t border-[#8B96A5] pt-3">
            <FaGlobe size={20} />{" "}
            <span className="text-black hover:text-blue-500">
              English | USD
            </span>
          </li>
          <li className="flex items-center space-x-3 text-[#8B96A5] hover:text-blue-500 cursor-pointer p-2">
            <FaHeadphones size={20} />{" "}
            <span className="text-black hover:text-blue-500">Contact us</span>
          </li>
          <li className="flex items-center space-x-3 text-[#8B96A5] hover:text-blue-500 cursor-pointer p-2">
            <FaBuilding size={20} />{" "}
            <span className="text-black hover:text-blue-500">About</span>
          </li>
        </ul>

        {/* Footer Links */}
        <div className="mt-6 border-t border-[#8B96A5] pt-3 text-black text-sm space-y-2">
          <p className="cursor-pointer hover:text-blue-500">User agreement</p>
          <p className="cursor-pointer hover:text-blue-500">Partnership</p>
          <p className="cursor-pointer hover:text-blue-500">Privacy policy</p>
        </div>
      </div>

      {/* Overlay (Click to Close) */}
      {isOpen && (
        <div
          className={`fixed inset-0 bg-black opacity-50 z-40`}
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
