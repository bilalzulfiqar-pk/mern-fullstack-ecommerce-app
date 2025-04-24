import { createContext, useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const AuthContext = createContext();
const MySwal = withReactContent(Swal);

// const API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api/auth";
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(
    () => localStorage.getItem("token") || null
  );

  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      //   console.log("Token:", localStorage.getItem("token"));

      const res = await axios.get(`${API_BASE_URL}/api/auth/user`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data);
    } catch (error) {
      console.error(
        "Failed to fetch user",
        error.response?.data || error.message
      );
      logout(); // Clear token if unauthorized
    } finally {
      setLoading(false);
    }
  };

  // Fetch user data if token exists
  useEffect(() => {
    fetchUser();
  }, [token]);

  // Login function
  const login = async (email, password) => {
    try {
      const res = await axios.post(`${API_BASE_URL}/api/auth/login`, {
        email,
        password,
      });
      const newToken = res.data.token;
      if (!newToken) throw new Error("No token received");
      setToken(newToken);
      localStorage.setItem("token", newToken);
      // fetchUser(); // Fetch user after login
      setLoading(true); // Set loading to true before fetching user
      await fetchUser(); // Ensure user is fetched before setting loading false
    } catch (error) {
      console.error("Login failed", error.response?.data || error.message);
      throw error;
    }
  };

  // Register function
  const register = async (name, email, password) => {
    try {
      const res = await axios.post(`${API_BASE_URL}/api/auth/register`, {
        name,
        email,
        password,
      });
      setToken(res.data.token);
      localStorage.setItem("token", res.data.token);
      setUser(res.data.user);
    } catch (error) {
      console.error("Registration failed", error);

      const validationErrors = error.response?.data?.errors;
      const message = error.response?.data?.msg;

      if (validationErrors && validationErrors.length > 0) {
        // Multiple validation errors
        const errorList = validationErrors
          .map((err) => `• ${err.msg}`)
          .join("<br>");
        await MySwal.fire({
          title: "Validation Error",
          html: errorList,
          icon: "error",
        });
      } else {
        // Generic error message
        await MySwal.fire({
          title: "Error",
          text: message || "Registration failed.",
          icon: "error",
        });
      }

      throw error;
    }
  };

  // Logout function
  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
  };

  //   console.log("Token:", localStorage.getItem("token"));

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        loading,
        authLoading: loading,
        fetchUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
