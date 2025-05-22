import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useCart } from "../context/CartContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import StripeCheckoutForm from "./StripeCheckoutForm";
import TestCardInfoButton from "./TestCardInfoButton";

const CartCheckout = () => {
  const { cartItems, loading, user, clearCart } = useCart();
  //   console.log(user);
  const cartCount = cartItems.reduce((count, item) => count + item.qty, 0);
  const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
  const navigate = useNavigate();
  const token = localStorage.getItem("token"); // Get the token from local storage
  const [showStripeCheckout, setShowStripeCheckout] = useState(false);

  const [shippingDetails, setShippingDetails] = useState({
    name: user?.name || "", // Pre-fill with user's name if available
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });

  const subtotal = useMemo(
    () =>
      cartItems.reduce(
        (acc, item) =>
          acc +
          (item.productId.previousPrice > 0
            ? item.productId.previousPrice
            : item.productId.currentPrice) *
            item.qty,
        0
      ),
    [cartItems]
  );

  const totalDiscount = useMemo(
    () =>
      cartItems.reduce((acc, item) => {
        const discount =
          item.productId.previousPrice && item.productId.currentPrice
            ? (item.productId.previousPrice - item.productId.currentPrice) *
              item.qty
            : 0;
        return acc + discount;
      }, 0),
    [cartItems]
  );

  const totalTax = useMemo(
    () =>
      cartItems.reduce((acc, item) => acc + item.productId.tax * item.qty, 0),
    [cartItems]
  );

  const total = useMemo(
    () => subtotal - totalDiscount + totalTax,
    [subtotal, totalDiscount, totalTax]
  );

  const handleClick = () => {
    if (
      !shippingDetails.name ||
      !shippingDetails.address ||
      !shippingDetails.city ||
      !shippingDetails.postalCode ||
      !shippingDetails.country
    ) {
      Swal.fire({
        title: "Error!",
        text: "Please fill out all the shipping details.",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    setShowStripeCheckout(true); // Trigger Stripe Checkout modal or form
  };

  const handlePlaceOrder = async () => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/orders/place-order`,
        {
          cartItems: cartItems.map((item) => ({
            productId: item.productId._id,
            qty: item.qty,
          })),
          shippingDetails,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      Swal.fire({
        title: "Success!",
        text: "Your order has been placed.",
        icon: "success",
        confirmButtonText: "OK",
      });

      clearCart(); // Clear the cart after placing the order
      navigate("/cart"); // Redirect to the cart page

      // Optionally, redirect to the order confirmation page or another page
      // window.location.href = "/order-confirmation"; // Example redirect
      // or use react-router's useHistory() to navigate
      // history.push("/order-confirmation"); // Example using react-router
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        "Something went wrong while placing the order.";

      Swal.fire({
        title: "Error!",
        text: message,
        icon: "error",
        confirmButtonText: "OK",
      });
      console.error("Order placement failed:", error);
    }
  };

  if (loading) {
    return (
      <>
        <div className="flex w-full justify-center flex-col gap-3 items-center h-[74vh] h-dvh-74 -translate-y-22">
          {/* Loading Cart... */}
          <div
            className="w-16 h-16 border-4 border-blue-500 border-y-transparent rounded-full animate-spin"
            style={{ animationDuration: "0.5s" }}
          ></div>
        </div>
      </>
    );
  }

  return (
    <div className="flex flex-col min-[900px]:flex-row gap-4">
      <div className="w-full flex flex-col min-[900px]:w-3/4 bg-white border border-[#E0E0E0] rounded-md p-4 max-[500px]:p-2">
        {cartItems.length < 1 ? (
          <div className="h-full flex items-center justify-center p-4 flex-col gap-1">
            <img
              src="cart-emty.png"
              alt="Empty Cart"
              className="object-cover"
            />
            <p className="text-3xl font-semibold">Empty Cart</p>
            <p className="text-lg">Go find the products you like.</p>
          </div>
        ) : (
          cartItems.map((item, index) => (
            <div
              key={item.productId._id}
              className={`flex max-[500px]:flex-col max-[500px]:justify-center max-[500px]:items-center ${
                index !== cartItems.length - 1
                  ? "border-b border-[#E0E0E0]"
                  : ""
              } py-4`}
            >
              <img
                src={item.productId.image}
                alt={item.productId.name}
                className="w-20 border border-[#E0E0E0] max-[500px]:w-40 max-[500px]:h-40 rounded-md h-20 object-cover"
              />
              <div className="ml-4 max-[500px]:mx-1 max-[500px]:w-full flex flex-col max-[500px]:items-center flex-1">
                <h2 className="text-lg font-semibold max-[500px]:text-center">
                  {item.productId.name}
                </h2>
                <p className="text-base text-gray-500 max-[500px]:text-center">
                  Size: {item.productId.sizes[0]}, Color: Any, Material:{" "}
                  {item.productId.material}
                  <br /> Seller: {item.productId.supplier.name}
                </p>
              </div>
              <div className="text-right flex flex-col max-[500px]:flex-row max-[500px]:justify-end max-[500px]:items-center max-[500px]:gap-3 max-[375px]:flex-col max-[500px]:mt-2">
                <div className="relative">
                  <div className="flex items-center space-x-2 min-[500px]:mt-2">
                    {/* Quantity Display */}
                    <span className="text-right w-full">
                      Quantity: {item.qty}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col max-[500px]:flex-row max-[500px]:gap-3 max-[500px]:justify-center max-[500px]:items-center">
                  <p className="text-lg ">
                    Total: $
                    {item.productId?.previousPrice
                      ? item.productId?.previousPrice.toFixed(2) * item.qty
                      : item.productId?.currentPrice.toFixed(2) * item.qty}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
        <div className="mt-auto border-t border-[#E0E0E0] flex items-center justify-between w-full p-4">
          {/* Back to shop button */}
          <Link to={"/search"}>
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
              Back to shop
            </button>
          </Link>

          <div className="text-lg">Total items: {cartCount} </div>
        </div>
      </div>

      {/* Right */}

      <div className="w-full min-[900px]:w-1/4">
        {/* Shipping Details Section */}
        <div className="p-4 px-3 border border-[#E0E0E0] rounded-lg mb-3 bg-white">
          <p className="text-black mb-2">Shipping Details</p>
          <div className="flex flex-col px-1 overflow-hidden">
            <label htmlFor="fullName" className="text-sm text-gray-600">
              Recipient Name
            </label>
            <input
              id="fullName"
              type="text"
              placeholder="Full Name"
              value={shippingDetails.name}
              onChange={(e) =>
                setShippingDetails({ ...shippingDetails, name: e.target.value })
              }
              className="w-full p-2 mt-2 mb-4 border border-gray-300 rounded placeholder:text-gray-300 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-gray-400 hover:border-gray-400"
            />

            <label htmlFor="address" className="text-sm text-gray-600">
              Address
            </label>
            <input
              id="address"
              type="text"
              placeholder="Address"
              value={shippingDetails.address}
              onChange={(e) =>
                setShippingDetails({
                  ...shippingDetails,
                  address: e.target.value,
                })
              }
              className="w-full p-2 mt-2 mb-4 border border-gray-300 rounded placeholder:text-gray-300 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-gray-400 hover:border-gray-400"
            />

            <label htmlFor="city" className="text-sm text-gray-600">
              City
            </label>
            <input
              id="city"
              type="text"
              placeholder="City"
              value={shippingDetails.city}
              onChange={(e) =>
                setShippingDetails({ ...shippingDetails, city: e.target.value })
              }
              className="w-full p-2 mt-2 mb-4 border border-gray-300 rounded placeholder:text-gray-300 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-gray-400 hover:border-gray-400"
            />

            <label htmlFor="postalCode" className="text-sm text-gray-600">
              Postal Code
            </label>
            <input
              id="postalCode"
              type="text"
              placeholder="Postal Code"
              value={shippingDetails.postalCode}
              onChange={(e) =>
                setShippingDetails({
                  ...shippingDetails,
                  postalCode: e.target.value,
                })
              }
              className="w-full p-2 mt-2 mb-4 border border-gray-300 rounded placeholder:text-gray-300 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-gray-400 hover:border-gray-400"
            />

            <label htmlFor="country" className="text-sm text-gray-600">
              Country
            </label>
            <input
              id="country"
              type="text"
              placeholder="Country"
              value={shippingDetails.country}
              onChange={(e) =>
                setShippingDetails({
                  ...shippingDetails,
                  country: e.target.value,
                })
              }
              className="w-full p-2 mt-2 mb-4 border border-gray-300 rounded placeholder:text-gray-300 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-gray-400 hover:border-gray-400"
            />
          </div>
        </div>

        {/* Cart Summary */}

        <div className="p-4 rounded-lg shadow-md bg-white">
          {/* Subtotal, Discount, Tax */}
          <div className="space-y-2 text-gray-700">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span className="font-medium">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Discount:</span>
              <span className="text-green-500">
                - ${totalDiscount.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Tax:</span>
              <span className="text-red-500">+ ${totalTax.toFixed(2)}</span>
            </div>
          </div>

          {/* Total */}
          <div className="mt-4 border-t pt-4 border-[#E0E0E0] flex justify-between text-xl font-semibold">
            <span>Total:</span>
            <span className="text-black">${total.toFixed(2)}</span>
          </div>

          {/* Checkout Button */}
          <button
            onClick={() => {
              // Check if the cart is not empty before proceeding
              if (cartItems.length > 0) {
                handleClick();
              }
            }}
            className={`w-full bg-[#00B517] text-white py-4 text-lg mt-4 rounded-lg hover:bg-[#009814] duration-300 cursor-pointer transition disabled:opacity-50 disabled:cursor-not-allowed`}
            disabled={cartItems.length < 1} // Disable button if cart is empty
          >
            Make Payment
          </button>

          {showStripeCheckout && (
            <div className="stripe-checkout-form mt-4">
              <StripeCheckoutForm
                total={total}
                shippingDetails={shippingDetails}
                onSuccess={() => {
                  handlePlaceOrder(); // Call handlePlaceOrder after successful payment
                  setShowStripeCheckout(false); // Close the Stripe form
                }}
              />
              <TestCardInfoButton />
            </div>
          )}

          {/* Payment Methods */}
          {/* <div className="flex justify-center space-x-2 mt-4">
          <img src="/visa.png" alt="Visa" className="h-6" />
          <img src="/mastercard.png" alt="MasterCard" className="h-6" />
          <img src="/paypal.png" alt="PayPal" className="h-6" />
          <img src="/apple-pay.png" alt="Apple Pay" className="h-6" />
        </div> */}
        </div>
      </div>
    </div>
  );
};

export default CartCheckout;
