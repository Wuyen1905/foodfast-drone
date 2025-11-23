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
    
    try {
      const response = await apiLogin({ username, password });
      
      if (response.ok && response.user && response.token) {
        // Use user data directly from normalized API response
        const user: User = {
          id: response.user.id,
          username: response.user.username,
          name: response.user.name,
          email: response.user.email,
          phone: response.user.phone,
          role: response.user.role, // Role from backend, no fallback
          restaurantId: response.user.restaurantId || undefined,
          orderCount: response.user.orderCount,
          createdAt: response.user.createdAt,
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
        localStorage.setItem("role", user.role); // Store role from backend
        
        console.log("💾 [AuthContext] Authentication data saved to localStorage:", {
          token: response.token.substring(0, 20) + "...",
          role: user.role,
          restaurantId: user.restaurantId
        });
        
        setUser(user);
        setLoading(false);
        console.log("✅ [AuthContext] Login successful, user state updated");
        return { ok: true, user, token: response.token };
      } else {
        console.log("❌ [AuthContext] Login failed:", response.message);
        setLoading(false);
        return { ok: false, message: response.message || "Sai tên đăng nhập hoặc mật khẩu" };
      }
    } catch (error: any) {
      console.log("❌ [AuthContext] Login failed:", error);
      setLoading(false);
      const message = error?.response?.data?.message || error?.message || "Sai tên đăng nhập hoặc mật khẩu";
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
      // TODO: Backend integration in Phase 2 - removed setTimeout delay
      // Make actual backend API call here
      
      // Validate payload
      if (!payload.email || !payload.fullName || !payload.phone || !payload.password) {
        console.log("❌ [AuthContext] Registration failed - missing required fields");
        setLoading(false);
        return { ok: false, message: "Vui lòng điền đầy đủ thông tin" };
      }

      // Check if email already exists - should be done via backend API
      const existingUser = null;
      if (existingUser) {
        console.log("❌ [AuthContext] Registration failed - email already exists");
        setLoading(false);
        return { ok: false, message: "Email đã được sử dụng" };
      }

      // Check if phone already exists - should be done via backend API
      const existingPhone = null;
      if (existingPhone) {
        console.log("❌ [AuthContext] Registration failed - phone already exists");
        setLoading(false);
        return { ok: false, message: "Số điện thoại đã được sử dụng" };
      }

      // Generate new user ID
      const newUserId = `CUS-${Date.now()}`;
      const newUsername = payload.email.split('@')[0].toLowerCase();
      
      // Create new user object
      const newUser: User = {
        id: newUserId,
        name: payload.fullName,
        username: newUsername,
        email: payload.email,
        phone: payload.phone,
        role: 'customer',
        orderCount: 0,
        createdAt: Date.now()
      };

      // In a real app, this would be sent to the backend
      // For now, we'll just simulate success
      console.log("✅ [AuthContext] Registration successful:", { 
        id: newUser.id, 
        name: newUser.name, 
        email: newUser.email,
        phone: newUser.phone
      });
      
      setLoading(false);
      return { ok: true, data: newUser };
    } catch (error) {
      console.error("💥 [AuthContext] Registration error:", error);
      setLoading(false);
      return { ok: false, message: "Có lỗi xảy ra, vui lòng thử lại" };
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

