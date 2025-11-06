import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import dayjs from 'dayjs';
import { formatVND } from '../../utils/currency';
import { useOrders } from '@/context/OrderContext';

interface Theme {
  primary: string;
  secondary: string;
  accent: string;
}

interface OrderTrackingProps {
  restaurantId: string;
  theme: Theme;
}

const OrderContainer = styled.div`
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const SectionHeader = styled.div`
  margin-bottom: 24px;
`;

const SectionTitle = styled.h2<{ $primary: string }>`
  color: ${props => props.$primary};
  margin: 0 0 16px 0;
  font-size: 24px;
  font-weight: 600;
`;

const SearchBar = styled.div`
  position: relative;
  margin-bottom: 24px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 14px 48px 14px 16px;
  border: 2px solid #e1e5e9;
  border-radius: 12px;
  font-size: 16px;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
  }
  
  &::placeholder {
    color: #999;
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: #999;
  font-size: 20px;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-bottom: 24px;
`;

const StatCard = styled.div<{ $primary: string }>`
  background: linear-gradient(135deg, ${props => props.$primary}, ${props => props.$primary}dd);
  padding: 20px;
  border-radius: 12px;
  color: white;
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

const OrderCard = styled(motion.div)<{ $accent: string }>`
  background: #f8f9fa;
  padding: 20px;
  border-radius: 12px;
  margin-bottom: 16px;
  border: 2px solid ${props => props.$accent};
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    border-color: ${props => props.$accent}dd;
  }
`;

const OrderHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 12px;
  }
`;

const OrderId = styled.div`
  font-weight: 600;
  color: #333;
  font-size: 18px;
`;

const OrderTime = styled.div`
  color: #666;
  font-size: 14px;
`;

const CustomerInfo = styled.div`
  background: white;
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 12px;
`;

const CustomerLabel = styled.div`
  font-size: 12px;
  color: #666;
  margin-bottom: 4px;
`;

const CustomerValue = styled.div`
  font-size: 14px;
  color: #333;
  font-weight: 600;
`;

const OrderDetails = styled.div`
  margin-bottom: 12px;
`;

const OrderItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  color: #666;
  font-size: 14px;
  border-bottom: 1px solid #e1e5e9;
  
  &:last-child {
    border-bottom: none;
  }
`;

const OrderFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
  padding-top: 16px;
  border-top: 2px solid #dee2e6;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 12px;
    align-items: flex-start;
  }
`;

const OrderTotal = styled.div<{ $primary: string }>`
  font-weight: 700;
  color: ${props => props.$primary};
  font-size: 20px;
`;

const StatusBadge = styled.span<{ $status: string }>`
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 600;
  ${(props) => {
    switch (props.$status) {
      case 'pending':
        return 'background: #FFF9C4; color: #F57F17;';
      case 'confirmed':
        return 'background: #B3E5FC; color: #0277BD;';
      case 'preparing':
        return 'background: #FFE0B2; color: #E65100;';
      case 'delivering':
        return 'background: #C8E6C9; color: #2E7D32;';
      case 'delivered':
        return 'background: #B2DFDB; color: #00695C;';
      default:
        return 'background: #E0E0E0; color: #616161;';
    }
  }}
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

const ActionButton = styled.button<{ $primary: string }>`
  padding: 8px 16px;
  background: ${props => props.$primary};
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: #999;
`;

