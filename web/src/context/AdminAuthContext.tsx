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
    await new Promise((r) => setTimeout(r, 400));
    
    // Mock admin credentials
    if (username === 'admin' && password === 'admin123') {
      const adminUser: User = {
        id: 'admin_1',
        name: 'System Administrator',
        username: 'admin',
        role: 'admin',
        email: 'admin@foodfast.com',
        createdAt: Date.now() - 86400000 * 365 // 1 year ago
      };
      setAdmin(adminUser);
      setLoading(false);
      return { ok: true };
    }
    
    setLoading(false);
    return { ok: false, message: "Invalid admin credentials" };
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
