import React from "react";
import { Link } from "react-router-dom";

const RecommededItems = ({ products }) => {
  return (
    <div className="mx-5 min-[1100px]:mx-10">
      <div className="mb-3">
        <p className="font-semibold text-3xl">Recommeded items</p>
      </div>
      <div className="w-full h-fit">
        <div className="grid grid-cols-[repeat(auto-fill,minmax(230px,1fr))] max-[540px]:grid-cols-1 gap-5">
          {products.map((product, index) => (
            <Link key={index} to={`/product/${product._id}`}>
              <div
                key={index}
                className="border h-full group flex flex-col border-[#E0E0E0] cursor-pointer rounded-lg p-3 bg-white transition"
              >
                {/* Product Image */}
                <div className="w-full h-fit flex justify-center items-center">
                  <img
                    src={product.image}
                    alt="product"
                    className="w-full max-w-[250px] aspect-square h-full object-cover rounded-md group-hover:scale-105 transition-transform duration-300 ease-in-out"
                  />
                </div>

                {/* Product Details */}
                <div className="mt-3">
                  <p className="text-lg font-semibold">
                    ${product.currentPrice.toFixed(2)}
                  </p>
                  <p className="text-[#8B96A5] text-base">{product.name}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecommededItems;
