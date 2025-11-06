import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useOrders } from '@/context/OrderContext';
import { USERS, RESTAURANTS } from '@/data/mockData';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import dayjs from 'dayjs';
import { formatVND } from '../../utils/currency';

// Styled Components
const AdminContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 24px;
  background: #f8f9fa;
  min-height: 100vh;
`;

const AdminHeader = styled.div`
  background: white;
  border-radius: 16px;
  padding: 32px;
  margin-bottom: 32px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border: 1px solid #e1e5e9;
`;

const AdminTitle = styled.h1`
  color: #333;
  margin: 0 0 8px 0;
  font-size: 32px;
  font-weight: 700;
`;

const AdminSubtitle = styled.p`
  color: #666;
  margin: 0;
  font-size: 16px;
`;

const TabContainer = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 32px;
  background: white;
  border-radius: 12px;
  padding: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border: 1px solid #e1e5e9;
`;

const TabButton = styled.button<{ $active: boolean }>`
  flex: 1;
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  background: ${props => props.$active ? '#007bff' : 'transparent'};
  color: ${props => props.$active ? 'white' : '#666'};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: ${props => props.$active ? '#0056b3' : '#f8f9fa'};
  }
`;

const ContentCard = styled.div`
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border: 1px solid #e1e5e9;
  overflow: hidden;
`;

const CardHeader = styled.div`
  padding: 24px;
  border-bottom: 1px solid #e1e5e9;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CardTitle = styled.h2`
  margin: 0;
  color: #333;
  font-size: 20px;
  font-weight: 600;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  padding: 24px;
`;

const StatCard = styled(motion.div)`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  padding: 20px;
  color: white;
  text-align: center;
`;

const StatValue = styled.div`
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 4px;
`;

const StatLabel = styled.div`
  font-size: 14px;
  opacity: 0.9;
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

