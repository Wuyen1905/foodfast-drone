import React, { useMemo } from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "styled-components";
import { GlobalStyle, theme } from "./theme";
import { GlobalStyle as ResponsiveGlobalStyle, enhancedTheme } from "./globalStyles";
import "./global.css";
import App from "./pages/App";
import AdminApp from "./admin/AdminApp";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { ThemeProvider as CustomThemeProvider } from "@/context/ThemeContext";
import { AuthProvider } from "@/context/AuthContext";
import { OrderProvider } from "@/context/OrderContext";
import { products } from "./data/products";
import { Toaster } from "react-hot-toast";
import ErrorBoundary from "./components/common/ErrorBoundary";

const Root = () => {
  const priceMap = useMemo(
    () => Object.fromEntries(products.map((p) => [p.id, p.price])),
    []
  );

  return (
    <CustomThemeProvider>
      <ThemeProvider theme={enhancedTheme}>
        <GlobalStyle />
        <ResponsiveGlobalStyle />
        <AuthProvider>
          <OrderProvider>
            <CartProvider priceMap={priceMap}>
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

// Cache-busting attribute for design token system
document.documentElement.setAttribute('data-skin-version', 'v1');

root.render(
  <React.StrictMode>
    <ErrorBoundary>
      {window.location.pathname.startsWith("/admin") ? <AdminApp /> : <Root />}
    </ErrorBoundary>
  </React.StrictMode>
);