// Menubar.jsx
import React from "react";
import CustomDropDown from "./CustomDropDown";
import { Link } from "react-router-dom";

const categoryList = [
  { text: "Mobiles", link: "/mobiles" },
  { text: "Laptops", link: "/laptops" },
  { text: "Printers", link: "/printers" },
  { text: "Computers", link: "/computers" },
];

const helpList = [
  { text: "FAQs", link: "/faqs" },
  { text: "Support", link: "/support" },
  { text: "Contact Us", link: "/contact" },
  { text: "Returns", link: "/returns" },
];

const currencyList = ["USD", "PKR", "EUR", "GBP"];
const languageList = ["English", "Urdu", "French", "Spanish"];
const countries = [
  { name: "USA", flag: "🇺🇸" },
  { name: "UK", flag: "🇬🇧" },
  { name: "Germany", flag: "🇩🇪" },
  { name: "France", flag: "🇫🇷" },
  { name: "Pakistan", flag: "🇵🇰" },
];

const Menubar = () => {
  return (
    <div className="w-full border-b border-[#E0E0E0]">
      <div className="max-w-[1580px] m-auto h-14 flex justify-between px-32 items-center">
        <div className="flex justify-center items-center gap-1">
          <CustomDropDown heading="All Category" items={categoryList} />
          <Link to="">
            <div
              className={`relative w-fit h-8 hover:bg-[#E6F0FF] cursor-pointer py-5 px-4 flex justify-center items-center rounded-lg`}
            >
              Hot Offers
            </div>
          </Link>
          <Link to="">
            <div
              className={`relative w-fit h-8 hover:bg-[#E6F0FF] cursor-pointer py-5 px-4 flex justify-center items-center rounded-lg`}
            >
              Projects
            </div>
          </Link>
          <Link to="">
            <div
              className={`relative w-fit h-8 hover:bg-[#E6F0FF] cursor-pointer py-5 px-4 flex justify-center items-center rounded-lg`}
            >
              Menu items
            </div>
          </Link>
          <CustomDropDown heading="Help" items={helpList} />
        </div>
        <div className="flex justify-center items-center gap-1">
          <CustomDropDown heading="USD" items={currencyList} />
          <CustomDropDown heading="Language" items={languageList} />
        </div>
      </div>
    </div>
  );
};

export default Menubar;
