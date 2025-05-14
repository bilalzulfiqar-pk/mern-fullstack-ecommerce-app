import { useContext, useEffect, useRef, useState } from "react";
import {
  FaUserCircle,
  FaGlobe,
  FaHeadphones,
  FaBuilding,
  FaBars,
  FaUser,
} from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import {
  FiHeart,
  FiBox,
  FiList,
  FiShoppingCart,
  FiPackage,
} from "react-icons/fi";
import { FaChevronDown } from "react-icons/fa";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { AnimatePresence, motion } from "framer-motion";

const Sidebar = ({ isOpen, setIsOpen }) => {
  const sidebarRef = useRef(null);
  const { user, logout } = useContext(AuthContext);
  const { cartItems } = useCart();
  const cartCount = cartItems.reduce((count, item) => count + item.qty, 0);

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);

  const toggleLanguageDropdown = () => {
    setIsLanguageDropdownOpen((prev) => !prev);
  };

  const changeLanguage = (language) => {
    // Implement language change logic here
    const lang = language;

    // console.log(`Language changed to: ${lang}`);
    // new window.google.translate.TranslateElement({ pageLanguage: lang }, "google_translate_element");

    const tryChangeLang = () => {
      const selectEl = document.querySelector(".goog-te-combo");

      if (selectEl) {
        // Delay to ensure Translate widget is fully initialized
        setTimeout(() => {
          selectEl.value = lang;
          selectEl.dispatchEvent(new Event("change"));

          // Start verifying after dispatch
          let attempts = 0;
          const maxRetries = 5;
          const interval = 1000;

          const verifyChange = () => {
            if (selectEl.value === lang) {
              // console.log("✅ Language changed to:", lang);
              setIsLanguageDropdownOpen(false);
              return;
            } else if (attempts < maxRetries) {
              selectEl.value = lang;

              selectEl.dispatchEvent(new Event("change"));

              // console.warn(
              //   `❌ Language change attempt ${attempts} failed. Retrying...`
              // );
              attempts++;
              setTimeout(verifyChange, interval);
            } else {
              // console.warn("❌ Language change not detected after retries.");
              alert(
                "Language change Failed. Please try again or refresh the page."
              );
            }
          };

          verifyChange();
        }, 150); // Can adjust delay if needed
      } else {
        // Retry if element not available yet
        setTimeout(tryChangeLang, 500);
      }
    };

    tryChangeLang();
  };

  const languageMap = {
    English: "en",
    العربية: "ar", // Arabic
    اردو: "ur", // Urdu
    हिन्दी: "hi", // Hindi
    বাংলা: "bn", // Bengali
    Français: "fr", // French
    Español: "es", // Spanish
  };

  // Create a ref for the language dropdown to detect outside clicks
  const languageDropdownRef = useRef(null);

  // Handle click outside to close the language dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        languageDropdownRef.current &&
        !languageDropdownRef.current.contains(event.target) &&
        !event.target.closest(".language-dropdown-button") // Ensure the button itself doesn't close it
      ) {
        setIsLanguageDropdownOpen(false);
      }
    };

    // Add event listeners for click and touch events
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      // Cleanup event listeners on component unmount
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

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
        className={`fixed top-0 left-0 h-full overflow-y-auto w-72 bg-white shadow-lg border-r border-gray-300 p-4 transition-transform transform z-50 ${
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
            <div>
              <span className="text-gray-800 font-medium line-clamp-2">
                {user?.name}
              </span>
              <div>
                <Link to={"/settings"} onClick={() => setIsOpen(false)}>
                  <button className="hover:underline cursor-pointer">
                    Settings
                  </button>
                </Link>{" "}
                |{" "}
                <button
                  onClick={handleLogout}
                  className="hover:underline cursor-pointer"
                >
                  Sign out
                </button>
              </div>
            </div>
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
              <span className="text-black hover:text-blue-500">
                All Products
              </span>
            </Link>
          </li>
          <li className="flex items-center space-x-3 text-[#8B96A5] hover:text-blue-500 cursor-pointer p-2">
            <FiHeart size={20} />{" "}
            <Link to={"/favorites"} onClick={() => setIsOpen(false)}>
              <span className="text-black hover:text-blue-500">Favorites</span>
            </Link>
          </li>
          <li className="flex relative items-center space-x-3 text-[#8B96A5] hover:text-blue-500 cursor-pointer p-2">
            <FiShoppingCart size={20} />{" "}
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
          <li className="flex relative items-center space-x-3 text-[#8B96A5] hover:text-blue-500 cursor-pointer p-2">
            <FiPackage size={20} />{" "}
            <Link
              to={"/orders"}
              onClick={() => setIsOpen(false)}
              className="relative"
            >
              <span className="text-black hover:text-blue-500">My Orders</span>
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
                <span className="text-black hover:text-blue-500">
                  Admin Panel
                </span>
              </Link>
            </li>
          )}

          <li className="flex relative items-center space-x-3 text-[#8B96A5] hover:text-blue-500 cursor-pointer p-2 border-t border-[#8B96A5] pt-3 language-dropdown-button">
            <FaGlobe
              size={20}
              onClick={toggleLanguageDropdown}
              className="cursor-pointer"
            />{" "}
            <div
              className="text-black flex gap-1 justify-center items-center relative hover:text-blue-500 cursor-pointer"
              onClick={toggleLanguageDropdown}
            >
              Language{" "}
              <motion.span
                animate={{ rotate: isLanguageDropdownOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="translate-y-0.5 text-gray-700 inline-block"
              >
                <FaChevronDown size={12} />
              </motion.span>
            </div>
            {/* Language Dropdown */}
            <div ref={languageDropdownRef} className="relative">
              <AnimatePresence>
                {isLanguageDropdownOpen && (
                  <motion.ul
                    className="absolute -left-10 top-1.5 bg-white shadow-md border rounded-md w-40 mt-2 overflow-hidden"
                    initial={{ opacity: 0, y: 0 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {Object.entries(languageMap).map(([language, code]) => (
                      <li
                        key={code}
                        className="p-2 hover:bg-gray-200 cursor-pointer notranslate"
                        translate="no"
                        onClick={() => changeLanguage(code)}
                      >
                        {language} - {code.toUpperCase()}
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>
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
