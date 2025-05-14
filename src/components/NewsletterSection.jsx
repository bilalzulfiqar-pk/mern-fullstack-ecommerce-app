import React from "react";
import { MdOutlineEmail } from "react-icons/md";

const NewsletterSection = () => {
  return (
    <div className="bg-[#EFF2F4] w-full">
      <div className="mx-auto px-5 min-[1000px]:px-10 max-w-[1404px]">
        <div className=" py-10 px-4 flex justify-center">
          <div className="text-center max-w-2xl w-full">
            <h2 className="text-2xl font-semibold text-black">
              Subscribe on our newsletter
            </h2>
            <p className="text-[#606060] text-lg mt-2">
              Get daily news on upcoming offers from many suppliers all over the
              world
            </p>

            {/* Input Field and Button */}
            <div className="mt-5 flex justify-center">
              <div className="relative flex items-center w-full max-w-md max-[600px]:flex-col max-[600px]:gap-3">
                <div className="relative w-full">
                  {/* Icon */}
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <MdOutlineEmail className="text-2xl text-[#8B96A5]" />
                  </span>

                  {/* Input */}
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full pl-10 pr-4 py-2 border rounded-md outline-none text-base focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Button */}
                <button className="ml-3 px-5 py-2 bg-blue-600 cursor-pointer text-white rounded-md text-lg hover:bg-blue-700">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsletterSection;
