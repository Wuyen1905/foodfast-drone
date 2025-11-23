// Fix SockJS "global is not defined" error
// Polyfill global object for browser environment (required by SockJS)
(window as any).global = window;

import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "styled-components";
import { GlobalStyle, theme } from "./theme";
import { GlobalStyle as ResponsiveGlobalStyle, enhancedTheme } from "./globalStyles";
import App from "./pages/App";
import AdminApp from "./admin/AdminApp";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { ThemeProvider as CustomThemeProvider } from "@/context/ThemeContext";
import { AuthProvider } from "@/context/AuthContext";
import { OrderProvider } from "@/context/OrderContext";
import { Toaster } from "react-hot-toast";
import ErrorBoundary from "./components/common/ErrorBoundary";

const Root = () => {
  return (
    <CustomThemeProvider>
      <ThemeProvider theme={enhancedTheme}>
        <GlobalStyle />
        <ResponsiveGlobalStyle />
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

const root = ReactDOM.createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    <ErrorBoundary>
      {window.location.pathname.startsWith("/admin") ? <AdminApp /> : <Root />}
    </ErrorBoundary>
  </React.StrictMode>
);