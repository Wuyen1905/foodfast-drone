import React from "react";
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle, theme } from './theme';
import App from "./App";
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { ThemeProvider as CustomThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './AuthContext';
import { OrderProvider } from './context/OrderContext';
import { Toaster } from 'react-hot-toast';
import AdminApp from "./admin/AdminApp";
import "./index.css";

const Root = () => {
  const root = ReactDOM.createRoot(document.getElementById("root")!);

  return (
    <CustomThemeProvider>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        {/* ✅ Bọc toàn bộ App bằng AuthProvider và OrderProvider để toàn hệ thống dùng được useAuth và useOrders */}
        <AuthProvider>
          <OrderProvider>
            <CartProvider>
              <WishlistProvider>
                <Toaster position="top-right" />
                <App />
              </WishlistProvider>
            </CartProvider>
          </OrderProvider>
        </AuthProvider>
      </ThemeProvider>
    </CustomThemeProvider>
  );
};

// ✅ Render ứng dụng vào phần tử gốc của DOM
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);

// Tự động chuyển giữa 2 ứng dụng
root.render(
  <React.StrictMode>
    {window.location.pathname.startsWith("/admin") ? <AdminApp /> : <App />}
  </React.StrictMode>
);