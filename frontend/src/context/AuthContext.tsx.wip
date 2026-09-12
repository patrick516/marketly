import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../lib/api";
import toast from "react-hot-toast";

interface AuthContextType {
  user: any;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token"),
  );

  useEffect(() => {
    if (token) {
      fetchUser();
    }
  }, [token]);

  const fetchUser = async () => {
    try {
      const { data } = await api.get("/auth/me");
      setUser(data);
    } catch (error) {
      logout();
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const { data } = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", data.token);
      setToken(data.token);
      setUser(data.user);
      toast.success("Login successful!");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Login failed");
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    toast.success("Logged out");
  };

  return (
    <AuthContext.Provider
      value={{ user, token, login, logout, isAuthenticated: !!token }}
    >
      {children}
    </AuthContext.Provider>
  );
};
