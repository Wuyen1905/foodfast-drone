import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import Menu from './Menu';
import Details from './Details';
import Cart from './Cart';
import Checkout from './Checkout';
import VNPayReturn from './VNPayReturn';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import OrderTracking from './OrderTracking';
import Login from './Login';
import RestaurantDashboard from './restaurant/RestaurantDashboard';
import SweetDreamsDashboard from './restaurant/SweetDreamsDashboard';
import AlohaKitchenDashboard from './restaurant/AlohaKitchenDashboard';
import AdminControlPanel from './admin/AdminControlPanel';
import ThemeToggle from '../components/ThemeToggle';
import ResponsiveLayout from '../components/ResponsiveLayout';
import ProtectedRoute from '../components/ProtectedRoute';
import CustomerInfoForm from '../components/CustomerInfoForm';

// Admin components
import AdminLogin from './admin/AdminLogin';
import AdminDashboard from './admin/AdminDashboard';
import AdminUsers from './admin/AdminUsers';
import AdminRestaurants from './admin/AdminRestaurants';
import AdminOrders from './admin/AdminOrders';
import AdminProtectedRoute from '../components/AdminProtectedRoute';
import { AdminAuthProvider } from '@/context/AdminAuthContext';

// Role-based route protection component
const RoleGuardedRoute: React.FC<{ children: React.ReactNode; allowedRoles: string[] }> = ({ children, allowedRoles }) => {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  if (!allowedRoles.includes(user.role)) {
    // Redirect to appropriate page based on role
    const redirectPath = user.role === 'restaurant' ? '/restaurant' : 
                         user.role === 'admin' ? '/admin/dashboard' : '/menu';
    return <Navigate to={redirectPath} replace />;
  }
  
  return <>{children}</>;
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ResponsiveLayout>
        <Navbar />
        <ThemeToggle />
        <Routes>
            <Route path="/" element={<Navigate to="/menu" replace />} />
            <Route path="/home" element={<Navigate to="/menu" replace />} />
            <Route path="/homepage" element={<Navigate to="/menu" replace />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/menu/:id" element={<Details />} />
            <Route path="/details/:id" element={<Details />} />
            <Route path="/login" element={<Login />} />
            <Route path="/customer-info" element={<CustomerInfoForm />} />
            
            {/* Protected routes for customers only */}
            <Route path="/cart" element={
              <ProtectedRoute requireRole="customer">
                <Cart />
              </ProtectedRoute>
            } />
            <Route path="/checkout" element={
              <RoleGuardedRoute allowedRoles={['customer']}>
                <Checkout />
              </RoleGuardedRoute>
            } />
            <Route path="/vnpay-return" element={<VNPayReturn />} />
            
            {/* Protected routes for all logged in users */}
            <Route path="/orders" element={<OrderTracking />} />
            
            {/* Restaurant-only routes */}
            <Route path="/restaurant" element={
              <ProtectedRoute requireRole="restaurant">
                <RestaurantDashboard />
              </ProtectedRoute>
            } />
            <Route path="/sweetdreams" element={
              <ProtectedRoute requireRole="restaurant">
                <SweetDreamsDashboard />
              </ProtectedRoute>
            } />
            <Route path="/aloha" element={
              <ProtectedRoute requireRole="restaurant">
                <AlohaKitchenDashboard />
              </ProtectedRoute>
            } />
            
            {/* Legacy admin route */}
            <Route path="/admin" element={
              <ProtectedRoute requireRole="admin">
                <AdminControlPanel />
              </ProtectedRoute>
            } />
            
            {/* New Admin Management System Routes - Wrapped in AdminAuthProvider */}
            <Route path="/admin/login" element={
              <AdminAuthProvider>
                <AdminLogin />
              </AdminAuthProvider>
            } />
            <Route path="/admin/dashboard" element={
              <AdminAuthProvider>
                <AdminProtectedRoute>
                  <AdminDashboard />
                </AdminProtectedRoute>
              </AdminAuthProvider>
            } />
            <Route path="/admin/users" element={
              <AdminAuthProvider>
                <AdminProtectedRoute>
                  <AdminUsers />
                </AdminProtectedRoute>
              </AdminAuthProvider>
            } />
            <Route path="/admin/restaurants" element={
              <AdminAuthProvider>
                <AdminProtectedRoute>
                  <AdminRestaurants />
                </AdminProtectedRoute>
              </AdminAuthProvider>
            } />
            <Route path="/admin/orders" element={
              <AdminAuthProvider>
                <AdminProtectedRoute>
                  <AdminOrders />
                </AdminProtectedRoute>
              </AdminAuthProvider>
            } />
          </Routes>
          <Footer />
        </ResponsiveLayout>
    </BrowserRouter>
  );
};

export default App;


