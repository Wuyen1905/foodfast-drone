import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { motion, useAnimation } from 'framer-motion';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '@/context';
import { useOrders } from '@/context/OrderContext';
import { formatVND } from '@/utils/currency';
import { connectOrderSocket, disconnectOrderSocket } from '@/services/orderSyncService';

const Page = styled.div`
  padding: var(--spacing-xl) var(--spacing-lg);
  max-width: 900px;
  margin: 0 auto;
`;

const Title = styled.h2`
  margin-top: 0;
`;

const BarBg = styled.div`
  height: 14px;
  background: var(--border);
  border-radius: 999px;
  overflow: hidden;
  margin: 12px 0;
`;

const BarFill = styled(motion.div)`
  height: 100%;
  background: var(--primary);
`;

const Map = styled.div`
  margin-top: 12px;
  height: 320px;
  background: linear-gradient(135deg, #87CEEB 0%, #98FB98 50%, #F0E68C 100%);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  display: grid; 
  place-items: center;
  position: relative;
  overflow: hidden;
  border: 2px solid var(--border);
`;

const DroneIcon = styled(motion.div)`
  font-size: 32px;
  position: absolute;
  filter: drop-shadow(0 4px 8px rgba(0,0,0,0.3));
  z-index: 10;
`;

const FlightPath = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
`;

const PathLine = styled(motion.div)`
  position: absolute;
  height: 3px;
  background: linear-gradient(90deg, var(--primary) 0%, transparent 100%);
  border-radius: 2px;
  opacity: 0.7;
`;

const PulseEffect = styled(motion.div)`
  position: absolute;
  width: 20px;
  height: 20px;
  background: var(--primary);
  border-radius: 50%;
  opacity: 0.6;
`;

const RestaurantMarker = styled(motion.div)`
  position: absolute;
  top: 20px;
  left: 20px;
  width: 30px;
  height: 30px;
  background: var(--primary);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 16px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.3);
  border: 3px solid white;
`;

const DestinationMarker = styled(motion.div)`
  position: absolute;
  bottom: 20px;
  right: 20px;
  width: 30px;
  height: 30px;
  background: #4CAF50;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 16px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.3);
  border: 3px solid white;
`;

const Muted = styled.span`
  color: var(--secondaryText);
`;

const Button = styled.button`
  margin-top: 12px;
  padding: 10px 16px;
  border-radius: var(--radius);
  border: none;
  background: var(--primary);
  color: #fff;
  cursor: pointer;
  transition: transform 0.2s ease;
  
  &:hover {
    transform: translateY(-1px);
  }
`;

const CountdownDisplay = styled.div`
  font-size: 24px;
  font-weight: 800;
  color: var(--primary);
  margin: 16px 0;
`;

const PhoneForm = styled.div`
  background: var(--card);
  padding: 24px;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow);
  margin-bottom: 24px;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 16px;
  border-radius: var(--radius-md);
  border: 1px solid var(--border);
  background: var(--card);
  color: var(--text);
  font-size: 16px;
  margin-bottom: 16px;
  
  &:focus {
    border-color: var(--primary);
    outline: none;
  }
`;

const OrderList = styled.div`
  margin-top: 24px;
`;

const OrderItem = styled.div`
  background: var(--card);
  padding: 16px;
  border-radius: var(--radius-md);
  box-shadow: var(--shadow);
  margin-bottom: 12px;
  border: 1px solid var(--border);
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 40px 20px;
  color: var(--secondaryText);
  background: var(--card);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow);
