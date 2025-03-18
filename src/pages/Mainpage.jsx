import React, { useContext } from "react";
import { Link } from "react-router-dom";
import ProductsStartPriceSection from "../components/ProductsStartPriceSection";
import InquirySection from "../components/InquirySection";
import RecommededItems from "../components/RecommededItems";
import ExtraServicesSection from "../components/ExtraServicesSection";
import SupplierByRegionSection from "../components/SupplierByRegionSection";
import NewsletterSection from "../components/NewsletterSection";
import Footer from "../components/Footer";
import { ProductContext } from "../context/ProductContext";
const Mainpage = () => {
  const { products, loading } = useContext(ProductContext);

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

  // const deals = [
  //   {
  //     img: "/tech/smart-watch.jpg",
  //     name: "Smart Watches",
  //     discount: "-25%",
  //   },
  //   {
  //     img: "/tech/laptop.jpg",
  //     name: "Laptops",
  //     discount: "-15%",
  //   },
  //   {
  //     img: "/tech/camera.jpg",
  //     name: "GoPro Cameras",
  //     discount: "-35%",
  //   },
  //   {
  //     img: "/tech/headphone.jpg",
  //     name: "Headphones",
  //     discount: "-25%",
  //   },
  //   {
  //     img: "/tech/smart-phone.jpg",
  //     name: "Canon Cameras",
  //     discount: "-25%",
  //   },
  // ];

  const deals = products
    .filter((product) => product.previousPrice !== null) // Exclude products with null previous price
    .map((product) => ({
      type: product.type, // 1. Product Type
      discount: Math.round(
        ((product.previousPrice - product.currentPrice) /
          product.previousPrice) *
          100
      ), // 2. Discount Percentage
      image: product.image, // 3. Image URL
    }))
    .sort(() => Math.random() - 0.5) // Shuffle products
    .slice(0, 5); // Keep only 5 products

  const homeAndOutdoor = [
    {
      title: "Armchairs",
      img: "https://res.cloudinary.com/db7jmsq76/image/upload/v1742135701/1_qdwtem.jpg",
      price: 250,
    },
    {
      title: "Office chairs",
      img: "https://res.cloudinary.com/db7jmsq76/image/upload/v1742135701/2_bcbhk6.jpg",
      price: 120,
    },
    {
      title: "Kitchen dishes",
      img: "https://res.cloudinary.com/db7jmsq76/image/upload/v1742135702/3_yisbza.jpg",
      price: 20,
    },
    {
      title: "Home Plants",
      img: "https://res.cloudinary.com/db7jmsq76/image/upload/v1742135702/4_ffe3jy.jpg",
      price: 10,
    },
    {
      title: "For Bedroom",
      img: "https://res.cloudinary.com/db7jmsq76/image/upload/v1742135702/5_ezydth.jpg",
      price: 80,
    },
    {
      title: "Home Lighting",
      img: "https://res.cloudinary.com/db7jmsq76/image/upload/v1742135702/6_iuv8yc.jpg",
      price: 19,
    },
    {
      title: "Best items",
      img: "https://res.cloudinary.com/db7jmsq76/image/upload/v1742135702/7_dqr1fv.jpg",
      price: 19,
    },
    {
      title: "Kitchen Appliances",
      img: "https://res.cloudinary.com/db7jmsq76/image/upload/v1742135702/8_wpyedw.jpg",
      price: 120,
    },
  ];

  const electronics = [
    {
      title: "Smartphones",
      img: "https://res.cloudinary.com/db7jmsq76/image/upload/v1742139012/3_rsh64i.jpg",
      price: 140,
    },
    {
      title: "Apple iPhone",
      img: "https://res.cloudinary.com/db7jmsq76/image/upload/v1742139012/4_o88nsk.jpg",
      price: 850,
    },
    {
      title: "For Gaming",
      img: "https://res.cloudinary.com/db7jmsq76/image/upload/v1742139013/5_duy6wi.jpg",
      price: 15,
    },
    {
      title: "Cameras",
      img: "https://res.cloudinary.com/db7jmsq76/image/upload/v1742139014/6_h1qmnk.jpg",
      price: 100,
    },
    {
      title: "Laptops & PC",
      img: "https://res.cloudinary.com/db7jmsq76/image/upload/v1742139014/7_jjpj8e.jpg",
      price: 1200,
    },
    {
      title: "Smartwatches",
      img: "https://res.cloudinary.com/db7jmsq76/image/upload/v1742139015/8_cvwab9.jpg",
      price: 19,
    },
    {
      title: "Headphones",
      img: "https://res.cloudinary.com/db7jmsq76/image/upload/v1742139016/9_jznvzr.jpg",
      price: 19,
    },
    {
      title: "Electric kettle",
      img: "https://res.cloudinary.com/db7jmsq76/image/upload/v1742139011/10_na6rot.jpg",
      price: 25,
    },
  ];

  // const recommendedProducts = [
  //   {
  //     img: "/cloth/1.jpg",
  //     price: "$24.00",
  //     description: "T-shirts with multiple colors, for men",
  //   },
  //   {
  //     img: "/cloth/2.jpg",
  //     price: "$29.90",
  //     description: "T-shirts with blue color, unisex model",
  //   },
  //   {
  //     img: "/cloth/3.jpg",
  //     price: "$790.50",
  //     description: "Casual Winter Jacket, Brown Color",
  //   },
  //   {
  //     img: "/cloth/4.jpg",
  //     price: "$12.00",
  //     description: "Jeans shorts for men darkblue color",
  //   },
  //   {
  //     img: "/cloth/5.jpg",
  //     price: "$192.50",
  //     description: "Lightweight Jeans bag for travel, Unisex model",
  //   },
  //   {
  //     img: "/tech/6.jpg",
  //     price: "$790.50",
  //     description: "GoPro HERO6 4K Action Camera - Black",
  //   },
  //   {
  //     img: "/interior/3.jpg",
  //     price: "$790.50",
  //     description: "Ceramic Jug for Kitchen, Medium size",
  //   },
  //   {
  //     img: "/interior/2.jpg",
  //     price: "$790.50",
  //     description: "Armchair for Home and Office, Yellow color",
  //   },
  //   {
  //     img: "/interior/5.jpg",
  //     price: "$790.50",
  //     description: "Airbed Blue Soft Material With Pump",
  //   },
  //   {
  //     img: "/tech/5.jpg",
  //     price: "$19.50",
  //     description: "Modern Product Name Goes Here",
  //   },
  // ];

  const recommendedProducts = products
    .sort(() => Math.random() - 0.5)
    .slice(0, 10);

  // const homeAndOutdoor = products.filter((product) =>
  //   product.categories.includes("Interiors")
  // );

  // console.log(homeAndOutdoor);

  if (loading)
    return (
      <div className="w-full bg-[#F7FAFC] h-screen">
        <div className="pt-6 max-w-[1580px]  m-auto h-full">
          <p className="mx-5 min-[1080px]:mx-32">Loading products...</p>
        </div>
      </div>
    );

  return (
    <div className="w-full bg-[#F7FAFC] h-full">
      <div className="pt-6 max-w-[1580px] m-auto h-full">
        <div className="mx-5 min-[1080px]:mx-32 h-[425px] bg-white rounded-lg flex gap-4 overflow-hidden border border-[#E0E0E0] p-3">
          {/* Category Section */}
          <div className="min-w-[200px] w-[25%] max-[840px]:hidden">
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
          <div className="w-[55%] bg-[url('/main-tech.png')] bg-cover bg-center min-w-[350px] max-[840px]:w-full">
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
          <div className="w-[20%] min-w-[187px] space-y-2 box-border max-[840px]:hidden">
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
        <div className="deals mt-6 mx-5 min-[1080px]:mx-32 h-70 max-[1325px]:h-full grid grid-cols-[0.6fr_2fr] max-[1325px]:grid-cols-1 overflow-hidden rounded-lg border border-[#E0E0E0] bg-white">
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
          <div className="max-[870px]:overflow-x-auto">
            <div className="grid h-full grid-cols-5 max-[1325px]:grid-cols-3 max-[870px]:grid-cols-[repeat(5,minmax(200px,1fr))] max-[870]:w-max">
              {deals.map((product, index) => (
                <div
                  key={index}
                  className="flex flex-col justify-center space-y-3 items-center py-2 border border-[#E0E0E0]"
                >
                  <img
                    src={product.image}
                    alt={product.type}
                    // width={162}
                    // height={162}
                    className="w-[162px] h-[162px] object-cover"
                  />
                  <div className="flex flex-col justify-center items-center gap-1">
                    <h3 className="text-lg">{product.type}</h3>
                    <div className="rounded-2xl bg-[#FFE3E3] text-[#EB001B] p-1 px-6 flex justify-center items-center w-16">
                      -{product.discount}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* {Home Outdoor Section} */}

        {
          <ProductsStartPriceSection
            products={homeAndOutdoor}
            heading="Home and outdoor"
            link="/home-and-outdoor"
            banner="/banners/interior.jpg"
          />
        }

        {/* {Electronics and Gadgets Section} */}

        {
          <ProductsStartPriceSection
            products={electronics}
            heading="Consumer electronics and gadgets"
            link="/electronics-and-gadgets"
            banner="/banners/tech.jpg"
          />
        }

        {/* {Inquiry Section} */}

        <InquirySection />

        {/* {Recommeded items Section} */}

        <RecommededItems products={recommendedProducts} />

        {/* {Extra Services Section} */}

        <ExtraServicesSection />

        {/* {Supplier by region Section} */}

        <SupplierByRegionSection />

        {/* {Newsletter Section} */}
        <NewsletterSection />
      </div>
    </div>
  );
};

export default Mainpage;
