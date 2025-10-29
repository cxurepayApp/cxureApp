import React, { createContext, useState, useEffect } from "react";
import api from "./axiosConfig";
import { AuthContextType, User } from "../types/auth";




export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(() => localStorage.getItem("token"));

  useEffect(() => {
    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      refreshUser();
    }
  }, [token]);

  const login = async (email: string, password: string): Promise<User> => {
    const res = await api.post(`/auth/login`, { email, password });
    const { token, user } = res.data;
    localStorage.setItem("token", token);
    setToken(token);
    setUser(user);
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    return user;
  };

  const register = async (name: string, email: string, password: string, role: string): Promise<User> => {
    const res = await api.post(`/auth/register`, { name, email, password, role });
    const { token, user } = res.data;
    localStorage.setItem("token", token);
    setToken(token);
    setUser(user);
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    return user;
  };

  const logout = () => {
    localStorage.removeItem("token");
    delete api.defaults.headers.common["Authorization"];
    setUser(null);
    setToken(null);
  };

  const refreshUser = async (): Promise<void> => {
    try {
      const res = await api.get(`/auth/me`);
      setUser(res.data.user);
    } catch {
      logout();
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
};


