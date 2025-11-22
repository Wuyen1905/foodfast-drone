import React, { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useCart, CartItem } from '@/context/CartContext';
import { useAuth } from '@/context';
import { products } from '../data/products';
import { formatVND } from '../utils/currency';
import CartSkeleton from '../components/CartSkeleton';
import toast from 'react-hot-toast';

const Page = styled.div`
  padding: var(--spacing-xl) var(--spacing-lg);
  max-width: 900px;
  margin: 0 auto;
`;

const Title = styled.h2`
  margin: 0 0 16px 0;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 0;
  border-bottom: 1px solid var(--border);
`;

const Thumb = styled.img`
  width: 56px;
  height: 56px;
  border-radius: var(--radius-sm);
  object-fit: cover;
`;

const Name = styled.div`
  font-weight: 700;
`;

const Sub = styled.div`
  color: var(--secondaryText);
`;

const Button = styled.button`
  background: var(--primary);
  color: #fff;
  border: none;
  padding: 10px 16px;
  border-radius: var(--radius-md);
  box-shadow: var(--shadow);
  cursor: pointer;
  transition: transform .15s ease, box-shadow .15s ease, filter .15s ease;
  
  &:hover { 
    transform: translateY(-1px); 
    box-shadow: var(--shadow-md); 
    filter: brightness(1.03); 
  }
`;

const QtyBtn = styled(Button)`
  background: var(--border); 
  color: var(--text); 
  padding: 6px 10px;
`;

const TotalBar = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid var(--border);
`;

const Total = styled.div`
  color: var(--primary);
  font-weight: 800;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 40px 20px;
  color: var(--secondaryText);
`;

const RestaurantGroup = styled.div`
  margin-bottom: 32px;
  padding: 16px;
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  background: var(--card);
`;

const RestaurantHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 2px solid var(--border);
`;

const RestaurantName = styled.h3`
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  color: var(--text);
`;

// [Multi-Restaurant Cart] Helper function to group cart items by restaurant
function getGroupedCartItems(cartItems: CartItem[]): Record<string, { restaurantId?: string; restaurant?: string; items: CartItem[] }> {
  const grouped: Record<string, { restaurantId?: string; restaurant?: string; items: CartItem[] }> = {};
  
  cartItems.forEach(item => {
    // Use restaurant name as key, fallback to restaurantId, or "unknown" if neither exists
    const key = item.restaurant || item.restaurantId || 'unknown';
    
    if (!grouped[key]) {
      grouped[key] = {
        restaurantId: item.restaurantId,
        restaurant: item.restaurant,
        items: []
      };
    }
    
    grouped[key].items.push(item);
  });
  
  return grouped;
}

