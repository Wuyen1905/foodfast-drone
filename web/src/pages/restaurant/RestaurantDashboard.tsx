import React, { useState, useEffect } from 'react';
import { useAuth } from "@/context/AuthContext";
import { useOrders } from "@/context/OrderContext";
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

// Import restaurant components
import QuickStats from '@/components/restaurant/QuickStats';
import MyMenu from '@/components/restaurant/MyMenu';
import ActiveOrders from '@/components/restaurant/ActiveOrders';
import DroneTracker from '@/components/restaurant/DroneTracker';
import DroneTrackerMap from '@/components/restaurant/DroneTrackerMap';
import RestaurantAnalytics from '@/components/restaurant/RestaurantAnalytics';

// Restaurant Theme
const restaurantTheme = {
  primary: '#FF6600',
  secondary: '#e55a00',
  accent: '#ff8534',
};

// Styled Components
const DashboardContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #fef8f1 0%, #fff 100%);
  padding: 24px;
`;

const DashboardWrapper = styled.div`
  max-width: 1400px;
  margin: 0 auto;
`;

const DashboardHeader = styled.div`
  background: white;
  border-radius: 16px;
  padding: 32px;
  margin-bottom: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  border-left: 6px solid ${restaurantTheme.primary};
`;

const HeaderTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 16px;
    align-items: flex-start;
  }
`;

const HeaderInfo = styled.div``;

const DashboardTitle = styled.h1`
  color: #1a1a1a;
  margin: 0 0 8px 0;
  font-size: 32px;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const DashboardSubtitle = styled.p`
  color: #6c757d;
  margin: 0;
  font-size: 16px;
`;

const HeaderActions = styled.div`
  display: flex;
  gap: 12px;
`;

const LogoutButton = styled.button`
  padding: 10px 20px;
  background: #dc3545;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  transition: all 0.3s ease;
  
  &:hover {
    background: #c82333;
    transform: translateY(-2px);
  }
`;

const TabNavigation = styled.div`
  display: flex;
  gap: 8px;
  border-bottom: 2px solid #e1e5e9;
  margin-bottom: 24px;
  background: white;
  padding: 0 24px;
  border-radius: 16px 16px 0 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  overflow-x: auto;
  
  @media (max-width: 768px) {
    padding: 0 12px;
  }
`;

const Tab = styled.button<{ $active: boolean }>`
  padding: 16px 24px;
  border: none;
  background: ${props => props.$active ? restaurantTheme.primary : 'transparent'};
  color: ${props => props.$active ? 'white' : '#6c757d'};
  cursor: pointer;
  font-size: 15px;
  font-weight: 600;
  transition: all 0.3s ease;
  border-radius: 8px 8px 0 0;
  position: relative;
  white-space: nowrap;
  
  &:hover {
    background: ${props => props.$active ? restaurantTheme.primary : '#f8f9fa'};
    color: ${props => props.$active ? 'white' : '#333'};
  }
  
  ${props => props.$active && `
    box-shadow: 0 -2px 8px rgba(255, 102, 0, 0.2);
  `}
  
  @media (max-width: 768px) {
    padding: 12px 16px;
    font-size: 14px;
  }
`;

const TabIcon = styled.span`
  margin-right: 8px;
`;

const TabContent = styled(motion.div)`
  background: white;
  border-radius: 0 0 16px 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  overflow: hidden;
`;

const WelcomeBanner = styled.div`
  background: linear-gradient(135deg, ${restaurantTheme.primary} 0%, ${restaurantTheme.secondary} 100%);
  color: white;
  padding: 16px 24px;
  border-radius: 12px;
  margin-top: 16px;
  display: flex;
  align-items: center;
  gap: 16px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const WelcomeIcon = styled.div`
  font-size: 48px;
`;

const WelcomeText = styled.div`
  flex: 1;
  
  h3 {
    margin: 0 0 4px 0;
    font-size: 20px;
  }
  
  p {
    margin: 0;
    opacity: 0.9;
    font-size: 14px;
  }
`;

type TabType = 'overview' | 'menu' | 'orders' | 'drones';

