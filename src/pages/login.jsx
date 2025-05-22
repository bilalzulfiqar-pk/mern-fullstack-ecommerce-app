import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

// Yup schema exactly matching backend rules:
const loginSchema = Yup.object().shape({
  email: Yup.string()
    .required("Email is required")
    .email("Please enter a valid email"),
  password: Yup.string().required("Password is required"),
});

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="flex h-[85vh] items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-md mx-4">
        <h2 className="text-2xl font-bold text-center mb-4">Login</h2>

        {/* Formik form */}
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={loginSchema}
          validateOnBlur={false} // validate on blur //remove these two to want default behavior
          validateOnChange={true} // validate on change
          onSubmit={async (values, { setSubmitting, setFieldError }) => {
            try {
              // Calling AuthContext.login(email, password)
              await login(values.email, values.password);
              navigate("/"); // redirect on success
            } catch (err) {
              const data = err.response?.data;

              // If validationResult on backend failed, data.errors is an array
              if (Array.isArray(data?.errors)) {
                data.errors.forEach(({ msg, param }) => {
                  // Map each Express-Validator param to its Formik field
                  setFieldError(param, msg);
                });
              }
              // Otherwise, if backend sent a single msg ("Invalid credentials" or "Server error")
              else if (typeof data?.msg === "string") {
                if (data.msg === "Invalid credentials") {
                  // Show under password
                  setFieldError("password", "Invalid email or password");
                } else {
                  // Generic server error (rare on login route)
                  setFieldError("password", data.msg || "Login failed");
                }
              } else {
                // Fallback if something else went wrong
                setFieldError("password", "Login failed. Please try again.");
              }
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form className="space-y-4">
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
                className="w-full bg-blue-600 text-white py-2 rounded-md cursor-pointer disabled:cursor-auto hover:bg-blue-700 transition duration-200 disabled:opacity-50"
              >
                {isSubmitting ? "Logging in…" : "Login"}
              </button>
            </Form>
          )}
        </Formik>

        <p className="text-center text-sm mt-4">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-600 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
