import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

type User = {
  id: string;
  name: string;
  username: string;
  role: "admin" | "user";
  phone?: string;
};

type AuthContextValue = {
  user: User | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<{ ok: boolean; message?: string }>;
  logout: () => void;
  isAdmin: () => boolean;
  setPhone?: (phone: string) => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const ADMIN_CRED = { username: "admin", password: "admin123" };
const USER_CRED = { username: "user", password: "user123" };

const SAMPLE_USERS: User[] = [
  { id: "u1", name: "Admin", username: ADMIN_CRED.username, role: "admin" },
  { id: "u2", name: "Người dùng", username: USER_CRED.username, role: "user", phone: "0123456789" },
];

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Initialize user from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("auth_user");
      if (saved) {
        setUser(JSON.parse(saved));
      }
    } catch (error) {
      console.error("Error parsing saved user:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (user) localStorage.setItem("auth_user", JSON.stringify(user));
    else localStorage.removeItem("auth_user");
  }, [user]);

  const login = async (username: string, password: string) => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 400));
    if (username === ADMIN_CRED.username && password === ADMIN_CRED.password) {
      setUser(SAMPLE_USERS[0]);
      setLoading(false);
      return { ok: true };
    }
    if (username === USER_CRED.username && password === USER_CRED.password) {
      setUser(SAMPLE_USERS[1]);
      setLoading(false);
      return { ok: true };
    }
    setLoading(false);
    return { ok: false, message: "Tên đăng nhập hoặc mật khẩu không đúng." };
  };

  const logout = () => setUser(null);
  const isAdmin = () => user?.role === "admin";
  const setPhone = (phone: string) => user && setUser({ ...user, phone });

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, isAdmin, setPhone }}>
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
      setPhone: () => {}
    };
  }
  return ctx;
};
