import { useContext, useEffect } from "react";
import AuthContext from "../context/AuthContext";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const MySwal = withReactContent(Swal);

const UserSettings = () => {
  const { user, fetchUser } = useContext(AuthContext);
  const token = localStorage.getItem("token");
  const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

  // Keep the form’s initial name in sync with the user’s current name
  useEffect(() => {
    if (user?.name) {
      // Formik’s initialValues will pick this up via enableReinitialize
    }
  }, [user]);

  //
  // ─── Formik + Yup SCHEMAS ────────────────────────────────────────────────────
  //

  // Schema for updating name (mirror backend: non‐empty, min 3 chars, letters+spaces)
  const nameSchema = Yup.object().shape({
    name: Yup.string()
      .required("Name is required")
      .min(3, "Name must be at least 3 characters")
      .matches(/^[A-Za-z\s]+$/, "Name can only contain letters and spaces"),
  });

  // Schema for updating password (match backend: current required, new ≥6, digit, letter, confirm must equal)
  const passwordSchema = Yup.object().shape({
    currentPassword: Yup.string().required("Current password is required"),
    newPassword: Yup.string()
      .required("New password is required")
      .min(6, "Password must be at least 6 characters")
      .matches(/\d/, "Password must contain at least one number")
      .matches(/[a-zA-Z]/, "Password must contain at least one letter"),
    confirmPassword: Yup.string()
      .required("Please confirm your new password")
      .oneOf([Yup.ref("newPassword")], "Passwords must match"),
  });

  //
  // ─── RENDER ─────────────────────────────────────────────────────────────────
  //
  return (
    <div className="w-full py-10 bg-gray-100 h-[85vh] h-dvh-85 flex items-center justify-center">
      <div className="max-w-2xl mx-4 p-6 bg-white w-xl rounded-xl h-fit shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Settings
        </h2>

        {/* ─── UPDATE NAME FORM ───────────────────────────────────────────────── */}
        <Formik
          enableReinitialize
          initialValues={{ name: user?.name || "" }}
          validationSchema={nameSchema}
          validateOnBlur={false} // validate on blur //remove these two to want default behavior
          validateOnChange={true} // validate on change
          onSubmit={async (
            values,
            { setSubmitting, setFieldError, resetForm }
          ) => {
            // Ask for confirmation
            const result = await MySwal.fire({
              title: "Are you sure?",
              text: "You want to change your name?",
              icon: "warning",
              showCancelButton: true,
              confirmButtonText: "Yes, update it!",
            });

            if (!result.isConfirmed) {
              setSubmitting(false);
              return;
            }

            try {
              await axios.put(
                `${API_BASE_URL}/api/users/update-name`,
                { name: values.name },
                {
                  headers: { Authorization: `Bearer ${token}` },
                }
              );
              MySwal.fire("Updated!", "Your name has been updated.", "success");
              await fetchUser(); // refresh user info
              // Optionally resetForm({ values: { name: values.name } })
            } catch (error) {
              // Backend might return validation errors as an array
              if (error.response?.data?.errors) {
                error.response.data.errors.forEach(({ msg, param }) => {
                  setFieldError(param, msg);
                });
              } else {
                // Generic error
                MySwal.fire(
                  "Error",
                  error.response?.data?.msg || "Failed to update name.",
                  "error"
                );
              }
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <Field
                name="name"
                type="text"
                placeholder="Your full name"
                className={`w-full px-4 py-2 border ${
                  errors.name && touched.name
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-md
                  focus:outline-none
                  focus:border-blue-300
                  focus:ring-3 focus:ring-blue-200 focus:ring-opacity-50
                  transition duration-300
                `}
              />
              <ErrorMessage
                name="name"
                component="p"
                className="text-red-500 text-sm mt-1"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-4 px-4 w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200 cursor-pointer disabled:cursor-auto disabled:opacity-50"
              >
                {isSubmitting ? "Updating…" : "Update Name"}
              </button>
            </Form>
          )}
        </Formik>

        {/* ─── UPDATE PASSWORD FORM ─────────────────────────────────────────────── */}
        <Formik
          initialValues={{
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
          }}
          validationSchema={passwordSchema}
          validateOnBlur={false} // validate on blur //remove these two to want default behavior
          validateOnChange={true} // validate on change
          onSubmit={async (
            values,
            { setSubmitting, setFieldError, resetForm }
          ) => {
            // Ask for confirmation
            const result = await MySwal.fire({
              title: "Are you sure?",
              text: "You want to change your password?",
              icon: "warning",
              showCancelButton: true,
              confirmButtonText: "Yes, change it!",
            });

            if (!result.isConfirmed) {
              setSubmitting(false);
              return;
            }

            try {
              await axios.put(
                `${API_BASE_URL}/api/users/update-password`,
                {
                  currentPassword: values.currentPassword,
                  newPassword: values.newPassword,
                },
                {
                  headers: { Authorization: `Bearer ${token}` },
                }
              );
              MySwal.fire(
                "Success",
                "Password updated successfully!",
                "success"
              );
              resetForm(); // Clear all password fields
            } catch (error) {
              if (error.response?.data?.errors) {
                // Map each backend validation error (param will be one of our fields)
                error.response.data.errors.forEach(({ msg, param }) => {
                  setFieldError(param, msg);
                });
              } else {
                // Generic or “Invalid credentials” style error
                MySwal.fire(
                  "Error",
                  error.response?.data?.msg || "Failed to update password.",
                  "error"
                );
              }
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form>
              {/* Current Password */}
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Current Password
              </label>
              <Field
                name="currentPassword"
                type="password"
                placeholder="••••••••"
                className={`w-full px-4 py-2 border ${
                  errors.currentPassword && touched.currentPassword
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-md
                  focus:outline-none
                  focus:border-blue-300
                  focus:ring-3 focus:ring-blue-200 focus:ring-opacity-50
                  transition duration-300
                  mb-3
                `}
                autoComplete="current-password"
              />
              <ErrorMessage
                name="currentPassword"
                component="p"
                className="text-red-500 text-sm mb-3"
              />

              {/* New Password */}
              <label className="block text-sm font-medium text-gray-700 mb-1">
                New Password
              </label>
              <Field
                name="newPassword"
                type="password"
                placeholder="••••••••"
                className={`w-full px-4 py-2 border ${
                  errors.newPassword && touched.newPassword
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-md
                  focus:outline-none
                  focus:border-blue-300
                  focus:ring-3 focus:ring-blue-200 focus:ring-opacity-50
                  transition duration-300
                  mb-3
                `}
                autoComplete="new-password"
              />
              <ErrorMessage
                name="newPassword"
                component="p"
                className="text-red-500 text-sm mb-3"
              />

              {/* Confirm New Password */}
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirm New Password
              </label>
              <Field
                name="confirmPassword"
                type="password"
                placeholder="••••••••"
                className={`w-full px-4 py-2 border ${
                  errors.confirmPassword && touched.confirmPassword
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-md
                  focus:outline-none
                  focus:border-blue-300
                  focus:ring-3 focus:ring-blue-200 focus:ring-opacity-50
                  transition duration-300
                  mb-4
                `}
                autoComplete="new-password"
              />
              <ErrorMessage
                name="confirmPassword"
                component="p"
                className="text-red-500 text-sm mb-4"
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className="px-4 py-2 w-full cursor-pointer bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-200 disabled:cursor-auto disabled:opacity-50"
              >
                {isSubmitting ? "Changing…" : "Change Password"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default UserSettings;