const RestaurantDashboard: React.FC = () => {
  const auth = useAuth();
  const [activeTab, setActiveTab] = useState<TabType>('overview');

  // Early return if auth is null (not wrapped in AuthProvider)
  if (!auth) {
    console.error('RestaurantDashboard: useAuth() returned null. Make sure the component is wrapped in AuthProvider.');
    return (
      <div style={{ 
        textAlign: "center", 
        padding: "30px", 
        color: "red",
        fontSize: "16px",
        fontWeight: "500"
      }}>
        ⚠️ Không thể xác thực tài khoản nhà hàng. Vui lòng đăng nhập lại.
        <div style={{ marginTop: "20px" }}>
          <a 
            href="/login" 
            style={{ 
              color: "#FF6600", 
              textDecoration: "none",
              padding: "10px 20px",
              border: "2px solid #FF6600",
              borderRadius: "8px",
              display: "inline-block",
              fontWeight: "600"
            }}
          >
            Đăng nhập lại
          </a>
        </div>
      </div>
    );
  }

  // Safe to destructure now that we've confirmed auth is not null
  const { user, loading, logout } = auth;
  const { orders } = useOrders();

  // Check for token and role in localStorage
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // Loading state while user is being authenticated
  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "30px" }}>Đang tải dữ liệu người dùng...</div>
    );
  }

  // Check if user is authenticated with all required data
  if (!user || !token || !role) {
    return (
      <div style={{ 
        textAlign: "center", 
        padding: "30px", 
        color: "red",
        fontSize: "16px",
        fontWeight: "500"
      }}>
        Không thể xác thực tài khoản nhà hàng. Vui lòng đăng nhập lại.
        <div style={{ marginTop: "20px" }}>
          <a 
            href="/login" 
            style={{ 
              color: "#FF6600", 
              textDecoration: "none",
              padding: "10px 20px",
              border: "2px solid #FF6600",
              borderRadius: "8px",
              display: "inline-block",
              fontWeight: "600"
            }}
          >
            Đăng nhập lại
          </a>
        </div>
      </div>
    );
  }

  // Verify role consistency
  if (user.role !== role) {
    console.error("Role mismatch in RestaurantDashboard");
    localStorage.clear();
    return (
      <div style={{ 
        textAlign: "center", 
        padding: "30px", 
        color: "red",
        fontSize: "16px"
      }}>
        Phát hiện dữ liệu xác thực không nhất quán. Vui lòng đăng nhập lại.
        <div style={{ marginTop: "20px" }}>
          <a href="/login" style={{ color: "#FF6600", textDecoration: "none" }}>
            Đăng nhập lại
          </a>
        </div>
      </div>
    );
  }

  // Check if user is restaurant owner
  if (user.role !== 'restaurant' && user.role !== 'admin') {
    return (
      <div style={{ textAlign: "center", padding: "30px", color: "#d00" }}>
        Bạn không có quyền truy cập trang này. Chỉ tài khoản nhà hàng mới có thể truy cập.
      </div>
    );
  }

  // Calculate statistics
  const totalUsers = new Set(orders.map(order => order.phone)).size;
  const totalOrders = orders.length;
  const activeDrones = orders.filter(order => order.status === 'Delivering').length;
  const completedDeliveries = orders.filter(order => order.status === 'Completed').length;
  
  const stats = {
    totalCustomers: totalUsers,
    totalOrders: totalOrders,
    activeDrones: activeDrones,
    completedDeliveries: completedDeliveries,
  };

  const handleLogout = () => {
    logout();
    toast.success('👋 Đã đăng xuất');
    window.location.href = '/login';
  };

  const tabs = [
    { id: 'overview' as TabType, icon: '📊', label: 'Tổng quan' },
    { id: 'drones' as TabType, icon: '🚁', label: 'Mô phỏng Drone' },
    { id: 'menu' as TabType, icon: '🍽️', label: 'Quản lý Menu' },
    { id: 'orders' as TabType, icon: '📦', label: 'Đơn hàng' },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div style={{ padding: '24px' }}>
            <QuickStats stats={stats} theme={restaurantTheme} />
            <WelcomeBanner>
              <WelcomeIcon>👨‍🍳</WelcomeIcon>
              <WelcomeText>
                <h3>Chào mừng {user?.name}!</h3>
                <p>Quản lý nhà hàng của bạn một cách dễ dàng với FoodFast Drone Delivery</p>
              </WelcomeText>
            </WelcomeBanner>
            <RestaurantAnalytics theme={restaurantTheme} />
          </div>
        );
      case 'drones':
        return (
          <div style={{ padding: '24px' }}>
            <DroneTrackerMap theme={restaurantTheme} />
          </div>
        );
      case 'menu':
        return <MyMenu restaurantId={user?.id} theme={restaurantTheme} />;
      case 'orders':
        return <ActiveOrders restaurantId={user?.id} theme={restaurantTheme} />;
      default:
        return null;
    }
  };

  return (
    <DashboardContainer>
      <DashboardWrapper>
        {/* Header */}
        <DashboardHeader>
          <HeaderTop>
            <HeaderInfo>
              <DashboardTitle>
                <span>🏪</span> Bảng điều khiển nhà hàng
              </DashboardTitle>
              <DashboardSubtitle>
                Chào mừng trở lại, <strong>{user?.name}</strong>! Quản lý nhà hàng của bạn tại đây.
              </DashboardSubtitle>
            </HeaderInfo>
            <HeaderActions>
              <LogoutButton onClick={handleLogout}>
                🚪 Đăng xuất
              </LogoutButton>
            </HeaderActions>
          </HeaderTop>
        </DashboardHeader>

        {/* Tab Navigation */}
        <TabNavigation>
          {tabs.map((tab) => (
            <Tab
              key={tab.id}
              $active={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id)}
            >
              <TabIcon>{tab.icon}</TabIcon>
              {tab.label}
            </Tab>
          ))}
        </TabNavigation>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <TabContent
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderTabContent()}
          </TabContent>
        </AnimatePresence>
      </DashboardWrapper>
    </DashboardContainer>
  );
};

export default RestaurantDashboard;
