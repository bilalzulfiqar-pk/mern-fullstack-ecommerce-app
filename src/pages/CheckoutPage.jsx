import React from "react";
import ShoppingCart from "../components/ShopingCart";

const CheckoutPage = () => {
  return (
    <div>
      <div className="w-full pb-6 bg-[#F7FAFC] h-full">
        <div className="max-w-[1580px] px-5 md:px-32 m-auto h-full">
            <div className="text-2xl font-semibold py-6">
            My cart (3)
            </div>
            <div>
                <ShoppingCart/>
            </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
