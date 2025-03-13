import React from "react";

const RecommededItems = ({ products }) => {
  return (
    <div className="mx-5 min-[1080px]:mx-32">
      <div className="mb-3">
        <p className="font-semibold text-3xl">Recommeded items</p>
      </div>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(230px,1fr))] gap-5">
        {products.map((product, index) => (
          <div key={index} className="border border-[#E0E0E0] cursor-pointer rounded-lg p-3 bg-white transition min-w-56">
            {/* Product Image */}
            <div className="w-full h-fit flex justify-center items-center">
              <img
                src={product.img}
                alt="product"
                className="w-full h-full object-cover rounded-md"
              />
            </div>

            {/* Product Details */}
            <div className="mt-3">
              <p className="text-lg font-semibold">{product.price}</p>
              <p className="text-[#8B96A5] text-lg">
                {product.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommededItems;
