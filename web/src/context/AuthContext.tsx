import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { User, UserRole, AuthContextValue } from "../types/auth";
import { USERS, CREDENTIALS } from "../data/mockData";

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Initialize user from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("auth_user");
      const token = localStorage.getItem("token");
      const role = localStorage.getItem("role");
      
      if (saved && token && role) {
        const parsedUser = JSON.parse(saved);
        // Verify that saved data is consistent
        if (parsedUser.role === role) {
          setUser(parsedUser);
        } else {
          // Clear inconsistent data
          console.warn("Inconsistent auth data, clearing...");
          localStorage.removeItem("auth_user");
          localStorage.removeItem("token");
          localStorage.removeItem("role");
        }
      } else if (saved || token || role) {
        // Partial data found, clear all to avoid inconsistency
        console.warn("Partial auth data found, clearing...");
        localStorage.removeItem("auth_user");
        localStorage.removeItem("token");
        localStorage.removeItem("role");
      }
    } catch (error) {
      console.error("Error parsing saved user:", error);
      localStorage.removeItem("auth_user");
      localStorage.removeItem("token");
      localStorage.removeItem("role");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (user) {
      console.log("💾 [AuthContext] Storing user in localStorage:", { 
        username: user.username, 
        role: user.role, 
        restaurantId: user.restaurantId 
      });
      // Store user data, token, and role
      localStorage.setItem("auth_user", JSON.stringify(user));
      // Generate a simple token (in production, this would come from backend)
      const token = `token_${user.username}_${Date.now()}`;
      localStorage.setItem("token", token);
      localStorage.setItem("role", user.role);
      console.log("✅ [AuthContext] User state synchronized to localStorage");
    } else {
      console.log("🗑️ [AuthContext] Clearing user from localStorage");
      // Clear all auth data
      localStorage.removeItem("auth_user");
      localStorage.removeItem("token");
      localStorage.removeItem("role");
    }
  }, [user]);

  const login = async (username: string, password: string) => {
    console.log("🔐 [AuthContext] Login attempt:", { username });
    setLoading(true);
    await new Promise((r) => setTimeout(r, 400));
    
    // Find matching credentials
    const credential = Object.values(CREDENTIALS).find(cred => 
      cred.username === username && cred.password === password
    );
    
    if (credential) {
      const user = USERS.find(u => u.username === username);
      if (user) {
        console.log("✅ [AuthContext] User found:", { 
          username: user.username, 
          role: user.role, 
          restaurantId: user.restaurantId,
          name: user.name 
        });
        setUser(user);
        setLoading(false);
        console.log("✅ [AuthContext] Login successful, user state updated");
        return { ok: true };
      }
    }
    
    console.log("❌ [AuthContext] Login failed - invalid credentials");
    setLoading(false);
    return { ok: false, message: "Tên đăng nhập hoặc mật khẩu không đúng." };
  };

  const logout = () => setUser(null);
  const isAdmin = () => user?.role === "admin";
  const isRestaurant = () => user?.role === "restaurant";
  const isCustomer = () => user?.role === "customer";
  const setPhone = (phone: string) => user && setUser({ ...user, phone });

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, isAdmin, isRestaurant, isCustomer, setPhone }}>
      {loading ? (
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '100vh',
          fontSize: '18px',
          color: '#666'
        }}>
          Đang tải...
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    console.error("useAuth must be used inside AuthProvider");
    // Return a safe fallback instead of throwing
    return {
      user: null,
      loading: false,
      login: async () => ({ ok: false, message: "Auth not initialized" }),
      logout: () => {},
      isAdmin: () => false,
      isRestaurant: () => false,
      isCustomer: () => false,
      setPhone: () => {}
    };
  }
  return ctx;
};

