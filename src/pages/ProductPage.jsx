import React from "react";
import { Link } from "react-router-dom";
import ProductPageCard from "../components/ProductPageCard";
import DiscountBanner from "../components/DiscountBanner";

const ProductPage = () => {
  return (
    <div>
      <div className="w-full pb-6 bg-[#F7FAFC] flex justify-center items-center h-full">
        <div className="max-w-[1580px] min-[1300px]:px-32 px-5  h-full flex justify-center items-center">
          <div className="">
            {/* Breadcrumb */}
            <nav className="text-[#8B96A5] text-base py-6">
              <ul className="flex space-x-2">
                <li>
                  <Link href="#" className="hover:underline">
                    Home
                  </Link>
                </li>
                <li>{" > "}</li>
                <li>
                  <Link href="#" className="hover:underline">
                    Clothings
                  </Link>
                </li>
                <li>{" > "}</li>
                <li>
                  <Link href="#" className="hover:underline">
                    Men’s wear
                  </Link>
                </li>
                <li>{" > "}</li>
                <li>
                  <span className="text-gray-400">Summer clothing</span>
                </li>
              </ul>
            </nav>

            {/* Product */}

            <ProductPageCard />

            {/* Discounted Banner */}
            <div className="mt-5">
              <DiscountBanner />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
