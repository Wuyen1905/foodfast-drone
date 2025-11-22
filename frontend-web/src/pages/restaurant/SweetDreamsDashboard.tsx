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
import OrderTracking from '@/components/restaurant/OrderTracking';

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

// SweetDreams Bakery Pink Theme
const sweetDreamsTheme = {
  primary: '#E91E63',
  secondary: '#F06292',
  accent: '#F8BBD9',
  background: '#FCE4EC',
  light: '#FFF0F3'
};

// Styled Components
const DashboardContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #FCE4EC 0%, #FFF0F3 100%);
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
  border-left: 6px solid ${sweetDreamsTheme.primary};
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
  background: ${props => props.$active ? sweetDreamsTheme.primary : 'transparent'};
  color: ${props => props.$active ? 'white' : '#6c757d'};
  cursor: pointer;
  font-size: 15px;
  font-weight: 600;
  transition: all 0.3s ease;
  border-radius: 8px 8px 0 0;
  position: relative;
  white-space: nowrap;
  
  &:hover {
    background: ${props => props.$active ? sweetDreamsTheme.primary : '#f8f9fa'};
    color: ${props => props.$active ? 'white' : '#333'};
  }
  
  ${props => props.$active && `
    box-shadow: 0 -2px 8px rgba(233, 30, 99, 0.2);
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
  background: linear-gradient(135deg, ${sweetDreamsTheme.primary} 0%, ${sweetDreamsTheme.secondary} 100%);
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
  color: ${sweetDreamsTheme.primary};
`;

const ErrorMessage = styled.div`
  background: #fee;
  color: #c33;
  padding: 16px;
  border-radius: 8px;
  margin: 16px 0;
  border-left: 4px solid #c33;
`;

type TabType = 'overview' | 'menu' | 'orders' | 'drones';

const SweetDreamsDashboard: React.FC = () => {
  const auth = useAuth();
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Data states
  const [overview, setOverview] = useState<RestaurantOverview | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [drones, setDrones] = useState<Drone[]>([]);
  const [analytics, setAnalytics] = useState<any>(null);

  // Early return if auth is null (not wrapped in AuthProvider)
  if (!auth) {
    console.error('SweetDreamsDashboard: useAuth() returned null. Make sure the component is wrapped in AuthProvider.');
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
              color: "#E91E63", 
              textDecoration: "none",
              padding: "10px 20px",
              border: "2px solid #E91E63",
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
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontSize: '18px',
        color: '#666',
        background: 'linear-gradient(135deg, #FFF0F5 0%, #FFF8FB 100%)'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>🧁</div>
          <div>Đang tải dữ liệu người dùng...</div>
        </div>
      </div>
    );
  }

  // Check if user is authenticated
  if (!user) {
    console.log("🚫 [SweetDreamsDashboard] No user found, redirecting to login");
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        background: 'linear-gradient(135deg, #FFF0F5 0%, #FFF8FB 100%)'
      }}>
        <div style={{ 
          textAlign: "center", 
          padding: "40px", 
          background: "white",
          borderRadius: "16px",
          boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
          maxWidth: "400px"
        }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔒</div>
          <h3 style={{ color: "#e53e3e", marginBottom: "16px" }}>Chưa đăng nhập</h3>
          <p style={{ color: "#666", marginBottom: "24px" }}>Vui lòng đăng nhập để truy cập trang này.</p>
          <button 
            onClick={() => window.location.href = '/login'}
            style={{
              background: "#E91E63",
              color: "white",
              border: "none",
              padding: "12px 24px",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "16px",
              fontWeight: "600"
            }}
          >
            Đăng nhập
          </button>
        </div>
      </div>
    );
  }

  // Check if user is restaurant owner
  if (user.role !== 'restaurant') {
    console.log("🚫 [SweetDreamsDashboard] User is not a restaurant owner:", user.role);
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        background: 'linear-gradient(135deg, #FFF0F5 0%, #FFF8FB 100%)'
      }}>
        <div style={{ 
          textAlign: "center", 
          padding: "40px", 
          background: "white",
          borderRadius: "16px",
          boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
          maxWidth: "400px"
        }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>🚫</div>
          <h3 style={{ color: "#e53e3e", marginBottom: "16px" }}>Không có quyền truy cập</h3>
          <p style={{ color: "#666", marginBottom: "24px" }}>Chỉ tài khoản nhà hàng mới có thể truy cập trang này.</p>
          <button 
            onClick={() => window.location.href = '/'}
            style={{
              background: "#E91E63",
              color: "white",
              border: "none",
              padding: "12px 24px",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "16px",
              fontWeight: "600"
            }}
          >
            Về trang chủ
          </button>
        </div>
      </div>
    );
  }

  // Check if this is the correct restaurant for SweetDreams Bakery
  if (user.restaurantId !== 'rest_2' && user.username !== 'sweetdreams') {
    console.log("🚫 [SweetDreamsDashboard] User is not authorized for SweetDreams Bakery:", {
      restaurantId: user.restaurantId,
      username: user.username
    });
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        background: 'linear-gradient(135deg, #FFF0F5 0%, #FFF8FB 100%)'
      }}>
        <div style={{ 
          textAlign: "center", 
          padding: "40px", 
          background: "white",
          borderRadius: "16px",
          boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
          maxWidth: "400px"
        }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>🏪</div>
          <h3 style={{ color: "#e53e3e", marginBottom: "16px" }}>Không phải nhà hàng của bạn</h3>
          <p style={{ color: "#666", marginBottom: "24px" }}>Tài khoản này không có quyền truy cập SweetDreams Bakery.</p>
          <button 
            onClick={() => window.location.href = '/restaurant'}
            style={{
              background: "#E91E63",
              color: "white",
              border: "none",
              padding: "12px 24px",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "16px",
              fontWeight: "600"
            }}
          >
            Về trang nhà hàng
          </button>
        </div>
      </div>
    );
  }

  // Load restaurant data
  useEffect(() => {
    const loadRestaurantData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log("🍰 [SweetDreamsDashboard] Loading restaurant data...");
        
        // Load all data in parallel
        const [overviewData, ordersData, dronesData, analyticsData] = await Promise.all([
          getRestaurantOverview('sweetdreams'),
          getRestaurantOrders('sweetdreams'),
          getRestaurantDrones('sweetdreams'),
          getRestaurantAnalytics('sweetdreams', 'day')
        ]);
        
        setOverview(overviewData);
        setOrders(ordersData);
        setDrones(dronesData);
        setAnalytics(analyticsData);
        
        console.log("🍰 [SweetDreamsDashboard] Data loaded successfully:", {
          overview: overviewData,
          orders: ordersData.length,
          drones: dronesData.length
        });
        
      } catch (err) {
        console.error("🍰 [SweetDreamsDashboard] Error loading data:", err);
        setError("Không thể tải dữ liệu nhà hàng. Vui lòng thử lại.");
        toast.error("Lỗi tải dữ liệu!");
      } finally {
        setLoading(false);
      }
    };

    loadRestaurantData();
  }, []);

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
    { id: 'orders' as TabType, icon: '📦', label: 'Quản lý đơn hàng' },
    { id: 'drones' as TabType, icon: '🚁', label: 'Mô phỏng Drone' },
  ];

  const renderTabContent = () => {
    if (loading) {
      return (
        <LoadingSpinner>
          🍰 Đang tải dữ liệu SweetDreams Bakery...
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
            {overview && <QuickStats stats={stats} theme={sweetDreamsTheme} />}
            <WelcomeBanner>
              <WelcomeIcon>🧁</WelcomeIcon>
              <WelcomeText>
                <h3>Chào mừng {user?.name}!</h3>
                <p>Quản lý SweetDreams Bakery của bạn một cách dễ dàng với FoodFast Drone Delivery</p>
              </WelcomeText>
            </WelcomeBanner>
            {overview && <RestaurantAnalytics theme={sweetDreamsTheme} restaurant="SweetDreams" />}
          </div>
        );
      case 'menu':
        return (
          <MenuManagement 
            restaurantId={user?.restaurantId || 'sweetdreams'} 
            theme={sweetDreamsTheme} 
          />
        );
      case 'orders':
        return (
          <div style={{ padding: '24px' }}>
            <OrderTracking 
              restaurantId={user?.restaurantId || 'sweetdreams'} 
              theme={sweetDreamsTheme} 
            />
          </div>
        );
      case 'drones':
        return (
          <div style={{ padding: '24px' }}>
            <DroneTrackerMap theme={sweetDreamsTheme} />
          </div>
        );
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
                <span>🧁</span> SweetDreams Bakery bảng điều khiển
              </DashboardTitle>
              <DashboardSubtitle>
                Chào mừng trở lại, <strong>{user?.name}</strong>! Quản lý SweetDreams Bakery của bạn tại đây.
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

export default SweetDreamsDashboard;