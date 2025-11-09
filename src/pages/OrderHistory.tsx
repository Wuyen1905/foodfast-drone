/**
 * Order History Page
 * Displays all orders for the logged-in customer
 */

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useOrders } from '@/context/OrderContext';
import { useAuth } from '@/context';
import { formatVND } from '@/utils/currency';
import dayjs from 'dayjs';
import { getRestaurantById } from '@/services/adminService';
import type { Order } from '@/context/OrderContext';
import DroneJourney from '@/components/DroneJourney';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
`;

const PageTitle = styled.h1`
  margin: 0 0 32px 0;
  color: var(--text);
  font-size: 32px;
  font-weight: 700;
`;

const OrdersList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const OrderCard = styled(motion.div)`
  background: var(--card);
  border-radius: 12px;
  padding: 24px;
  box-shadow: var(--shadow);
  border: 1px solid var(--border);
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    box-shadow: var(--shadow-md);
    transform: translateY(-2px);
    border-color: var(--primary);
  }
`;

const OrderHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
  flex-wrap: wrap;
  gap: 12px;
`;

const OrderInfo = styled.div`
  flex: 1;
`;

const OrderId = styled.div`
  font-size: 18px;
  font-weight: 700;
  color: var(--text);
  margin-bottom: 8px;
`;

const OrderDate = styled.div`
  font-size: 14px;
  color: var(--secondaryText);
  margin-bottom: 4px;
`;

const RestaurantName = styled.div`
  font-size: 14px;
  color: var(--secondaryText);
`;

const OrderStatus = styled.span<{ $status: string }>`
  display: inline-block;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  white-space: nowrap;
  
  ${props => {
    switch (props.$status.toLowerCase()) {
      case 'pending':
      case 'đang chờ phê duyệt':
        return 'background: #ff9800; color: white;';
      case 'confirmed':
      case 'đã xác nhận':
        return 'background: #2196f3; color: white;';
      case 'in progress':
      case 'đang xử lý':
        return 'background: #2196f3; color: white;';
      case 'delivered':
      case 'đã giao hàng':
        return 'background: #4caf50; color: white;';
      case 'cancelled':
        return 'background: #f44336; color: white;';
      default:
        return 'background: #9e9e9e; color: white;';
    }
  }}
`;

const OrderDetails = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-bottom: 16px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const DetailItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const DetailLabel = styled.span`
  font-size: 12px;
  color: var(--secondaryText);
  font-weight: 500;
`;

const DetailValue = styled.span`
  font-size: 14px;
  color: var(--text);
  font-weight: 600;
`;

const ItemsSummary = styled.div`
  font-size: 14px;
  color: var(--secondaryText);
  margin-bottom: 12px;
`;

const TotalAmount = styled.div`
  font-size: 20px;
  font-weight: 700;
  color: var(--primary);
  text-align: right;
  
  @media (max-width: 768px) {
    text-align: left;
    margin-top: 12px;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
  background: var(--card);
  border-radius: 12px;
  border: 1px solid var(--border);
`;

const EmptyIcon = styled.div`
  font-size: 64px;
  margin-bottom: 16px;
`;

const EmptyTitle = styled.h3`
  margin: 0 0 8px 0;
  color: var(--text);
  font-size: 24px;
`;

const EmptyText = styled.p`
  margin: 0 0 24px 0;
  color: var(--secondaryText);
`;

const EmptyButton = styled(motion.button)`
  padding: 12px 24px;
  background: linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
  }
`;

