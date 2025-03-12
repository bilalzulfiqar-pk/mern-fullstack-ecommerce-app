import React from "react";

const DiscountBanner = () => {
  return (
    <div className={`hidden sm:block`}>
      <div className="flex justify-between py-8 items-center bg-gradient-to-r from-blue-500 to-blue-700 p-6 rounded-lg text-white">
        <div>
          <h2 className="text-xl font-semibold">
            Super discount on more than 100 USD
          </h2>
          <p className="text-base text-[#BDD7FF]">
            Have you ever finally just write dummy info
          </p>
        </div>
        <button className="bg-[#FF9017] hover:bg-[#e98315] cursor-pointer transition duration-300 text-white px-4 py-2 rounded-lg font-semibold">
          Shop now
        </button>
      </div>
    </div>
  );
};

export default DiscountBanner;
