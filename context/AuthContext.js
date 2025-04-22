// context/AuthContext.js
"use client";
import { createContext, useContext, useState } from "react";
import { setCookie, getCookie, deleteCookie } from "@/utils/cookies";
import axios from "axios";
import API_URI from "@/utils/url";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    try {
      const res = await axios.post(`${API_URI}/api/v1/auth/login`, {
        email,
        password,
      });

      if (res.data.success) {
        const { data: userData, token } = res.data;
        setCookie("token", token, 30); // 30 day
        setUser(userData);
        return { success: true };
      }
    } catch (err) {
      console.error("Login Error:", err.response?.data?.message || err.message);
      return {
        success: false,
        message: err.response?.data?.message || "Login failed",
      };
    }
  };

  const register = async (name, email, password) => {
    try {
      const res = await axios.post(`${API_URI}/api/v1/auth/login`, {
        name,
        email,
        password,
      });

      if (res.data.success) {
        const { data: userData, token } = res.data;
        setCookie("token", token, 30); // 30 day
        setUser(userData);
        return { success: true };
      }
    } catch (err) {
      console.error(
        "Registration Error:",
        err.response?.data?.message || err.message
      );
      return {
        success: false,
        message: err.response?.data?.message || "Registration failed",
      };
    }
  };

  const logout = () => {
    deleteCookie("token");
    deleteCookie("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
