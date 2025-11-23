import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Order } from '@/types/auth';
import AdminNavigation from '@/components/admin/AdminNavigation';
import { formatVND } from '@/utils/currency';
import { api } from '@/config/axios';

const loadOrders = async (): Promise<Order[]> => {
  try {
    const response = await api.get(`/orders`);
    const orders = response.data;
    
    // Map backend orders to frontend Order format
    return Array.isArray(orders) ? orders.map((o: any) => ({
      id: o.id,
      userId: o.userId || '',
      restaurantId: o.restaurantId || o.restaurant || '',
      items: (o.items || []).map((item: any) => ({
        id: item.id?.toString() || '',
        productId: item.productId || '',
        productName: item.name || item.productName || '',
        quantity: item.quantity || item.qty || 1,
        price: item.price || 0
      })),
      total: o.total || 0,
      status: o.status || 'Pending',
      createdAt: o.createdAt || Date.now(),
      updatedAt: o.updatedAt || Date.now(),
      deliveryAddress: o.address || o.deliveryAddress || '',
      paymentMethod: o.paymentMethod
    })) : [];
  } catch (error) {
    console.error('[AdminOrders] Error loading orders:', error);
    return [];
  }
};

const Container = styled.div`
  min-height: 100vh;
  background: #f8f9fa;
  padding: 20px;
`;

const Header = styled.header`
  background: white;
  padding: 20px 30px;
  border-radius: 15px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h1`
  color: #333;
  margin: 0;
  font-size: 28px;
  font-weight: 600;
`;

const FilterContainer = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;
`;

const FilterSelect = styled.select`
  padding: 10px 15px;
  border: 2px solid #e1e5e9;
  border-radius: 8px;
  font-size: 14px;
  background: white;
  cursor: pointer;
`;

const TableContainer = styled.div`
  background: white;
  border-radius: 15px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  
  @media (max-width: 768px) {
    overflow-x: auto;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.th`
  background: #f8f9fa;
  padding: 20px;
  text-align: left;
  font-weight: 600;
  color: #333;
  border-bottom: 1px solid #e9ecef;
`;

const TableCell = styled.td`
  padding: 20px;
  border-bottom: 1px solid #e9ecef;
  color: #666;
`;

const TableRow = styled.tr`
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: #f8f9fa;
  }
`;

const ActionButton = styled.button<{ $variant?: 'view' | 'update' | 'cancel' }>`
  padding: 8px 16px;
  margin-right: 8px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.3s ease;
  
  ${props => {
    switch (props.$variant) {
      case 'view':
        return 'background: #17a2b8; color: white; &:hover { background: #138496; }';
      case 'update':
        return 'background: #28a745; color: white; &:hover { background: #218838; }';
      case 'cancel':
        return 'background: #dc3545; color: white; &:hover { background: #c82333; }';
      default:
        return 'background: #6c757d; color: white; &:hover { background: #5a6268; }';
    }
  }}
`;

const StatusBadge = styled.span<{ $status: string }>`
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
  
  ${props => {
    switch (props.$status) {
      case 'Đang chờ phê duyệt':
        return 'background: #ffc107; color: #333;';
      case 'confirmed':
        return 'background: #17a2b8; color: white;';
      case 'preparing':
        return 'background: #fd7e14; color: white;';
      case 'delivering':
        return 'background: #6f42c1; color: white;';
      case 'delivered':
        return 'background: #28a745; color: white;';
      case 'cancelled':
        return 'background: #dc3545; color: white;';
      default:
        return 'background: #6c757d; color: white;';
    }
  }}
