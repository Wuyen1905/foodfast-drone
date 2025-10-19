import React, { useState, useEffect } from 'react';
import { useAuth } from '../AuthContext';
import { useOrders } from '../context/OrderContext';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import dayjs from 'dayjs';
import { formatVND } from '../utils/currency';
import DroneAnimation from '../components/DroneAnimation';

// Styled Components
const DashboardContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
`;

const DashboardHeader = styled.div`
  margin-bottom: 32px;
`;

const DashboardTitle = styled.h1`
  color: #333;
  margin: 0 0 8px 0;
  font-size: 32px;
  font-weight: 700;
`;

const DashboardSubtitle = styled.p`
  color: #666;
  margin: 0;
  font-size: 16px;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 24px;
  margin-bottom: 32px;
`;

const StatCard = styled(motion.div)`
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border: 1px solid #e1e5e9;
  transition: transform 0.2s ease;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  }
`;

const StatIcon = styled.div<{ color: string }>`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: ${props => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  margin-bottom: 16px;
`;

const StatValue = styled.div`
  font-size: 32px;
  font-weight: 700;
  color: #333;
  margin-bottom: 4px;
`;

const StatLabel = styled.div`
  color: #666;
  font-size: 14px;
  font-weight: 500;
`;

const OrdersSection = styled.div`
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border: 1px solid #e1e5e9;
  overflow: hidden;
`;

const SectionHeader = styled.div`
  padding: 24px;
  border-bottom: 1px solid #e1e5e9;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SectionTitle = styled.h2`
  margin: 0;
  color: #333;
  font-size: 20px;
  font-weight: 600;
`;

const RefreshButton = styled(motion.button)`
  background: #FF6600;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: #e55a00;
    transform: translateY(-1px);
  }
`;

const OrdersTable = styled.div`
  overflow-x: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.thead`
  background: #f8f9fa;
`;

const TableHeaderCell = styled.th`
  padding: 16px;
  text-align: left;
  font-weight: 600;
  color: #333;
  border-bottom: 1px solid #e1e5e9;
  font-size: 14px;
`;

const TableBody = styled.tbody``;

const TableRow = styled.tr<{ status: string }>`
  transition: background-color 0.2s ease;
  
  &:hover {
    background: #f8f9fa;
  }
  
  ${props => props.status === 'Delivering' && `
    background: rgba(33, 150, 243, 0.05);
  `}
`;

const TableCell = styled.td`
  padding: 16px;
  border-bottom: 1px solid #e1e5e9;
  font-size: 14px;
  color: #333;
`;

const StatusBadge = styled.span<{ status: string }>`
  display: inline-block;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  
  ${props => {
    switch(props.status) {
      case 'Processing': return 'background: #fff3cd; color: #856404; border: 1px solid #ffeaa7;';
      case 'Delivering': return 'background: #cce5ff; color: #004085; border: 1px solid #99d6ff;';
      case 'Completed': return 'background: #d4edda; color: #155724; border: 1px solid #a3e4a3;';
      default: return 'background: #f8d7da; color: #721c24; border: 1px solid #f5c6cb;';
    }
  }}
`;

const ActionButton = styled.button<{ variant: string }>`
  padding: 6px 12px;
  border: none;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  margin-right: 8px;
  transition: all 0.2s ease;
  
  ${props => {
    switch(props.variant) {
      case 'processing': return 'background: #ffc107; color: white;';
      case 'delivering': return 'background: #007bff; color: white;';
      case 'completed': return 'background: #28a745; color: white;';
      default: return 'background: #6c757d; color: white;';
    }
  }}
  
  &:hover {
    transform: translateY(-1px);
    opacity: 0.9;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: #666;
`;

const EmptyIcon = styled.div`
  font-size: 48px;
  margin-bottom: 16px;
`;

const EmptyTitle = styled.h3`
  margin: 0 0 8px 0;
  color: #333;
`;

const EmptySubtitle = styled.p`
  margin: 0;
  color: #666;
`;

