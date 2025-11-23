/**
 * Order Confirmation Page
 * Displays order details after successful checkout
 */

import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useOrders } from '@/context/OrderContext';
import { formatVND } from '@/utils/currency';
import dayjs from 'dayjs';
import { getRestaurantById } from '@/services/adminService';
import { fetchOrderById, fetchOrders } from '@/services/orderApiService';
import { realtimeSocket } from '@/services/orderSyncService';
import type { Order } from '@/context/OrderContext';
import toast from 'react-hot-toast';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 24px;
`;

const ConfirmationCard = styled(motion.div)`
  background: var(--card);
  border-radius: 16px;
  padding: 32px;
  box-shadow: var(--shadow-md);
  border: 1px solid var(--border);
  margin-bottom: 24px;
`;

const SuccessIcon = styled.div`
  text-align: center;
  font-size: 64px;
  margin-bottom: 16px;
`;

const ThankYouMessage = styled.h2`
  text-align: center;
  color: var(--text);
  font-size: 28px;
  font-weight: 700;
  margin: 0 0 8px 0;
`;

const SubMessage = styled.p`
  text-align: center;
  color: var(--secondaryText);
  font-size: 16px;
  margin: 0 0 32px 0;
`;

const Section = styled.div`
  margin-bottom: 24px;
  padding-bottom: 24px;
  border-bottom: 1px solid var(--border);
  
  &:last-child {
    border-bottom: none;
    margin-bottom: 0;
    padding-bottom: 0;
  }
`;

const SectionTitle = styled.h3`
  margin: 0 0 16px 0;
  color: var(--text);
  font-size: 18px;
  font-weight: 600;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const InfoLabel = styled.span`
  color: var(--secondaryText);
  font-weight: 500;
`;

const InfoValue = styled.span<{ $highlight?: boolean }>`
  color: ${props => props.$highlight ? 'var(--primary)' : 'var(--text)'};
  font-weight: ${props => props.$highlight ? '700' : '400'};
`;

const ItemsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ItemRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  background: var(--background);
  border-radius: 8px;
`;

const ItemInfo = styled.div`
  flex: 1;
`;

const ItemName = styled.div`
  font-weight: 600;
  color: var(--text);
  margin-bottom: 4px;
`;

const ItemDetails = styled.div`
  font-size: 14px;
  color: var(--secondaryText);
`;

const ItemTotal = styled.div`
  font-weight: 600;
  color: var(--text);
`;

const StatusBadge = styled.span<{ $status: string }>`
  display: inline-block;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  
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

const ButtonGroup = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 32px;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Button = styled(motion.button)<{ $variant?: 'primary' | 'secondary' }>`
  flex: 1;
  padding: 16px;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  ${props => {
    if (props.$variant === 'primary') {
      return `
        background: linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%);
        color: white;
        box-shadow: var(--shadow);
        
        &:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
        }
      `;
    } else {
      return `
        background: var(--card);
        color: var(--text);
        border: 2px solid var(--border);
        
        &:hover {
          border-color: var(--primary);
          background: var(--background);
        }
      `;
    }
  }}
`;

const LoadingState = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: var(--secondaryText);
`;

const ErrorState = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: #f44336;
`;

const ConfirmationCodeSection = styled.div`
  background: linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%);
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 32px;
  text-align: center;
  box-shadow: var(--shadow-md);
`;

const ConfirmationCodeLabel = styled.div`
  color: rgba(255, 255, 255, 0.9);
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const ConfirmationCodeValue = styled.div`
  color: white;
  font-size: 32px;
  font-weight: 700;
  letter-spacing: 4px;
  font-family: 'Courier New', monospace;
