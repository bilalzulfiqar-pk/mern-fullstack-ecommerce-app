import React from "react";
import ShoppingCart from "../components/ShopingCart";
import { FaLock, FaCommentDots, FaTruck } from "react-icons/fa";
import DiscountBanner from "../components/DiscountBanner";
import { useCart } from "../context/CartContext";
import SavedForLater from "../components/SavedForLater";

const CartPage = () => {
  const { cartItems } = useCart();

  // console.log(cartItems);
  const cartCount = cartItems.reduce((count, item) => count + item.qty, 0);

  const features = [
    {
      icon: <FaLock />,
      title: "Secure payment",
      text: "Have you ever finally just",
    },
    {
      icon: <FaCommentDots />,
      title: "Customer support",
      text: "Have you ever finally just",
    },
    {
      icon: <FaTruck />,
      title: "Free delivery",
      text: "Have you ever finally just",
    },
  ];

  return (
    <div>
      <div className="w-full pb-6 bg-[#F7FAFC] h-full">
        <div className="max-w-[1580px] px-5 min-[1081px]:px-32 m-auto h-full">
          <div className="text-2xl font-semibold py-6">
            My cart {cartCount ? `(${cartCount})` : ""}
          </div>

          {/* Shopping Cart */}
          <div>
            <ShoppingCart />
          </div>

          {/* Features  */}
          <div className="flex justify-start max-[620px]:flex-col gap-15 py-6 items-center">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="p-4 bg-gray-200 rounded-full text-gray-500 text-xl">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-700">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 text-sm">{feature.text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Favorite Items */}
          <SavedForLater/>

          {/* Discounted Banner */}

          <DiscountBanner />
        </div>
      </div>
    </div>
  );
};

export default CartPage;
