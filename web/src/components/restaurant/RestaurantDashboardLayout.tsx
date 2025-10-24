import React, { useState } from 'react';
import styled from 'styled-components';
import { useAuth } from '@/context';
import { useNavigate } from 'react-router-dom';

interface Theme {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  light: string;
}

interface RestaurantDashboardLayoutProps {
  theme: Theme;
  restaurantName: string;
  children: (activeTab: string) => React.ReactNode;
}

const DashboardContainer = styled.div<{ $light: string }>`
  min-height: 100vh;
  background: ${props => props.$light};
  padding: 24px;
`;

const DashboardHeader = styled.div<{ $accent: string }>`
  margin-bottom: 32px;
  background: white;
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border: 1px solid ${props => props.$accent};
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 16px;
  }
`;

const HeaderLeft = styled.div``;

const DashboardTitle = styled.h1<{ $primary: string }>`
  color: ${props => props.$primary};
  margin: 0 0 8px 0;
  font-size: 32px;
  font-weight: 700;
`;

const DashboardSubtitle = styled.p`
  color: #666;
  margin: 0;
  font-size: 16px;
`;

const HeaderRight = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

const LogoutButton = styled.button`
  padding: 10px 20px;
  background: #dc3545;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
  
  &:hover {
    background: #c82333;
    transform: translateY(-1px);
  }
`;

const TabContainer = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 32px;
  background: white;
  padding: 16px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const TabButton = styled.button<{ $active: boolean; $primary: string }>`
  padding: 12px 24px;
  background: ${props => props.$active ? props.$primary : 'transparent'};
  color: ${props => props.$active ? 'white' : '#666'};
  border: 2px solid ${props => props.$active ? props.$primary : '#e1e5e9'};
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  font-size: 16px;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

const RestaurantDashboardLayout: React.FC<RestaurantDashboardLayoutProps> = ({
  theme,
  restaurantName,
  children
}) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>('orders');

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <DashboardContainer $light={theme.light}>
      <DashboardHeader $accent={theme.accent}>
        <HeaderLeft>
          <DashboardTitle $primary={theme.primary}>
            {restaurantName} bảng điều khiển
          </DashboardTitle>
          <DashboardSubtitle>Chào mừng trở lại !  {user?.name}!</DashboardSubtitle>
        </HeaderLeft>
        <HeaderRight>
          <LogoutButton onClick={handleLogout}>
            🚪 Đăng xuất
          </LogoutButton>
        </HeaderRight>
      </DashboardHeader>

      <TabContainer>
        <TabButton
          $active={activeTab === 'orders'}
          $primary={theme.primary}
          onClick={() => setActiveTab('orders')}
        >
          📦 Theo dõi đơn hàng
        </TabButton>
      </TabContainer>

      {children(activeTab)}
    </DashboardContainer>
  );
};

export default RestaurantDashboardLayout;