const OrderTracking: React.FC<OrderTrackingProps> = ({ restaurantId, theme }) => {
  const { orders, updateOrderStatus } = useOrders();
  const [restaurantOrders, setRestaurantOrders] = useState<any[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (orders) {
      const filtered = orders.filter((order: any) => order.restaurantId === restaurantId);
      setRestaurantOrders(filtered);
      setFilteredOrders(filtered);
    }
  }, [orders, restaurantId]);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredOrders(restaurantOrders);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = restaurantOrders.filter((order: any) => {
        const customerName = order.name?.toLowerCase() || '';
        const customerPhone = order.phone || '';
        return customerName.includes(query) || customerPhone.includes(query);
      });
      setFilteredOrders(filtered);
    }
  }, [searchQuery, restaurantOrders]);

  const stats = {
    totalOrders: restaurantOrders.length,
    pendingOrders: restaurantOrders.filter((o) => o.status === 'Processing').length,
    preparingOrders: restaurantOrders.filter((o) => o.status === 'Delivering').length,
    totalRevenue: restaurantOrders.reduce((sum, order) => sum + (order.total || 0), 0),
  };

  const handleUpdateStatus = (orderId: string, newStatus: string) => {
    updateOrderStatus(orderId, newStatus as any);
    toast.success(`Order ${orderId} updated to ${newStatus}! 🎉`);
  };

  const getNextStatus = (currentStatus: string) => {
    const statusFlow = ['Processing', 'Delivering', 'Completed'];
    const currentIndex = statusFlow.indexOf(currentStatus);
    return currentIndex < statusFlow.length - 1 ? statusFlow[currentIndex + 1] : null;
  };

  return (
    <OrderContainer>
      <SectionHeader>
        <SectionTitle $primary={theme.primary}>
          📦 Theo dõi đơn hàng
        </SectionTitle>
      </SectionHeader>

      <SearchBar>
        <SearchInput
          type="text"
          placeholder="🔍 Search by customer name or phone number..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <SearchIcon>🔍</SearchIcon>
      </SearchBar>

      <StatsGrid>
        <StatCard $primary={theme.primary}>
          <StatValue>{stats.totalOrders}</StatValue>
          <StatLabel>Tổng số đơn</StatLabel>
        </StatCard>
        <StatCard $primary={theme.secondary}>
          <StatValue>{stats.pendingOrders}</StatValue>
          <StatLabel>Đang xử lý</StatLabel>
        </StatCard>
        <StatCard $primary={theme.accent}>
          <StatValue>{stats.preparingOrders}</StatValue>
          <StatLabel>Đang giao hàng</StatLabel>
        </StatCard>
        <StatCard $primary={theme.primary}>
          <StatValue>{formatVND(stats.totalRevenue)}</StatValue>
          <StatLabel>Doanh thu</StatLabel>
        </StatCard>
      </StatsGrid>

      {filteredOrders.length === 0 ? (
        <EmptyState>
          <h3>{searchQuery ? 'No matching orders found' : 'Chưa có đơn nào !'}</h3>
          <p>{searchQuery ? 'Try a different search term' : 'Đơn hàng sẽ xuất hiện ở đây sau khi khách hàng đặt hàng'}</p>
        </EmptyState>
      ) : (
        filteredOrders
          .sort((a, b) => b.createdAt - a.createdAt)
          .map((order) => (
            <OrderCard
              key={order.id}
              $accent={theme.accent}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <OrderHeader>
                <div>
                  <OrderId>Order #{order.id}</OrderId>
                  <OrderTime>{dayjs(order.createdAt).format('DD/MM/YYYY HH:mm')}</OrderTime>
                </div>
                <StatusBadge $status={order.status}>
                  {order.status.toUpperCase()}
                </StatusBadge>
              </OrderHeader>

              <CustomerInfo>
                <CustomerLabel>Customer Information:</CustomerLabel>
                <CustomerValue>
                  {order.name || 'N/A'} - {order.phone || 'N/A'}
                </CustomerValue>
              </CustomerInfo>

              <OrderDetails>
                {order.items?.map((item: any, index: number) => (
                  <OrderItem key={index}>
                    <span>
                      {item.qty}x {item.name}
                    </span>
                    <span>{formatVND(item.price * item.qty)}</span>
                  </OrderItem>
                ))}
              </OrderDetails>

              <OrderFooter>
                <OrderTotal $primary={theme.primary}>
                  Total: {formatVND(order.total)}
                </OrderTotal>
                
                <ActionButtons>
                  {getNextStatus(order.status) && (
                    <ActionButton
                      $primary={theme.primary}
                      onClick={() => handleUpdateStatus(order.id, getNextStatus(order.status)!)}
                    >
                      Move to {getNextStatus(order.status)}
                    </ActionButton>
                  )}
                </ActionButtons>
              </OrderFooter>
            </OrderCard>
          ))
      )}
    </OrderContainer>
  );
};

export default OrderTracking;

