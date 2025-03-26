// Menubar.jsx
import React from "react";
import CustomDropDown from "./CustomDropDown";
import { Link } from "react-router-dom";

// const categoryList = [
//   { text: "Mobiles", link: "/mobiles" },
//   { text: "Laptops", link: "/laptops" },
//   { text: "Printers", link: "/printers" },
//   { text: "Computers", link: "/computers" },
// ];

const categoryList = [
  { text: "Home Interiors", link: "/search?category=Interiors" },
  { text: "Electronic Devices", link: "/search?category=Electronics" },
  { text: "Technology Gadgets", link: "/search?category=Tech" },
  { text: "Fashion Clothing", link: "/search?category=Clothing" },
  { text: "Home Decoration", link: "/search?category=Home%20Decor" },
  { text: "Modern Furniture", link: "/search?category=Furniture" },
  { text: "Casual Wear", link: "/search?category=Casual%20Wear" },
  { text: "Kitchen Essentials", link: "/search?category=Kitchen" },
  { text: "Fashion Accessories", link: "/search?category=Accessories" },
  { text: "Men's Fashion", link: "/search?category=Men%27s%20Fashion" },
  { text: "Summer Clothes", link: "/search?category=Summer%20Clothes" },
  { text: "Winter Wear", link: "/search?category=Winter%20Wear" },
  { text: "Outerwear Collection", link: "/search?category=Outerwear" },
  { text: "Gaming Accessories", link: "/search?category=Gaming%20Accessories" },
  { text: "High-Quality Headsets", link: "/search?category=Headsets" },
  { text: "Indoor Plants", link: "/search?category=Plants" },
  { text: "Office Furniture", link: "/search?category=Office%20Furniture" },
  { text: "Ergonomic Seating", link: "/search?category=Ergonomic%20Seating" },
  { text: "Dinnerware Sets", link: "/search?category=Dinnerware" },
  // { text: "Ceramic Dishware", link: "/search?category=Ceramic%20Dishes" },
  { text: "Bedroom Essentials", link: "/search?category=Bedroom" },
  { text: "Home Lighting", link: "/search?category=Lighting" },
  { text: "LED Light Fixtures", link: "/search?category=LED%20Lights" },
  { text: "Office Decorations", link: "/search?category=Office%20Decor" },
  { text: "Home Accessories", link: "/search?category=Home%20Accessories" },
  { text: "Kitchen Appliances", link: "/search?category=Kitchen%20Appliances" },
  { text: "Coffee Makers", link: "/search?category=Coffee%20Makers" },
  { text: "Smartphones & Devices", link: "/search?category=Smartphones" },
  // { text: "Mobile Devices", link: "/search?category=Mobile%20Devices" },
  { text: "Apple Products", link: "/search?category=Apple" },
  { text: "Laptops & Notebooks", link: "/search?category=Laptops" },
  { text: "Desktop Computers", link: "/search?category=Computers" },
  { text: "Wearable Technology", link: "/search?category=Wearable%20Tech" },
  { text: "Smartwatches", link: "/search?category=Smartwatches" },
  // { text: "Audio Equipment", link: "/search?category=Audio" },
  { text: "Headphones & Earbuds", link: "/search?category=Headphones" },
  { text: "Home Appliances", link: "/search?category=Home%20Appliances" },
  { text: "Electric Kettles", link: "/search?category=Electric%20Kettle" },
  { text: "Travel Bags", link: "/search?category=Bags" },
  { text: "Travel Gear", link: "/search?category=Travel%20Gear" },
  { text: "Luxury Wallets", link: "/search?category=Wallets" },
  { text: "Formal Attire", link: "/search?category=Formal%20Wear" },
].sort((a, b) => a.text.localeCompare(b.text));

const helpList = [
  { text: "FAQs", link: "#" },
  { text: "Support", link: "#" },
  { text: "Contact Us", link: "#" },
  { text: "Returns", link: "#" },
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
    <div className="w-full border-b border-[#E0E0E0] max-[840px]:hidden">
      <div className="max-w-[1580px] m-auto h-14 flex justify-between px-5 min-[1080px]:px-32 items-center">
        <div className="flex justify-center items-center gap-1">
          <CustomDropDown heading="All Category" items={categoryList} />
          <Link to="/search">
            <div
              className={`relative w-fit h-8 hover:bg-[#E6F0FF] cursor-pointer py-5 px-2.5 flex justify-center items-center rounded-lg`}
            >
              All Products
            </div>
          </Link>
          <Link to="/search?sort=discount_high">
            <div
              className={`relative w-fit h-8 hover:bg-[#E6F0FF] cursor-pointer py-5 px-2.5 flex justify-center items-center rounded-lg`}
            >
              Highly Discounted Items
            </div>
          </Link>
          <Link to="/search?sort=rating_high">
            <div
              className={`relative w-fit h-8 hover:bg-[#E6F0FF] cursor-pointer py-5 px-2.5 flex justify-center items-center rounded-lg`}
            >
              Highly Rated Items
            </div>
          </Link>
          <CustomDropDown heading="Help" items={helpList} />
        </div>
        <div className="flex justify-center items-center gap-1">
          <CustomDropDown
            heading="USD"
            items={currencyList}
            className="max-[1200px]:hidden"
          />
          <CustomDropDown
            heading="English"
            items={languageList}
            className="max-[870px]:hidden"
          />
        </div>
      </div>
    </div>
  );
};

export default Menubar;
