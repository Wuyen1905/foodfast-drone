import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { User, UserRole, AuthContextValue, RegisterPayload } from "../types/auth";
import { login as apiLogin, register as apiRegister } from "../api/authApi";

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Initialize user from localStorage on mount
  useEffect(() => {
    console.log("🔄 [AuthContext] Initializing authentication state...");
    try {
      const saved = localStorage.getItem("auth_user");
      const token = localStorage.getItem("token");
      const role = localStorage.getItem("role");
      
      console.log("📦 [AuthContext] Found localStorage data:", {
        hasUser: !!saved,
        hasToken: !!token,
        hasRole: !!role,
        role: role,
        userData: saved ? JSON.parse(saved) : null
      });
      
      if (saved && token && role) {
        const parsedUser = JSON.parse(saved);
        // Verify that saved data is consistent
        if (parsedUser.role === role) {
          console.log("✅ [AuthContext] Restoring user from localStorage:", {
            username: parsedUser.username,
            role: parsedUser.role,
            restaurantId: parsedUser.restaurantId
          });
          setUser(parsedUser);
        } else {
          // Clear inconsistent data
          console.warn("⚠️ [AuthContext] Inconsistent auth data, clearing...");
          localStorage.removeItem("auth_user");
          localStorage.removeItem("token");
          localStorage.removeItem("role");
        }
      } else if (saved || token || role) {
        // Partial data found, clear all to avoid inconsistency
        console.warn("⚠️ [AuthContext] Partial auth data found, clearing...");
        localStorage.removeItem("auth_user");
        localStorage.removeItem("token");
        localStorage.removeItem("role");
      } else {
        console.log("ℹ️ [AuthContext] No saved authentication data found");
      }
    } catch (error) {
      console.error("💥 [AuthContext] Error parsing saved user:", error);
      localStorage.removeItem("auth_user");
      localStorage.removeItem("token");
      localStorage.removeItem("role");
    } finally {
      console.log("✅ [AuthContext] Authentication initialization complete");
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
      // Store user data in localStorage (token is stored separately during login)
      localStorage.setItem("auth_user", JSON.stringify(user));
      // Token and role are stored during login, not here
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
    
    try {
      const response = await apiLogin({ username, password });
      
      if (response.ok && response.user && response.token) {
        const user: User = {
          id: response.user.id,
          name: response.user.name,
          username: response.user.username,
          role: response.user.role as UserRole,
          phone: response.user.phone,
          email: response.user.email,
          restaurantId: response.user.restaurantId,
          orderCount: response.user.orderCount,
          createdAt: response.user.createdAt
        };
        
        console.log("✅ [AuthContext] User found:", { 
          username: user.username, 
          role: user.role, 
          restaurantId: user.restaurantId,
          name: user.name 
        });
        
        // Save token and user to localStorage
        localStorage.setItem("token", response.token);
        localStorage.setItem("auth_user", JSON.stringify(user));
        localStorage.setItem("role", user.role);
        
        console.log("💾 [AuthContext] Authentication data saved to localStorage:", {
          token: response.token.substring(0, 20) + "...",
          role: user.role,
          restaurantId: user.restaurantId
        });
        
        setUser(user);
        setLoading(false);
        console.log("✅ [AuthContext] Login successful, user state updated");
        return { ok: true, user, token: response.token };
      }
      
      console.log("❌ [AuthContext] Login failed - invalid credentials");
      setLoading(false);
      return { ok: false, message: response.message || "Sai tên đăng nhập hoặc mật khẩu" };
    } catch (error: any) {
      console.error("💥 [AuthContext] Login error:", error);
      setLoading(false);
      const message = error.response?.data?.message || error.message || "Có lỗi xảy ra, vui lòng thử lại";
      return { ok: false, message };
    }
  };

  const register = async (payload: RegisterPayload) => {
    console.log("📝 [AuthContext] Registration attempt:", { 
      email: payload.email,
      fullName: payload.fullName,
      phone: payload.phone 
    });
    setLoading(true);
    
    try {
      // Validate payload
      if (!payload.email || !payload.fullName || !payload.phone || !payload.password) {
        console.log("❌ [AuthContext] Registration failed - missing required fields");
        setLoading(false);
        return { ok: false, message: "Vui lòng điền đầy đủ thông tin" };
      }

      // Generate username from email
      const username = payload.email.split('@')[0].toLowerCase();
      
      // Call backend API
      const response = await apiRegister({
        username,
        password: payload.password,
        fullName: payload.fullName,
        email: payload.email,
        phone: payload.phone
      });

      if (response.ok && response.data) {
        const newUser: User = {
          id: response.data.id,
          name: response.data.name,
          username: response.data.username,
          email: response.data.email,
          phone: response.data.phone,
          role: response.data.role as UserRole || 'customer',
          orderCount: response.data.orderCount || 0,
          createdAt: response.data.createdAt || Date.now()
        };

        console.log("✅ [AuthContext] Registration successful:", { 
          id: newUser.id, 
          name: newUser.name, 
          email: newUser.email,
          phone: newUser.phone
        });
        
        setLoading(false);
        return { ok: true, data: newUser };
      }
      
      console.log("❌ [AuthContext] Registration failed:", response.message);
      setLoading(false);
      return { ok: false, message: response.message || "Có lỗi xảy ra, vui lòng thử lại" };
    } catch (error: any) {
      console.error("💥 [AuthContext] Registration error:", error);
      setLoading(false);
      const message = error.response?.data?.message || error.message || "Có lỗi xảy ra, vui lòng thử lại";
      return { ok: false, message };
    }
  };

  const logout = () => setUser(null);
  const isAdmin = () => user?.role === "admin";
  const isRestaurant = () => user?.role === "restaurant";
  const isCustomer = () => user?.role === "customer";
  const setPhone = (phone: string) => user && setUser({ ...user, phone });

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, isAdmin, isRestaurant, isCustomer, setPhone }}>
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
      register: async () => ({ ok: false, message: "Auth not initialized" }),
      logout: () => {},
      isAdmin: () => false,
      isRestaurant: () => false,
      isCustomer: () => false,
      setPhone: () => {}
    };
  }
  return ctx;
};