`;

const Drone: React.FC = () => {
  const { user } = useAuth();
  const { getOrdersByPhone } = useOrders();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const [phone, setPhone] = useState('');
  const [orders, setOrders] = useState<any[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [eta, setEta] = useState<number>(15);
  const [progress, setProgress] = useState<number>(0);
  const [isFlying, setIsFlying] = useState(false);
  const [delivered, setDelivered] = useState(false);
  const controls = useAnimation();
  const droneControls = useAnimation();
  const hasAutoStartedRef = useRef(false);
  
  // Normalize order status for consistent comparison
  // Treats "Delivering" (case-insensitive) and "Đang giao" as the same logical state
  const normalizeStatus = (status?: string) => {
    if (!status) return '';
    const raw = status.trim().toLowerCase();
    if (raw === 'delivering') return 'Đang giao';
    return status;
  };

  // ETA countdown effect
  useEffect(() => {
    if (eta > 0 && isFlying) {
      const timer = setTimeout(() => {
        setEta(prev => Math.max(0, prev - 1));
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [eta, isFlying]);

  // Real-time WebSocket synchronization for order updates
  useEffect(() => {
    const handleOrderUpdate = async (orderUpdate: any) => {
      console.log('[Drone] 📦 WebSocket order update received:', orderUpdate.id, orderUpdate.status);
      
      try {
        // Map API order format to OrderContext format
        const { mapApiOrderToOrder } = await import('@/services/orderApiService');
        const mappedOrder = mapApiOrderToOrder(orderUpdate);
        
        // Update orders list with mapped order
        setOrders((prevOrders) => {
          const exists = prevOrders.find((o) => o.id === mappedOrder.id);
          const existingOrder = exists ? prevOrders.find((o) => o.id === mappedOrder.id) : null;
          const updatedOrders = exists
            ? prevOrders.map((o) => (o.id === mappedOrder.id ? mappedOrder : o))
            : [...prevOrders, mappedOrder];
          
          // Normalize status for comparison
          const normalizedStatus = mappedOrder.status?.toLowerCase() || '';
          const existingStatus = existingOrder?.status?.toLowerCase() || '';
          
          // If status changed to "Delivering", start drone animation
          if ((normalizedStatus === "delivering" || normalizedStatus === "đang giao") &&
              existingStatus !== "delivering" && existingStatus !== "đang giao") {
            console.log('[Drone] 🛸 Starting drone animation for order:', mappedOrder.id);
            if (!selectedOrder || selectedOrder.id !== mappedOrder.id) {
              setSelectedOrder(mappedOrder);
              startDelivery(mappedOrder);
            }
          }
          
          // If status changed to "Delivered" or "Completed", stop drone animation immediately
          if ((normalizedStatus === "delivered" || normalizedStatus === "completed" || normalizedStatus === "đã giao") &&
              existingStatus !== "delivered" && existingStatus !== "completed" && existingStatus !== "đã giao") {
            if (selectedOrder && selectedOrder.id === mappedOrder.id) {
              console.log('[Drone] 🎉 Order delivered, stopping drone animation immediately:', mappedOrder.id);
              setIsFlying(false);
              setDelivered(true);
              setProgress(100);
              setEta(0);
              
              // Show delivery confirmation
              toast.success('🎉 Đơn hàng đã được giao thành công!', {
                duration: 5000,
                icon: '✅'
              });
            }
          }
          
          return updatedOrders;
        });
      } catch (error) {
        console.error('[Drone] Error mapping order update:', error);
        // Fallback: update with raw order update
        setOrders((prevOrders) => {
          const exists = prevOrders.find((o) => o.id === orderUpdate.id);
          return exists
            ? prevOrders.map((o) => (o.id === orderUpdate.id ? orderUpdate : o))
            : [...prevOrders, orderUpdate];
        });
      }
    };
    
    connectOrderSocket(handleOrderUpdate);
    return () => disconnectOrderSocket();
  }, [selectedOrder]);

  useEffect(() => {
    // If user is logged in, use their phone
    if (user?.phone) {
      setPhone(user.phone);
      const userOrders = getOrdersByPhone(user.phone);
      setOrders(userOrders);
      
      // [DEBUG: Order Status Verification]
      console.group("📦 DEBUG: Drone.tsx Order Status Check");
      console.table(userOrders.map(o => ({
        id: o.id,
        status: o.status,
        normalized: o?.status?.trim()?.toLowerCase()
      })));
      console.groupEnd();
    }
    
    // Check for orderId from Orders page (takes priority)
    const orderId = searchParams.get('orderId');
    if (orderId && Array.isArray(orders) && orders.length > 0) {
      const order = orders.find(o => o.id === orderId);
      if (order) {
        setSelectedOrder(order);
        startDelivery(order);
        hasAutoStartedRef.current = true;
        return;
      }
    }
    
    // [Auto Start Drone for Delivering Orders - Safe Patch]
    if (!selectedOrder && Array.isArray(orders) && orders.length > 0) {
      const autoOrder = orders.find(o => {
        const raw = o?.status?.trim()?.toLowerCase();
        return raw === "delivering" || raw === "đang giao";
      });
      if (autoOrder) {
        console.log("🛸 Auto-triggering drone animation for order:", autoOrder.id);
        setSelectedOrder(autoOrder);
        startDelivery(autoOrder);
        hasAutoStartedRef.current = true;
      }
    }
  }, [user, getOrdersByPhone, searchParams, orders, selectedOrder]);

  const handlePhoneSubmit = () => {
    if (!phone) {
      toast.error('⚠ Vui lòng nhập số điện thoại');
      return;
    }
    
    if (!/^(0|\+84)[0-9]{9,10}$/.test(phone)) {
      toast.error('⚠ Số điện thoại không hợp lệ');
      return;
    }
    
    const foundOrders = getOrdersByPhone(phone);
    setOrders(foundOrders);
    
    // [DEBUG: Order Status Verification - Phone Search]
    console.group("📦 DEBUG: Drone.tsx Order Status Check (Phone Search)");
    console.table(foundOrders.map(o => ({
      id: o.id,
      status: o.status,
      normalized: o?.status?.trim()?.toLowerCase()
    })));
    console.groupEnd();
    
    // Reset auto-start flag when searching with new phone number
    hasAutoStartedRef.current = false;
    setSelectedOrder(null);
    
    if (foundOrders.length === 0) {
      toast("📱 Bạn chưa đặt đơn hàng nào!", { icon: "📱" });
    }
  };

  const startDelivery = (order: any) => {
    setSelectedOrder(order);
    setIsFlying(true);
    
    // Enhanced drone animation with smoother path
    droneControls.start({
      x: [0, 150, 300, 450, 600],
      y: [0, -30, -60, -30, 0],
      rotate: [0, 15, 30, 15, 0],
      scale: [1, 1.1, 1, 1.1, 1],
      opacity: [1, 1, 1, 1, 0],
      transition: { 
        duration: 12, 
        ease: "easeInOut",
        times: [0, 0.25, 0.5, 0.75, 1]
      }
    });
    
    // Start countdown
    const start = Date.now();
    const totalMs = eta * 60 * 1000;
    
    controls.start({ 
      width: '100%', 
      transition: { duration: totalMs / 1000, ease: 'linear' } 
    });
    
    const id = setInterval(() => {
      const elapsed = Date.now() - start;
      const remaining = Math.max(0, totalMs - elapsed);
      setProgress(1 - remaining / totalMs);
      setEta(Math.ceil(remaining / 60000));
      
      if (remaining <= 0) {
        clearInterval(id);
        setDelivered(true);
        toast.success('🎉 Đơn hàng đã được giao!');
      }
    }, 1000);
  };

  const resetDelivery = () => {
    navigate('/orders');
  };

  return (
    <Page>
      <Title>Theo dõi giao hàng bằng drone 🚁</Title>
      
      {!phone && (
        <PhoneForm>
          <h3>Nhập số điện thoại của bạn để xem trạng thái giao hàng</h3>
          <Input
            type="tel"
            placeholder="Nhập số điện thoại (VD: 0909123456)"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handlePhoneSubmit()}
          />
          <Button onClick={handlePhoneSubmit}>Xem đơn hàng</Button>
        </PhoneForm>
      )}
      
      {phone && !orders.length && (
        <EmptyState>
          <h3>Bạn chưa đặt đơn hàng nào!</h3>
          <p>Hãy đặt món ăn để trải nghiệm dịch vụ giao hàng bằng drone.</p>
          <Button onClick={() => navigate('/menu')}>Đặt món ngay</Button>
        </EmptyState>
      )}
      
      {phone && orders.length > 0 && !selectedOrder && (
        <OrderList>
          <h3>Danh sách đơn hàng của số {phone}</h3>
          {orders.map((order) => (
            <OrderItem key={order.id}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontWeight: 700 }}>Đơn hàng #{order.id.slice(-6)}</div>
                  <div style={{ color: 'var(--secondaryText)' }}>
                    {new Date(order.time).toLocaleDateString('vi-VN')} - {formatVND(order.total)}
                  </div>
                  <div style={{ color: 'var(--secondaryText)' }}>
                    Trạng thái: <strong>{order.status}</strong>
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-end' }}>
                  <Button onClick={() => startDelivery(order)}>
                    Xem chi tiết
                  </Button>
                  {(() => {
                    const rawStatus = order?.status?.trim()?.toLowerCase();
                    if (rawStatus === "delivering" || rawStatus === "đang giao") {
                      return (
                        <Button
                          onClick={() => {
                            console.log("🚁 Starting drone journey demo for order:", order.id);
                            setSelectedOrder(order);
                            startDelivery(order);
                          }}
                        >
                          Xem hành trình 🚁
                        </Button>
                      );
                    }
                    return null;
                  })()}
                </div>
              </div>
            </OrderItem>
          ))}
        </OrderList>
      )}
      
      {selectedOrder && (
        <>
          <BarBg>
            <BarFill initial={{ width: 0 }} animate={controls} />
          </BarBg>
          
          <CountdownDisplay>
            {eta > 0 ? `${Math.floor(eta / 60)}:${(eta % 60).toString().padStart(2, '0')}` : '00:00'}
          </CountdownDisplay>
          
          <p>
            Xin chào {selectedOrder.userInfo?.name || 'khách hàng'}! Đơn hàng của bạn đang được drone vận chuyển đến {selectedOrder.userInfo?.address || 'địa chỉ của bạn'}. 
            Thời gian dự kiến: {eta} phút.
          </p>
          
          <Map>
            <RestaurantMarker
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 5, 0]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            >
              🏪
            </RestaurantMarker>
            
            <DestinationMarker
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, -5, 0]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                ease: "easeInOut",
                delay: 1
              }}
            >
              🏠
            </DestinationMarker>
            
            {isFlying && (
              <>
                <FlightPath>
                  <PathLine
                    initial={{ width: 0, left: 20, top: 35 }}
                    animate={{ width: 'calc(100% - 100px)' }}
                    transition={{ duration: 12, ease: "easeInOut" }}
                  />
                </FlightPath>
                
                <DroneIcon
                  animate={droneControls}
                  initial={{ x: 0, y: 0, rotate: 0, opacity: 1, scale: 1 }}
                >
                  🚁
                </DroneIcon>
                
                <PulseEffect
                  animate={{
                    x: [20, 170, 320, 470, 620],
                    y: [35, 5, -25, 5, 35],
                    scale: [0, 1, 0],
                    opacity: [0, 0.8, 0]
                  }}
                  transition={{
                    duration: 12,
                    ease: "easeInOut",
                    times: [0, 0.5, 1]
                  }}
                />
              </>
            )}
            
            <Muted>Bản đồ theo dõi drone 🗺️</Muted>
          </Map>
          
          {delivered && (
            <Button onClick={resetDelivery}>Quay lại đơn hàng</Button>
          )}
        </>
      )}
    </Page>
  );
};

export default Drone;