import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { User, AdminAuthContextValue } from "../types/auth";
import { api } from "@/config/axios";

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
      // Call real backend API for authentication
      const response = await api.post('/auth/login', { username, password });

      if (response.data.role === 'admin') {
        // User is authenticated and has admin role
        const adminUser: User = {
          id: response.data.id || '',
          name: response.data.name || 'System Administrator',
          username: response.data.username || username,
          role: 'admin',
          email: response.data.email || 'admin@foodfast.com',
          createdAt: Date.now() - 86400000 * 365
        };
        setAdmin(adminUser);
        return { ok: true };
      } else {
        // User is authenticated but not admin
        return { ok: false, message: "Access denied. Admin role required." };
      }
    } catch (error: any) {
      console.error('Admin login error:', error);
      const message = error?.response?.data?.message || "Login failed. Please try again.";
      return { ok: false, message };
    } finally {
      setLoading(false);
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
