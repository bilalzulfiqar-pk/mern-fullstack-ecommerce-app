import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import { ImSpinner2 } from "react-icons/im";
import CustomDropdown from "./CustomDropDown";
import ReCAPTCHA from "react-google-recaptcha";
import axios from "axios";
import { useRef } from "react";
import AuthContext from "../context/AuthContext";
import { toast } from "react-toastify";

const InquirySection = () => {
  const [placeholders, setPlaceholders] = useState({
    name: "What item you need?",
    quantity: "Quantity",
  });

  const [recaptchaToken, setRecaptchaToken] = useState(null);
  const recaptchaRef = useRef();
  const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY;
  const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

  const { user } = useContext(AuthContext);
  // console.log(user);

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
    // onSubmit: async (values, { setSubmitting, resetForm }) => {
    //   // Simulate a short network delay to showcase the submitting animation.
    //   // Replace this block with your actual submission logic later.
    //   await new Promise((resolve) => setTimeout(resolve, 1000));
    //   console.log("Form submitted with values:", values);
    //   setSubmitting(false);

    //   // Optionally reset the form after submission:
    //   resetForm();
    //   setPlaceholders({
    //     name: "What item you need?",
    //     quantity: "Quantity",
    //   });
    // },

    onSubmit: async (values, { setSubmitting, resetForm, setFieldError }) => {
      // If the user hasn’t checked reCAPTCHA, block submit:
      if (!recaptchaToken) {
        // Inform Formik that recaptcha is missing:
        setFieldError("recaptcha", "Please verify that you are human.");
        return;
      }

      // // Otherwise, proceed to verify the recaptchaToken on your backend…
      // try {
      //   const response = await axios.post(
      //     `${API_BASE_URL}/api/verify-recaptcha`,
      //     {
      //       token: recaptchaToken,
      //     }
      //   );

      //   if (!response.data.success) {
      //     // The token failed server-side verification
      //     setFieldError(
      //       "recaptcha",
      //       "reCAPTCHA verification failed. Please try again."
      //     );
      //     setSubmitting(false);
      //     return;
      //   }

      //   // If the server says “success,” continue with the form submission:
      //   // (just a timeout/demo block to show the submitting animation)
      //   await new Promise((resolve) => setTimeout(resolve, 1000));

      //   console.log("Form submitted with values:", values);

      //   // Reset UI:
      //   recaptchaRef.current.reset(); // This resets the checkbox
      //   setRecaptchaToken(null); // Optional, since it'll be cleared too
      //   resetForm();
      //   setPlaceholders({ name: "What item you need?", quantity: "Quantity" });
      // } catch (err) {
      //   console.error("Error verifying reCAPTCHA:", err);
      //   setFieldError(
      //     "recaptcha",
      //     "Unable to verify reCAPTCHA. Please try again."
      //   );
      // } finally {
      //   setSubmitting(false);
      // }

      try {
        // Directly calling inquiry endpoint (which does reCAPTCHA + email send)
        const payload = {
          name: values.name,
          details: values.details,
          quantity: values.quantity,
          unit: values.unit,
          token: recaptchaToken,
          username: user?.name || "Visitor",
          email: user?.email || "Visitor",
        };

        const response = await axios.post(
          `${API_BASE_URL}/api/email/inquiry`,
          payload
        );

        // Check server’s reply
        if (!response.data.success) {
          // e.g. reCAPTCHA failed or email send failed
          setFieldError(
            "recaptcha",
            response.data.message || "Unable to send inquiry. Please try again."
          );
          setSubmitting(false);
          return;
        }

        // If success → clear form + recaptcha
        // console.log("Inquiry sent:", response.data.message);
        toast.success("Your inquiry request has been sent successfully!");

        recaptchaRef.current.reset(); // reset the widget
        setRecaptchaToken(null); // clear token in state
        resetForm(); // clear all fields
        setPlaceholders({
          // restore placeholders
          name: "What item you need?",
          quantity: "Quantity",
        });
      } catch (err) {
        // Network or server error
        // console.error("Error sending inquiry:", err);
        setFieldError(
          "recaptcha",
          "Server error while sending inquiry. Please try again."
        );
      } finally {
        setSubmitting(false);
      }
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
          className="relative p-8 rounded-lg min-h-[400px] flex items-center bg-cover bg-center"
          style={{
            backgroundImage: "url('banners/bg-warehouse.jpg')",
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

                {/* ————— Add reCAPTCHA block ————— */}
                <div className="mb-3 w-full">
                  <div className="w-full scale-50 h-[39px] min-[350px]:scale-65 min-[350px]:h-[51px] min-[400px]:scale-80 min-[400px]:h-[62px] min-[460px]:scale-100 min-[460px]:h-[78px] min-[768px]:scale-75 min-[768px]:h-[59px] min-[850px]:scale-100 min-[850px]:h-[78px] origin-top-left ">
                    <ReCAPTCHA
                      sitekey={RECAPTCHA_SITE_KEY}
                      ref={recaptchaRef}
                      onChange={(token) => {
                        // Google returns a token string when the user solves the checkbox.
                        setRecaptchaToken(token);
                      }}
                      onExpired={() => {
                        // If the user takes too long and the token expires, clear it.
                        setRecaptchaToken(null);
                      }}
                    />
                  </div>
                  {/** If you want, you can display an error if they try to submit without checking */}
                  {formik.submitCount > 0 && !recaptchaToken && (
                    <div className="text-red-500 text-sm mt-1">
                      Please verify that you are human.
                    </div>
                  )}
                </div>
                {/* ——————————————— End reCAPTCHA block ——————————————— */}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={formik.isSubmitting} //  || !formik.isValid   // you may also disable if !recaptchaToken
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
