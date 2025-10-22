import { Navigate, Outlet } from "react-router-dom";
import { useAdminAuth } from "@/context/AdminAuthContext";

export default function AdminProtectedRoute() {
  const { admin, loading } = useAdminAuth();

  if (loading) {
    return (
      <div style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "18px",
        color: "#555"
      }}>
        Loading admin portal...
      </div>
    );
  }

  // Nếu chưa đăng nhập thì chuyển về trang /admin/login
  return admin ? <Outlet /> : <Navigate to="/admin/login" replace />;
}