const LoadingState = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: var(--secondaryText);
`;

interface OrderWithRestaurant extends Order {
  restaurantName?: string;
}

const OrderHistory: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { orders, getOrdersByUserId } = useOrders();
  const [userOrders, setUserOrders] = useState<OrderWithRestaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [visibleDroneOrder, setVisibleDroneOrder] = useState<string | null>(null);

  const toggleDroneJourney = (orderId: string) => {
    setVisibleDroneOrder(prev => (prev === orderId ? null : orderId));
  };

  useEffect(() => {
    const loadOrders = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        // Get orders for the logged-in user
        const orders = getOrdersByUserId(user.id);
        
        // Fetch restaurant names for each order
        const ordersWithRestaurants = await Promise.all(
          orders.map(async (order) => {
            let restaurantName = '';
            if (order.restaurantId) {
              try {
                const restaurant = await getRestaurantById(order.restaurantId);
                if (restaurant) {
                  restaurantName = restaurant.name;
                }
              } catch (error) {
                console.error('Error fetching restaurant:', error);
              }
            }
            return { ...order, restaurantName };
          })
        );

        // Sort by date (newest first)
        ordersWithRestaurants.sort((a, b) => {
          const dateA = a.createdAt || 0;
          const dateB = b.createdAt || 0;
          return dateB - dateA;
        });

        setUserOrders(ordersWithRestaurants);
        setLoading(false);
      } catch (error) {
        console.error('Error loading orders:', error);
        setLoading(false);
      }
    };

    loadOrders();
  }, [user, orders, getOrdersByUserId]);

  // Auto-hide drone journey when order status changes to completed or cancelled
  useEffect(() => {
    const completedOrCancelledOrders = userOrders
      .filter(order => {
        const rawStatus = order?.status?.trim()?.toLowerCase();
        const isCompleted = rawStatus === "completed" || rawStatus === "delivered" || rawStatus === "đã giao";
        const isCancelled = rawStatus === "cancelled" || rawStatus === "đã hủy";
        return isCompleted || isCancelled;
      })
      .map(order => order.id);

    if (visibleDroneOrder && completedOrCancelledOrders.includes(visibleDroneOrder)) {
      setVisibleDroneOrder(null);
    }
  }, [userOrders, visibleDroneOrder]);

  const getStatusText = (status: string): string => {
    const statusMap: Record<string, string> = {
      'Pending': 'Đang chờ phê duyệt',
      'Confirmed': 'Đã xác nhận',
      'In Progress': 'Đang xử lý',
      'Ready': 'Sẵn sàng',
      'Delivering': 'Đang giao hàng',
      'Đang giao': 'Đang giao hàng',
      'Delivered': 'Đã giao hàng',
      'Completed': 'Đã giao hàng',
      'Cancelled': 'Đã hủy'
    };
    return statusMap[status] || status;
  };

  const handleOrderClick = (orderId: string) => {
    navigate(`/order-confirmation?orderId=${orderId}`);
  };

  if (!user) {
    return (
      <Container>
        <EmptyState>
          <EmptyIcon>🔒</EmptyIcon>
          <EmptyTitle>Vui lòng đăng nhập</EmptyTitle>
          <EmptyText>Bạn cần đăng nhập để xem lịch sử đơn hàng.</EmptyText>
          <EmptyButton
            onClick={() => navigate('/login')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Đăng nhập
          </EmptyButton>
        </EmptyState>
      </Container>
    );
  }

  if (loading) {
    return (
      <Container>
        <LoadingState>Đang tải lịch sử đơn hàng...</LoadingState>
      </Container>
    );
  }

  if (userOrders.length === 0) {
    return (
      <Container>
        <PageTitle>Lịch sử đơn hàng</PageTitle>
        <EmptyState>
          <EmptyIcon>📦</EmptyIcon>
          <EmptyTitle>Chưa có đơn hàng nào</EmptyTitle>
          <EmptyText>Bạn chưa có đơn hàng nào. Hãy đặt hàng ngay!</EmptyText>
          <EmptyButton
            onClick={() => navigate('/menu')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Đặt hàng ngay
          </EmptyButton>
        </EmptyState>
      </Container>
    );
  }

  return (
    <Container>
      <PageTitle>Lịch sử đơn hàng</PageTitle>
      <OrdersList>
        {userOrders.map((order, index) => (
          <OrderCard
            key={order.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => handleOrderClick(order.id)}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            <OrderHeader>
              <OrderInfo>
                <OrderId>Đơn hàng #{order.id}</OrderId>
                <OrderDate>
                  {order.createdAt 
                    ? dayjs(order.createdAt).format('DD/MM/YYYY HH:mm')
                    : 'N/A'}
                </OrderDate>
                {order.restaurantName && (
                  <RestaurantName>{order.restaurantName}</RestaurantName>
                )}
              </OrderInfo>
              <OrderStatus $status={order.status}>
                {getStatusText(order.status)}
              </OrderStatus>
            </OrderHeader>

            <OrderDetails>
              <DetailItem>
                <DetailLabel>Số lượng món</DetailLabel>
                <DetailValue>{order.items.length} món</DetailValue>
              </DetailItem>
              <DetailItem>
                <DetailLabel>Địa chỉ giao hàng</DetailLabel>
                <DetailValue>{order.address}</DetailValue>
              </DetailItem>
              <DetailItem>
                <DetailLabel>Phương thức thanh toán</DetailLabel>
                <DetailValue>
                  {order.paymentMethod === 'cod' ? 'Thanh toán khi nhận hàng' :
                   order.paymentMethod === 'vnpay' ? 'VNPay' :
                   order.paymentMethod || 'N/A'}
                </DetailValue>
              </DetailItem>
            </OrderDetails>

            <ItemsSummary>
              {order.items.slice(0, 3).map((item, idx) => (
                <span key={idx}>
                  {item.name} (×{item.qty})
                  {idx < Math.min(order.items.length - 1, 2) && ', '}
                </span>
              ))}
              {order.items.length > 3 && ` và ${order.items.length - 3} món khác`}
            </ItemsSummary>

            <TotalAmount>
              Tổng tiền: {formatVND(order.total)}
            </TotalAmount>

            {/* Toggle Drone Journey Button for Delivering Orders */}
            {(() => {
              const rawStatus = order?.status?.trim()?.toLowerCase();
              const isDelivering = rawStatus === "delivering" || rawStatus === "đang giao";
              const isCompleted = rawStatus === "completed" || rawStatus === "delivered" || rawStatus === "đã giao";
              const isCancelled = rawStatus === "cancelled" || rawStatus === "đã hủy";
              
              // Only show button for delivering orders (not completed or cancelled)
              if (!isDelivering || isCompleted || isCancelled) return null;

              return (
                <div style={{ marginTop: "12px", paddingTop: "12px", borderTop: "1px solid var(--border)" }}>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleDroneJourney(order.id);
                    }}
                    style={{
                      padding: "10px 16px",
                      borderRadius: "8px",
                      border: "none",
                      background: "linear-gradient(135deg, #2196f3 0%, #64b5f6 100%)",
                      color: "#fff",
                      cursor: "pointer",
                      fontWeight: 600,
                      transition: "0.2s ease-in-out",
                      width: "100%",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-2px)";
                      e.currentTarget.style.boxShadow = "0 4px 8px rgba(0,0,0,0.2)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    {visibleDroneOrder === order.id ? "Ẩn hành trình" : "Xem hành trình 🚁"}
                  </button>

                  {/* Render Drone Journey when toggled */}
                  {visibleDroneOrder === order.id && (
                    <div style={{ marginTop: "16px" }}>
                      <DroneJourney 
                        orderId={order.id} 
                        isActive={true}
                        onComplete={() => {
                          setVisibleDroneOrder(prev => prev === order.id ? null : prev);
                        }}
                      />
                    </div>
                  )}
                </div>
              );
            })()}
          </OrderCard>
        ))}
      </OrdersList>
    </Container>
  );
};

export default OrderHistory;

