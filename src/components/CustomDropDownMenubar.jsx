import React, { useState, useRef, useEffect } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { IoMdMenu } from "react-icons/io";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const CustomDropDownMenubar = ({ heading, items, className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(heading);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

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

  // Handle language change for Google Translate
  // const languageMap = {
  //   English: "en",
  //   Urdu: "ur",
  //   French: "fr",
  //   Spanish: "es",
  // };

  const languageMap = {
    English: "en",
    العربية: "ar", // Arabic
    اردو: "ur", // Urdu
    हिन्दी: "hi", // Hindi
    বাংলা: "bn", // Bengali
    Français: "fr", // French
    Español: "es", // Spanish
  };

  let checker = false; // Initialize checker variable
  if (typeof items[0] === "string") {
    checker = !!languageMap[items[0].split(" - ")[0]];
    // console.log(checker);
  }

  // Handle selection only if the item is not a link
  const handleSelect = (item) => {
    // if (languageMap[item]) {
    //   const lang = languageMap[item];
    //   const selectEl = document.querySelector(".goog-te-combo");
    //   if (selectEl) {
    //     selectEl.value = lang;
    //     selectEl.dispatchEvent(new Event("change"));
    //   }
    // }

    // Split the item string to extract the language name and code
    const [name, code] = item.split(" - ");

    if (languageMap[name]) {
      const lang = languageMap[name]; // Retrieve the Google Translate language code

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
                setSelectedItem(item);
                setIsOpen(false);
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
    } else if (typeof item !== "object") {
      setSelectedItem(item);
      // console.log("Selected item:", item);
      setIsOpen(false);
    }
  };

  return (
    <div className={`relative ${className || ""}`} ref={dropdownRef}>
      {/* Dropdown Button */}
      <div
        className={`relative w-fit h-8 hover:bg-[#E6F0FF] cursor-pointer py-5 px-4 flex justify-center items-center rounded-lg transition-all duration-200 ease-in-out${
          isOpen ? "bg-[#E6F0FF]" : ""
        } ${checker ? "notranslate" : ""}`}
        translate={checker ? "no" : undefined}
        onClick={toggleDropdown}
      >
        {heading === "All Category" && (
          <div className="mr-2 pointer-events-none text-2xl text-gray-800">
            <IoMdMenu />
          </div>
        )}
        {selectedItem} {/* Show selected item */}
        {heading !== "All Category" && (
          // <div className="ml-1 pointer-events-none text-2xl text-gray-400">
          //   <MdKeyboardArrowDown />
          // </div>
          <motion.div
            className="ml-[1px] pointer-events-none text-2xl text-gray-400 relative top-[1px]"
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <MdKeyboardArrowDown />
          </motion.div>
        )}
      </div>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2 }}
            // initial={{ opacity: 0, scale: 0.95 }}
            // animate={{ opacity: 1, scale: 1 }}
            // exit={{ opacity: 0, scale: 0.95 }}
            // transition={{ duration: 0.2 }}

            className="absolute top-full w-max mt-1 left-0 h-fit border rounded-lg bg-white border-gray-400 shadow-lg z-10"
          >
            <ul
              className={`m-2 ${
                heading === "All Category"
                  ? "grid grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-1.5"
                  : ""
              }`}
            >
              {items.map((item, index) => {
                const content = typeof item === "object" ? item.text : item;
                return typeof item === "object" ? (
                  <Link
                    to={item.link}
                    key={index}
                    className="block"
                    onClick={() => setIsOpen(false)}
                  >
                    <li className="hover:bg-[#E6F0FF] cursor-pointer py-2 px-3 rounded-lg w-full whitespace-nowrap transition-all duration-200 ease-in-out">
                      {content}
                    </li>
                  </Link>
                ) : (
                  <li
                    key={index}
                    className={`hover:bg-[#E6F0FF] cursor-pointer py-2 px-3 rounded-lg w-full whitespace-nowrap transition-all duration-200 ease-in-out ${
                      checker ? "notranslate" : ""
                    }`}
                    translate={checker ? "no" : undefined}
                    onClick={() => handleSelect(item)}
                  >
                    {content}
                  </li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CustomDropDownMenubar;
