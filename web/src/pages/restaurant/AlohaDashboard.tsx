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
import MenuManagement from '@/components/restaurant/MenuManagement';
import RestaurantAnalytics from '@/components/restaurant/RestaurantAnalytics';

// Import restaurant service
import { 
  getRestaurantOverview, 
  getRestaurantOrders, 
  getRestaurantDrones,
  getRestaurantAnalytics,
  getDroneTrackingData,
  type RestaurantOverview,
  type Order,
  type Drone
} from '@/services/restaurantService';

// Aloha Kitchen Theme (Warm Orange-Yellow)
const alohaTheme = {
  primary: '#ffcc70',
  secondary: '#ff9671',
  accent: '#ffc75f',
  background: '#FFF8F0',
  light: '#FFFEF8'
};

// Styled Components
const DashboardContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #FFF8F0 0%, #FFFEF8 100%);
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
  border-left: 6px solid ${alohaTheme.primary};
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
  background: ${props => props.$active ? alohaTheme.primary : 'transparent'};
  color: ${props => props.$active ? 'white' : '#6c757d'};
  cursor: pointer;
  font-size: 15px;
  font-weight: 600;
  transition: all 0.3s ease;
  border-radius: 8px 8px 0 0;
  position: relative;
  white-space: nowrap;
  
  &:hover {
    background: ${props => props.$active ? alohaTheme.primary : '#f8f9fa'};
    color: ${props => props.$active ? 'white' : '#333'};
  }
  
  ${props => props.$active && `
    box-shadow: 0 -2px 8px rgba(255, 204, 112, 0.2);
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
  background: linear-gradient(135deg, ${alohaTheme.primary} 0%, ${alohaTheme.secondary} 100%);
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

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  font-size: 18px;
  color: ${alohaTheme.primary};
`;

const ErrorMessage = styled.div`
  background: #fee;
  color: #c33;
  padding: 16px;
  border-radius: 8px;
  margin: 16px 0;
  border-left: 4px solid #c33;
`;

type TabType = 'overview' | 'menu' | 'drones';

const AlohaDashboard: React.FC = () => {
  const auth = useAuth();
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Data states
  const [overview, setOverview] = useState<RestaurantOverview | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [drones, setDrones] = useState<Drone[]>([]);
  const [analytics, setAnalytics] = useState<any>(null);

  // Load restaurant data
  useEffect(() => {
    const loadRestaurantData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log("🌺 [AlohaDashboard] Loading restaurant data...");
        
        // Load all data in parallel
        const [overviewData, ordersData, dronesData, analyticsData] = await Promise.all([
          getRestaurantOverview('aloha'),
          getRestaurantOrders('aloha'),
          getRestaurantDrones('aloha'),
          getRestaurantAnalytics('aloha', 'day')
        ]);
        
        setOverview(overviewData);
        setOrders(ordersData);
        setDrones(dronesData);
        setAnalytics(analyticsData);
        
        console.log("🌺 [AlohaDashboard] Data loaded successfully:", {
          overview: overviewData,
          orders: ordersData.length,
          drones: dronesData.length
        });
        
      } catch (err) {
        console.error("🌺 [AlohaDashboard] Error loading data:", err);
        setError("Không thể tải dữ liệu nhà hàng. Vui lòng thử lại.");
        toast.error("Lỗi tải dữ liệu!");
      } finally {
        setLoading(false);
      }
    };

    loadRestaurantData();
  }, []);
  if (!auth) {
    console.error('AlohaDashboard: useAuth() returned null. Make sure the component is wrapped in AuthProvider.');
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
              color: "#ffcc70", 
              textDecoration: "none",
              padding: "10px 20px",
              border: "2px solid #ffcc70",
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
  const { user, loading: authLoading, logout } = auth;
  const { orders: contextOrders } = useOrders();

  // Check for token and role in localStorage
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // Loading state while user is being authenticated
  if (authLoading) {
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
              color: "#ffcc70", 
              textDecoration: "none",
              padding: "10px 20px",
              border: "2px solid #ffcc70",
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
    console.error("Role mismatch in AlohaDashboard");
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
          <a href="/login" style={{ color: "#ffcc70", textDecoration: "none" }}>
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

  // Calculate statistics from loaded data
  const stats = overview ? {
    totalCustomers: new Set(contextOrders.map(order => order.phone)).size,
    totalOrders: overview.ordersToday,
    activeDrones: overview.activeDrones,
    completedDeliveries: orders.filter(order => order.status === 'Hoàn thành').length,
  } : {
    totalCustomers: 0,
    totalOrders: 0,
    activeDrones: 0,
    completedDeliveries: 0,
  };

  const handleLogout = () => {
    logout();
    toast.success('👋 Đã đăng xuất');
    window.location.href = '/login';
  };

  const tabs = [
    { id: 'overview' as TabType, icon: '📊', label: 'Tổng quan' },
    { id: 'menu' as TabType, icon: '🍽️', label: 'Quản lý món ăn' },
    { id: 'drones' as TabType, icon: '🚁', label: 'Mô phỏng Drone' },
  ];

  const renderTabContent = () => {
    if (loading) {
      return (
        <LoadingSpinner>
          🌺 Đang tải dữ liệu Aloha Kitchen...
        </LoadingSpinner>
      );
    }

    if (error) {
      return (
        <ErrorMessage>
          ❌ {error}
        </ErrorMessage>
      );
    }

    switch (activeTab) {
      case 'overview':
        return (
          <div style={{ padding: '24px' }}>
            {overview && <QuickStats stats={stats} theme={alohaTheme} />}
            <WelcomeBanner>
              <WelcomeIcon>🌺</WelcomeIcon>
              <WelcomeText>
                <h3>Chào mừng {user?.name}!</h3>
                <p>Quản lý Aloha Kitchen của bạn một cách dễ dàng với FoodFast Drone Delivery</p>
              </WelcomeText>
            </WelcomeBanner>
            {overview && <RestaurantAnalytics theme={alohaTheme} restaurant="Aloha" />}
          </div>
        );
      case 'menu':
        return (
          <MenuManagement 
            restaurantId={user?.restaurantId || 'aloha'} 
            theme={alohaTheme} 
          />
        );
      case 'drones':
        return (
          <div style={{ padding: '24px' }}>
            <DroneTrackerMap theme={alohaTheme} />
          </div>
        );
      // Orders tab removed for restaurants
      // case 'orders':
      //   return <ActiveOrders restaurantId={user?.id} theme={alohaTheme} />;
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
                <span>🌺</span> Aloha Kitchen bảng điều khiển
              </DashboardTitle>
              <DashboardSubtitle>
                Chào mừng trở lại, <strong>{user?.name}</strong>! Quản lý nhà hàng Aloha Kitchen của bạn tại đây.
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

export default AlohaDashboard;
