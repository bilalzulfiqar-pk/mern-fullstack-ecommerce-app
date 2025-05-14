import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import AuthContext from "../context/AuthContext";
import OrderDetails from "../components/OrderDetails";

const UserOrderDetails = () => {
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
        const res = await axios.get(`${API_BASE_URL}/api/orders/my/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setOrder(res.data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        Swal.fire("Error", "Failed to fetch order details", "error");
        navigate("/orders");
      }
    };
    fetchOrderDetails();
  }, [id, navigate]);

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
    <div className="bg-[#F7FAFC] min-h-screen flex items-center justify-center">
      <div className="mx-auto">
        <OrderDetails order={order} />
      </div>
    </div>
  );
};

export default UserOrderDetails;
