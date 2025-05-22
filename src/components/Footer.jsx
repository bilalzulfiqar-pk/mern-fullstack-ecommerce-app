import React from "react";
import { FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { Link } from "react-router-dom";
import NewsletterSection from "./NewsletterSection";
import { useLocation } from "react-router-dom";
import BottomSection from "./BottomSection";

const Footer = () => {
  const location = useLocation();

  // Define the paths where newsletter should NOT appear
  const hideNewsletterOn = ["/login", "/register", "/settings", "/orders"];

  // Define URL paths where the custom div is hidden
  const hideCustomDivOn = ["/login", "/register", "/settings"];

  const showBottomSectionOn = ["/login", "/register", "/settings"];

  // const shouldHideNewsletter = hideNewsletterOn.includes(location.pathname);

  const shouldHideNewsletter = hideNewsletterOn.some((path) =>
    location.pathname.startsWith(path)
  );

  const shouldHideCustomDiv = hideCustomDivOn.some((path) =>
    location.pathname.startsWith(path)
  );

  const shouldShowBottomSection = showBottomSectionOn.some((path) =>
    location.pathname.startsWith(path)
  );
  // console.log(shouldHideCustomDiv);

  return (
    <footer>
      <div className="bg-white w-full">
        {/* Newsletter Section */}
        {/* Conditionally render newsletter */}
        {!shouldHideNewsletter && <NewsletterSection />}

        {!shouldHideCustomDiv && (
          <div className="py-10 pb-15 mx-auto px-5 min-[1000px]:px-10 max-w-[1404px]">
            <div className="container1">
              <div className="flex gap-5 max-[880px]:flex-col">
                {/* Brand Section */}
                <div className="w-[25%] max-[880px]:w-full pr-5">
                  <div className="flex items-center">
                    <div className="logo text-4xl text-[#8cb7f5] font-semibold">
                      eStore
                    </div>
                  </div>
                  <p className="text-gray-500 mt-3 text-lg">
                    Best information about the company goes here but now lorem
                    ipsum is.
                  </p>

                  {/* Social Icons */}
                  <div className="flex max-[600px]:flex-wrap space-x-3 max-[600px]:gap-y-3 mt-4">
                    <Link
                      href="#"
                      className="text-white hover:text-blue-500 text-lg rounded-full bg-[#BDC4CD] p-2 transition"
                    >
                      <FaFacebookF />
                    </Link>
                    <Link
                      href="#"
                      className="text-white hover:text-black text-lg rounded-full bg-[#BDC4CD] p-2 transition"
                    >
                      <FaXTwitter />
                    </Link>
                    <Link
                      href="#"
                      className="text-white hover:text-[#016DAB] text-lg rounded-full bg-[#BDC4CD] p-2 transition"
                    >
                      <FaLinkedinIn />
                    </Link>
                    <Link
                      href="#"
                      className="text-white hover:text-[#dd2a7b] text-lg rounded-full bg-[#BDC4CD] p-2 transition"
                    >
                      <AiFillInstagram />
                    </Link>
                    <Link
                      href="#"
                      className="text-white hover:text-red-500 text-lg rounded-full bg-[#BDC4CD] p-2 transition"
                    >
                      <FaYoutube />
                    </Link>
                  </div>
                </div>

                <div className="flex gap-3 whitespace-nowrap w-[75%] max-[880px]:w-full max-[600px]:flex-wrap">
                  {/* About */}
                  <div className="grow">
                    <h3 className="font-semibold text-black">About</h3>
                    <ul className="text-gray-500 space-y-2 mt-3">
                      <li>
                        <Link href="#">About Us</Link>
                      </li>
                      <li>
                        <Link href="#">Find Store</Link>
                      </li>
                      <li>
                        <Link href="#">Categories</Link>
                      </li>
                      <li>
                        <Link href="#">Blogs</Link>
                      </li>
                    </ul>
                  </div>

                  {/* Partnership */}
                  <div className="grow">
                    <h3 className="font-semibold text-black">Partnership</h3>
                    <ul className="text-gray-500 space-y-2 mt-3">
                      <li>
                        <Link href="#">About Us</Link>
                      </li>
                      <li>
                        <Link href="#">Find Store</Link>
                      </li>
                      <li>
                        <Link href="#">Categories</Link>
                      </li>
                      <li>
                        <Link href="#">Blogs</Link>
                      </li>
                    </ul>
                  </div>

                  {/* Information */}
                  <div className="grow">
                    <h3 className="font-semibold text-black">Information</h3>
                    <ul className="text-gray-500 space-y-2 mt-3">
                      <li>
                        <Link href="#">Help Center</Link>
                      </li>
                      <li>
                        <Link href="#">Money Refund</Link>
                      </li>
                      <li>
                        <Link href="#">Shipping</Link>
                      </li>
                      <li>
                        <Link href="#">Contact Us</Link>
                      </li>
                    </ul>
                  </div>

                  {/* User Section */}
                  <div className="grow">
                    <h3 className="font-semibold text-black">For Users</h3>
                    <ul className="text-gray-500 space-y-2 mt-3">
                      <li>
                        <Link href="/login">Login</Link>
                      </li>
                      <li>
                        <Link href="/register">Register</Link>
                      </li>
                      <li>
                        <Link href="#">Settings</Link>
                      </li>
                      <li>
                        <Link href="#">My Orders</Link>
                      </li>
                    </ul>
                  </div>

                  {/* Get App */}
                  <div className="w-fit">
                    <h3 className="font-semibold text-black">Get App</h3>
                    <div className="mt-3">
                      <Link href="#" className="block mb-2">
                        <img
                          src="/appstore.png"
                          alt="App Store"
                          className="h-10"
                        />
                      </Link>
                      <Link href="#">
                        <img
                          src="/googleplay.png"
                          alt="Google Play"
                          className="h-10"
                        />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* <div className="bg-[#EFF2F4] border-t border-[#E0E0E0]">
        <div className="mx-5 min-[1000px]:mx-10 py-6 flex flex-col md:flex-row text-lg justify-between text-gray-500">
          <p>© 2025 Ecommerce.</p>
          <div className="flex items-center space-x-2">
            <span></span>
            <p></p>
          </div>
        </div>
      </div> */}

      {/* Bottom Section */}
      {shouldShowBottomSection && <BottomSection />}
    </footer>
  );
};

export default Footer;
