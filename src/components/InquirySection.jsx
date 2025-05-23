import React, { useState } from "react";
import { useFormik } from "formik";
import { MdKeyboardArrowDown } from "react-icons/md";
import { ImSpinner2 } from "react-icons/im";
import CustomDropdown from "./CustomDropDown";

const InquirySection = () => {
  const [placeholders, setPlaceholders] = useState({
    name: "What item you need?",
    quantity: "Quantity",
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      details: "",
      quantity: "",
      unit: "Pcs",
    },
    validate: (values) => {
      const errors = {};
      if (!values.name.trim()) {
        errors.name = "Item name is required";
      }
      if (!values.quantity) {
        errors.quantity = "Quantity is required";
      } else if (Number(values.quantity) <= 0) {
        errors.quantity = "Quantity must be greater than zero";
      }
      return errors;
    },
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      // Simulate a short network delay to showcase the submitting animation.
      // Replace this block with your actual submission logic later.
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Form submitted with values:", values);
      setSubmitting(false);

      // Optionally reset the form after submission:
      resetForm();
      setPlaceholders({
        name: "What item you need?",
        quantity: "Quantity",
      });
    },

    validateOnBlur: false,
    validateOnChange: true,
  });

  const handleFocus = (field) => {
    setPlaceholders((prev) => ({ ...prev, [field]: "" }));
  };

  const handleBlurPlaceholder = (field, value) => {
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
    <section className="mx-5 min-[1000px]:mx-10 py-8">
      <div className="container1 w-full">
        <div
          className="relative p-8 rounded-lg min-h-[400px] flex items-center"
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
              <form onSubmit={formik.handleSubmit}>
                {/* Item Name */}
                <div className="mb-3">
                  <input
                    name="name"
                    type="text"
                    className={`w-full px-3 py-2 placeholder-black border ${
                      formik.touched.name && formik.errors.name
                        ? "border-red-500"
                        : "border-[#DEE2E7]"
                    } rounded-md focus:border-blue-300 focus:ring-3 focus:ring-blue-200 focus:ring-opacity-50 focus:outline-none transition duration-300`}
                    placeholder={placeholders.name}
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onFocus={() => handleFocus("name")}
                    onBlur={(e) => {
                      formik.handleBlur(e);
                      handleBlurPlaceholder("name", e.target.value);
                    }}
                  />
                  {formik.touched.name && formik.errors.name && (
                    <div className="text-red-500 text-sm mt-1">
                      {formik.errors.name}
                    </div>
                  )}
                </div>

                {/* Item Details */}
                <div className="mb-3">
                  <textarea
                    name="details"
                    placeholder="Type more details"
                    rows="3"
                    className="w-full px-3 py-2 border border-[#DEE2E7] rounded-md focus:border-blue-300 focus:ring-3 focus:ring-blue-200 focus:ring-opacity-50 focus:outline-none transition duration-300"
                    value={formik.values.details}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  ></textarea>
                </div>

                {/* Quantity Section */}
                <div className="mb-3 flex gap-2 max-w-xs">
                  <div className="w-1/2">
                    <input
                      name="quantity"
                      type="number"
                      className={`w-full px-3 py-2 placeholder-black border ${
                        formik.touched.quantity && formik.errors.quantity
                          ? "border-red-500"
                          : "border-[#DEE2E7]"
                      } rounded-md focus:border-blue-300 focus:ring-3 focus:ring-blue-200 focus:ring-opacity-50 focus:outline-none transition duration-300`}
                      placeholder={placeholders.quantity}
                      value={formik.values.quantity}
                      onChange={formik.handleChange}
                      onFocus={() => handleFocus("quantity")}
                      onBlur={(e) => {
                        formik.handleBlur(e);
                        handleBlurPlaceholder("quantity", e.target.value);
                      }}
                    />
                    {formik.touched.quantity && formik.errors.quantity && (
                      <div className="text-red-500 text-sm mt-1">
                        {formik.errors.quantity}
                      </div>
                    )}
                  </div>

                  <div className="w-1/2">
                    <CustomDropdown
                      options={["Pcs", "Kgs", "Litres"]}
                      value={formik.values.unit}
                      onChange={(val) => formik.setFieldValue("unit", val)}
                      containerClassName="relative"
                      buttonClassName="w-full p-2 bg-white border border-[#DEE2E7] rounded-md flex justify-between items-center cursor-pointer"
                      iconClassName="text-2xl text-gray-400"
                      listClassName="absolute left-0 w-full bg-white border border-[#DEE2E7] rounded-md mt-1 z-10"
                      optionClassName="p-2 hover:bg-[#E6F0FF] cursor-pointer capitalize transition-colors"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={formik.isSubmitting} //  || !formik.isValid
                  className={`flex items-center gap-2 w-fit px-4 py-2 bg-blue-500 text-white rounded-md transition disabled:opacity-80 disabled:cursor-auto ${
                    formik.isSubmitting
                      ? "opacity-80 cursor-auto"
                      : "hover:bg-blue-600 cursor-pointer"
                  }`}
                >
                  {formik.isSubmitting && (
                    <ImSpinner2 className="animate-spin text-xl" />
                  )}
                  <span>
                    {formik.isSubmitting ? "Sending..." : "Send inquiry"}
                  </span>
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
