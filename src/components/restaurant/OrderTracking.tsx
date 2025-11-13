import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import dayjs from 'dayjs';
import { formatVND } from '../../utils/currency';
import { useOrders, OrderStatus } from '@/context/OrderContext';
import { 
  confirmOrder as confirmOrderService, 
  rejectOrder as rejectOrderService,
  updateOrderStatus as updateOrderStatusService,
  addOrderNote as addOrderNoteService
} from '@/services/restaurantOrderService';
import { connectOrderSocket, disconnectOrderSocket } from '@/services/orderSyncService';

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
    const status = props.$status.toLowerCase();
    switch (status) {
      case 'pending':
        return 'background: #FFF9C4; color: #F57F17;';
      case 'confirmed':
        return 'background: #B3E5FC; color: #0277BD;';
      case 'in progress':
        return 'background: #FFE0B2; color: #E65100;';
      case 'ready':
        return 'background: #C8E6C9; color: #2E7D32;';
      case 'delivering':
        return 'background: #BBDEFB; color: #1565C0;';
      case 'delivered':
        return 'background: #B2DFDB; color: #00695C;';
      case 'cancelled':
        return 'background: #FFCDD2; color: #C62828;';
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

const ActionButton = styled.button<{ $primary?: string; $variant?: 'primary' | 'danger' | 'success' }>`
  padding: 8px 16px;
  background: ${props => {
    if (props.$variant === 'danger') return '#dc3545';
    if (props.$variant === 'success') return '#28a745';
    return props.$primary || '#007bff';
  }};
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

const NotesSection = styled.div`
  margin-top: 12px;
  padding: 12px;
  background: #f8f9fa;
  border-radius: 8px;
  border-left: 3px solid #007bff;
`;

const NotesLabel = styled.div`
  font-size: 12px;
  color: #666;
  margin-bottom: 8px;
  font-weight: 600;
`;

const NotesContent = styled.div`
  font-size: 13px;
  color: #333;
  white-space: pre-wrap;
  line-height: 1.5;
`;

const NotesInput = styled.textarea`
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 13px;
  resize: vertical;
  min-height: 60px;
  font-family: inherit;
  
  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.1);
  }
`;

const StatusSelect = styled.select`
  padding: 6px 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  background: white;
  cursor: pointer;
  margin-right: 8px;
  
  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: #999;
