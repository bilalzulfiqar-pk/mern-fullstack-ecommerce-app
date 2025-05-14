import React, { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import ProductPageCard from "../components/ProductPageCard";
import DiscountBanner from "../components/DiscountBanner";
import { ProductContext } from "../context/ProductContext";
import RelatedProducts from "../components/RelatedProducts";
import ReviewsSection from "../components/ReviewsSection";

const ProductPage = () => {
  const { products, loading } = useContext(ProductContext);
  const { id } = useParams();
  // console.log("test main");

  if (loading)
    return (
      <div className="w-full bg-[#F7FAFC] h-[100dvh]">
        <div className="pt-6 max-w-[1404px]  m-auto h-full">
          <div className="mx-5 min-[1000px]:mx-10">
            <div className="flex justify-center items-center h-[85dvh] -translate-y-22">
              <div
                className="w-16 h-16 border-4 border-blue-500 border-y-transparent rounded-full animate-spin"
                style={{ animationDuration: "0.5s" }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    );

  // console.log(products)

  // Find product by ID
  const product = products.find((p) => p._id === id);

  if (!product)
    return (
      <div className="w-full bg-[#F7FAFC] h-[100dvh]">
        <div className="pt-6 max-w-[1404px]  m-auto h-2/3 flex flex-col gap-3 justify-center items-center">
          <p className="mx-5 min-[1000px]:mx-10 text-2xl">Product not found</p>
          {/* Back to shop button */}
          <Link to={"/"}>
            <button className="flex justify-center items-center gap-2 px-4 py-2 text-white cursor-pointer transition duration-300 bg-gradient-to-r from-blue-500 to-blue-600 hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-700 rounded-lg">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19l-7-7 7-7"
                ></path>
              </svg>
              Back to Home
            </button>
          </Link>
        </div>
      </div>
    );

  return (
    <div>
      <div className="w-full pb-6 bg-[#F7FAFC] flex justify-center items-center h-full">
        <div className="max-w-[1404px] min-[1000px]:px-20 min-[1170px]:px-10 px-5 max-[380px]:px-0 w-full h-full flex justify-center items-center">
          <div className="w-full">
            {/* Breadcrumb */}
            <nav className="text-[#8B96A5] text-base py-6 max-[380px]:px-3">
              <ul className="flex space-x-2">
                <li>
                  <Link href="#" className="hover:underline">
                    Home
                  </Link>
                </li>
                <li>{" > "}</li>
                <li>
                  <Link
                    to={`/search?category=${product.categories[0]}`}
                    className="hover:underline"
                  >
                    {product.categories[0]}
                  </Link>
                </li>
                {/* <li>{" > "}</li>
                <li>
                  <Link href="#" className="hover:underline">
                    Men’s wear
                  </Link>
                </li>
                <li>{" > "}</li>
                <li>
                  <span className="text-gray-400">Summer clothing</span>
                </li> */}
              </ul>
            </nav>

            {/* Product */}

            <ProductPageCard product={product} />

            {/* Reviews and you may like */}
            <div className="mt-5 w-full max-[390px]:px-3">
              {/* Reviews */}
              <div className="w-full">
                <ReviewsSection />
              </div>
            </div>

            {/* Related Products  */}
            <div className="mt-5 max-[390px]:px-3">
              <RelatedProducts
                products={products}
                category={product.categories[0]}
              />
            </div>

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
