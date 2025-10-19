import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Menu from './Menu';
import Details from './Details';
import Cart from './Cart';
import Checkout from './Checkout';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import OrderTracking from './OrderTracking';
import Login from './Login';
import AdminDashboard from './AdminDashboard';
import ThemeToggle from '../components/ThemeToggle';
import ResponsiveLayout from '../components/ResponsiveLayout';
import ProtectedRoute from '../components/ProtectedRoute';
import CustomerInfoForm from '../components/CustomerInfoForm';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ResponsiveLayout>
        <Navbar />
        <ThemeToggle />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/menu/:id" element={<Details />} />
          <Route path="/details/:id" element={<Details />} />
          <Route path="/login" element={<Login />} />
          <Route path="/customer-info" element={<CustomerInfoForm />} />
          
          {/* Protected routes for users only */}
          <Route path="/cart" element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          } />
          <Route path="/checkout" element={<Checkout />} />
          
          {/* Protected routes for all logged in users */}
          <Route path="/orders" element={<OrderTracking />} />
          
          {/* Admin-only routes */}
          <Route path="/admin" element={
            <ProtectedRoute requireAdmin={true}>
              <AdminDashboard />
            </ProtectedRoute>
          } />
        </Routes>
        <Footer />
      </ResponsiveLayout>
    </BrowserRouter>
  );
};

export default App;


