import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const StripeCheckoutForm = ({ total, onSuccess, shippingDetails }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Validate shipping fields before proceeding
    const { name, address, city, postalCode, country } = shippingDetails;
    if (!name || !address || !city || !postalCode || !country) {
      Swal.fire({
        icon: "error",
        title: "Missing Shipping Info",
        text: "Please fill in all the shipping details before making payment.",
        confirmButtonColor: "#155DFC",
      });
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post(
        `${API_BASE_URL}/api/payments/create-payment-intent`,
        {
          amount: total.toFixed(2),
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      const clientSecret = res.data.clientSecret;

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

    //   console.log(result);

      if (result.error) {
        Swal.fire({
          icon: "error",
          title: "Payment Error",
          text: result.error.message,
          confirmButtonColor: "#d33",
        });
      } else {
        if (result.paymentIntent.status === "succeeded") {
          onSuccess(); // Place order and clear cart
        }
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Payment Failed",
        text: "Try again.",
        confirmButtonColor: "#d33",
      });
      console.log(err);
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <CardElement className="p-3 border border-gray-400 rounded-md" />
      <button
        type="submit"
        disabled={!stripe || loading}
        className="bg-blue-600 w-full text-white px-4 py-2 rounded-md hover:bg-blue-700 cursor-pointer transition duration-200"
      >
        {loading ? "Processing..." : `Pay $${total.toFixed(2)}`}
      </button>
    </form>
  );
};

export default StripeCheckoutForm;
