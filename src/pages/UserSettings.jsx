import { useContext, useState, useEffect } from "react";
import AuthContext from "../context/AuthContext";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { div } from "framer-motion/client";

const MySwal = withReactContent(Swal);

const UserSettings = () => {
  const { user, fetchUser } = useContext(AuthContext);
  const token = localStorage.getItem("token");
  const [name, setName] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

  useEffect(() => {
    if (user?.name) {
      setName(user.name);
    }
  }, [user]);

  const updateName = async () => {
    const result = await MySwal.fire({
      title: "Are you sure?",
      text: "You want to change your name?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, update it!",
    });

    if (result.isConfirmed) {
      try {
        await axios.put(
          `${API_BASE_URL}/api/users/update-name`,
          { name },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        MySwal.fire("Updated!", "Your name has been updated.", "success");
        fetchUser(); // Fetch user data again to reflect changes
      } catch (error) {
        // Check for validation errors from backend
        if (error.response?.data?.errors) {
          // Collect validation error messages and display them in a SweetAlert
          const errorMessages = error.response.data.errors
            .map((err) => `• ${err.msg}`)
            .join("<br>");

          MySwal.fire("Validation Error", errorMessages, "error");
        } else {
          // If there is a generic error
          MySwal.fire(
            "Error",
            error.response?.data?.msg || "Failed to update name.",
            "error"
          );
        }
      }
    }
  };

  const updatePassword = async () => {
    if (newPassword !== confirmPassword) {
      return MySwal.fire("Error", "Passwords do not match!", "error");
    }

    const result = await MySwal.fire({
      title: "Are you sure?",
      text: "You want to change your password?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, change it!",
    });

    if (result.isConfirmed) {
      try {
        await axios.put(
          `${API_BASE_URL}/api/users/update-password`,
          { currentPassword, newPassword },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        MySwal.fire("Success", "Password updated successfully!", "success");
      } catch (error) {
        if (error.response?.data?.errors) {
          const errorMessages = error.response.data.errors
            .map((err) => `• ${err.msg}`)
            .join("<br>");

          MySwal.fire("Validation Error", errorMessages, "error");
        } else {
          MySwal.fire(
            "Error",
            error.response?.data?.msg || "Failed to update password.",
            "error"
          );
        }
      }
    }
  };

  return (
    <div className="w-full h-fit py-10 bg-gray-100">
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">User Settings</h2>

        {/* Update Name */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Full Name
          </label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
          />
          <button
            onClick={updateName}
            className="mt-3 px-4 cursor-pointer py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Update Name
          </button>
        </div>

        {/* Update Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Current Password
          </label>
          <input
            type="password"
            className="w-full px-4 py-2 border rounded-md mb-3"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            autoComplete="password"
          />

          <label className="block text-sm font-medium text-gray-700 mb-1">
            New Password
          </label>
          <input
            type="password"
            className="w-full px-4 py-2 border rounded-md mb-3"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            autoComplete="new-password"
          />

          <label className="block text-sm font-medium text-gray-700 mb-1">
            Confirm New Password
          </label>
          <input
            type="password"
            className="w-full px-4 py-2 border rounded-md mb-4"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            autoComplete="new-password"
          />

          <button
            onClick={updatePassword}
            className="px-4 py-2 cursor-pointer bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            Change Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserSettings;
