import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ProductsStartPriceSection from "../components/ProductsStartPriceSection";
import InquirySection from "../components/InquirySection";
import RecommededItems from "../components/RecommededItems";
import ExtraServicesSection from "../components/ExtraServicesSection";
import SupplierByRegionSection from "../components/SupplierByRegionSection";
// import NewsletterSection from "../components/NewsletterSection";
import { ProductContext } from "../context/ProductContext";
import AuthContext from "../context/AuthContext";
import ResponsiveText from "../components/ResponsiveText";
import Timer from "../components/Timer";
const Mainpage = () => {
  const { products, loading } = useContext(ProductContext);
  const { user, logout } = useContext(AuthContext);
  const [deals, setDeals] = useState([]);
  const [recommendedProducts, setRecommendedProducts] = useState([]);

  // console.log(user);

  // const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    // navigate("/login"); // Redirect to login after logout
  };

  const categoryList = [
    { text: "Home Interiors", link: "/search?category=Interiors" }, // 9 occurrences
    // { text: "Electronic Devices", link: "/search?category=Electronics" }, // 8 occurrences
    { text: "Technology Gadgets", link: "/search?category=Tech" }, // 7 occurrences
    { text: "Fashion Clothing", link: "/search?category=Clothing" }, // 6 occurrences
    { text: "Home Decoration", link: "/search?category=Home%20Decor" }, // 6 occurrences
    { text: "Modern Furniture", link: "/search?category=Furniture" }, // 4 occurrences
    { text: "Casual Wear", link: "/search?category=Casual%20Wear" }, // 4 occurrences
    {
      text: "Kitchen Appliances",
      link: "/search?category=Kitchen%20Appliances",
    }, // New
    { text: "Smartphones", link: "/search?category=Smartphones" }, // New
    { text: "More Categories", link: "/search" }, // Additional category
  ];

  // const deals = products
  //   .filter((product) => product.previousPrice !== null) // Exclude products with null previous price
  //   .map((product) => ({
  //     type: product.type, // 1. Product Type
  //     discount: Math.round(
  //       ((product.previousPrice - product.currentPrice) /
  //         product.previousPrice) *
  //         100
  //     ), // 2. Discount Percentage
  //     image: product.image, // 3. Image URL
  //     id: product._id, // 4. Product ID
  //   }))
  //   .sort(() => Math.random() - 0.5) // Shuffle products
  //   .slice(0, 5); // Keep only 5 products

  // console.log(deals)

  useEffect(() => {
    if (!loading && products.length > 0) {
      const selectedDeals = products
        .reduce((acc, product) => {
          const { previousPrice, currentPrice, type, image, _id } = product;

          if (previousPrice && currentPrice && previousPrice > currentPrice) {
            const discount = Math.round(
              ((previousPrice - currentPrice) / previousPrice) * 100
            );

            acc.push({ type, discount, image, id: _id });
          }

          return acc;
        }, [])
        .sort(() => Math.random() - 0.5)
        .slice(0, 5);

      setDeals(selectedDeals);
      // console.log(deals);

      const selectedRecommendedProducts = products
        .sort(() => Math.random() - 0.5)
        .slice(0, 10);

      setRecommendedProducts(selectedRecommendedProducts);
    }
  }, [loading, products]);

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

  // const recommendedProducts = products
  //   .sort(() => Math.random() - 0.5)
  //   .slice(0, 10);

  // const homeAndOutdoor = products.filter((product) =>
  //   product.categories.includes("Interiors")
  // );

  // console.log(homeAndOutdoor);

  if (loading)
    return (
      <div className="w-full bg-[#F7FAFC] h-screen">
        <div className="pt-6 max-w-[1404px]  m-auto h-full">
          <div className="mx-5 min-[1000px]:mx-10">
            <div className="flex justify-center items-center h-[85vh] -translate-y-22">
              <div
                className="w-16 h-16 border-4 border-blue-500 border-y-transparent rounded-full animate-spin"
                style={{ animationDuration: "0.5s" }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    );

  return (
    <div className="w-full bg-[#F7FAFC] h-full">
      <div className="pt-6 max-w-[1404px] m-auto h-full">
        <div className="mx-5 min-[1000px]:mx-10 h-[425px] max-[600px]:h-[250px] max-[840px]:p-0 bg-white rounded-lg flex gap-4 overflow-hidden border border-[#E0E0E0] p-3">
          {/* Category Section */}
          <div className="min-w-[200px] w-[25%] max-[840px]:hidden">
            <ul className="">
              {categoryList.map((item, index) => (
                <Link key={index} to={item.link} className="block w-full">
                  <li className="hover:bg-[#E6F0FF] cursor-pointer py-2 px-4 rounded-lg whitespace-nowrap text-[#505050] hover:text-black text-lg transition-all duration-200 ease-in-out">
                    {item.text}
                  </li>
                </Link>
              ))}
            </ul>
          </div>
          {/* Banner section */}
          <div className="w-[55%] bg-[url('/main-tech.png')] max-[840px]:-mt-[1px] bg-cover bg-center max-[840px]:w-full">
            <div className="mt-16 ml-10 max-[600px]:mt-5 max-[600px]:ml-5">
              <h1 className="text-4xl max-[600px]:text-2xl">Latest Trends</h1>
              <h2 className="text-4xl max-[600px]:text-2xl font-semibold">
                Electronics items
              </h2>
              <Link to={"/search?category=Electronics"}>
                <button className="mt-4 text-xl max-[600px]:text-base font-semibold bg-white py-2 pb-3 px-4 max-[600px]:px-3 max-[600px]:py-2 rounded-lg cursor-pointer hover:bg-slate-100 transition duration-300">
                  Learn more
                </button>
              </Link>
            </div>
          </div>
          {/* Right sidebar */}
          <div className="w-[20%] min-w-[187px] flex flex-col space-y-2 box-border max-[840px]:hidden">
            <div className="h-fit rounded-xl bg-[#E3F0FF] p-3">
              <div className="flex items-center mb-3 text-base">
                <img
                  src="/avatar.jpg"
                  className="w-11 h-11 rounded-full mr-2"
                  alt="User Avatar"
                />
                {user ? (
                  <div className="flex flex-col">
                    <span className="line-clamp-2">Hi, {user.name}</span>
                    <span>Welcome back</span>
                  </div>
                ) : (
                  <span>
                    Hi, user <br /> let's get started
                  </span>
                )}
              </div>
              {user ? (
                <>
                  <Link to={"/cart"}>
                    <button className="cursor-pointer mt-2 block text-center bg-blue-500 text-white border border-gray-300 rounded-lg py-2 text-sm w-full">
                      Go to Cart
                    </button>
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="cursor-pointer mt-2 block text-center bg-white text-blue-500 border border-gray-300 rounded-lg py-2 text-sm w-full"
                  >
                    Log Out
                  </button>
                </>
              ) : (
                <>
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
                </>
              )}
            </div>
            <div className="grow rounded-xl bg-[#F38332] p-4 max-[1300px]:p-3 flex items-center justify-center">
              <div className="text-white">
                <ResponsiveText fontmax="text-lg" fontmin="text-base">
                  Get US 10$ off with a new supplier
                </ResponsiveText>
              </div>
            </div>
            <div className="grow rounded-xl bg-[#55BDC3] p-4 max-[1300px]:p-3 flex items-center justify-center">
              <div className="text-white">
                <ResponsiveText fontmax="text-lg" fontmin="text-base">
                  Send quotes with supplier preferences
                </ResponsiveText>
              </div>
            </div>
          </div>
        </div>
        {/* Deals Section */}
        <div className="deals mt-6 mx-5 min-[1000px]:mx-10 h-70 max-[1325px]:h-full grid grid-cols-[0.6fr_2fr] max-[1325px]:grid-cols-1 overflow-hidden rounded-lg border border-[#E0E0E0] bg-white">
          {/* Deals Info Section */}
          <div className="mt-6 xl:ml-5 pb-6 flex flex-col max-[1325px]:justify-center max-[1325px]:w-full max-[1325px]:items-center min-[1325px]:mr-5">
            <header>
              <h3 className="text-2xl font-bold">Deals and offers</h3>
              <p className="text-gray-500">Hygiene equipments</p>
            </header>

            {/* Timer Section */}
            <Timer />

            {/* <div className="flex space-x-1 mt-4 max-[1325px]:ml-4">
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
            </div> */}
          </div>

          {/* Product Grid with Borders */}
          <div className="max-[870px]:overflow-x-auto">
            <div className="grid h-full grid-cols-5 max-[1325px]:grid-cols-3 max-[870px]:grid-cols-[repeat(5,minmax(200px,1fr))] max-[870]:w-max">
              {deals.map((product, index) => (
                <Link to={`/product/${product.id}`} key={index}>
                  <div
                    key={index}
                    className="flex group flex-col justify-center space-y-3 items-center py-2 border h-full border-[#E0E0E0]"
                  >
                    <img
                      src={product.image}
                      alt={product.type}
                      // width={162}
                      // height={162}
                      className="w-[162px] h-[162px] object-cover group-hover:scale-110 transition-transform duration-300 ease-in-out"
                    />
                    <div className="flex flex-col justify-center items-center gap-1">
                      <h3 className="text-lg">{product.type}</h3>
                      <div className="rounded-2xl bg-[#FFE3E3] text-[#EB001B] p-1 px-6 flex justify-center items-center w-16">
                        -{product.discount}%
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* {Home Outdoor Section} */}
        {
          <ProductsStartPriceSection
            products={homeAndOutdoor}
            heading="Home and outdoor"
            link="/search?category=Interiors"
            banner="/banners/interior.jpg"
          />
        }

        {/* {Electronics and Gadgets Section} */}
        {
          <ProductsStartPriceSection
            products={electronics}
            heading="Consumer electronics and gadgets"
            link="/search?category=Electronics"
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
      </div>
    </div>
  );
};

export default Mainpage;
