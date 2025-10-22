import React, { useState } from 'react';
import styled from 'styled-components';
import { Order } from '@/types/auth';
import AdminNavigation from '@/components/admin/AdminNavigation';

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
  const [orders, setOrders] = useState<Order[]>([
    {
      id: 'ORD-001',
      userId: 'u2',
      restaurantId: 'rest_1',
      items: [
        { id: 'item1', productId: 'prod1', productName: 'Burger Deluxe', quantity: 2, price: 15.99 },
        { id: 'item2', productId: 'prod2', productName: 'French Fries', quantity: 1, price: 5.99 }
      ],
      total: 37.97,
      status: 'delivered',
      createdAt: Date.now() - 86400000 * 2,
      updatedAt: Date.now() - 86400000 * 1,
      deliveryAddress: '123 Main St, City',
      paymentMethod: 'Credit Card'
    },
    {
      id: 'ORD-002',
      userId: 'u3',
      restaurantId: 'rest_2',
      items: [
        { id: 'item3', productId: 'prod3', productName: 'Chocolate Cake', quantity: 1, price: 12.99 }
      ],
      total: 12.99,
      status: 'delivering',
      createdAt: Date.now() - 3600000 * 2,
      updatedAt: Date.now() - 3600000 * 1,
      deliveryAddress: '456 Oak Ave, City',
      paymentMethod: 'Cash'
    },
    {
      id: 'ORD-003',
      userId: 'u2',
      restaurantId: 'rest_1',
      items: [
        { id: 'item4', productId: 'prod4', productName: 'Pizza Margherita', quantity: 1, price: 18.99 }
      ],
      total: 18.99,
      status: 'preparing',
      createdAt: Date.now() - 1800000,
      updatedAt: Date.now() - 900000,
      deliveryAddress: '789 Pine St, City',
      paymentMethod: 'Credit Card'
    },
    {
      id: 'ORD-004',
      userId: 'u3',
      restaurantId: 'rest_2',
      items: [
        { id: 'item5', productId: 'prod5', productName: 'Tiramisu', quantity: 2, price: 8.99 }
      ],
      total: 17.98,
      status: 'cancelled',
      createdAt: Date.now() - 86400000 * 1,
      updatedAt: Date.now() - 86400000 * 1,
      deliveryAddress: '321 Elm St, City',
      paymentMethod: 'Credit Card'
    }
  ]);

  const [statusFilter, setStatusFilter] = useState<string>('all');

  const handleViewOrder = (orderId: string) => {
    console.log('View order:', orderId);
    // Implement view order functionality
  };

  const handleUpdateStatus = (orderId: string) => {
    console.log('Update order status:', orderId);
    // Implement update status functionality
  };

  const handleCancelOrder = (orderId: string) => {
    if (window.confirm('Are you sure you want to cancel this order?')) {
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

  const formatCurrency = (amount: number) => {
    return `$${amount.toFixed(2)}`;
  };

  const filteredOrders = statusFilter === 'all' 
    ? orders 
    : orders.filter(order => order.status === statusFilter);

  const getUserName = (userId: string) => {
    const userNames: { [key: string]: string } = {
      'u2': 'John Doe',
      'u3': 'Jane Smith',
      'u4': 'Mike Johnson'
    };
    return userNames[userId] || 'Unknown User';
  };

  const getRestaurantName = (restaurantId: string) => {
    const restaurantNames: { [key: string]: string } = {
      'rest_1': 'FoodFast Restaurant',
      'rest_2': 'SweetDreams Bakery',
      'rest_3': 'Pizza Palace'
    };
    return restaurantNames[restaurantId] || 'Unknown Restaurant';
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
                  {order.items.length} item(s)
                  <br />
                  <small style={{ color: '#999' }}>
                    {order.items.map(item => item.productName).join(', ')}
                  </small>
                </TableCell>
                <TableCell>
                  <strong>{formatCurrency(order.total)}</strong>
                </TableCell>
                <TableCell>
                  <StatusBadge $status={order.status}>
                    {order.status.toUpperCase()}
                  </StatusBadge>
                </TableCell>
                <TableCell>{formatDate(order.createdAt)}</TableCell>
                <TableCell>
                  <ActionButton $variant="view" onClick={() => handleViewOrder(order.id)}>
                    View
                  </ActionButton>
                  <ActionButton $variant="update" onClick={() => handleUpdateStatus(order.id)}>
                    Update
                  </ActionButton>
                  {order.status !== 'cancelled' && order.status !== 'delivered' && (
                    <ActionButton $variant="cancel" onClick={() => handleCancelOrder(order.id)}>
                      Cancel
                    </ActionButton>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </tbody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default AdminOrders;
