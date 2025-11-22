import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { User, AdminAuthContextValue } from "../types/auth";

const AdminAuthContext = createContext<AdminAuthContextValue | undefined>(undefined);

export const AdminAuthProvider = ({ children }: { children: ReactNode }) => {
  const [admin, setAdmin] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Initialize admin from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("admin_auth");
      if (saved) {
        setAdmin(JSON.parse(saved));
      }
    } catch (error) {
      console.error("Error parsing saved admin:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (admin) localStorage.setItem("admin_auth", JSON.stringify(admin));
    else localStorage.removeItem("admin_auth");
  }, [admin]);

  const login = async (username: string, password: string) => {
    setLoading(true);
    try {
      const { login: loginApi } = await import('../api/authApi');
      const response = await loginApi({ username, password });
      
      if (response.ok && response.user && response.user.role === 'admin') {
        setAdmin(response.user);
        setLoading(false);
        return { ok: true };
      }
      
      setLoading(false);
      return { ok: false, message: response.message || "Invalid admin credentials" };
    } catch (error) {
      console.error('Admin login error:', error);
      setLoading(false);
      return { ok: false, message: "Login failed. Please try again." };
    }
  };

  const logout = () => setAdmin(null);

  return (
    <AdminAuthContext.Provider value={{ admin, loading, login, logout }}>
      {loading ? (
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '100vh',
          fontSize: '18px',
          color: '#666'
        }}>
          Loading admin panel...
        </div>
      ) : (
        children
      )}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) {
    console.error("useAdminAuth must be used inside AdminAuthProvider");
    return {
      admin: null,
      loading: false,
      login: async () => ({ ok: false, message: "Admin auth not initialized" }),
      logout: () => {}
    };
  }
  return ctx;
};
