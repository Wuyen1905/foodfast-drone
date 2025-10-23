/**
 * Professional Admin Dashboard
 * Main control center for FoodFast Drone Delivery system
 */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useAdminAuth } from '@/context/AdminAuthContext';
import { formatVND } from '@/utils/currency';
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';

// Import admin components
import AdminSidebar from '@/components/admin/AdminSidebar';
import RestaurantTable from '@/components/admin/RestaurantTable';
import CustomerTable from '@/components/admin/CustomerTable';
import DroneMonitor from '@/components/admin/DroneMonitor';
import SystemLogs from '@/components/admin/SystemLogs';

// Import admin services
import {
  getAllRestaurants,
  getAllCustomers,
  getDroneFleet,
  getSystemLogs,
  getAdminStats,
  performEmergencyOverride
} from '@/services/adminService';

const DashboardLayout = styled.div`
  display: flex;
  min-height: 100vh;
  background: #f5f7fa;
`;

const MainContent = styled.div`
  flex: 1;
  margin-left: 280px;
  padding: 30px;
  
  @media (max-width: 768px) {
    margin-left: 0;
    padding: 20px;
  }
`;

const TopBar = styled.div`
  background: white;
  padding: 20px 30px;
  border-radius: 15px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
`;

const PageTitle = styled.h1`
  font-size: 28px;
  font-weight: 700;
  color: #333;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 10px;
`;

const Button = styled.button<{ $variant?: 'primary' | 'danger' }>`
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  background: ${props => {
    if (props.$variant === 'danger') return '#dc3545';
    if (props.$variant === 'primary') return '#667eea';
    return '#6c757d';
  }};
  color: white;
  
  &:hover {
    opacity: 0.85;
    transform: translateY(-1px);
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
`;

const StatCard = styled(motion.div)<{ $color?: string }>`
  background: white;
  padding: 25px;
  border-radius: 15px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border-left: 4px solid ${props => props.$color || '#667eea'};
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.15);
  }
`;

const StatHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 15px;
`;

const StatIcon = styled.div<{ $bgColor?: string }>`
  width: 50px;
  height: 50px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  background: ${props => props.$bgColor || '#f0f0f0'};
`;

const StatValue = styled.div`
  font-size: 32px;
  font-weight: 700;
  color: #333;
  margin-bottom: 5px;
`;

const StatLabel = styled.div`
  font-size: 14px;
  color: #666;
  font-weight: 500;
`;

const StatChange = styled.div<{ $positive?: boolean }>`
  font-size: 12px;
  color: ${props => props.$positive ? '#28a745' : '#dc3545'};
  margin-top: 8px;
  font-weight: 500;
`;

const ContentArea = styled.div`
  margin-top: 30px;
`;

const Footer = styled.footer`
  text-align: center;
  padding: 20px;
  color: #999;
  font-size: 13px;
  margin-top: 40px;
  border-top: 1px solid #e1e5e9;
`;

const Modal = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1001;
`;

const ModalContent = styled(motion.div)`
  background: white;
  border-radius: 15px;
  padding: 40px;
  max-width: 600px;
  width: 90%;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
`;

const ModalTitle = styled.h2`
  font-size: 24px;
  font-weight: 600;
  margin: 0 0 15px 0;
  color: #dc3545;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const ModalText = styled.p`
  color: #666;
  margin: 0 0 25px 0;
  line-height: 1.6;
  font-size: 15px;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 2px solid #e1e5e9;
  border-radius: 8px;
  font-size: 14px;
  margin-bottom: 15px;
  
  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 12px;
  border: 2px solid #e1e5e9;
  border-radius: 8px;
  font-size: 14px;
  resize: vertical;
  min-height: 100px;
  font-family: inherit;
  margin-bottom: 15px;
  
  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

const ModalActions = styled.div`
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  margin-top: 25px;
`;

