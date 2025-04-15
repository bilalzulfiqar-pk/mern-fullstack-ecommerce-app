import Swal from "sweetalert2";

const showTestCardInfo = () => {
  Swal.fire({
    icon: "info",
    title: "Stripe Test Card Details",
    html: `
      <div style="text-align: left;">
        <p><strong>Card Number: </strong> 4242 4242 4242 4242</p>
        <p><strong>Expiry: </strong> Any future date (e.g., 12/34)</p>
        <p><strong>CVC: </strong> Any 3 digits (e.g., 123)</p>
        <p><strong>ZIP: </strong> Any 5 digits (e.g., 12345)</p>
      </div>
    `,
    confirmButtonText: "Got it!",
    confirmButtonColor: "#2563eb", // Tailwind's blue-600
    width: 400,
  });
};

const TestCardInfoButton = () => (
    <div className="bg-yellow-100 p-4 rounded-lg mt-5 shadow-sm border border-yellow-300 text-sm text-gray-800">
    <p className="font-semibold text-yellow-900 mb-2">💳 Stripe Test Card Details</p>
    <p>
      Card Number:{" "}
      <span className="font-mono text-blue-600">4242 4242 4242 4242</span>
    </p>
    <p>
      Expiry:{" "}
      <span className="font-mono text-blue-600">Any future date (e.g., 12/34)</span>
    </p>
    <p>
      CVC: <span className="font-mono text-blue-600">Any 3 digits (e.g., 123)</span>
    </p>
    <p>
      ZIP: <span className="font-mono text-blue-600">Any 5 digits (e.g., 12345)</span>
    </p>
  </div>
  
);

export default TestCardInfoButton;
