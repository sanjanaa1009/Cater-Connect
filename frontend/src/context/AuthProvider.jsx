import { useState } from "react";
import { AuthContext } from "./AuthContext";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem("cater-user");
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const login = (data) => {
    const payload = data?.data ?? data;

    const token = payload?.token;

    const userObj = {
      _id: payload?._id,
      name: payload?.name,
      email: payload?.email,
      role: payload?.role,
      catererId: payload?.catererId || null,
    };

    if (!token) {
      console.error("No token found");
      return;
    }

    localStorage.setItem("token", token);
    localStorage.setItem("cater-user", JSON.stringify(userObj));

    setUser(userObj);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("cater-user");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}