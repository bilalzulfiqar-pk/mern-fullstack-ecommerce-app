import React from "react";
import { FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";

const Footer = () => {
  return (
    <footer>
      <div className="bg-white w-full">
        <div className="py-10 pb-15 mx-auto px-5 min-[1080px]:px-32 max-w-[1580px]">
          <div className="container1">
            <div className="flex gap-5 max-[880px]:flex-col">
              {/* Brand Section */}
              <div className="w-[25%] max-[880px]:w-full pr-5">
                <div className="flex items-center">
                <div className="logo text-4xl text-[#8cb7f5] font-semibold">eStore</div>
                </div>
                <p className="text-gray-500 mt-3 text-lg">
                  Best information about the company goes here but now lorem
                  ipsum is.
                </p>

                {/* Social Icons */}
                <div className="flex max-[600px]:flex-wrap space-x-3 max-[600px]:gap-y-3 mt-4">
                  <a href="#" className="text-white hover:text-blue-500 text-lg rounded-full bg-[#BDC4CD] p-2 transition">
                    <FaFacebookF />
                  </a>
                  <a href="#" className="text-white hover:text-black text-lg rounded-full bg-[#BDC4CD] p-2 transition">
                    <FaXTwitter />
                  </a>
                  <a href="#" className="text-white hover:text-[#016DAB] text-lg rounded-full bg-[#BDC4CD] p-2 transition">
                    <FaLinkedinIn />
                  </a>
                  <a href="#" className="text-white hover:text-[#dd2a7b] text-lg rounded-full bg-[#BDC4CD] p-2 transition">
                    <AiFillInstagram />
                  </a>
                  <a href="#" className="text-white hover:text-red-500 text-lg rounded-full bg-[#BDC4CD] p-2 transition">
                    <FaYoutube />
                  </a>
                </div>
              </div>

              <div className="flex gap-3 whitespace-nowrap w-[75%] max-[880px]:w-full max-[600px]:flex-wrap">
                {/* About */}
                <div className="grow">
                  <h3 className="font-semibold text-black">About</h3>
                  <ul className="text-gray-500 space-y-2 mt-3">
                    <li>
                      <a href="#">About Us</a>
                    </li>
                    <li>
                      <a href="#">Find Store</a>
                    </li>
                    <li>
                      <a href="#">Categories</a>
                    </li>
                    <li>
                      <a href="#">Blogs</a>
                    </li>
                  </ul>
                </div>

                {/* Partnership */}
                <div className="grow">
                  <h3 className="font-semibold text-black">Partnership</h3>
                  <ul className="text-gray-500 space-y-2 mt-3">
                    <li>
                      <a href="#">About Us</a>
                    </li>
                    <li>
                      <a href="#">Find Store</a>
                    </li>
                    <li>
                      <a href="#">Categories</a>
                    </li>
                    <li>
                      <a href="#">Blogs</a>
                    </li>
                  </ul>
                </div>

                {/* Information */}
                <div className="grow">
                  <h3 className="font-semibold text-black">Information</h3>
                  <ul className="text-gray-500 space-y-2 mt-3">
                    <li>
                      <a href="#">Help Center</a>
                    </li>
                    <li>
                      <a href="#">Money Refund</a>
                    </li>
                    <li>
                      <a href="#">Shipping</a>
                    </li>
                    <li>
                      <a href="#">Contact Us</a>
                    </li>
                  </ul>
                </div>

                {/* User Section */}
                <div className="grow">
                  <h3 className="font-semibold text-black">For Users</h3>
                  <ul className="text-gray-500 space-y-2 mt-3">
                    <li>
                      <a href="#">Login</a>
                    </li>
                    <li>
                      <a href="#">Register</a>
                    </li>
                    <li>
                      <a href="#">Settings</a>
                    </li>
                    <li>
                      <a href="#">My Orders</a>
                    </li>
                  </ul>
                </div>


              {/* Get App */}
              <div className="w-fit">
                <h3 className="font-semibold text-black">Get App</h3>
                <div className="mt-3">
                  <a href="#" className="block mb-2">
                    <img
                      src="/appstore.png"
                      alt="App Store"
                      className="h-10"
                    />
                  </a>
                  <a href="#">
                    <img
                      src="/googleplay.png"
                      alt="Google Play"
                      className="h-10"
                    />
                  </a>
                </div>
              </div>
              </div>

            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#EFF2F4]">
        {/* Bottom Section */}
        <div className="mx-5 min-[1080px]:mx-32 py-6 flex flex-col md:flex-row text-lg justify-between text-gray-500">
          <p>© 2025 Ecommerce.</p>
          <div className="flex items-center space-x-2">
            <span></span>
            <p></p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
