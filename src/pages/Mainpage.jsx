import React from "react";
import { Link } from "react-router-dom";

const Mainpage = () => {
  const categoryList = [
    { text: "Automobiles", link: "/category/automobiles" },
    { text: "Clothes and wears", link: "/category/clothes-and-wears" },
    { text: "Home interiors", link: "/category/home-interiors" },
    { text: "Computer and tech", link: "/category/computer-and-tech" },
    { text: "Tools, equipments", link: "/category/tools-equipments" },
    { text: "Sports and outdoor", link: "/category/sports-and-outdoor" },
    { text: "Animal and pets", link: "/category/animal-and-pets" },
    { text: "Machinery tools", link: "/category/machinery-tools" },
    { text: "More category", link: "/category/more" },
  ];

  return (
    <div className="w-full bg-[#F7FAFC] h-full pb-6">
      <div className="pt-6 max-w-[1580px] m-auto h-full">
        {/* Category Section */}
        <div className="mx-32 h-[425px] bg-white rounded-lg flex gap-4 overflow-hidden border border-[#E0E0E0] p-3">
          <div className="min-w-[200px] w-[25%]">
            <ul className="">
              {categoryList.map((item, index) => (
                <Link key={index} to={item.link} className="block w-full">
                  <li className="hover:bg-[#E6F0FF] cursor-pointer py-2 px-4 rounded-lg whitespace-nowrap text-[#505050] hover:text-black text-lg">
                    {item.text}
                  </li>
                </Link>
              ))}
            </ul>
          </div>
          {/* Banner section */}
          <div className="w-[55%] bg-[url('/main-tech.png')] bg-cover bg-center min-w-[350px]">
            <div className="mt-16 ml-10">
              <h1 className="text-4xl">Latest Trends</h1>
              <h2 className="text-4xl font-semibold">Electronics items</h2>
              <Link to={"/category/computer-and-tech"}>
                <button className="mt-4 text-xl font-semibold bg-white py-2 pb-3 px-4 rounded-lg cursor-pointer hover:bg-slate-100 transition duration-300">
                  Learn more
                </button>
              </Link>
            </div>
          </div>
          {/* Right sidebar */}
          <div className="w-[20%] min-w-[187px] space-y-2 box-border">
            <div className="h-[44%] rounded-xl bg-[#E3F0FF] p-3">
              <div className="flex items-center mb-3 text-base">
                <img
                  src="/avatar.jpg"
                  className="w-11 h-11 rounded-full mr-2"
                  alt="User Avatar"
                />
                <span>
                  Hi, user <br /> let's get started
                </span>
              </div>
              <Link to={"/register"}>
                <button className="cursor-pointer mt-2 block text-center bg-blue-500 text-white border border-gray-300 rounded-lg py-2 text-sm w-full">
                  Join now
                </button>
              </Link>
              <Link to={"/login"}>
                <button className="cursor-pointer mt-2 block text-center bg-white text-blue-500 border border-gray-300 rounded-lg py-2 text-sm w-full">
                  Login
                </button>
              </Link>
            </div>
            <div className="h-[26%] rounded-xl bg-[#F38332] p-4">
              <p className="text-lg text-white">
                Get US 10$ off with a new supplier
              </p>
            </div>
            <div className="h-[26%] rounded-xl bg-[#55BDC3] p-4">
              <p className="text-lg text-white">
                Send quotes with supplier preferences
              </p>
            </div>
          </div>
        </div>
        {/* Deals Section */}
        <div className="deals mt-6 mx-32 h-70 max-[1325px]:h-full grid grid-cols-[0.6fr_2fr] max-[1325px]:grid-cols-1 overflow-hidden rounded-lg border border-[#E0E0E0] bg-white">
          {/* Deals Info Section */}
          <div className="mt-6 xl:ml-5 pb-6 flex flex-col max-[1325px]:justify-center max-[1325px]:w-full max-[1325px]:items-center">
            <header>
              <h3 className="text-2xl font-bold">Deals and offers</h3>
              <p className="text-gray-500">Hygiene equipments</p>
            </header>

            {/* Timer Section */}
            <div className="flex space-x-1 mt-4 max-[1325px]:ml-4">
              {["04 Days", "13 Hours", "38 Min", "29 Sec"].map(
                (item, index) => {
                  const [num, text] = item.split(" ");
                  return (
                    <div
                      key={index}
                      className="text-center bg-[#606060] rounded text-white p-2 px-3"
                    >
                      <span className="block text-lg font-bold">{num}</span>
                      <p className="text-sm">{text}</p>
                    </div>
                  );
                }
              )}
            </div>
          </div>

          {/* Product Grid with Borders */}
          <div className="max-[1080px]:overflow-x-auto">
            <div className="grid h-full grid-cols-5 max-[1325px]:grid-cols-3 max-[1080px]:grid-cols-[repeat(5,minmax(200px,1fr))] max-[1080px]:w-max">
              {[
                {
                  img: "/products/smart-watch.jpg",
                  name: "Smart Watches",
                  discount: "-25%",
                },
                {
                  img: "/products/laptop.jpg",
                  name: "Laptops",
                  discount: "-15%",
                },
                {
                  img: "/products/camera.jpg",
                  name: "GoPro Cameras",
                  discount: "-35%",
                },
                {
                  img: "/products/headphone.jpg",
                  name: "Headphones",
                  discount: "-25%",
                },
                {
                  img: "/products/smart-phone.jpg",
                  name: "Canon Cameras",
                  discount: "-25%",
                },
              ].map((product, index) => (
                <div
                  key={index}
                  className="flex flex-col justify-center space-y-3 items-center py-2 border border-[#E0E0E0]"
                >
                  <img
                    src={product.img}
                    alt={product.name}
                    className="w-[162px] h-[162px] object-cover"
                  />
                  <div className="flex flex-col justify-center items-center gap-1">
                    <h3 className="text-xl">{product.name}</h3>
                    <div className="rounded-2xl bg-[#FFE3E3] text-[#EB001B] p-1 px-6 flex justify-center items-center w-16">
                      {product.discount}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* {Home Outdoor Section} */}

        <div className="mt-6 mx-32 h-72 grid grid-cols-[0.6fr_2fr] max-[1080px]:grid-cols-1 overflow-hidden rounded-lg border border-[#E0E0E0] bg-white">
          <div className="bg-[url('/banners/interior.jpg')] bg-cover">
            <header className="pt-6 mx-5 ">
              <h3 className="text-2xl font-bold">Home and outdoor</h3>
            </header>
            <button className="ml-5 mt-4 px-4 py-2 bg-white shadow rounded-lg cursor-pointer hover:bg-gray-100 transition duration-300">
              Source Now
            </button>
          </div>

          <div className="max-[1080px]:overflow-x-auto">
            <div className="grid h-full grid-cols-4 max-[1080px]:grid-cols-[repeat(8,minmax(200px,1fr))] max-[1080px]:w-max">
              {[
                {
                  title: "Armchairs",
                  img: "/interior/1.jpg",
                  price: 25,
                },
                {
                  title: "Office chairs",
                  img: "/interior/2.jpg",
                  price: 19,
                },
                {
                  title: "Kitchen dishes",
                  img: "/interior/3.jpg",
                  price: 7,
                },
                {
                  title: "Home Plants",
                  img: "/interior/4.jpg",
                  price: 10,
                },
                {
                  title: "For Bedroom",
                  img: "/interior/5.jpg",
                  price: 12,
                },
                {
                  title: "Home Lighting",
                  img: "/interior/6.jpg",
                  price: 19,
                },
                {
                  title: "Best items",
                  img: "/interior/7.jpg",
                  price: 19,
                },
                {
                  title: "Category name",
                  img: "/interior/8.jpg",
                  price: 19,
                },
              ].map((product, index) => (
                <div
                  key={index}
                  className="relative bg-white border border-[#E0E0E0] p-4 flex flex-col items-center"
                >
                  <img
                    src={product.img}
                    alt={product.title}
                    className="absolute bottom-0 right-0 w-[72px] h-[72px] object-cover"
                  />
                  <h3 className="text-lg font-semibold text-gray-800">
                    {product.title}
                  </h3>
                  <p className="text-sm text-gray-500">
                    From USD {product.price}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mainpage;