const ModalButton = styled.button<{ $primary?: boolean; $danger?: boolean }>`
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  background: ${props => props.$danger ? '#dc3545' : props.$primary ? '#667eea' : '#e1e5e9'};
  color: ${props => props.$primary || props.$danger ? 'white' : '#666'};
  
  &:hover {
    opacity: 0.85;
    transform: translateY(-1px);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const WarningBox = styled.div`
  background: #fff3cd;
  border-left: 4px solid #ffc107;
  padding: 15px;
  margin: 15px 0;
  border-radius: 6px;
  
  strong {
    color: #856404;
    display: block;
    margin-bottom: 8px;
  }
  
  ul {
    margin: 0;
    padding-left: 20px;
    color: #856404;
  }
`;

type TabType = 'overview' | 'restaurants' | 'customers' | 'drones' | 'logs';

const AdminDashboard: React.FC = () => {
  const { admin, logout } = useAdminAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [refreshKey, setRefreshKey] = useState(0);
  
  // Emergency Override Modal State
  const [showEmergencyModal, setShowEmergencyModal] = useState(false);
  const [emergencyTargetType, setEmergencyTargetType] = useState<'order' | 'restaurant' | 'drone'>('order');
  const [emergencyTargetId, setEmergencyTargetId] = useState('');
  const [emergencyTargetName, setEmergencyTargetName] = useState('');
  const [emergencyAction, setEmergencyAction] = useState('');

  // State for data
  const [restaurants, setRestaurants] = useState(getAllRestaurants());
  const [customers, setCustomers] = useState(getAllCustomers());
  const [drones, setDrones] = useState(getDroneFleet());
  const [logs, setLogs] = useState(getSystemLogs());
  const [stats, setStats] = useState(getAdminStats());

  // Refresh data
  const refreshData = () => {
    setRestaurants(getAllRestaurants());
    setCustomers(getAllCustomers());
    setDrones(getDroneFleet());
    setLogs(getSystemLogs());
    setStats(getAdminStats());
    setRefreshKey(prev => prev + 1);
  };

  // Auto-refresh logs every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setLogs(getSystemLogs());
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const openEmergencyOverride = () => {
    setShowEmergencyModal(true);
  };

  const handleEmergencyOverride = () => {
    if (!admin || !emergencyTargetId || !emergencyTargetName || !emergencyAction) {
      toast.error('Please fill all fields');
      return;
    }
    
    const success = performEmergencyOverride(
      emergencyTargetType,
      emergencyTargetId,
      emergencyTargetName,
      emergencyAction,
      admin.id,
      admin.name
    );
    
    if (success) {
      setShowEmergencyModal(false);
      setEmergencyTargetId('');
      setEmergencyTargetName('');
      setEmergencyAction('');
      refreshData();
    }
  };

  const getTabTitle = (): string => {
    switch (activeTab) {
      case 'overview': return 'Tổng quan bảng điều khiển';
      case 'restaurants': return 'Quản lý nhà hàng';
      case 'customers': return 'Quản lý khách hàng';
      case 'drones': return 'Giám sát đội máy bay';
      case 'logs': return 'Nhật ký hoạt động hệ thống';
      default: return 'Bảng điều khiển';
    }
  };

  const getTabIcon = (): string => {
    switch (activeTab) {
      case 'overview': return '📊';
      case 'restaurants': return '🏪';
      case 'customers': return '👥';
      case 'drones': return '🚁';
      case 'logs': return '📋';
      default: return '📊';
    }
  };

  if (!admin) {
    navigate('/admin/login');
    return null;
  }

  return (
    <DashboardLayout>
      <AdminSidebar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        adminName={admin.name}
        stats={{
          pendingRestaurants: stats.pendingRestaurants,
          maintenanceDrones: stats.maintenanceDrones
        }}
      />
      
      <MainContent>
        <TopBar>
          <PageTitle>
            <span>{getTabIcon()}</span>
            {getTabTitle()}
          </PageTitle>
          <ActionButtons>
            <Button onClick={refreshData}>🔄 Làm mới</Button>
            <Button $variant="primary" onClick={openEmergencyOverride}>
              ⚠️ Can thiệp khẩn cấp
            </Button>
            <Button $variant="danger" onClick={handleLogout}>
              Đăng xuất
            </Button>
          </ActionButtons>
        </TopBar>

        {activeTab === 'overview' && (
          <>
            <StatsGrid>
              <StatCard
                $color="#667eea"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0 }}
              >
                <StatHeader>
                  <div>
                    <StatValue>{stats.totalRestaurants}</StatValue>
                    <StatLabel>Tổng số nhà hàng</StatLabel>
                    <StatChange $positive={stats.activeRestaurants > 0}>
                      {stats.activeRestaurants} đang hoạt động
                    </StatChange>
                  </div>
                  <StatIcon $bgColor="#eef2ff">🏪</StatIcon>
                </StatHeader>
              </StatCard>

              <StatCard
                $color="#28a745"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <StatHeader>
                  <div>
                    <StatValue>{stats.totalCustomers}</StatValue>
                    <StatLabel>Tổng số khách hàng</StatLabel>
                    <StatChange $positive>
                      Cơ sở người dùng đang tăng
                    </StatChange>
                  </div>
                  <StatIcon $bgColor="#e7f5e9">👥</StatIcon>
                </StatHeader>
              </StatCard>

              <StatCard
                $color="#17a2b8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <StatHeader>
                  <div>
                    <StatValue>{stats.totalOrders.toLocaleString()}</StatValue>
                    <StatLabel>Tổng số đơn hàng</StatLabel>
                    <StatChange $positive>
                      Tất cả giao hàng
                    </StatChange>
                  </div>
                  <StatIcon $bgColor="#e7f5fb">📦</StatIcon>
                </StatHeader>
              </StatCard>

              <StatCard
                $color="#ffc107"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <StatHeader>
                  <div>
                    <StatValue style={{ fontSize: '24px' }}>
                      {formatVND(stats.totalRevenue)}
                    </StatValue>
                    <StatLabel>Tổng doanh thu</StatLabel>
                    <StatChange $positive>
                      Thu nhập nền tảng
                    </StatChange>
                  </div>
                  <StatIcon $bgColor="#fff9e6">💰</StatIcon>
                </StatHeader>
              </StatCard>

              <StatCard
                $color="#6c757d"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <StatHeader>
                  <div>
                    <StatValue>{stats.totalDrones}</StatValue>
                    <StatLabel>Tổng số máy bay</StatLabel>
                    <StatChange $positive={stats.activeDrones > 0}>
                      {stats.activeDrones} đang giao hàng
                    </StatChange>
                  </div>
                  <StatIcon $bgColor="#f0f0f0">🚁</StatIcon>
                </StatHeader>
              </StatCard>

              <StatCard
                $color="#dc3545"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <StatHeader>
                  <div>
                    <StatValue>{stats.pendingRestaurants}</StatValue>
                    <StatLabel>Chờ phê duyệt</StatLabel>
                    <StatChange $positive={stats.pendingRestaurants === 0}>
                      {stats.pendingRestaurants === 0 ? 'Đã xử lý hết' : 'Cần xem xét'}
                    </StatChange>
                  </div>
                  <StatIcon $bgColor="#ffe7e7">⏳</StatIcon>
                </StatHeader>
              </StatCard>
            </StatsGrid>

            <ContentArea>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '30px' }}>
                <RestaurantTable 
                  key={`restaurants-${refreshKey}`}
                  restaurants={restaurants} 
                  onUpdate={refreshData} 
                />
              </div>
            </ContentArea>
          </>
        )}

        {activeTab === 'restaurants' && (
          <ContentArea>
            <RestaurantTable 
              key={`restaurants-${refreshKey}`}
              restaurants={restaurants} 
              onUpdate={refreshData} 
            />
          </ContentArea>
        )}

        {activeTab === 'customers' && (
          <ContentArea>
            <CustomerTable 
              key={`customers-${refreshKey}`}
              customers={customers} 
              onUpdate={refreshData} 
            />
          </ContentArea>
        )}

        {activeTab === 'drones' && (
          <ContentArea>
            <DroneMonitor 
              key={`drones-${refreshKey}`}
              drones={drones} 
              onUpdate={refreshData} 
            />
          </ContentArea>
        )}

        {activeTab === 'logs' && (
          <ContentArea>
            <SystemLogs 
              key={`logs-${refreshKey}`}
              logs={logs} 
            />
          </ContentArea>
        )}

        <Footer>
          Trung tâm Quản trị © 2025 FoodFast Drone Delivery — Tất cả giá hiển thị bằng Việt Nam Đồng (₫)
        </Footer>
      </MainContent>

      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#fff',
            color: '#333',
          },
          success: {
            iconTheme: {
              primary: '#28a745',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#dc3545',
              secondary: '#fff',
            },
          },
        }}
      />
      
      {/* Emergency Override Modal */}
      <AnimatePresence>
        {showEmergencyModal && (
          <Modal
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowEmergencyModal(false)}
          >
            <ModalContent
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              onClick={(e) => e.stopPropagation()}
            >
              <ModalTitle>
                ⚠️ Can thiệp khẩn cấp
              </ModalTitle>
              <ModalText>
                Đây là hành động quản trị quan trọng sẽ được ghi lại trong hệ thống. 
                Chỉ sử dụng trong các tình huống khẩn cấp.
              </ModalText>
              
              <WarningBox>
                <strong>⚠️ CẢNH BÁO</strong>
                <ul>
                  <li>Hành động này sẽ được ghi lại vĩnh viễn</li>
                  <li>Tất cả các bên liên quan sẽ được thông báo</li>
                  <li>Chỉ sử dụng khi thực sự cần thiết</li>
                </ul>
              </WarningBox>
              
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500, color: '#333' }}>
                  Loại đối tượng
                </label>
                <select
                  value={emergencyTargetType}
                  onChange={(e) => setEmergencyTargetType(e.target.value as any)}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '2px solid #e1e5e9',
                    borderRadius: '8px',
                    fontSize: '14px',
                    marginBottom: '15px',
                    background: 'white'
                  }}
                >
                  <option value="order">Đơn hàng</option>
                  <option value="restaurant">Nhà hàng</option>
                  <option value="drone">Máy bay</option>
                </select>
              </div>
              
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500, color: '#333' }}>
                  Mã đối tượng
                </label>
                <Input
                  type="text"
                  placeholder="VD: ORD-12345, rest_1, DRONE-001"
                  value={emergencyTargetId}
                  onChange={(e) => setEmergencyTargetId(e.target.value)}
                />
              </div>
              
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500, color: '#333' }}>
                  Tên đối tượng
                </label>
                <Input
                  type="text"
                  placeholder="VD: Đơn hàng #123, Tên nhà hàng, Đơn vị máy bay"
                  value={emergencyTargetName}
                  onChange={(e) => setEmergencyTargetName(e.target.value)}
                />
              </div>
              
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500, color: '#333' }}>
                  Chi tiết hành động
                </label>
                <TextArea
                  placeholder="Mô tả hành động khẩn cấp đang thực hiện và lý do..."
                  value={emergencyAction}
                  onChange={(e) => setEmergencyAction(e.target.value)}
                />
              </div>
              
              <ModalActions>
                <ModalButton onClick={() => setShowEmergencyModal(false)}>
                  Hủy
                </ModalButton>
                <ModalButton 
                  $danger 
                  onClick={handleEmergencyOverride}
                  disabled={!emergencyTargetId || !emergencyTargetName || !emergencyAction}
                >
                  Thực hiện can thiệp khẩn cấp
                </ModalButton>
              </ModalActions>
            </ModalContent>
          </Modal>
        )}
      </AnimatePresence>
    </DashboardLayout>
  );
};

export default AdminDashboard;
