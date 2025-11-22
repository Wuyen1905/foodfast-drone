import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context";
import type { UserRole } from "../types/auth";

type Props = {
  children: React.ReactNode;
  requireRole?: UserRole | UserRole[]; // optional role gate
  fallback?: React.ReactNode;          // optional loading UI
  redirectTo?: string;                 // default: "/login"
  showErrorMessage?: boolean;          // show error instead of redirect for auth failures
};

export default function ProtectedRoute({
  children,
  requireRole,
  fallback,
  redirectTo = "/login",
  showErrorMessage = false,
}: Props) {
  const { user, loading } = useAuth();
  const loc = useLocation();

  // Check for token and role in localStorage
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (loading) {
    return (
      fallback ?? (
        <div style={{ padding: 24, textAlign: "center" }}>Đang tải thông tin đăng nhập…</div>
      )
    );
  }

  // Handle missing authentication
  if (!user || !token || !role) {
    // For restaurant routes, show error message instead of redirecting
    if (showErrorMessage || (requireRole && (requireRole === 'restaurant' || (Array.isArray(requireRole) && requireRole.includes('restaurant'))))) {
      return (
        <div style={{ 
          textAlign: "center", 
          padding: "30px", 
          color: "red",
          fontSize: "16px",
          fontWeight: "500"
        }}>
          Không thể xác thực tài khoản nhà hàng. Vui lòng đăng nhập lại.
          <div style={{ marginTop: "20px" }}>
            <a 
              href="/login" 
              style={{ 
                color: "#FF6600", 
                textDecoration: "none",
                padding: "10px 20px",
                border: "2px solid #FF6600",
                borderRadius: "8px",
                display: "inline-block",
                fontWeight: "600"
              }}
            >
              Đăng nhập lại
            </a>
          </div>
        </div>
      );
    }
    // For other routes, redirect to login
    return <Navigate to={redirectTo} replace state={{ from: loc }} />;
  }

  // Verify role consistency
  if (user.role !== role) {
    console.error("Role mismatch between user and localStorage");
    localStorage.removeItem("auth_user");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    return (
      <div style={{ 
        textAlign: "center", 
        padding: "30px", 
        color: "red",
        fontSize: "16px"
      }}>
        Phát hiện dữ liệu xác thực không nhất quán. Vui lòng đăng nhập lại.
        <div style={{ marginTop: "20px" }}>
          <a href="/login" style={{ color: "#FF6600", textDecoration: "none" }}>
            Đăng nhập lại
          </a>
        </div>
      </div>
    );
  }

  // Check role requirements
  if (requireRole) {
    const ok = Array.isArray(requireRole)
      ? requireRole.includes(user.role)
      : user.role === requireRole;
    if (!ok) {
      return (
        <div style={{ 
          textAlign: "center", 
          padding: "30px", 
          color: "#d00",
          fontSize: "16px"
        }}>
          Bạn không có quyền truy cập trang này.
          <div style={{ marginTop: "20px" }}>
            <a href="/" style={{ color: "#FF6600", textDecoration: "none" }}>
              Quay về trang chủ
            </a>
          </div>
        </div>
      );
    }
  }

  return <>{children}</>;
}
