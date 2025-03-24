import React from "react";
import { Link } from "react-router-dom";

const RelatedProducts = ({ products, category }) => {
  const filteredProducts = products
    .filter((product) => product.categories.includes(category)) // Step 1: Filter
    .sort(() => Math.random() - 0.5) // Step 2: Shuffle
    .slice(0, 5); // Step 3: Pick first `count` items

  return (
    <div className=" rounded-md">
      <div className="mb-3">
        <p className="font-semibold text-xl">Related Products</p>
      </div>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(230px,1fr))] gap-5">
        {filteredProducts.map((product, index) => (
          <Link key={index} to={`/product/${product._id}`}>
            <div
              key={index}
              className="border h-full group border-[#E0E0E0] cursor-pointer rounded-lg p-3 bg-white transition min-w-56"
            >
              {/* Product Image */}
              <div className="w-full h-fit flex justify-center items-center">
                <img
                  src={product.image}
                  alt="product"
                  className="w-full h-full object-cover rounded-md group-hover:scale-105 transition-transform duration-300 ease-in-out"
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
  );
};

export default RelatedProducts;
