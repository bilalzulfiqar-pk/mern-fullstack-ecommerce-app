import { createContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

const API_URL = "http://localhost:5000/api/auth";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(
    () => localStorage.getItem("token") || null
  );

  const fetchUser = async () => {
    if (!token) return;

    try {
      //   console.log("Token:", localStorage.getItem("token"));

      const res = await axios.get(`${API_URL}/user`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data);
    } catch (error) {
      console.error(
        "Failed to fetch user",
        error.response?.data || error.message
      );
      logout(); // Clear token if unauthorized
    }
  };

  // Fetch user data if token exists
  useEffect(() => {
    fetchUser();
  }, [token]);

  // Login function
  const login = async (email, password) => {
    try {
      const res = await axios.post(`${API_URL}/login`, { email, password });
      const newToken = res.data.token;
      if (!newToken) throw new Error("No token received");
      setToken(newToken);
      localStorage.setItem("token", newToken);
      fetchUser(); // Fetch user after login
    } catch (error) {
      console.error("Login failed", error.response?.data || error.message);
      throw error;
    }
  };

  // Register function
  const register = async (name, email, password) => {
    try {
      const res = await axios.post(`${API_URL}/register`, {
        name,
        email,
        password,
      });
      setToken(res.data.token);
      localStorage.setItem("token", res.data.token);
      setUser(res.data.user);
    } catch (error) {
      console.error("Registration failed", error);
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
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
