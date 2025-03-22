import React, { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import ProductPageCard from "../components/ProductPageCard";
import DiscountBanner from "../components/DiscountBanner";
import { ProductContext } from "../context/ProductContext";

const ProductPage = () => {
  const { products, loading } = useContext(ProductContext);
  const { id } = useParams();

  if (loading)
    return (
      <div className="w-full bg-[#F7FAFC] h-screen">
        <div className="pt-6 max-w-[1580px]  m-auto h-full">
          <p className="mx-5 min-[1080px]:mx-32">Loading products...</p>
        </div>
      </div>
    );

  // console.log(products)

  // Find product by ID
  const product = products.find((p) => p._id === id);

  if (!product) return (<div className="w-full bg-[#F7FAFC] h-screen">
    <div className="pt-6 max-w-[1580px]  m-auto h-full">
      <p className="mx-5 min-[1080px]:mx-32">Product not found</p>
    </div>
  </div>);

  return (
    <div>
      <div className="w-full pb-6 bg-[#F7FAFC] flex justify-center items-center h-full">
        <div className="max-w-[1580px] min-[1340px]:px-32 px-5 max-[380px]:px-0  h-full flex justify-center items-center">
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
                  <Link to={`/search?category=${product.categories[0]}`} className="hover:underline">
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
