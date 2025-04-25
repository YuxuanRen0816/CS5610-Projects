// utils/AuthContext.js
import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const fetchUser = async () => {
    try {
      const res = await axios.get("/api/auth/me", { withCredentials: true });
      setUser(res.data);
    } catch (err) {
      setUser(null);
    }
  };

  useEffect(() => {
    fetchUser(); // 自动尝试恢复登录状态
  }, []);

  const login = async (username, password) => {
    const res = await axios.post(
      "/api/auth/login",
      { username, password },
      { withCredentials: true }
    );
    setUser(res.data);
  };

  const register = async (username, password) => {
    const res = await axios.post(
      "/api/auth/register",
      { username, password },
      { withCredentials: true }
    );
    setUser(res.data);
  };

  const logout = async () => {
    await axios.post("/api/auth/logout", {}, { withCredentials: true });
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
