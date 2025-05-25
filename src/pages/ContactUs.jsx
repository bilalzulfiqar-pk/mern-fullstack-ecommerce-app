import React, { useContext, useRef, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import ReCAPTCHA from "react-google-recaptcha";
import { ImSpinner2 } from "react-icons/im";
import axios from "axios";
import AuthContext from "../context/AuthContext"; // if you want to pass user info
import { toast } from "react-toastify";

const ContactUs = () => {
  const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY;
  const recaptchaRef = useRef(null);
  const [recaptchaToken, setRecaptchaToken] = useState(null);
  const { user } = useContext(AuthContext);
  const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

  // --------------------
  // Validation Schema
  // --------------------
  const ContactSchema = Yup.object().shape({
    fullName: Yup.string()
      .required("Full Name is required")
      .min(3, "Name must be at least 3 characters"),
    email: Yup.string()
      .required("Email is required")
      .email("Invalid email address"),
    subject: Yup.string().required("Subject is required"),
    message: Yup.string()
      .required("Message is required")
      .min(10, "Message must be at least 10 characters"),
  });

  // ----------------------
  // Formik: initialValues
  // ----------------------
  const initialValues = {
    fullName: user?.name || "",
    email: user?.email || "",
    subject: "",
    message: "",
  };

  // -------------------
  // onSubmit handler
  // -------------------
  const handleSubmit = async (
    values,
    { setSubmitting, setFieldError, resetForm }
  ) => {
    // Block if no reCAPTCHA token
    if (!recaptchaToken) {
      setFieldError("recaptcha", "Please verify that you are human.");
      setSubmitting(false);
      return;
    }

    // // For demonstration purposes
    // console.log("Contact form submitted with:", {
    //   ...values,
    //   recaptchaToken,
    // });

    // // Reset reCAPTCHA and the form
    // recaptchaRef.current.reset();
    // setRecaptchaToken(null);
    // resetForm();

    // setSubmitting(false);

    try {
      // payload
      const payload = {
        fullName: values.fullName,
        email: values.email,
        subject: values.subject,
        message: values.message,
        token: recaptchaToken,
      };

      // POST to /api/email/contact
      const response = await axios.post(
        `${API_BASE_URL}/api/email/contact`,
        payload
      );

      // Handling success / failure
      if (!response.data.success) {
        // Example: if reCAPTCHA failed server-side, show that error
        setFieldError(
          "recaptcha",
          response.data.message || "Submission failed."
        );
        setSubmitting(false);
        return;
      }

      toast.success(
        "Your message has been sent. We’ll get back to you shortly!"
      );

      // On success: reset form + reCAPTCHA
      recaptchaRef.current.reset();
      setRecaptchaToken(null);
      resetForm();
    } catch (err) {
      // Network or server error
      setFieldError(
        "recaptcha",
        "Server error while sending message. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full  h-[90vh] h-dvh-90 bg-gray-100 flex items-center justify-center py-10">
      <div className="w-full max-w-2xl mx-4 p-6 bg-white rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Contact Us</h2>

        <Formik
          initialValues={initialValues}
          enableReinitialize={true}
          validationSchema={ContactSchema}
          onSubmit={handleSubmit}
          validateOnBlur={false} // validate on blur //remove these two to want default behavior
          validateOnChange={true} // validate on change
        >
          {({ isSubmitting, errors, touched, submitCount }) => (
            <Form>
              {/* ─── Full Name ──────────────────────────────────────────────────── */}
              <div className="mb-4">
                <label
                  htmlFor="fullName"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Full Name
                </label>
                <Field
                  name="fullName"
                  type="text"
                  placeholder="Your full name"
                  disabled={!!user}
                  readOnly={!!user}
                  className={`
                    w-full px-4 py-2 border rounded-md 
                    focus:outline-none focus:border-blue-300 focus:ring-3 focus:ring-blue-200 focus:ring-opacity-50
                    transition duration-300 disabled:bg-gray-100 disabled:text-gray-700
                    ${
                      errors.fullName && touched.fullName
                        ? "border-red-500"
                        : "border-gray-300"
                    }
                  `}
                />
                <ErrorMessage
                  name="fullName"
                  component="p"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* ─── Email ─────────────────────────────────────────────────────── */}
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email
                </label>
                <Field
                  name="email"
                  type="email"
                  placeholder="your.email@example.com"
                  disabled={!!user}
                  readOnly={!!user}
                  className={`
                    w-full px-4 py-2 border rounded-md
                    focus:outline-none focus:border-blue-300 focus:ring-3 focus:ring-blue-200 focus:ring-opacity-50
                    transition duration-300 disabled:bg-gray-100 disabled:text-gray-700
                    ${
                      errors.email && touched.email
                        ? "border-red-500"
                        : "border-gray-300"
                    }
                  `}
                />
                <ErrorMessage
                  name="email"
                  component="p"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* ─── Subject ───────────────────────────────────────────────────── */}
              <div className="mb-4">
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Subject
                </label>
                <Field
                  name="subject"
                  type="text"
                  placeholder="Subject of your message"
                  className={`
                    w-full px-4 py-2 border rounded-md
                    focus:outline-none focus:border-blue-300 focus:ring-3 focus:ring-blue-200 focus:ring-opacity-50
                    transition duration-300
                    ${
                      errors.subject && touched.subject
                        ? "border-red-500"
                        : "border-gray-300"
                    }
                  `}
                />
                <ErrorMessage
                  name="subject"
                  component="p"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* ─── Message ────────────────────────────────────────────────────── */}
              <div className="mb-4">
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Message
                </label>
                <Field
                  as="textarea"
                  name="message"
                  rows="5"
                  maxLength="3000"
                  placeholder="Type your message here..."
                  className={`
                    w-full px-4 py-2 border rounded-md resize-none
                    focus:outline-none focus:border-blue-300 focus:ring-3 focus:ring-blue-200 focus:ring-opacity-50
                    transition duration-300
                    ${
                      errors.message && touched.message
                        ? "border-red-500"
                        : "border-gray-300"
                    }
                  `}
                />
                <ErrorMessage
                  name="message"
                  component="p"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* ─── reCAPTCHA ─────────────────────────────────────────────────── */}
              <div className="mb-4">
                <div className="w-[258px] scale-85 h-[66px] min-[400px]:scale-100 min-[400px]:h-[78px] min-[400px]:w-full origin-top-left">
                  <ReCAPTCHA
                    sitekey={RECAPTCHA_SITE_KEY}
                    ref={recaptchaRef}
                    onChange={(token) => {
                      setRecaptchaToken(token);
                    }}
                    onExpired={() => {
                      setRecaptchaToken(null);
                    }}
                  />
                </div>
                {/* Show an error if they clicked “submit” without passing reCAPTCHA */}
                {submitCount > 0 && !recaptchaToken && (
                  <p className="text-red-500 text-sm mt-1">
                    Please verify that you are human.
                  </p>
                )}
              </div>

              {/* ─── Submit Button ─────────────────────────────────────────────── */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`
                  flex items-center gap-2 w-full justify-center px-6 py-2 bg-blue-600 text-white rounded-md transition
                  ${
                    isSubmitting
                      ? "opacity-80 cursor-auto"
                      : "hover:bg-blue-700 cursor-pointer"
                  }
                `}
              >
                {isSubmitting && (
                  <ImSpinner2 className="animate-spin text-xl" />
                )}
                <span>{isSubmitting ? "Sending..." : "Send Message"}</span>
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ContactUs;
