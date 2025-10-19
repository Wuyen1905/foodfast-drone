import React, { useMemo } from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle, theme } from './theme';
import App from './pages/App';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { ThemeProvider as CustomThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './AuthContext';
import { OrderProvider } from './context/OrderContext';
import { products } from './data/products';
import { Toaster } from 'react-hot-toast';

const Root = () => {
  // Tạo bảng ánh xạ giá sản phẩm để truyền xuống các component
  const priceMap = useMemo(
    () => Object.fromEntries(products.map((p) => [p.id, p.price])),
    []
  );

  return (
    <CustomThemeProvider>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        {/* ✅ Bọc toàn bộ App bằng AuthProvider và OrderProvider để toàn hệ thống dùng được useAuth và useOrders */}
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

// ✅ Render ứng dụng vào phần tử gốc của DOM
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