`;

// Status options for dropdown - fixed order
const STATUS_OPTIONS: OrderStatus[] = ['In Progress', 'Delivering', 'Delivered', 'Cancelled'];

// Helper function to translate order status to Vietnamese
const getStatusLabel = (status: string): string => {
  const statusMap: Record<string, string> = {
    'Pending': 'Đang chờ',
    'Confirmed': 'Đã xác nhận',
    'In Progress': 'Đang chuẩn bị',
    'Ready': 'Sẵn sàng',
    'Delivering': 'Đang giao',
    'Delivered': 'Đã giao',
    'Cancelled': 'Đã hủy',
    'Processing': 'Đang xử lý',
  };
  return statusMap[status] || status;
};

const OrderTracking: React.FC<OrderTrackingProps> = ({ restaurantId, theme }) => {
  const { orders, updateOrderStatus, confirmOrder, rejectOrder, addOrderNote } = useOrders();
  const [restaurantOrders, setRestaurantOrders] = useState<any[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedOrders, setExpandedOrders] = useState<Set<string>>(new Set());
  const [noteInputs, setNoteInputs] = useState<Record<string, string>>({});

  useEffect(() => {
    if (orders) {
      // Normalize restaurant IDs for comparison
      const normalizeId = (id: string) => {
        const map: Record<string, string> = {
          'rest_2': 'sweetdreams',
          'restaurant_2': 'aloha',
          'sweetdreams': 'sweetdreams',
          'aloha': 'aloha',
        };
        return map[id?.toLowerCase()] || id;
      };
      
      const normalizedRestaurantId = normalizeId(restaurantId);
      const filtered = orders.filter((order: any) => {
        const orderRestaurantId = order.restaurantId ? normalizeId(order.restaurantId) : null;
        return orderRestaurantId === normalizedRestaurantId;
      });
      setRestaurantOrders(filtered);
      setFilteredOrders(filtered);
    }
  }, [orders, restaurantId]);

  // Real-time WebSocket synchronization
  useEffect(() => {
    const handleOrderUpdate = async (orderUpdate: any) => {
      console.log('[RestaurantOrderTracking] 📦 WebSocket order update received:', orderUpdate.id, orderUpdate.status);
      
      try {
        // Map API order format to OrderContext format
        const { mapApiOrderToOrder } = await import('@/services/orderApiService');
        const mappedOrder = mapApiOrderToOrder(orderUpdate);
        
        // Check if order belongs to this restaurant
        const normalizeId = (id: string) => {
          const map: Record<string, string> = {
            'rest_2': 'sweetdreams',
            'restaurant_2': 'aloha',
            'sweetdreams': 'sweetdreams',
            'aloha': 'aloha',
          };
          return map[id?.toLowerCase()] || id;
        };
        
        const normalizedRestaurantId = normalizeId(restaurantId);
        const orderRestaurantId = mappedOrder.restaurantId ? normalizeId(mappedOrder.restaurantId) : null;
        
        // Only update if order belongs to this restaurant
        if (orderRestaurantId === normalizedRestaurantId) {
          setRestaurantOrders((prevOrders: any[]) => {
            const exists = prevOrders.find((o: any) => o.id === mappedOrder.id);
            return exists
              ? prevOrders.map((o: any) => (o.id === mappedOrder.id ? mappedOrder : o))
              : [...prevOrders, mappedOrder];
          });
          
          setFilteredOrders((prevOrders: any[]) => {
            const exists = prevOrders.find((o: any) => o.id === mappedOrder.id);
            return exists
              ? prevOrders.map((o: any) => (o.id === mappedOrder.id ? mappedOrder : o))
              : [...prevOrders, mappedOrder];
          });
          
          // Note: OrderContext will also receive this update via its own WebSocket subscription
          // No need to call updateOrderStatus here to avoid duplicate API calls
        }
      } catch (error) {
        console.error('[RestaurantOrderTracking] Error mapping order update:', error);
        // Fallback: update with raw order update if mapping fails
        const normalizeId = (id: string) => {
          const map: Record<string, string> = {
            'rest_2': 'sweetdreams',
            'restaurant_2': 'aloha',
            'sweetdreams': 'sweetdreams',
            'aloha': 'aloha',
          };
          return map[id?.toLowerCase()] || id;
        };
        
        const normalizedRestaurantId = normalizeId(restaurantId);
        const orderRestaurantId = orderUpdate.restaurantId ? normalizeId(orderUpdate.restaurantId) : null;
        
        if (orderRestaurantId === normalizedRestaurantId) {
          setRestaurantOrders((prevOrders: any[]) => {
            const exists = prevOrders.find((o: any) => o.id === orderUpdate.id);
            return exists
              ? prevOrders.map((o: any) => (o.id === orderUpdate.id ? orderUpdate : o))
              : [...prevOrders, orderUpdate];
          });
          
          setFilteredOrders((prevOrders: any[]) => {
            const exists = prevOrders.find((o: any) => o.id === orderUpdate.id);
            return exists
              ? prevOrders.map((o: any) => (o.id === orderUpdate.id ? orderUpdate : o))
              : [...prevOrders, orderUpdate];
          });
        }
      }
    };
    
    connectOrderSocket(handleOrderUpdate);
    return () => disconnectOrderSocket();
  }, [restaurantId]);

  // Listen for new order notifications
  useEffect(() => {
    const handleNewOrder = (event: CustomEvent) => {
      const notification = event.detail;
      if (notification.restaurantId) {
        // Refresh orders when new order notification arrives
        const normalizeId = (id: string) => {
          const map: Record<string, string> = {
            'rest_2': 'sweetdreams',
            'restaurant_2': 'aloha',
            'sweetdreams': 'sweetdreams',
            'aloha': 'aloha',
          };
          return map[id?.toLowerCase()] || id;
        };
        
        const normalizedRestaurantId = normalizeId(restaurantId);
        const normalizedNotificationId = normalizeId(notification.restaurantId);
        
        if (normalizedNotificationId === normalizedRestaurantId) {
          // Trigger a refresh by updating orders from localStorage
          const orders = JSON.parse(localStorage.getItem('orders') || '[]');
          // This will trigger the useEffect above
        }
      }
    };

    const handleOrderUpdate = (event: CustomEvent) => {
      // Refresh orders when order is updated
      const orders = JSON.parse(localStorage.getItem('orders') || '[]');
      // This will trigger the useEffect above
    };

    window.addEventListener('newOrderNotification', handleNewOrder as EventListener);
    window.addEventListener('orderUpdated', handleOrderUpdate as EventListener);

    return () => {
      window.removeEventListener('newOrderNotification', handleNewOrder as EventListener);
      window.removeEventListener('orderUpdated', handleOrderUpdate as EventListener);
    };
  }, [restaurantId]);

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
    pendingOrders: restaurantOrders.filter((o) => o.status === 'Pending').length,
    confirmedOrders: restaurantOrders.filter((o) => o.status === 'Confirmed').length,
    inProgressOrders: restaurantOrders.filter((o) => o.status === 'In Progress').length,
    readyOrders: restaurantOrders.filter((o) => o.status === 'Ready').length,
    totalRevenue: restaurantOrders.reduce((sum, order) => sum + (order.total || 0), 0),
  };

  const handleConfirmOrder = async (orderId: string) => {
    try {
      await confirmOrderService(orderId);
      confirmOrder(orderId);
      toast.success(`Đơn hàng ${orderId} đã được xác nhận! ✅`);
    } catch (error) {
      toast.error('Không thể xác nhận đơn hàng');
      console.error(error);
    }
  };

  const handleRejectOrder = async (orderId: string) => {
    const reason = prompt('Vui lòng cung cấp lý do từ chối (tùy chọn):');
    if (reason === null) return; // User cancelled
    
    try {
      await rejectOrderService(orderId, reason || undefined);
      rejectOrder(orderId, reason || undefined);
      toast.success(`Đơn hàng ${orderId} đã bị từ chối`);
    } catch (error) {
      toast.error('Không thể từ chối đơn hàng');
      console.error(error);
    }
  };

  const handleUpdateStatus = async (orderId: string, newStatus: OrderStatus) => {
    try {
      await updateOrderStatusService(orderId, newStatus);
      updateOrderStatus(orderId, newStatus);
      toast.success(`Đơn hàng ${orderId} đã được cập nhật thành ${getStatusLabel(newStatus)}! 🎉`);
    } catch (error) {
      toast.error('Không thể cập nhật trạng thái đơn hàng');
      console.error(error);
    }
  };

  const handleAddNote = async (orderId: string) => {
    const note = noteInputs[orderId]?.trim();
    if (!note) {
      toast.error('Vui lòng nhập ghi chú');
      return;
    }

    try {
      await addOrderNoteService(orderId, note);
      addOrderNote(orderId, note);
      setNoteInputs(prev => ({ ...prev, [orderId]: '' }));
      toast.success('Ghi chú đã được thêm thành công');
    } catch (error) {
      toast.error('Không thể thêm ghi chú');
      console.error(error);
    }
  };

  const toggleOrderExpansion = (orderId: string) => {
    setExpandedOrders(prev => {
      const newSet = new Set(prev);
      if (newSet.has(orderId)) {
        newSet.delete(orderId);
      } else {
        newSet.add(orderId);
      }
      return newSet;
    });
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
          placeholder="🔍 Tìm kiếm theo tên hoặc số điện thoại khách hàng..."
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
          <StatLabel>Chờ xác nhận</StatLabel>
        </StatCard>
        <StatCard $primary={theme.accent}>
          <StatValue>{stats.inProgressOrders}</StatValue>
          <StatLabel>Đang chế biến</StatLabel>
        </StatCard>
        <StatCard $primary={theme.primary}>
          <StatValue>{formatVND(stats.totalRevenue)}</StatValue>
          <StatLabel>Doanh thu</StatLabel>
        </StatCard>
      </StatsGrid>

      {filteredOrders.length === 0 ? (
        <EmptyState>
          <h3>{searchQuery ? 'Không tìm thấy đơn hàng phù hợp' : 'Chưa có đơn nào !'}</h3>
          <p>{searchQuery ? 'Thử tìm kiếm với từ khóa khác' : 'Đơn hàng sẽ xuất hiện ở đây sau khi khách hàng đặt hàng'}</p>
        </EmptyState>
      ) : (
        filteredOrders
          .sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0))
          .map((order) => (
            <OrderCard
              key={order.id}
              $accent={theme.accent}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <OrderHeader>
                <div>
                  <OrderId>Đơn hàng #{order.id}</OrderId>
                  <OrderTime>
                    {order.createdAt ? dayjs(order.createdAt).format('DD/MM/YYYY HH:mm') : 'Không có'}
                    {order.confirmedAt && ` • Xác nhận: ${dayjs(order.confirmedAt).format('HH:mm')}`}
                  </OrderTime>
                </div>
                <StatusBadge $status={order.status.toLowerCase()}>
                  {getStatusLabel(order.status)}
                </StatusBadge>
              </OrderHeader>

              <CustomerInfo>
                <CustomerLabel>Thông tin khách hàng:</CustomerLabel>
                <CustomerValue>
                  {order.name || 'Không có'} - {order.phone || 'Không có'}
                </CustomerValue>
                {order.address && (
                  <CustomerValue style={{ marginTop: '4px', fontSize: '13px', fontWeight: 'normal' }}>
                    📍 {order.address}
                  </CustomerValue>
                )}
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

              {order.internalNotes && (
                <NotesSection>
                  <NotesLabel>📝 Ghi chú nội bộ:</NotesLabel>
                  <NotesContent>{order.internalNotes}</NotesContent>
                </NotesSection>
              )}

              <OrderFooter>
                <OrderTotal $primary={theme.primary}>
                  Tổng: {formatVND(order.total)}
                </OrderTotal>
                
                <ActionButtons>
                  {order.status === 'Pending' && (
                    <>
                      <ActionButton
                        $variant="success"
                        onClick={() => handleConfirmOrder(order.id)}
                      >
                        ✅ Xác nhận
                      </ActionButton>
                      <ActionButton
                        $variant="danger"
                        onClick={() => handleRejectOrder(order.id)}
                      >
                        ❌ Từ chối
                      </ActionButton>
                    </>
                  )}
                  
                  {order.status !== 'Pending' && (
                    <>
                      <StatusSelect
                        value={STATUS_OPTIONS.includes(order.status as OrderStatus) ? order.status : STATUS_OPTIONS[0]}
                        onChange={(e) => handleUpdateStatus(order.id, e.target.value as OrderStatus)}
                      >
                        {STATUS_OPTIONS.map((status) => {
                          const isCurrentStatus = order.status === status;
                          return (
                            <option 
                              key={status} 
                              value={status}
                            >
                              {getStatusLabel(status)}{isCurrentStatus ? ' (Hiện tại)' : ''}
                            </option>
                          );
                        })}
                      </StatusSelect>
                    </>
                  )}

                  <ActionButton
                    $primary={theme.primary}
                    onClick={() => toggleOrderExpansion(order.id)}
                  >
                    {expandedOrders.has(order.id) ? '📝 Ẩn ghi chú' : '📝 Thêm ghi chú'}
                  </ActionButton>
                </ActionButtons>
              </OrderFooter>

              {expandedOrders.has(order.id) && (
                <NotesSection style={{ marginTop: '12px' }}>
                  <NotesLabel>Thêm ghi chú nội bộ:</NotesLabel>
                  <NotesInput
                    value={noteInputs[order.id] || ''}
                    onChange={(e) => setNoteInputs(prev => ({ ...prev, [order.id]: e.target.value }))}
                    placeholder="Nhập ghi chú (ví dụ: Thời gian chuẩn bị, yêu cầu đặc biệt...)"
                  />
                  <ActionButton
                    $primary={theme.primary}
                    onClick={() => handleAddNote(order.id)}
                    style={{ marginTop: '8px' }}
                  >
                    Lưu ghi chú
                  </ActionButton>
                </NotesSection>
              )}
            </OrderCard>
          ))
      )}
    </OrderContainer>
  );
};

export default OrderTracking;

