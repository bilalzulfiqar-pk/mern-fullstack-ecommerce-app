import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import AuthContext from "../context/AuthContext";

const OrderDetails = () => {
  const { user, authLoading } = useContext(AuthContext);

  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/orders/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setOrder(res.data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        Swal.fire("Error", "Failed to fetch order details", "error");
        navigate("/admin/orders");
      }
    };
    fetchOrderDetails();
  }, [id, navigate]);

  if (authLoading || loading) {
    return (
      <div className="flex w-full justify-center flex-col gap-3 items-center h-[90vh] -translate-y-22">
        <div
          className="w-16 h-16 border-4 border-blue-500 border-y-transparent rounded-full animate-spin"
          style={{ animationDuration: "0.5s" }}
        ></div>
      </div>
    );
  }

  if (!user?.isAdmin) {
    return (
      <div className="p-4 text-red-500 font-bold">
        Access denied: Admins only
      </div>
    );
  }

  return (
    <div className="bg-[#F7FAFC] min-h-screen flex items-center justify-center">
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg m-4">
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
                  {new Date(order.createdAt).toLocaleDateString()}
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
                  <strong>Tax:</strong>{" "}
                  <span>${order.totalTax.toFixed(2)}</span>
                </p>
                <p className="text-2xl font-semibold text-gray-800">
                  <strong>Total Price:</strong>{" "}
                  <span>${order.totalPrice.toFixed(2)}</span>
                </p>
              </div>
            </div>

            <div className="flex justify-center mt-6">
              <button
                onClick={() => navigate("/admin/orders")}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-md focus:outline-none focus:ring-2 cursor-pointer transition duration-300 ease-in-out focus:ring-blue-300"
              >
                Back to Orders
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default OrderDetails;
