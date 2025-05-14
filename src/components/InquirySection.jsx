import React, { useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";

const InquirySection = () => {
  const [placeholders, setPlaceholders] = useState({
    name: "What item you need?",
    quantity: "Quantity",
  });

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent page reload

    console.log("Form submitted"); // Handle form data submission logic here
  };

  const handleFocus = (field) => {
    setPlaceholders((prev) => ({ ...prev, [field]: "" })); // Remove placeholder
  };

  const handleBlur = (field, value) => {
    setPlaceholders((prev) => ({
      ...prev,
      [field]: value
        ? prev[field]
        : field === "name"
        ? "What item you need?"
        : "Quantity",
    }));
  };

  return (
    <section className="mx-5 min-[1100px]:mx-10 py-8">
      <div className="container1 w-full">
        <div
          className="relative p-8 rounded-lg overflow-hidden min-h-[400px] flex items-center"
          style={{
            backgroundImage: "url('banners/bg-warehouse.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-cyan-100 opacity-10"></div>

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
            {/* Left Text Section */}
            <div>
              <h2 className="text-white text-3xl font-bold">
                An easy way to send requests to all suppliers
              </h2>
              <p className="text-white mt-3">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt.
              </p>
            </div>

            {/* Inquiry Form */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h6 className="text-lg font-semibold mb-3">
                Send quote to suppliers
              </h6>
              <form onSubmit={handleSubmit}>
                {/* Item Name */}
                <div className="mb-3">
                  <input
                    type="text"
                    className="w-full px-3 py-2 placeholder-black border border-[#DEE2E7] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder={placeholders.name}
                    onFocus={() => handleFocus("name")}
                    onBlur={(e) => handleBlur("name", e.target.value)}
                  />
                </div>

                {/* Item Details */}
                <div className="mb-3">
                  <textarea
                    placeholder="Type more details"
                    rows="3"
                    className="w-full px-3 py-2 border border-[#DEE2E7] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 "
                  ></textarea>
                </div>

                {/* Quantity Section */}
                <div className="mb-3 flex gap-2 max-w-xs">
                  <input
                    type="number"
                    className="w-1/2 px-3 py-2 placeholder-black border border-[#DEE2E7] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder={placeholders.quantity}
                    onFocus={() => handleFocus("quantity")}
                    onBlur={(e) => handleBlur("quantity", e.target.value)}
                  />
                  <div className="relative w-1/2">
                    <select className="w-full px-3 py-2 border border-[#DEE2E7] rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-blue-400">
                      <option>Pcs</option>
                      <option>Kgs</option>
                      <option>Litres</option>
                    </select>
                    <div className="absolute top-1/2 right-2 transform -translate-y-1/2 pointer-events-none text-2xl text-gray-400">
                      <MdKeyboardArrowDown />
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <button className="w-fit p-4 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition cursor-pointer">
                  Send inquiry
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InquirySection;
