import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context';
import { useRestaurantSelection } from '@/context/RestaurantSelectionContext';
import toast from 'react-hot-toast';

const Bar = styled.header`
  position: sticky; 
  top: 0; 
  z-index: 20;
  background: var(--card);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid var(--border);
  box-shadow: var(--shadow);
`;

const Inner = styled.div`
  display: flex; 
  align-items: center; 
  justify-content: space-between;
  padding: 12px 24px; 
  max-width: 1200px; 
  margin: 0 auto;
`;

const Brand = styled(NavLink)`
  font-weight: 800; 
  color: var(--primary);
  font-size: 20px;
`;

const Links = styled.nav<{ open: boolean }>`
  display: flex; 
  gap: 12px; 
  align-items: center;
  
  @media (max-width: 768px) {
    position: absolute; 
    top: 100%; 
    left: 0; 
    right: 0; 
    padding: 16px 24px; 
    background: var(--card);
    display: ${({ open }) => (open ? 'flex' : 'none')}; 
    flex-direction: column;
    gap: 8px; 
    border-bottom: 1px solid var(--border);
    box-shadow: var(--shadow);
  }
`;

const A = styled(NavLink)`
  padding: 8px 12px; 
  border-radius: var(--radius);
  transition: background-color 0.2s ease;
  
  &:hover { 
    background: var(--border); 
  }
  
  &.active { 
    background: var(--primary); 
    color: white;
  }
`;

const CartLink = styled(A)`
  position: relative;
  
  &:after {
    content: attr(data-count);
    position: absolute; 
    top: -6px; 
    right: -6px;
    background: var(--primary); 
    color: #fff;
    border-radius: 999px; 
    padding: 2px 6px; 
    font-size: 12px;
    min-width: 18px;
    text-align: center;
  }
`;

const Burger = styled.button`
  display: none; 
  
  @media (max-width: 768px) { 
    display: inline-flex; 
  }
  
  background: var(--card); 
  border: 1px solid var(--border); 
  border-radius: 8px; 
  padding: 8px 12px; 
  cursor: pointer;
  color: var(--text);
`;

const UserMenu = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const UserButton = styled.button`
  background: var(--primary);
  color: #fff;
  border: none;
  padding: 8px 12px;
  border-radius: var(--radius);
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s ease;
  
  &:hover {
    background: var(--primary-light);
    transform: translateY(-1px);
  }
`;

const LogoutButton = styled.button`
  background: var(--border);
  color: var(--text);
  border: none;
  padding: 8px 12px;
  border-radius: var(--radius);
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s ease;
  
  &:hover {
    background: #e74c3c;
    color: #fff;
  }
`;

const RestaurantSelect = styled.select`
  padding: 8px 12px;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  background: var(--card);
  color: var(--text);
  font-size: 14px;
  cursor: pointer;
  outline: none;
  transition: border-color 0.2s ease;
  
  &:hover {
    border-color: var(--primary);
  }
  
  &:focus {
    border-color: var(--primary);
  }
`;

const Navbar: React.FC = () => {
  const { items } = useCart();
  const { user, logout, isAdmin, isRestaurant, isCustomer } = useAuth();
  const { selectedRestaurant, setSelectedRestaurant, availableRestaurants } = useRestaurantSelection();
  const count = useMemo(() => items.reduce((s, i) => s + i.qty, 0), [items]);
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout();
    toast.success('👋 Đã đăng xuất thành công!');
  };
  
  const handleRestaurantChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRestaurant(e.target.value as "SweetDreams" | "Aloha");
    toast.success(`Đã chọn nhà hàng: ${e.target.value}`);
  };
  
  return (
    <Bar>
      <Inner>
        <Brand to="/menu">FoodFast</Brand>
        <Burger aria-label="menu" onClick={() => setOpen(o => !o)}>
          {open ? '✕' : '☰'}
        </Burger>
        <Links open={open}>
          {/* Restaurant selector for customers */}
          {(!user || (user && isCustomer())) && (
            <RestaurantSelect 
              value={selectedRestaurant} 
              onChange={handleRestaurantChange}
              title="Chọn nhà hàng"
            >
              <option value="SweetDreams">🍰 SweetDreams</option>
              <option value="Aloha">🌺 Aloha Kitchen</option>
            </RestaurantSelect>
          )}
          
          {/* Hide Menu tab for restaurant users */}
          {!(user && isRestaurant()) && (
            <A to="/menu" title="Xem thực đơn">Thực đơn</A>
          )}
          
          {/* Show cart and checkout only for customers */}
          {user && isCustomer() && (
            <>
              <CartLink to="/cart" title="Xem giỏ hàng" data-count={count}>Giỏ hàng</CartLink>
              <A to="/checkout" title="Thanh toán">Thanh toán</A>
              <A to="/order-history" title="Lịch sử đơn hàng">Lịch sử đơn hàng</A>
            </>
          )}
          
          {/* Order tracking removed from main navigation */}
          
          {/* Role-based navigation */}
          {user && isAdmin() && (
            <A to="/admin" title="Bảng điều khiển quản trị">Quản trị</A>
          )}
          
          {user && isRestaurant() && (
            <>
              {/* Removed generic "Nhà hàng" tab - restaurants now only see their specific tabs */}
              {user.restaurantId === 'rest_2' && (
                <A to="/sweetdreams" title="SweetDreams Bakery">SweetDreams</A>
              )}
              {(user.restaurantId === 'restaurant_2' || user.username === 'aloha_restaurant') && (
                <A to="/aloha-dashboard" title="Aloha Kitchen">Aloha</A>
              )}
            </>
          )}
          
          {user ? (
            <UserMenu>
              <span style={{ color: 'var(--text)', fontSize: '14px' }}>
                Xin chào, {user?.name}! ({isAdmin() ? 'Quản trị viên' : 
                isRestaurant() ? 'Nhà hàng' : 'Khách hàng'})
              </span>
              <LogoutButton onClick={handleLogout}>
                Đăng xuất
              </LogoutButton>
            </UserMenu>
          ) : (
            <UserMenu>
              <UserButton as={NavLink} to="/login">
                Đăng nhập
              </UserButton>
            </UserMenu>
          )}
        </Links>
      </Inner>
    </Bar>
  );
};

export default Navbar;