`;

const OrderConfirmation: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { orders, getOrdersByPaymentSession, refreshOrders } = useOrders();
  const [order, setOrder] = useState<Order | null>(null);
  const [allSessionOrders, setAllSessionOrders] = useState<Order[]>([]);
  const [restaurantNames, setRestaurantNames] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  const orderId = searchParams.get('orderId');
  const paymentSessionId = searchParams.get('paymentSessionId');
  const confirmationCodeFromUrl = searchParams.get('confirmationCode');
  
  // Store confirmation code in state to avoid regenerating on re-renders
  const [confirmationCode, setConfirmationCode] = useState<string>('');

  // [Fix Order Creation] Refresh orders when component mounts or orderId changes
  useEffect(() => {
    if (orderId) {
      refreshOrders().catch(error => {
        console.error('Error refreshing orders:', error);
      });
    }
  }, [orderId, refreshOrders]);

  // Set confirmation code from URL or generate fallback
  useEffect(() => {
    if (confirmationCodeFromUrl) {
      setConfirmationCode(confirmationCodeFromUrl);
    } else {
      // Generate fallback code if not provided (only once)
      const generateConfirmationCode = () => {
        const randomNum = Math.floor(1000 + Math.random() * 9000);
        return `FD-${randomNum}`;
      };
      setConfirmationCode(generateConfirmationCode());
    }
  }, [confirmationCodeFromUrl]);

  // [Fix Order Creation] Update order display when orders change
  useEffect(() => {
    const loadOrders = async () => {
      if (!orderId) {
        setLoading(false);
        return;
      }

      try {
        // Step 1: Try to find order in context first
        let foundOrder = orders.find(o => o.id === orderId);
        let sessionOrders: Order[] = [];
        let usedApiFallback = false;
        
        // Step 2: If not found in context, fetch from API
        if (!foundOrder) {
          console.log(`[OrderConfirmation] Order ${orderId} not found in context, fetching from API...`);
          try {
            const apiOrder = await fetchOrderById(orderId);
            if (apiOrder) {
              foundOrder = apiOrder;
              usedApiFallback = true;
              console.log(`[OrderConfirmation] Successfully fetched order ${orderId} from API`);
            }
          } catch (error) {
            console.error(`[OrderConfirmation] Failed to fetch order ${orderId} from API:`, error);
          }
        }
        
        // Step 3: If still no order found, show error
        if (!foundOrder) {
          console.error(`[OrderConfirmation] Order ${orderId} not found in context or API`);
          setLoading(false);
          return;
        }
        
        // Step 4: Get session orders - try context first, then API fallback
        const sessionIdToUse = paymentSessionId || foundOrder.paymentSessionId;
        
        if (sessionIdToUse) {
          // Try context first
          sessionOrders = getOrdersByPaymentSession(sessionIdToUse);
          
          // If we used API fallback for the main order, or context doesn't have session orders, fetch from API
          // Also check if context orders array is empty or very small (might be incomplete)
          const contextHasIncompleteData = orders.length === 0 || (usedApiFallback && sessionOrders.length === 0);
          
          if (usedApiFallback || contextHasIncompleteData || sessionOrders.length === 0) {
            console.log(`[OrderConfirmation] Fetching all orders from API to find session orders for ${sessionIdToUse}...`);
            try {
              const allApiOrders = await fetchOrders();
              // Filter orders by paymentSessionId
              const apiSessionOrders = allApiOrders.filter((o: Order) => o.paymentSessionId === sessionIdToUse);
              
              // Sort orders deterministically: by createdAt, then by id
              apiSessionOrders.sort((a, b) => {
                const aTime = a.createdAt ?? 0;
                const bTime = b.createdAt ?? 0;
                if (aTime === bTime) return a.id.localeCompare(b.id);
                return aTime - bTime;
              });
              
              // Use API results if we found orders, otherwise keep context results
              if (apiSessionOrders.length > 0) {
                sessionOrders = apiSessionOrders;
                console.log(`[OrderConfirmation] Found ${sessionOrders.length} order(s) in session ${sessionIdToUse} from API`);
              } else if (sessionOrders.length === 0) {
                // No orders found in API either, use the single found order
                sessionOrders = [foundOrder];
                console.log(`[OrderConfirmation] No session orders found, using single order`);
              }
            } catch (error) {
              console.error(`[OrderConfirmation] Failed to fetch session orders from API:`, error);
              // Fallback: use context results or single found order
              if (sessionOrders.length === 0) {
                sessionOrders = [foundOrder];
              }
            }
          }
        } else {
          // No paymentSessionId available, just use the single order
          sessionOrders = [foundOrder];
        }
        
        // Step 5: Update confirmation code from order if available and not already set from URL
        if (!confirmationCodeFromUrl && foundOrder.paymentSessionId && !confirmationCode) {
          setConfirmationCode(foundOrder.paymentSessionId);
        }

        setOrder(foundOrder);

        // Step 6: Set session orders and fetch restaurant names
        if (sessionOrders.length > 1) {
          setAllSessionOrders(sessionOrders);
          // Get restaurant names for all orders
          const restaurantIds = [...new Set(sessionOrders.map(o => o.restaurantId).filter(Boolean) as string[])];
          const names: Record<string, string> = {};
          for (const id of restaurantIds) {
            try {
              const restaurant = await getRestaurantById(id);
              if (restaurant) {
                names[id] = restaurant.name;
              }
            } catch (error) {
              console.error(`Error fetching restaurant ${id}:`, error);
            }
          }
          setRestaurantNames(names);
        } else {
          setAllSessionOrders([foundOrder]);
          // Get restaurant name for single order
          if (foundOrder.restaurantId) {
            try {
              const restaurant = await getRestaurantById(foundOrder.restaurantId);
              if (restaurant) {
                setRestaurantNames({ [foundOrder.restaurantId]: restaurant.name });
              }
            } catch (error) {
              console.error('Error fetching restaurant:', error);
            }
          }
        }

        setLoading(false);
      } catch (error) {
        console.error('Error loading order:', error);
        setLoading(false);
      }
    };

    loadOrders();
  }, [orderId, paymentSessionId, orders, getOrdersByPaymentSession, confirmationCodeFromUrl, confirmationCode]);

  useEffect(() => {
    if (!orderId) return;

    const unsub = realtimeSocket.onOrderUpdate((order) => {
      if (order.id === orderId) {
        setOrder(order);
      }
    });

    return unsub;
  }, [orderId]);

  const getStatusText = (status: string): string => {
    const statusMap: Record<string, string> = {
      'Pending': 'Đang chờ phê duyệt',
      'Confirmed': 'Đã xác nhận',
      'In Progress': 'Đang xử lý',
      'Ready': 'Sẵn sàng',
      'Delivered': 'Đã giao hàng',
      'Cancelled': 'Đã hủy'
    };
    return statusMap[status] || status;
  };

  const getPaymentMethodText = (method?: string): string => {
    const methodMap: Record<string, string> = {
      'cod': 'Thanh toán khi nhận hàng',
      'vnpay': 'VNPay',
      'visa': 'Visa',
      'momo': 'MoMo',
      'zalopay': 'ZaloPay'
    };
    return methodMap[method || 'cod'] || method || 'Thanh toán khi nhận hàng';
  };

  if (loading) {
    return (
      <Container>
        <LoadingState>Đang tải thông tin đơn hàng...</LoadingState>
      </Container>
    );
  }

  if (!order) {
    return (
      <Container>
        <ErrorState>
          <p>Không tìm thấy đơn hàng.</p>
          <Button
            $variant="primary"
            onClick={() => navigate('/menu')}
            style={{ marginTop: '16px' }}
          >
            Về Trang Chủ
          </Button>
        </ErrorState>
      </Container>
    );
  }

  // Calculate total for all orders in session
  const totalForAllOrders = allSessionOrders.reduce((sum, o) => sum + (o.total || 0), 0);

  return (
    <Container>
      <ConfirmationCard
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <SuccessIcon>✅</SuccessIcon>
        <ThankYouMessage>Đặt hàng thành công!</ThankYouMessage>
        <SubMessage>
          {allSessionOrders.length > 1 
            ? `Bạn đã đặt ${allSessionOrders.length} đơn hàng từ ${allSessionOrders.length} nhà hàng khác nhau.`
            : 'Cảm ơn bạn đã đặt hàng tại FoodFast!'}
        </SubMessage>

        {confirmationCode && (
          <ConfirmationCodeSection>
            <ConfirmationCodeLabel>Mã xác nhận thanh toán</ConfirmationCodeLabel>
            <ConfirmationCodeValue>{confirmationCode}</ConfirmationCodeValue>
          </ConfirmationCodeSection>
        )}

        {allSessionOrders.length > 1 && (
          <Section>
            <SectionTitle>Tổng quan đơn hàng</SectionTitle>
            <InfoRow>
              <InfoLabel>Số lượng đơn hàng:</InfoLabel>
              <InfoValue $highlight>{allSessionOrders.length} đơn</InfoValue>
            </InfoRow>
            <InfoRow>
              <InfoLabel>Tổng thanh toán:</InfoLabel>
              <InfoValue $highlight>{formatVND(totalForAllOrders)}</InfoValue>
            </InfoRow>
          </Section>
        )}

        {allSessionOrders.map((sessionOrder, index) => (
          <Section key={sessionOrder.id}>
            <SectionTitle>
              {allSessionOrders.length > 1 ? `Đơn hàng ${index + 1}` : 'Thông tin đơn hàng'}
            </SectionTitle>
            <InfoRow>
              <InfoLabel>Mã đơn hàng:</InfoLabel>
              <InfoValue $highlight>#{sessionOrder.id}</InfoValue>
            </InfoRow>
            <InfoRow>
              <InfoLabel>Nhà hàng:</InfoLabel>
              <InfoValue>
                {sessionOrder.restaurantId 
                  ? (restaurantNames[sessionOrder.restaurantId] || sessionOrder.restaurantId)
                  : 'N/A'}
              </InfoValue>
            </InfoRow>
            <InfoRow>
              <InfoLabel>Trạng thái:</InfoLabel>
              <StatusBadge $status={sessionOrder.status}>
                {getStatusText(sessionOrder.status)}
              </StatusBadge>
            </InfoRow>
            <InfoRow>
              <InfoLabel>Thời gian đặt hàng:</InfoLabel>
              <InfoValue>
                {sessionOrder.createdAt 
                  ? dayjs(sessionOrder.createdAt).format('DD/MM/YYYY HH:mm')
                  : 'N/A'}
              </InfoValue>
            </InfoRow>

            <div style={{ marginTop: '16px' }}>
              <SectionTitle style={{ fontSize: '16px', marginBottom: '12px' }}>Sản phẩm</SectionTitle>
              <ItemsList>
                {(sessionOrder.items || []).map((item, itemIndex) => (
                  <ItemRow key={itemIndex}>
                    <ItemInfo>
                      <ItemName>{item.name || 'N/A'}</ItemName>
                      <ItemDetails>
                        Số lượng: {item.qty || 0} × {formatVND(item.price || 0)}
                      </ItemDetails>
                    </ItemInfo>
                    <ItemTotal>{formatVND((item.price || 0) * (item.qty || 0))}</ItemTotal>
                  </ItemRow>
                ))}
                {(!sessionOrder.items || sessionOrder.items.length === 0) && (
                  <div style={{ padding: '12px', textAlign: 'center', color: 'var(--secondaryText)' }}>
                    Không có sản phẩm
                  </div>
                )}
              </ItemsList>
              <InfoRow style={{ marginTop: '12px', paddingTop: '12px', borderTop: '1px solid var(--border)' }}>
                <InfoLabel>Tổng đơn hàng:</InfoLabel>
                <InfoValue $highlight>{(() => {
                  const displayTotal = sessionOrder.total ?? 0;
                  return formatVND(displayTotal);
                })()}</InfoValue>
              </InfoRow>
            </div>
          </Section>
        ))}

        <Section>
          <SectionTitle>Thông tin khách hàng</SectionTitle>
          <InfoRow>
            <InfoLabel>Tên:</InfoLabel>
            <InfoValue>{order.name}</InfoValue>
          </InfoRow>
          <InfoRow>
            <InfoLabel>Số điện thoại:</InfoLabel>
            <InfoValue>{order.phone}</InfoValue>
          </InfoRow>
          <InfoRow>
            <InfoLabel>Địa chỉ giao hàng:</InfoLabel>
            <InfoValue>{order.address}</InfoValue>
          </InfoRow>
        </Section>

        <Section>
          <SectionTitle>Thanh toán</SectionTitle>
          <InfoRow>
            <InfoLabel>Phương thức thanh toán:</InfoLabel>
            <InfoValue>{getPaymentMethodText(order.paymentMethod)}</InfoValue>
          </InfoRow>
          <InfoRow>
            <InfoLabel>Trạng thái thanh toán:</InfoLabel>
            <InfoValue>
              {order.paymentStatus === 'completed' ? 'Đã thanh toán' : 
               order.paymentStatus === 'Đang chờ phê duyệt' ? 'Đang chờ phê duyệt' :
               'Chưa thanh toán'}
            </InfoValue>
          </InfoRow>
          {allSessionOrders.length > 1 && (
            <InfoRow>
              <InfoLabel>Tổng thanh toán (tất cả đơn):</InfoLabel>
              <InfoValue $highlight>{formatVND(totalForAllOrders)}</InfoValue>
            </InfoRow>
          )}
        </Section>

        <ButtonGroup>
          <Button
            $variant="secondary"
            onClick={() => navigate('/menu')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Về Trang Chủ
          </Button>
          <Button
            $variant="primary"
            onClick={() => navigate('/order-history')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Xem Lịch Sử Đơn Hàng
          </Button>
        </ButtonGroup>
      </ConfirmationCard>
    </Container>
  );
};

export default OrderConfirmation;