const Cart: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { items, remove, setQty, subtotal, clear } = useCart();
  const productMap = useMemo(() => Object.fromEntries(products.map(p => [p.id, p])), []);
  const [loading, setLoading] = useState(true);
  
  // [Multi-Restaurant Cart] Group items by restaurant
  const groupedItems = useMemo(() => getGroupedCartItems(items), [items]);
  const restaurantKeys = Object.keys(groupedItems);
  const hasMultipleRestaurants = restaurantKeys.length > 1;
  
  const delivery = 25000; // 25,000 VND
  const tax = subtotal * 0.08;
  const total = subtotal + tax + delivery;

  const handleRemoveItem = (itemId: string, itemName: string) => {
    remove(itemId);
    toast.success(`✅ Đã xóa "${itemName}" khỏi giỏ hàng`);
  };

  const handleQuantityChange = (itemId: string, newQty: number, itemName: string) => {
    setQty(itemId, newQty);
    toast.success(`📦 Cập nhật số lượng "${itemName}" thành ${newQty}`);
  };

  // [Multi-Restaurant Cart] Calculate totals for a specific restaurant's items
  const calculateRestaurantTotals = (restaurantItems: CartItem[]) => {
    const restaurantSubtotal = restaurantItems.reduce((sum, item) => {
      const price = Number(item.price) || 0;
      const qty = Number(item.qty) || 0;
      return sum + price * qty;
    }, 0);
    const restaurantTax = restaurantSubtotal * 0.08;
    const restaurantDelivery = 25000;
    const restaurantTotal = restaurantSubtotal + restaurantTax + restaurantDelivery;
    return { restaurantSubtotal, restaurantTax, restaurantDelivery, restaurantTotal };
  };

  const handleProceedToCheckout = (restaurantItems?: CartItem[]) => {
    const itemsToCheckout = restaurantItems || items;
    
    if (itemsToCheckout.length === 0) {
      toast.error('Giỏ hàng trống! Vui lòng thêm sản phẩm trước khi thanh toán.');
      return;
    }
    
    // Redirect unauthenticated users to Customer Info Form
    if (!user) {
      toast.success('📝 Vui lòng điền thông tin khách hàng...');
      navigate('/customer-info');
      return;
    }
    
    // [Restore Original Checkout] Store selected items in sessionStorage for checkout page
    // If restaurantItems is provided, checkout only those items (per-restaurant checkout)
    // If not provided, clear checkoutItems so all items are processed (original behavior)
    if (restaurantItems) {
      sessionStorage.setItem('checkoutItems', JSON.stringify(restaurantItems));
    } else {
      // [Restore Original Checkout] Clear checkoutItems to process ALL cart items
      sessionStorage.removeItem('checkoutItems');
    }
    
    toast.success('🚀 Chuyển đến trang thanh toán...');
    navigate('/checkout');
  };

  React.useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <Page>
        <Title>Giỏ hàng</Title>
        <CartSkeleton count={3} />
      </Page>
    );
  }

  if (items.length === 0) {
    return (
      <Page>
        <Title>Giỏ hàng</Title>
        <EmptyState>
          <p>Giỏ hàng của bạn đang trống — hãy thêm một số món ăn ngon 🍱</p>
          <Link to="/menu" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>
            Xem thực đơn
          </Link>
        </EmptyState>
      </Page>
    );
  }

  return (
    <Page>
      <Title>Giỏ hàng</Title>
      
      {/* [Restore Original Checkout] Render items grouped by restaurant for display only */}
      {restaurantKeys.map((restaurantKey, groupIndex) => {
        const group = groupedItems[restaurantKey];
        const restaurantName = group.restaurant || group.restaurantId || 'Nhà hàng';
        
        return (
          <RestaurantGroup key={restaurantKey}>
            <RestaurantHeader>
              <RestaurantName>🍽️ {restaurantName}</RestaurantName>
              <div style={{ fontSize: '14px', color: 'var(--secondaryText)' }}>
                {group.items.length} món
              </div>
            </RestaurantHeader>
            
            {group.items.map((c, index) => {
              const p = productMap[c.id];
              if (!p) return null;
              return (
                <motion.div
                  key={c.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: (groupIndex * 100 + index) * 0.1 }}
                >
                  <Row>
                    <Thumb 
                      src={c.image || ''} 
                      alt={c.name} 
                      onError={(e) => { 
                        (e.currentTarget.src = 'https://placehold.co/400x300?text=No+Image&font=roboto'); 
                      }} 
                    />
                    <div style={{ flex: 1 }}>
                      <Name>{c.name}</Name>
                      <Sub>
                        {formatVND(c.price)} • Số lượng:
                        <QtyBtn onClick={() => handleQuantityChange(c.id, Math.max(1, c.qty - 1), c.name)} style={{ marginLeft: 8 }}>
                          -
                        </QtyBtn>
                        <span style={{ margin: '0 8px' }}>{c.qty}</span>
                        <QtyBtn onClick={() => handleQuantityChange(c.id, c.qty + 1, c.name)}>+</QtyBtn>
                      </Sub>
                    </div>
                    <div style={{ fontWeight: 700 }}>{formatVND(c.price * c.qty)}</div>
                    <Button onClick={() => handleRemoveItem(c.id, c.name)} style={{ background: 'var(--border)', color: 'var(--text)' }}>
                      Xóa
                    </Button>
                  </Row>
                </motion.div>
              );
            })}
            
            {/* [Restore Per-Restaurant Checkout] Add checkout button for this restaurant's items */}
            <div style={{ marginTop: 16, paddingTop: 12, borderTop: '1px solid var(--border)' }}>
              {(() => {
                const restaurantTotals = calculateRestaurantTotals(group.items);
                return (
                  <>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                      <span style={{ fontSize: '14px', color: 'var(--secondaryText)' }}>Tạm tính ({restaurantName}):</span>
                      <span style={{ fontSize: '14px', fontWeight: 600 }}>{formatVND(restaurantTotals.restaurantSubtotal)}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                      <span style={{ fontSize: '14px', color: 'var(--secondaryText)' }}>Thuế (8%):</span>
                      <span style={{ fontSize: '14px' }}>{formatVND(restaurantTotals.restaurantTax)}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                      <span style={{ fontSize: '14px', color: 'var(--secondaryText)' }}>Phí giao hàng:</span>
                      <span style={{ fontSize: '14px' }}>{formatVND(restaurantTotals.restaurantDelivery)}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12, paddingTop: 8, borderTop: '1px solid var(--border)' }}>
                      <span style={{ fontWeight: 700 }}>Tổng ({restaurantName}):</span>
                      <span style={{ fontWeight: 700, color: 'var(--primary)' }}>{formatVND(restaurantTotals.restaurantTotal)}</span>
                    </div>
                    <Button 
                      onClick={() => handleProceedToCheckout(group.items)} 
                      style={{ width: '100%', marginTop: 8 }}
                    >
                      Thanh toán từng đơn ({restaurantName})
                    </Button>
                  </>
                );
              })()}
            </div>
          </RestaurantGroup>
        );
      })}
      
      {/* [Restore Original Checkout] Always show "Thanh toán tất cả" button for all items */}
      <div style={{ marginTop: 16, borderTop: '1px solid var(--border)', paddingTop: 12 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>Tạm tính</span>
          <span>{formatVND(subtotal)}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>Thuế (8%)</span>
          <span>{formatVND(tax)}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>Phí giao hàng</span>
          <span>{formatVND(delivery)}</span>
        </div>
        <TotalBar>
          <div>Tổng cộng</div>
          <Total>{formatVND(total)}</Total>
        </TotalBar>
        <Button style={{ marginTop: 12, width: '100%' }} onClick={() => handleProceedToCheckout()}>
          Thanh toán tất cả
        </Button>
      </div>
    </Page>
  );
};

export default Cart;