const DroneStatus = styled.div<{ isActive: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: ${props => props.isActive ? '#007bff' : '#6c757d'};
  
  &::before {
    content: '${props => props.isActive ? '🛫' : '⏸️'}';
  }
`;

const AdminDashboard: React.FC = () => {
  const demandAuth = useAuth();
  const { orders, updateOrderStatus } = useOrders();
  const [refreshing, setRefreshing] = useState(false);
  const [showDemo, setShowDemo] = useState(false);

  // Check if user is admin
  if (!demandAuth.user || demandAuth.user.role !== 'admin') {
    return (
      <DashboardContainer>
        <div style={{ textAlign: 'center', padding: '60px 20px' }}>
          <h2>🚫 Truy cập bị từ chối</h2>
          <p>Bạn không có quyền truy cập trang này. Vui lòng đăng nhập với tài khoản admin.</p>
        </div>
      </DashboardContainer>
    );
  }

  // Calculate statistics
  const totalUsers = new Set(orders.map(order => order.phone)).size;
  const totalOrders = orders.length;
  const activeDrones = orders.filter(order => order.status === 'Delivering').length;
  const completedDeliveries = orders.filter(order => order.status === 'Completed').length;

  const handleStatusUpdate = (orderId: string, newStatus: string) => {
    updateOrderStatus(orderId, newStatus as any);
    toast.success(`✅ Đã cập nhật trạng thái đơn hàng thành "${newStatus}"`);
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    // Simulate refresh delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    setRefreshing(false);
    toast.success('🔄 Đã làm mới dữ liệu');
  };

  const getStatusLabel = (status: string) => {
    switch(status) {
      case 'Processing': return 'Đang chuẩn bị';
      case 'Delivering': return 'Đang giao hàng';
      case 'Completed': return 'Hoàn tất';
      default: return status;
    }
  };

  return (
    <DashboardContainer>
      <DashboardHeader>
        <DashboardTitle>Bảng điều khiển quản trị</DashboardTitle>
        <DashboardSubtitle>Quản lý đơn hàng và theo dõi drone giao hàng</DashboardSubtitle>
      </DashboardHeader>

      <StatsGrid>
        <StatCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <StatIcon color="linear-gradient(135deg, #667eea 0%, #764ba2 100%)">
            👥
          </StatIcon>
          <StatValue>{totalUsers}</StatValue>
          <StatLabel>Tổng số khách hàng</StatLabel>
        </StatCard>

        <StatCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <StatIcon color="linear-gradient(135deg, #f093fb 0%, #f5576c 100%)">
            📦
          </StatIcon>
          <StatValue>{totalOrders}</StatValue>
          <StatLabel>Tổng số đơn hàng</StatLabel>
        </StatCard>

        <StatCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <StatIcon color="linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)">
            🚁
          </StatIcon>
          <StatValue>{activeDrones}</StatValue>
          <StatLabel>Drone đang hoạt động</StatLabel>
        </StatCard>

        <StatCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <StatIcon color="linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)">
            ✅
          </StatIcon>
          <StatValue>{completedDeliveries}</StatValue>
          <StatLabel>Giao hàng hoàn tất</StatLabel>
        </StatCard>
      </StatsGrid>

      <OrdersSection>
        <SectionHeader>
          <SectionTitle>Danh sách đơn hàng</SectionTitle>
          <div style={{ display: 'flex', gap: '12px' }}>
            <RefreshButton
              onClick={handleRefresh}
              disabled={refreshing}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {refreshing ? '🔄 Đang làm mới...' : '🔄 Làm mới'}
            </RefreshButton>
            <RefreshButton
              onClick={() => setShowDemo(!showDemo)}
              style={{ background: '#6f42c1' }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {showDemo ? '🛩️ Ẩn Demo' : '🛩️ Demo Drone'}
            </RefreshButton>
          </div>
        </SectionHeader>

        <OrdersTable>
          {orders.length === 0 ? (
            <EmptyState>
              <EmptyIcon>📦</EmptyIcon>
              <EmptyTitle>Chưa có đơn hàng nào</EmptyTitle>
              <EmptySubtitle>Khi có đơn hàng mới, chúng sẽ hiển thị ở đây.</EmptySubtitle>
            </EmptyState>
          ) : (
            <Table>
              <TableHeader>
                <tr>
                  <TableHeaderCell>Mã đơn hàng</TableHeaderCell>
                  <TableHeaderCell>Khách hàng</TableHeaderCell>
                  <TableHeaderCell>Số điện thoại</TableHeaderCell>
                  <TableHeaderCell>Tổng tiền</TableHeaderCell>
                  <TableHeaderCell>Trạng thái</TableHeaderCell>
                  <TableHeaderCell>Drone</TableHeaderCell>
                  <TableHeaderCell>Thao tác</TableHeaderCell>
                </tr>
              </TableHeader>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id} status={order.status}>
                    <TableCell>
                      <strong>#{order.id.slice(-6)}</strong>
                    </TableCell>
                    <TableCell>{order.name}</TableCell>
                    <TableCell>{order.phone}</TableCell>
                    <TableCell>{formatVND(order.total)}</TableCell>
                    <TableCell>
                      <StatusBadge status={order.status}>
                        {getStatusLabel(order.status)}
                      </StatusBadge>
                    </TableCell>
                    <TableCell>
                      <DroneStatus isActive={order.status === 'Delivering'}>
                        {order.status === 'Delivering' ? 'Đang bay' : 'Không hoạt động'}
                      </DroneStatus>
                    </TableCell>
                    <TableCell>
                      <ActionButton
                        variant="processing"
                        onClick={() => handleStatusUpdate(order.id, 'Processing')}
                      >
                        Chuẩn bị
                      </ActionButton>
                      <ActionButton
                        variant="delivering"
                        onClick={() => handleStatusUpdate(order.id, 'Delivering')}
                      >
                        Giao hàng
                      </ActionButton>
                      <ActionButton
                        variant="completed"
                        onClick={() => handleStatusUpdate(order.id, 'Completed')}
                      >
                        Hoàn tất
                      </ActionButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </OrdersTable>
      </OrdersSection>

      {/* Demo Drone Animation Section */}
      {showDemo && (
        <OrdersSection>
          <SectionHeader>
            <SectionTitle>🛩️ Demo Drone Animation</SectionTitle>
          </SectionHeader>
          <DroneAnimation
            orderId="demo-order"
            isActive={true}
            deliveryTime={10} // 10 minutes for demo
          />
        </OrdersSection>
      )}
    </DashboardContainer>
  );
};

export default AdminDashboard;