const TableRow = styled.tr`
  transition: background-color 0.2s ease;
  
  &:hover {
    background: #f8f9fa;
  }
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
      case 'active': return 'background: #d4edda; color: #155724; border: 1px solid #a3e4a3;';
      case 'suspended': return 'background: #f8d7da; color: #721c24; border: 1px solid #f5c6cb;';
      case 'admin': return 'background: #cce5ff; color: #004085; border: 1px solid #99d6ff;';
      case 'restaurant': return 'background: #fff3cd; color: #856404; border: 1px solid #ffeaa7;';
      case 'customer': return 'background: #d1ecf1; color: #0c5460; border: 1px solid #bee5eb;';
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
      case 'suspend': return 'background: #dc3545; color: white;';
      case 'activate': return 'background: #28a745; color: white;';
      case 'delete': return 'background: #6c757d; color: white;';
      default: return 'background: #007bff; color: white;';
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

type TabType = 'overview' | 'users' | 'restaurants' | 'orders' | 'reports';

const AdminControlPanel: React.FC = () => {
  const { user } = useAuth();
  const { orders } = useOrders();
  const [activeTab, setActiveTab] = useState<TabType>('overview');

  // Check if user is admin
  if (!user || user.role !== 'admin') {
    return (
      <AdminContainer>
        <div style={{ textAlign: 'center', padding: '60px 20px' }}>
          <h2>🚫 Truy cập bị từ chối</h2>
          <p>Bạn không có quyền truy cập trang này. Vui lòng đăng nhập với tài khoản admin.</p>
        </div>
      </AdminContainer>
    );
  }

  // Calculate statistics
  const totalUsers = USERS.length;
  const totalRestaurants = RESTAURANTS.length;
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);

  const handleUserAction = (userId: string, action: string) => {
    toast.success(`✅ Đã ${action} người dùng thành công`);
  };

  const handleRestaurantAction = (restaurantId: string, action: string) => {
    toast.success(`✅ Đã ${action} nhà hàng thành công`);
  };

  const renderOverview = () => (
    <>
      <StatsGrid>
        <StatCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <StatValue>{totalUsers}</StatValue>
          <StatLabel>Tổng số người dùng</StatLabel>
        </StatCard>

        <StatCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <StatValue>{totalRestaurants}</StatValue>
          <StatLabel>Tổng số nhà hàng</StatLabel>
        </StatCard>

        <StatCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <StatValue>{totalOrders}</StatValue>
          <StatLabel>Tổng số đơn hàng</StatLabel>
        </StatCard>

        <StatCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <StatValue>{formatVND(totalRevenue)}</StatValue>
          <StatLabel>Tổng doanh thu</StatLabel>
        </StatCard>
      </StatsGrid>
    </>
  );

  const renderUsers = () => (
    <ContentCard>
      <CardHeader>
        <CardTitle>Quản lý người dùng</CardTitle>
      </CardHeader>
      <div style={{ overflowX: 'auto' }}>
        <Table>
          <TableHeader>
            <tr>
              <TableHeaderCell>ID</TableHeaderCell>
              <TableHeaderCell>Tên</TableHeaderCell>
              <TableHeaderCell>Username</TableHeaderCell>
              <TableHeaderCell>Vai trò</TableHeaderCell>
              <TableHeaderCell>Email</TableHeaderCell>
              <TableHeaderCell>Số điện thoại</TableHeaderCell>
              <TableHeaderCell>Thao tác</TableHeaderCell>
            </tr>
          </TableHeader>
          <TableBody>
            {USERS.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>
                  <StatusBadge status={user.role}>
                    {user.role === 'admin' ? 'Quản trị viên' : 
                     user.role === 'restaurant' ? 'Nhà hàng' : 'Khách hàng'}
                  </StatusBadge>
                </TableCell>
                <TableCell>{user.email || '-'}</TableCell>
                <TableCell>{user.phone || '-'}</TableCell>
                <TableCell>
                  <ActionButton
                    variant="suspend"
                    onClick={() => handleUserAction(user.id, 'tạm khóa')}
                  >
                    Tạm khóa
                  </ActionButton>
                  <ActionButton
                    variant="delete"
                    onClick={() => handleUserAction(user.id, 'xóa')}
                  >
                    Xóa
                  </ActionButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </ContentCard>
  );

  const renderRestaurants = () => (
    <ContentCard>
      <CardHeader>
        <CardTitle>Quản lý nhà hàng</CardTitle>
      </CardHeader>
      <div style={{ overflowX: 'auto' }}>
        <Table>
          <TableHeader>
            <tr>
              <TableHeaderCell>ID</TableHeaderCell>
              <TableHeaderCell>Tên nhà hàng</TableHeaderCell>
              <TableHeaderCell>Mô tả</TableHeaderCell>
              <TableHeaderCell>Chủ sở hữu</TableHeaderCell>
              <TableHeaderCell>Trạng thái</TableHeaderCell>
              <TableHeaderCell>Ngày tạo</TableHeaderCell>
              <TableHeaderCell>Thao tác</TableHeaderCell>
            </tr>
          </TableHeader>
          <TableBody>
            {RESTAURANTS.map((restaurant) => (
              <TableRow key={restaurant.id}>
                <TableCell>{restaurant.id}</TableCell>
                <TableCell>{restaurant.name}</TableCell>
                <TableCell>{restaurant.description}</TableCell>
                <TableCell>{USERS.find(u => u.id === restaurant.ownerId)?.name}</TableCell>
                <TableCell>
                  <StatusBadge status={restaurant.isActive ? 'active' : 'suspended'}>
                    {restaurant.isActive ? 'Hoạt động' : 'Tạm khóa'}
                  </StatusBadge>
                </TableCell>
                <TableCell>{dayjs(restaurant.createdAt).format('DD/MM/YYYY')}</TableCell>
                <TableCell>
                  <ActionButton
                    variant={restaurant.isActive ? 'suspend' : 'activate'}
                    onClick={() => handleRestaurantAction(restaurant.id, restaurant.isActive ? 'tạm khóa' : 'kích hoạt')}
                  >
                    {restaurant.isActive ? 'Tạm khóa' : 'Kích hoạt'}
                  </ActionButton>
                  <ActionButton
                    variant="delete"
                    onClick={() => handleRestaurantAction(restaurant.id, 'xóa')}
                  >
                    Xóa
                  </ActionButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </ContentCard>
  );

  const renderOrders = () => (
    <ContentCard>
      <CardHeader>
        <CardTitle>Quản lý đơn hàng</CardTitle>
      </CardHeader>
      <div style={{ overflowX: 'auto' }}>
        <Table>
          <TableHeader>
            <tr>
              <TableHeaderCell>Mã đơn hàng</TableHeaderCell>
              <TableHeaderCell>Khách hàng</TableHeaderCell>
              <TableHeaderCell>Số điện thoại</TableHeaderCell>
              <TableHeaderCell>Tổng tiền</TableHeaderCell>
              <TableHeaderCell>Trạng thái</TableHeaderCell>
              <TableHeaderCell>Ngày đặt</TableHeaderCell>
            </tr>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>#{order.id.slice(-6)}</TableCell>
                <TableCell>{order.name}</TableCell>
                <TableCell>{order.phone}</TableCell>
                <TableCell>{formatVND(order.total)}</TableCell>
                <TableCell>
                  <StatusBadge status={order.status.toLowerCase()}>
                    {order.status === 'Processing' ? 'Đang chuẩn bị' :
                     order.status === 'Delivering' ? 'Đang giao hàng' : 'Hoàn tất'}
                  </StatusBadge>
                </TableCell>
                <TableCell>{dayjs(order.time).format('DD/MM/YYYY HH:mm')}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </ContentCard>
  );

  const renderReports = () => (
    <ContentCard>
      <CardHeader>
        <CardTitle>Báo cáo và thống kê</CardTitle>
      </CardHeader>
      <div style={{ padding: '24px' }}>
        <EmptyState>
          <EmptyIcon>📊</EmptyIcon>
          <EmptyTitle>Báo cáo chi tiết</EmptyTitle>
          <EmptySubtitle>Tính năng báo cáo chi tiết sẽ được phát triển trong phiên bản tiếp theo.</EmptySubtitle>
        </EmptyState>
      </div>
    </ContentCard>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'overview': return renderOverview();
      case 'users': return renderUsers();
      case 'restaurants': return renderRestaurants();
      case 'orders': return renderOrders();
      case 'reports': return renderReports();
      default: return renderOverview();
    }
  };

  return (
    <AdminContainer>
      <AdminHeader>
        <AdminTitle>Bảng điều khiển quản trị</AdminTitle>
        <AdminSubtitle>Quản lý hệ thống FoodFast Drone Delivery</AdminSubtitle>
      </AdminHeader>

      <TabContainer>
        <TabButton 
          $active={activeTab === 'overview'} 
          onClick={() => setActiveTab('overview')}
        >
          📊 Tổng quan
        </TabButton>
        <TabButton 
          $active={activeTab === 'users'} 
          onClick={() => setActiveTab('users')}
        >
          👥 Người dùng
        </TabButton>
        <TabButton 
          $active={activeTab === 'restaurants'} 
          onClick={() => setActiveTab('restaurants')}
        >
          🏪 Nhà hàng
        </TabButton>
        <TabButton 
          $active={activeTab === 'orders'} 
          onClick={() => setActiveTab('orders')}
        >
          📦 Đơn hàng
        </TabButton>
        <TabButton 
          $active={activeTab === 'reports'} 
          onClick={() => setActiveTab('reports')}
        >
          📈 Báo cáo
        </TabButton>
      </TabContainer>

      {renderContent()}
    </AdminContainer>
  );
};

export default AdminControlPanel;