`;

const AdminOrders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  // Load orders from backend on mount
  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const data = await loadOrders();
        setOrders(data);
      } catch (error) {
        console.error('Failed to load orders:', error);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const handleViewOrder = (orderId: string) => {
    console.log('View order:', orderId);
    // Implement view order functionality
  };

  const handleUpdateStatus = (orderId: string) => {
    console.log('Update order status:', orderId);
    // Implement update status functionality
  };

  const handleCancelOrder = (orderId: string) => {
    if (window.confirm('Bạn có chắc chắn muốn hủy đơn hàng này?')) {
      setOrders(orders.map(order => 
        order.id === orderId 
          ? { ...order, status: 'cancelled' as const, updatedAt: Date.now() }
          : order
      ));
    }
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString();
  };

  const filteredOrders = statusFilter === 'all' 
    ? orders 
    : orders.filter(order => order.status === statusFilter);

  const getStatusLabel = (status: string): string => {
    const statusMap: Record<string, string> = {
      'Đang chờ phê duyệt': 'Đang chờ xử lý',
      'confirmed': 'Đã xác nhận',
      'preparing': 'Đang chuẩn bị',
      'delivering': 'Đang giao hàng',
      'delivered': 'Đã giao',
      'cancelled': 'Đã hủy',
    };
    return statusMap[status] || status;
  };

  // Placeholder functions - TODO: Backend integration in Phase 2
  const getUserName = (userId: string) => {
    // TODO: Fetch user name from backend API
    return 'Người dùng không xác định';
  };

  const getRestaurantName = (restaurantId: string) => {
    // TODO: Fetch restaurant name from backend API
    return 'Nhà hàng không xác định';
  };

  return (
    <Container>
      <AdminNavigation />
      <Header>
        <Title>📦 Quản lý các đơn hàng</Title>
        <FilterContainer>
          <label htmlFor="status-filter">Lọc theo trạng thái:</label>
          <FilterSelect 
            id="status-filter"
            value={statusFilter} 
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">Tất cả đơn hàng</option>
            <option value="Đang chờ phê duyệt">Đang chờ xử lý</option>
            <option value="confirmed">Đã xác nhận</option>
            <option value="preparing">Đang chuẩn bị</option>
            <option value="delivering">Đang giao hàng</option>
            <option value="delivered">Đã giao</option>
            <option value="cancelled">Đã huỷ</option>
          </FilterSelect>
        </FilterContainer>
      </Header>

      <TableContainer>
        {loading ? (
          <div style={{ padding: '40px', textAlign: 'center' }}>Đang tải...</div>
        ) : filteredOrders.length === 0 ? (
          <div style={{ padding: '40px', textAlign: 'center' }}>Không có đơn hàng nào</div>
        ) : (
          <Table>
            <thead>
              <tr>
                <TableHeader>Mã đơn hàng</TableHeader>
                <TableHeader>Khách hàng</TableHeader>
                <TableHeader>Nhà hàng</TableHeader>
                <TableHeader>Các mục</TableHeader>
                <TableHeader>Tổng</TableHeader>
                <TableHeader>Trạng thái</TableHeader>
                <TableHeader>Đã tạo</TableHeader>
                <TableHeader>Các hành động</TableHeader>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>
                  <strong>{order.id}</strong>
                </TableCell>
                <TableCell>{getUserName(order.userId)}</TableCell>
                <TableCell>{getRestaurantName(order.restaurantId)}</TableCell>
                <TableCell>
                  {order.items.length} món
                  <br />
                  <small style={{ color: '#999' }}>
                    {order.items.map(item => item.productName).join(', ')}
                  </small>
                </TableCell>
                <TableCell>
                  <strong>{formatVND(order.total)}</strong>
                </TableCell>
                <TableCell>
                  <StatusBadge $status={order.status}>
                    {getStatusLabel(order.status)}
                  </StatusBadge>
                </TableCell>
                <TableCell>{formatDate(order.createdAt)}</TableCell>
                <TableCell>
                  <ActionButton $variant="view" onClick={() => handleViewOrder(order.id)}>
                    Xem
                  </ActionButton>
                  <ActionButton $variant="update" onClick={() => handleUpdateStatus(order.id)}>
                    Cập nhật
                  </ActionButton>
                  {order.status !== 'cancelled' && order.status !== 'delivered' && (
                    <ActionButton $variant="cancel" onClick={() => handleCancelOrder(order.id)}>
                      Hủy
                    </ActionButton>
                  )}
                </TableCell>
              </TableRow>
              ))}
            </tbody>
          </Table>
        )}
      </TableContainer>
    </Container>
  );
};

export default AdminOrders;
