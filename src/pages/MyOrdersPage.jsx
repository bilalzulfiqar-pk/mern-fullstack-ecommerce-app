import { useEffect, useState, useContext, useRef } from "react";
import AuthContext from "../context/AuthContext";
import axios from "axios";
import { Link } from "react-router-dom";
import { MdKeyboardArrowDown } from "react-icons/md";
import ReviewModal from "../components/ReviewModal";
import Swal from "sweetalert2";
import CustomDropdown from "../components/CustomDropDown";

const UserOrders = () => {
  const { user, authLoading } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState(5);

  const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
  const token = localStorage.getItem("token");

  const topRef = useRef();

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedOrderId, setSelectedOrderId] = useState(null); // Store selected order ID
  const [showReviewModal, setShowReviewModal] = useState(false);

  const [reviewStatus, setReviewStatus] = useState({});
  const [reviewLoading, setReviewLoading] = useState(true);

  // Function to check review status for a product in a specific order
  const checkReviewStatus = async (productId, orderId) => {
    try {
      const res = await axios.get(
        `${API_BASE_URL}/api/reviews/check-review/${productId}/${orderId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log("Check Review Status URL:", `/api/reviews/check-review/${productId}/${orderId}`);
      // console.log("Check Review Status Response:", res.data);

      return res.data.reviewed;
    } catch (err) {
      console.error("Error checking review:", err);
      return false;
    }
  };

  useEffect(() => {
    const fetchReviewStatuses = async () => {
      setReviewLoading(true); // Start loading
      const statusMap = {}; // A map to store review statuses for each order-product pair

      // console.log("Orders to check review status:", orders); // Log orders to check if they are available

      // Loop through orders and check review status for each product in delivered orders
      for (const order of orders) {
        if (order.status === "delivered") {
          for (const item of order.products) {
            const key = `${order._id}_${item.productId}`;
            // console.log(`Checking review status for key: ${key}`);  // Log each product-order combo

            // If the review status for this order-product pair is already fetched, skip
            if (statusMap[key] !== undefined) continue;

            // Fetch review status from the backend
            const reviewed = await checkReviewStatus(item.productId, order._id);
            // console.log(`Review status for ${key}: ${reviewed}`);  // Log the fetched status

            // Store the review status in the statusMap
            statusMap[key] = reviewed;
          }
        }
      }

      // Set the state with the updated review statuses
      setReviewStatus(statusMap);
      // console.log("Review Statuses:", statusMap);  // Log the final statusMap
      setReviewLoading(false); // Done loading
    };

    // Run the review status fetch function if there are orders
    if (orders.length > 0) {
      fetchReviewStatuses();
    }
  }, [orders]); // Re-run the effect if orders change

  const handleSubmitReview = async (reviewData) => {
    // console.log("Review Data:", reviewData);
    // console.log("Selected Product:", selectedProduct);
    // console.log("Selected Order ID:", selectedOrderId); // Log the selected order ID

    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/reviews/`,
        {
          productId: selectedProduct.productId, // Product ID from the selected product
          orderId: selectedOrderId, // Order ID related to this review, get it from your state/context
          rating: reviewData.rating,
          comment: reviewData.comment,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the headers
          },
        }
      );

      // Update the reviewStatus state to reflect the newly submitted review
      const key = `${selectedOrderId}_${selectedProduct.productId}`;
      setReviewStatus((prevStatus) => ({
        ...prevStatus,
        [key]: true, // Mark this product as reviewed for this order
      }));

      // Show success message with SweetAlert2
      Swal.fire({
        icon: "success",
        title: "Review Submitted Successfully",
        text: "Thank you for your feedback!",
      });

      // Close the review modal
      setShowReviewModal(false);
    } catch (error) {
      console.error(
        "Error submitting review:",
        error.response?.data || error.message
      );

      // Show error message with SweetAlert2
      Swal.fire({
        icon: "error",
        title: "Error Submitting Review",
        text:
          error.response?.data?.message ||
          "Something went wrong, please try again later.",
      });
    }
  };

  const handleOpenReview = (product, orderId) => {
    setSelectedOrderId(orderId); // Set the selected order ID
    setSelectedProduct(product);
    setShowReviewModal(true);
  };

  const fetchUserOrders = async () => {
    try {
      const res = await axios.get(
        `${API_BASE_URL}/api/orders/my-orders?status=${statusFilter}&searchQuery=${searchQuery}&page=${currentPage}&limit=${limit}`,
        {
          headers: { Authorization: `Bearer ${token}` }, // Send JWT token in header
        }
      );
      setOrders(res.data.orders); // Set orders data from backend response
      setTotalPages(res.data.totalPages); // Handle pagination data
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch your orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!authLoading && user) {
      fetchUserOrders();
    }
  }, [authLoading, user, statusFilter, currentPage, limit]);

  useEffect(() => {
    topRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentPage]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [limit, totalPages]);

  const handleSearch = () => {
    fetchUserOrders();
  };

  // console.log("Orders:", orders);

  if (authLoading || loading) {
    return (
      <div className="flex w-full justify-center flex-col gap-3 items-center h-[90dvh] -translate-y-16">
        <div
          className="w-16 h-16 border-4 border-blue-500 border-y-transparent rounded-full animate-spin"
          style={{ animationDuration: "0.5s" }}
        ></div>
      </div>
    );
  }

  return (
    <div className="bg-[#F7FAFC] min-h-[100dvh]">
      <div className="p-6 px-6 min-[1000px]:px-10 max-w-[1404px] mx-auto">
        <div className="">
          <h2 ref={topRef} className="text-2xl min-[430px]:text-3xl font-bold mb-6 text-gray-800">
            My Orders
          </h2>

          {/* Search and Filters */}
          <div className=" flex flex-col justify-between items-center md:flex-row">
            <div className="flex gap-2 bg-white border-gray-300 border rounded w-full md:w-[400px] my-2 p-1 py-1">
              {/* Search Bar */}
              <input
                type="text"
                placeholder="Search by Order ID"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-2 py-1 flex-grow bg-white focus:outline-none min-w-20"
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSearch();
                }}
              />
              <button
                onClick={handleSearch}
                className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-700 transition"
              >
                Search
              </button>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-4 mb-6 items-center self-start md:self-end max-[360px]:w-full">
              {/* Status Filter */}
              <div className="relative max-[360px]:w-full">
                {/* <label className="block text-sm font-semibold text-gray-700 mb-1">
                Filter by Status:
                </label> */}
                <div className="relative">
                  {/* <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="p-2 bg-white border border-gray-300 outline-none rounded w-40 cursor-pointer appearance-none"
                  >
                  <option value="all">All</option>
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="cancelled">Cancelled</option>
                  <option value="delivered">Delivered</option>
                  </select> */}
                  {/* Custom Dropdown Arrow */}
                  {/* <div className="absolute top-1/2 right-1 transform -translate-y-1/2 pointer-events-none text-2xl text-gray-700">
                  <MdKeyboardArrowDown />
                  </div> */}

                  <CustomDropdown
                    label="Filter by Status:"
                    options={[
                      "all",
                      "pending",
                      "approved",
                      "cancelled",
                      "delivered",
                    ]}
                    value={statusFilter}
                    onChange={setStatusFilter}
                    containerClassName="w-40 max-[360px]:w-full"
                  />
                </div>
              </div>

              {/* Limit Selector */}
              <div className="relative max-[360px]:w-full">
                {/* <label className="block text-sm font-semibold text-gray-700 mb-1">
                Results per page:
                </label> */}
                <div className="relative">
                  {/* <select
                  value={limit}
                  onChange={(e) => setLimit(Number(e.target.value))}
                  className="p-2 border border-gray-300 outline-none rounded w-32 cursor-pointer bg-white appearance-none"
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={15}>15</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                </select> */}
                  {/* Custom Dropdown Arrow */}
                  {/* <div className="absolute top-1/2 right-1 transform -translate-y-1/2 pointer-events-none text-2xl text-gray-700">
                  <MdKeyboardArrowDown />
                </div> */}

                  <CustomDropdown
                    label="Results per page:"
                    options={["5", "10", "15", "20", "50"]}
                    value={String(limit)}
                    onChange={(val) => setLimit(Number(val))}
                    containerClassName="w-32 max-[360px]:w-full"
                  />
                </div>
              </div>
            </div>
          </div>
          {/* Order Cards */}
          <div className="flex flex-col gap-5">
            {orders.length === 0 ? (
              <div className="text-gray-500 text-center font-medium">
                No orders found.
              </div>
            ) : (
              orders.map((order) => (
                <div
                  key={order._id}
                  className="bg-white rounded-xl shadow-md border border-gray-100 p-5 flex flex-col gap-4"
                >
                  {/* Order Info Section */}
                  <div className="flex flex-col gap-1 text-sm md:text-base">
                    <p className="text-gray-600">
                      <span className="font-semibold text-gray-800">
                        Order ID:
                      </span>{" "}
                      {order._id}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-semibold text-gray-800">
                        Ordered on:
                      </span>{" "}
                      {new Date(order.createdAt).toLocaleDateString()} at{" "}
                      {new Date(order.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      })}
                    </p>

                    <p className="text-gray-600">
                      <span className="font-semibold text-gray-800">
                        Total:
                      </span>{" "}
                      ${order.totalPrice.toFixed(2)}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-semibold text-gray-800">
                        Status:
                      </span>{" "}
                      <span
                        className={`inline-block px-2 py-1 pb-1.5 rounded-full text-xs font-medium ${
                          order.status === "approved"
                            ? "bg-green-100 text-green-700"
                            : order.status === "pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : order.status === "cancelled"
                            ? "bg-red-100 text-red-700"
                            : "bg-indigo-100 text-indigo-700"
                        }`}
                      >
                        {order.status.charAt(0).toUpperCase() +
                          order.status.slice(1)}
                      </span>
                    </p>
                  </div>

                  {/* Product Review Buttons */}
                  {order.status === "delivered" && (
                    <div className="flex flex-col gap-2">
                      <p className="text-sm font-medium text-gray-800">
                        Review Products:
                      </p>
                      <div className="grid gap-3 grid-cols-[repeat(auto-fill,_minmax(250px,_1fr))] max-[350px]:grid-cols-1">
                        {/* Map through products in the order */}
                        {order.products.map((product) => {
                          const key = `${order._id}_${product.productId}`;
                          const isReviewed = reviewStatus[key];

                          return (
                            <div
                              key={product._id}
                              className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg shadow-sm border border-[#E0E0E0]"
                            >
                              {/* Product Image */}
                              <div className="flex-shrink-0">
                                <Link to={`/product/${product.productId}`}>
                                  <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-12 h-12 object-cover rounded-md border border-[#E0E0E0]"
                                  />
                                </Link>
                              </div>

                              {/* Product Name & Button */}
                              <div className="flex flex-col grow">
                                <p className="text-sm font-medium text-gray-800 line-clamp-1">
                                  {product.name}
                                </p>
                                {/* {reviewLoading ? (
                                  <button
                                    disabled
                                    className="mt-1 inline-flex justify-center items-center gap-1 px-3 py-1 rounded bg-gray-200 text-gray-500 text-sm font-medium shadow-sm cursor-not-allowed"
                                  >
                                    Checking...
                                  </button>
                                ) : isReviewed ? (
                                  <button
                                    disabled
                                    className="mt-1 inline-flex justify-center items-center gap-1 px-3 py-1 rounded bg-gray-300 text-gray-700 text-sm font-medium shadow-sm cursor-not-allowed"
                                  >
                                    Reviewed
                                  </button>
                                ) : (
                                  <button
                                    onClick={() =>
                                      handleOpenReview(product, order._id)
                                    }
                                    className="mt-1 cursor-pointer inline-flex justify-center items-center gap-1 px-3 py-1 rounded bg-green-600 hover:bg-green-700 text-white text-sm font-medium shadow-sm transition"
                                  >
                                    Write Review
                                  </button>
                                )} */}
                                <button
                                  disabled={reviewLoading || isReviewed}
                                  onClick={
                                    !reviewLoading && !isReviewed
                                      ? () =>
                                          handleOpenReview(product, order._id)
                                      : undefined
                                  }
                                  className={`
                                    mt-1 inline-flex items-center justify-center gap-1 px-3 py-1 rounded text-sm font-medium shadow-sm
                                    ${
                                      reviewLoading
                                        ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                                        : isReviewed
                                        ? "bg-gray-300 text-gray-700 cursor-not-allowed"
                                        : "bg-green-600 hover:bg-green-700 text-white cursor-pointer transition"
                                    }
                                  `}
                                >
                                  {reviewLoading
                                    ? "Checking…"
                                    : isReviewed
                                    ? "Reviewed"
                                    : "Write Review"}
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-2 self-start mt-1">
                    <Link to={`/orders/${order._id}`}>
                      <button className="px-4 py-1.5 rounded-md bg-blue-500 hover:bg-blue-600 cursor-pointer text-white text-sm transition">
                        View Order Details
                      </button>
                    </Link>
                  </div>
                </div>
              ))
            )}

            {/* Review Modal */}
            <ReviewModal
              isOpen={showReviewModal}
              onClose={() => setShowReviewModal(false)}
              product={selectedProduct}
              onSubmit={handleSubmitReview}
            />
          </div>

          {/* Pagination Controls */}
          <div className="flex flex-row justify-between items-center mt-6 gap-4">
            <button
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition duration-300"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              ⬅ Previous
            </button>
            <span className="text-gray-700">
              Page <strong>{currentPage}</strong> of{" "}
              <strong>{totalPages}</strong>
            </span>
            <button
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition duration-300"
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
            >
              Next ➡
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserOrders;
