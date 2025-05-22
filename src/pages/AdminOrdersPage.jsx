import { useEffect, useState, useContext, useRef } from "react";
import AuthContext from "../context/AuthContext";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom"; // Import Link for navigation
import { MdKeyboardArrowDown } from "react-icons/md";
import CustomDropdown from "../components/CustomDropDown";

const AdminOrdersPage = () => {
  const { user, authLoading } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState(10);

  const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
  const token = localStorage.getItem("token");

  const [searchQuery, setSearchQuery] = useState("");

  // const filteredOrders = orders.filter(
  //   (order) =>
  //     order._id.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //     order.user?.name?.toLowerCase().includes(searchQuery.toLowerCase())
  // );

  const fetchOrders = async () => {
    try {
      const res = await axios.get(
        `${API_BASE_URL}/api/orders?status=${statusFilter}&searchQuery=${searchQuery}&page=${currentPage}&limit=${limit}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setOrders(res.data.orders);
      setTotalPages(res.data.totalPages); // Set total pages for pagination
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (orderId, newStatus) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This order will be marked as " + newStatus + "!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, mark it!",
    });

    if (!confirm.isConfirmed) return;

    try {
      const res = await axios.patch(
        `${API_BASE_URL}/api/orders/${orderId}/status`,
        { status: newStatus },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Update orders state
      setOrders((prev) =>
        prev.map((order) =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );

      Swal.fire({
        title: "Success",
        text: `Order marked as ${newStatus}`,
        icon: "success",
        timer: 5000, // auto-close after 2 seconds
        // showConfirmButton: false, // hide the OK button
      });
    } catch (err) {
      Swal.fire(
        "Error",
        // err.response?.data?.error +
        err.response?.data?.message || "Failed to update status",
        "error"
      );
    }
  };

  useEffect(() => {
    if (!authLoading && user?.isAdmin) {
      fetchOrders();
    }
  }, [authLoading, user, statusFilter, currentPage, limit]);

  const handleSearch = () => {
    fetchOrders();
  };

  //   useEffect(() => {
  //     window.scrollTo({ top: 0, behavior: "smooth" });
  //   }, [currentPage]); // Scroll to top on page change

  const topRef = useRef();

  useEffect(() => {
    topRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentPage]); // Scroll to heading on page change

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1); // Reset current page to 1
    }
  }, [limit, totalPages]); // Dependencies: limit and totalPages

  if (authLoading || loading) {
    return (
      <div className="flex w-full justify-center flex-col gap-3 items-center h-[90vh] -translate-y-16">
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
    <div className="bg-[#F7FAFC] min-h-[100vh] h-dvh-100">
      <div className="p-6 px-6 min-[1000px]:px-10 max-w-[1404px] mx-auto">
        <div className="">
          <h2
            ref={topRef}
            className="text-2xl min-[430px]:text-3xl font-bold mb-6 text-gray-800"
          >
            Admin - Manage Orders
          </h2>

          <div className=" flex flex-col justify-between items-center md:flex-row">
            <div className="flex gap-2 bg-white border-gray-300 border rounded w-full md:w-[400px] my-2 p-1 py-1">
              {/* Search Bar */}
              <input
                type="text"
                placeholder="Search by User or Order ID"
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

          {/* Orders Table */}
          {/* {loading ? (
          <div className="text-lg font-semibold text-gray-600">
            Loading orders...
          </div>
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : orders.length === 0 ? (
          <div className="text-gray-500">No orders found.</div>
        ) : (
          <div className="overflow-x-auto rounded-lg shadow ring-1 ring-black/5">
            <table className="min-w-full bg-white text-sm">
              <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
                <tr>
                  <th className="px-6 py-3 text-left">Order ID</th>
                  <th className="px-6 py-3 text-left">User</th>
                  <th className="px-6 py-3 text-left">Total</th>
                  <th className="px-6 py-3 text-left">Status</th>
                  <th className="px-6 py-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                {orders.map((order) => (
                  <tr key={order._id} className="border-t hover:bg-gray-50">
                    <td className="px-6 py-4">{order._id}</td>
                    <td className="px-6 py-4">{order.user?.name || "N/A"}</td>
                    <td className="px-6 py-4">
                      ${order.totalPrice.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 font-medium capitalize">
                      {order.status}
                    </td>
                    <td className="px-6 py-4 flex flex-wrap gap-2">
                      <button
                        className={`px-3 py-1 rounded text-white cursor-pointer transition duration-300 disabled:cursor-not-allowed ${
                          order.status === "approved"
                            ? "bg-green-300 cursor-not-allowed"
                            : "bg-green-500 hover:bg-green-600"
                        }`}
                        onClick={() => updateStatus(order._id, "approved")}
                        disabled={order.status === "approved"}
                      >
                        Approve
                      </button>

                      <button
                        className={`px-3 py-1 rounded text-white cursor-pointer transition duration-300 disabled:cursor-not-allowed ${
                          order.status === "cancelled"
                            ? "bg-red-300 cursor-not-allowed"
                            : "bg-red-500 hover:bg-red-600"
                        }`}
                        onClick={() => updateStatus(order._id, "cancelled")}
                        disabled={order.status === "cancelled"}
                      >
                        Cancel
                      </button>
                      <Link to={`/admin/orders/${order._id}`}>
                        <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded cursor-pointer transition duration-300">
                          View Details
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )} */}

          <div className="flex flex-col gap-4 sm:gap-5">
            {orders.length === 0 ? (
              <div className="text-gray-500 text-center text-lg font-medium">
                No orders found.
              </div>
            ) : (
              orders.map((order) => (
                <div
                  key={order._id}
                  className="bg-white rounded-xl shadow-md border border-gray-100 p-5 flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
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
                      <span className="font-semibold text-gray-800">User:</span>{" "}
                      {order.user?.name || "N/A"}
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

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-2 self-center md:self-auto">
                    <button
                      className={`px-4 py-1.5 rounded-md text-white text-sm transition cursor-pointer disabled:cursor-not-allowed ${
                        order.status === "approved" ||
                        order.status === "delivered"
                          ? "bg-green-300"
                          : "bg-green-500 hover:bg-green-600"
                      }`}
                      onClick={() => updateStatus(order._id, "approved")}
                      disabled={
                        order.status === "approved" ||
                        order.status === "delivered"
                      }
                    >
                      Approve
                    </button>

                    <button
                      className={`px-4 py-1.5 rounded-md text-white text-sm transition cursor-pointer disabled:cursor-not-allowed ${
                        order.status === "cancelled" ||
                        order.status === "delivered"
                          ? "bg-red-300"
                          : "bg-red-500 hover:bg-red-600"
                      }`}
                      onClick={() => updateStatus(order._id, "cancelled")}
                      disabled={
                        order.status === "cancelled" ||
                        order.status === "delivered"
                      }
                    >
                      Cancel
                    </button>

                    {/* ✅ Delivered Button */}
                    <button
                      className={`px-4 py-1.5 rounded-md text-white text-sm cursor-pointer transition duration-300 disabled:cursor-not-allowed ${
                        order.status !== "approved"
                          ? "bg-indigo-300 cursor-not-allowed"
                          : "bg-indigo-600 hover:bg-indigo-700"
                      }`}
                      onClick={() => updateStatus(order._id, "delivered")}
                      disabled={order.status !== "approved"}
                    >
                      Delivered
                    </button>

                    <Link to={`/admin/orders/${order._id}`}>
                      <button className="px-4 py-1.5 rounded-md bg-blue-500 hover:bg-blue-600 cursor-pointer text-white text-sm transition">
                        View Details
                      </button>
                    </Link>
                  </div>
                </div>
              ))
            )}
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

export default AdminOrdersPage;
