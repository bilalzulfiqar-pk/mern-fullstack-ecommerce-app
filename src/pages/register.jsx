import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import { ImSpinner2 } from "react-icons/im";

// Yup schema that matches backend rules:
const registerSchema = Yup.object().shape({
  name: Yup.string()
    .required("Name is required")
    .min(3, "Name must be at least 3 characters")
    .matches(/^[A-Za-z\s]+$/, "Name must contain only letters and spaces"),

  email: Yup.string()
    .required("Email is required")
    .email("Please enter a valid email"),

  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .matches(/\d/, "Password must contain at least one number")
    .matches(/[a-zA-Z]/, "Password must contain at least one letter"),
});

const Register = () => {
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="flex h-[85vh] items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-md mx-4">
        <h2 className="text-2xl font-bold text-center mb-4">Register</h2>

        {/* Formik form */}
        <Formik
          initialValues={{ name: "", email: "", password: "" }}
          validationSchema={registerSchema}
          validateOnBlur={false} // validate on blur //remove these two to want default behavior
          validateOnChange={true} // validate on change
          onSubmit={async (values, { setSubmitting, setFieldError }) => {
            try {
              // Calling context‐register
              await register(values.name, values.email, values.password);
              navigate("/"); // redirect on success
            } catch (err) {
              // If server returns a single‐field message like "Email already registered",
              // map it back to the email field:
              const serverMsg = err.response?.data?.msg;
              if (
                serverMsg === "Email already registered" ||
                serverMsg.toLowerCase().includes("email")
              ) {
                // showing it under the email field:
                setFieldError("email", serverMsg);
              } else {
                // fallback to a generic Formik error on “password” or somewhere else
                setFieldError("password", serverMsg || "Registration failed");
              }
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form className="space-y-4">
              {/* ----- NAME FIELD ----- */}
              <div>
                <Field
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  className={`w-full px-4 py-2 border rounded-md focus:border-blue-300 focus:ring-3 focus:ring-blue-200 focus:ring-opacity-50 focus:outline-none transition duration-300 ${
                    errors.name && touched.name
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />
                <ErrorMessage
                  name="name"
                  component="p"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* ----- EMAIL FIELD ----- */}
              <div>
                <Field
                  type="email"
                  name="email"
                  placeholder="Email"
                  className={`w-full px-4 py-2 border rounded-md focus:border-blue-300 focus:ring-3 focus:ring-blue-200 focus:ring-opacity-50 focus:outline-none transition duration-300 ${
                    errors.email && touched.email
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />
                <ErrorMessage
                  name="email"
                  component="p"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* ----- PASSWORD FIELD ----- */}
              <div>
                <Field
                  type="password"
                  name="password"
                  placeholder="Password"
                  className={`w-full px-4 py-2 border rounded-md focus:border-blue-300 focus:ring-3 focus:ring-blue-200 focus:ring-opacity-50 focus:outline-none transition duration-300 ${
                    errors.password && touched.password
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />
                <ErrorMessage
                  name="password"
                  component="p"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 flex justify-center items-center gap-2 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200 cursor-pointer disabled:cursor-auto disabled:opacity-70 disabled:hover:bg-blue-600"
              >
                {isSubmitting && (
                  <ImSpinner2 className="animate-spin text-xl" />
                )}
                <span>{isSubmitting ? "Registering…" : "Register"}</span>
              </button>
            </Form>
          )}
        </Formik>

        <p className="text-center text-sm mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
