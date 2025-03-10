import React from "react";
import { useState } from "react";
import { FaTh, FaBars } from "react-icons/fa";
import { MdKeyboardArrowDown } from "react-icons/md";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import SidebarFilter from "../components/SidebarFilter";
import ProductCardGrid from "../components/ProductCardGrid";
import Pagination from "../components/Pagination";
import ProductCard from "../components/ProductCard";

const SearchPage = () => {
  const [gridView, setGridView] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setitemsPerPage] = useState(9);

  // const itemsPerPage = 9; // Number of products per page

  const products = [
    {
      image: "/cloth/1.jpg",
      name: "Stylish Cotton T-Shirt - Multiple Colors",
      currentPrice: 24.0,
      previousPrice: 30.0,
      rating: 4.0,
      orders: 120,
      shipping: "Free Shipping",
      description:
        "Soft and comfortable cotton T-shirt available in multiple colors.",
    },
    {
      image: "/cloth/2.jpg",
      name: "Unisex Blue T-Shirt - Premium Fabric",
      currentPrice: 29.9,
      previousPrice: 35.0,
      rating: 4.2,
      orders: 85,
      shipping: "Free Shipping",
      description:
        "High-quality unisex T-shirt in blue with premium breathable fabric.",
    },
    {
      image: "/cloth/3.jpg",
      name: "Casual Winter Jacket - Brown Color",
      currentPrice: 790.5,
      previousPrice: 850.0,
      rating: 4.8,
      orders: 60,
      shipping: "Free Shipping",
      description:
        "Stylish brown winter jacket with cozy interior for warmth and comfort.",
    },
    {
      image: "/cloth/4.jpg",
      name: "Dark Blue Denim Shorts - Men’s Collection",
      currentPrice: 12.0,
      previousPrice: 20.0,
      rating: 3.9,
      orders: 200,
      shipping: "Free Shipping",
      description:
        "Classic dark blue denim shorts with a modern slim-fit design.",
    },
    {
      image: "/cloth/5.jpg",
      name: "Lightweight Travel Jeans Bag - Unisex",
      currentPrice: 192.5,
      previousPrice: 220.0,
      rating: 4.6,
      orders: 90,
      shipping: "Free Shipping",
      description:
        "Spacious and lightweight travel bag made with durable denim material.",
    },
    {
      image: "/tech/6.jpg",
      name: "GoPro HERO6 4K Action Camera - Black",
      currentPrice: 99.5,
      previousPrice: 1128.0,
      rating: 4.2,
      orders: 75,
      shipping: "Free Shipping",
      description:
        "High-performance 4K action camera for adventure and sports recording.",
    },
    {
      image: "/interior/1.jpg",
      name: "Office Chair Soft Material - Yellow Color",
      currentPrice: 390.0,
      previousPrice: null,
      rating: 3.5,
      orders: 61,
      shipping: "Free Shipping",
      description:
        "Ergonomic office chair with soft cushioning for long hours of comfort.",
    },
    {
      image: "/cloth/7.jpg",
      name: "Great Product Name Here - New Model",
      currentPrice: 176.0,
      previousPrice: null,
      rating: 5.0,
      orders: 61,
      shipping: "Free Shipping",
      description:
        "High-quality new model clothing item for casual and formal wear.",
    },
    {
      image: "/interior/3.jpg",
      name: "Ceramic Jug for Kitchen - Medium Size",
      currentPrice: 998.95,
      previousPrice: null,
      rating: 4.5,
      orders: 61,
      shipping: "Free Shipping",
      description:
        "Elegant ceramic jug perfect for serving water or juice in the kitchen.",
    },
    {
      image: "/interior/4.jpg",
      name: "Interior Plant with Natural Vase",
      currentPrice: 68.99,
      previousPrice: 94.0,
      rating: 3.2,
      orders: 61,
      shipping: "Free Shipping",
      description:
        "Beautiful indoor plant with a stylish natural vase for home decor.",
    },
    {
      image: "/interior/5.jpg",
      name: "Airbed Blue Color - Soft Material with Pump",
      currentPrice: 498.95,
      previousPrice: null,
      rating: 4.7,
      orders: 61,
      shipping: "Free Shipping",
      description:
        "Comfortable airbed with an easy-to-use pump for home or travel use.",
    },
    {
      image: "/tech/5.jpg",
      name: "Gaming Headset with Microphone",
      currentPrice: 98.95,
      previousPrice: 149.99,
      rating: 4.2,
      orders: 61,
      shipping: "Free Shipping",
      description:
        "High-quality gaming headset with noise cancellation and a built-in mic.",
    },
  ];

  // Pagination Logic
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  return (
    <div>
      <div className="w-full pb-6 bg-[#F7FAFC] h-full">
        <div className="max-w-[1580px] px-32 m-auto h-full">
          {/* Breadcrumb */}
          <nav className="text-[#8B96A5] text-base py-6">
            <ul className="flex space-x-2">
              <li>
                <a href="#" className="hover:underline">
                  Home
                </a>
              </li>
              <li>{" > "}</li>
              <li>
                <a href="#" className="hover:underline">
                  Clothings
                </a>
              </li>
              <li>{" > "}</li>
              <li>
                <a href="#" className="hover:underline">
                  Men’s wear
                </a>
              </li>
              <li>{" > "}</li>
              <li>
                <span className="text-gray-400">Summer clothing</span>
              </li>
            </ul>
          </nav>

          {/* Search Section */}

          <div className="flex h-full">
            {/* Search Filters */}
            <div className="w-[20%]">
              <SidebarFilter />
            </div>

            {/* Search Results */}

            <div className="w-[80%] px-2">
              <div className="flex w-full items-center justify-between p-3 border rounded-lg border-[#E0E0E0] bg-white">
                {/* Left Side: Item Count */}
                <p className="text-gray-700 font-medium">
                  12,911 items in{" "}
                  <span className="font-bold">Mobile accessory</span>
                </p>

                {/* Right Side: Controls */}
                <div className="flex items-center gap-4">
                  {/* Checkbox */}
                  <label className="flex items-center gap-2 text-gray-700">
                    <input
                      type="checkbox"
                      className="w-4 h-4 border-gray-300 rounded"
                    />
                    Verified only
                  </label>

                  {/* Dropdown */}
                  <div className="relative">
                    <select className="border appearance-none border-[#E0E0E0] px-3 py-1.5 rounded-md focus:outline-none focus:ring focus:border-blue-300">
                      <option>Featured</option>
                      <option>Newest</option>
                      <option>Price: Low to High</option>
                      <option>Price: High to Low</option>
                    </select>
                    <div className="absolute top-1/2 right-2 transform -translate-y-1/2 pointer-events-none text-2xl text-gray-400">
                      <MdKeyboardArrowDown />
                    </div>
                  </div>

                  {/* View Toggle Buttons */}
                  <div className="flex border border-[#E0E0E0] rounded-md overflow-hidden">
                    <button
                      onClick={() => setGridView(true)}
                      className={`p-2 cursor-pointer ${
                        gridView ? "bg-gray-200" : "bg-white"
                      } hover:bg-gray-300`}
                    >
                      <FaTh className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setGridView(false)}
                      className={`p-2 cursor-pointer ${
                        !gridView ? "bg-gray-200" : "bg-white"
                      } hover:bg-gray-300`}
                    >
                      <FaBars className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Search Results */}

              <div className="filtered">
                {gridView ? (
                  <div className="grid grid-cols-3 max-[1080px]:grid-cols-2 max-[820px]:grid-cols-1 gap-6 py-5">
                    {currentProducts.map((product, index) => (
                      <ProductCardGrid key={index} product={product} />
                    ))}
                  </div>
                ) : (
                  <div className="py-5 flex flex-col gap-3">
                    {currentProducts.map((product, index) => (
                      <ProductCard key={index} product={product} />
                    ))}
                  </div>
                )}
              </div>

              {/* End  */}
            </div>
          </div>
          {/* Pagination Component */}
          <div className="flex justify-end pr-10">
            <Pagination
              currentPage={currentPage}
              totalPages={Math.ceil(products.length / itemsPerPage)}
              setCurrentPage={setCurrentPage}
              itemsPerPage={itemsPerPage}
              setItemsPerPage={setitemsPerPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
