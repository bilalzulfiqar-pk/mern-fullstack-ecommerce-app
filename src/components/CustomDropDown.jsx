import React, { useState, useRef, useEffect } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { IoMdMenu } from "react-icons/io";
import { Link } from "react-router-dom";

const CustomDropDown = ({ heading, items }) => {
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

  // Handle selection only if the item is not a link
  const handleSelect = (item) => {
    if (typeof item !== "object") {
      setSelectedItem(item);
      setIsOpen(false);
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Dropdown Button */}
      <div
        className={`relative w-fit h-8 hover:bg-[#E6F0FF] cursor-pointer py-5 px-4 flex justify-center items-center rounded-lg ${
          isOpen && "bg-[#E6F0FF]"
        }`}
        onClick={toggleDropdown}
      >
        {heading === "All Category" && (
          <div className="mr-2 pointer-events-none text-2xl text-gray-800">
            <IoMdMenu />
          </div>
        )}
        {selectedItem} {/* Show selected item */}
        {heading !== "All Category" && (
          <div className="ml-1 pointer-events-none text-2xl text-gray-400">
            <MdKeyboardArrowDown />
          </div>
        )}
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full w-fit mt-1 left-0 h-fit border rounded-lg bg-white border-gray-400 shadow-lg z-10">
          <ul className="m-2">
            {items.map((item, index) => (
              <li
                key={index}
                className="hover:bg-[#E6F0FF] cursor-pointer py-2 px-4 rounded-lg w-full whitespace-nowrap"
                onClick={() => handleSelect(item)}
              >
                {typeof item === "object" ? (
                  <Link to={item.link} className="block w-full">
                    {item.text}
                  </Link>
                ) : (
                  item
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CustomDropDown;
