import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const OrderDetails = ({ order }) => {
    const location = useLocation();
    const navigate = useNavigate();

    const handleGoBack = () => {
        if (location.pathname.startsWith("/admin/orders")) {
          navigate("/admin/orders");
        } else {
          navigate("/orders");
        }
      };

  return (
    <div className="max-w-4xl p-6 bg-white shadow-lg rounded-lg m-4">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Order Details
      </h1>

      {order && (
        <>
          <div className="mb-8 p-6 bg-gray-50 rounded-lg shadow-sm">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              Order ID: {order._id}
            </h2>
            <div className="space-y-2">
              <p className="text-gray-600">
                <strong>Status:</strong> {order.status}
              </p>
              <p className="text-gray-600">
                <strong>Placed On:</strong>{" "}
                {new Date(order.createdAt).toLocaleDateString()} at{" "}
                {new Date(order.createdAt).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                })}
              </p>
            </div>
          </div>

          <div className="mb-8 p-6 bg-gray-50 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">
              Products
            </h3>
            <ul className="space-y-4">
              {order.products.map((item) => (
                <li
                  key={item.productId._id}
                  className="flex flex-col sm:flex-row items-center sm:space-x-4 p-4 bg-white rounded-lg shadow-sm"
                >
                  <img
                    src={item.productId.image}
                    alt={item.productId.name}
                    className="w-32 h-32 object-cover rounded-md mb-4 sm:mb-0"
                  />
                  <div className="flex flex-col w-full sm:w-auto">
                    <p className="text-lg font-semibold text-gray-800">
                      <strong>Product:</strong> {item.productId.name}
                    </p>
                    <p className="text-gray-600">
                      <strong>Quantity:</strong> {item.qty}
                    </p>
                    <p className="text-gray-600">
                      <strong>Price:</strong> $
                      {item?.previousPrice
                        ? item?.previousPrice.toFixed(2)
                        : item.Price.toFixed(2)}
                    </p>
                    {/* <p className="text-gray-600">
                        <strong>Total Price:</strong> $
                        {item?.previousPrice
                        ? item?.previousPrice.toFixed(2) * item.qty
                        : item.Price.toFixed(2) * item.qty}
                        </p> */}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-8 p-6 bg-gray-50 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">
              Shipping Details
            </h3>
            <div className="space-y-2 text-gray-600">
              <p>
                <strong>Recipient Name:</strong> {order.shippingDetails.name}
              </p>
              <p>
                <strong>Address:</strong> {order.shippingDetails.address}
              </p>
              <p>
                <strong>City:</strong> {order.shippingDetails.city}
              </p>
              <p>
                <strong>Zip Code:</strong> {order.shippingDetails.postalCode}
              </p>
            </div>
          </div>

          <div className="mb-8 p-6 bg-gray-50 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">
              Order Summary
            </h3>
            <div className="space-y-2 text-gray-600">
              <p>
                <strong>Subtotal:</strong> ${order.subtotal.toFixed(2)}
              </p>
              <p>
                <strong>Discount:</strong>{" "}
                <span> ${order.totalDiscount.toFixed(2)}</span>
              </p>
              <p>
                <strong>Tax:</strong> <span>${order.totalTax.toFixed(2)}</span>
              </p>
              <p className="text-2xl font-semibold text-gray-800">
                <strong>Total Price:</strong>{" "}
                <span>${order.totalPrice.toFixed(2)}</span>
              </p>
            </div>
          </div>

          <div className="flex justify-center mt-6">
            <button
              onClick={handleGoBack}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-md focus:outline-none focus:ring-2 cursor-pointer transition duration-300 ease-in-out focus:ring-blue-300"
            >
              Back to Orders
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default OrderDetails;
