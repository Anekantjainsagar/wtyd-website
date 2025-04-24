"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { setCookie, getCookie, deleteCookie } from "@/utils/cookies";
import axios from "axios";
import API_URI from "@/utils/url";
import { usePathname } from "next/navigation";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const pathname = usePathname();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const getMe = async () => {
    const token = getCookie("token");
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const res = await axios.get(`${API_URI}/api/v1/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.data.success) {
        setUser(res.data.data);
      }
    } catch (err) {
      console.error(
        "Auth Check Failed:",
        err.response?.data?.message || err.message
      );
      logout(); // If token is invalid
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const res = await axios.post(`${API_URI}/api/v1/auth/login`, {
        email,
        password,
      });

      if (res.data.success) {
        const { data: userData, token } = res.data;
        setCookie("token", token, 30);
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
      const res = await axios.post(`${API_URI}/api/v1/auth/register`, {
        name,
        email,
        password,
      });

      if (res.data.success) {
        const { data: userData, token } = res.data;
        setCookie("token", token, 30);
        setUser(userData);
        return { success: true, role: userData?.role };
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
    setUser(null);
  };

  useEffect(() => {
    getMe(); // On initial load
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, loading, login, logout, register, getMe }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
