import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { AdminAuthProvider } from "@/context/AdminAuthContext";
import { GlobalStyle, theme } from "../theme";
import { enhancedTheme } from "../globalStyles";
import AdminLogin from "@/pages/admin/AdminLogin";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import AdminUsers from "@/pages/admin/AdminUsers";
import AdminRestaurants from "@/pages/admin/AdminRestaurants";
import AdminOrders from "@/pages/admin/AdminOrders";
import AdminProtectedRoute from "@/components/AdminProtectedRoute";

/**
 * AdminApp - Completely independent admin management system
 * 
 * This component provides a separate routing and authentication system
 * for admin users, isolated from the main user-facing application.
 * 
 * Routes:
 * - /admin/login → Admin login page
 * - /admin/dashboard → Main admin dashboard (protected)
 * - /admin/users → User management (protected)
 * - /admin/restaurants → Restaurant management (protected)
 * - /admin/orders → Order management (protected)
 */
export default function AdminApp() {
  return (
    <ThemeProvider theme={enhancedTheme}>
      <GlobalStyle />
      <AdminAuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Admin login page - publicly accessible */}
            <Route path="/admin/login" element={<AdminLogin />} />

            {/* Protected admin routes - require authentication */}
            <Route 
              path="/admin/dashboard" 
              element={
                <AdminProtectedRoute>
                  <AdminDashboard />
                </AdminProtectedRoute>
              } 
            />
            <Route 
              path="/admin/users" 
              element={
                <AdminProtectedRoute>
                  <AdminUsers />
                </AdminProtectedRoute>
              } 
            />
            <Route 
              path="/admin/restaurants" 
              element={
                <AdminProtectedRoute>
                  <AdminRestaurants />
                </AdminProtectedRoute>
              } 
            />
            <Route 
              path="/admin/orders" 
              element={
                <AdminProtectedRoute>
                  <AdminOrders />
                </AdminProtectedRoute>
              } 
            />

            {/* Redirect /admin to /admin/login */}
            <Route path="/admin" element={<Navigate to="/admin/login" replace />} />
            
            {/* Catch all admin routes and redirect to login */}
            <Route path="/admin/*" element={<Navigate to="/admin/login" replace />} />
          </Routes>
        </BrowserRouter>
      </AdminAuthProvider>
    </ThemeProvider>
  );
}