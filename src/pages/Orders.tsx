import React, { useState, useEffect } from "react";
import { useOrders } from "@/context/OrderContext";
import { useAuth } from "@/context";
import toast from "react-hot-toast";
import styled from "styled-components";
import { motion, useAnimation } from "framer-motion";
import dayjs from "dayjs";
import ProgressCircle from "../components/ProgressCircle";
import DroneAnimation from "../components/DroneAnimation";
import DroneJourney from "../components/DroneJourney";
import { formatVND } from "../utils/currency";
import { connectOrderSocket, disconnectOrderSocket } from "@/services/orderSyncService";

const Page = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
`;

const Title = styled.h2`
  margin-bottom: 20px;
`;

const SearchForm = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
  flex-wrap: wrap;
  padding: 20px;
  background: var(--card);
  border-radius: 12px;
  box-shadow: var(--shadow);
  border: 1px solid var(--border);
`;

const Input = styled.input`
  padding: 12px 16px;
  border-radius: 8px;
  border: 2px solid var(--border);
  min-width: 250px;
  background: var(--card);
  color: var(--text);
  font-size: 14px;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: var(--primary);
    box-shadow: 0 0 0 3px rgba(255, 102, 0, 0.1);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const Button = styled.button`
  padding: 12px 20px;
  background: linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  font-size: 14px;
  transition: all 0.3s ease;
  box-shadow: var(--shadow);
  
  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const AdminControls = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
  flex-wrap: wrap;
`;

const StatusButton = styled.button<{ status: string }>`
  padding: 8px 16px;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  font-size: 12px;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: var(--shadow);
  
  ${props => {
    switch(props.status) {
      case 'Processing': return 'background: linear-gradient(135deg, #ff9800 0%, #ffb74d 100%); color: white;';
      case 'Delivering': return 'background: linear-gradient(135deg, #2196f3 0%, #64b5f6 100%); color: white;';
      case 'Completed': return 'background: linear-gradient(135deg, #4caf50 0%, #81c784 100%); color: white;';
      default: return 'background: var(--border); color: var(--text);';
    }
  }}
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const OrderCard = styled.div`
  margin-bottom: 20px;
  padding: 20px;
  border: 1px solid var(--border);
  border-radius: 12px;
  background: var(--card);
  box-shadow: var(--shadow);
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
  align-items: center;
  margin-bottom: 12px;
`;

const OrderInfo = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 8px;
  margin-bottom: 12px;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 40px 20px;
  color: #666;
  background: #f9f9f9;
  border-radius: 8px;
`;


const LoadingSkeleton = styled.div`
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
  height: 20px;
  border-radius: 4px;
  margin: 8px 0;
  
  @keyframes loading {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }
`;

const Orders: React.FC = () => {
  const { orders, getOrdersByPhone, updateOrderStatus } = useOrders();
  const { user, isAdmin } = useAuth();
  const [phone, setPhone] = useState("");
  const [filteredOrders, setFilteredOrders] = useState<any[]>([]);
  const [trackingOrders, setTrackingOrders] = useState<{[key: string]: any}>({});
  const [loading, setLoading] = useState(false);

  // Drone tracking state for each order
  const [droneStates, setDroneStates] = useState<{[key: string]: {
    eta: number;
    progress: number;
    currentStep: number;
    isFlying: boolean;
    delivered: boolean;
  }}>({});

  const handleSearch = () => {
    if (!phone.trim()) {
      toast.error("Vui lòng nhập số điện thoại");
      return;
    }
    setLoading(true);
    
    // TODO: Backend integration in Phase 2 - removed setTimeout delay
    try {
      const result = getOrdersByPhone(phone);
      setFilteredOrders(result);
      
      if (result.length === 0) {
        toast("Không tìm thấy đơn hàng nào cho số điện thoại này", { icon: "ℹ️" });
      }
    } catch (error) {
      console.error('Failed to load orders:', error);
      setFilteredOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = (orderId: string, newStatus: string) => {
    updateOrderStatus(orderId, newStatus as any);
    toast.success(`✅ Đã cập nhật trạng thái đơn hàng thành "${newStatus}"`);
    
    // Start drone tracking if status is "Delivering"
    if (newStatus === "Delivering") {
      startDroneTracking(orderId);
    }
    
    // Refresh the orders list
    if (phone) {
      const result = getOrdersByPhone(phone);
      setFilteredOrders(result);
    }
  };

  const startDroneTracking = (orderId: string) => {
    const initialState = {
      eta: 15, // 15 minutes
      progress: 0,
      currentStep: 0,
      isFlying: true,
      delivered: false
    };
    
    setDroneStates(prev => ({ ...prev, [orderId]: initialState }));
    
    // Start countdown timer
    const interval = setInterval(() => {
      setDroneStates(prev => {
        const current = prev[orderId];
        if (!current) return prev;
        
        const newEta = Math.max(0, current.eta - 1);
        const newProgress = ((15 - newEta) / 15) * 100;
        const newStep = Math.floor(newProgress / 25); // 4 steps total
        
        if (newEta === 0) {
          clearInterval(interval);
          updateOrderStatus(orderId, "Completed");
          toast.success("🎉 Đơn hàng đã được giao thành công!");
          return {
            ...prev,
            [orderId]: {
              ...current,
              eta: 0,
              progress: 100,
              currentStep: 4,
              isFlying: false,
              delivered: true
            }
          };
        }
        
        return {
          ...prev,
          [orderId]: {
            ...current,
            eta: newEta,
            progress: newProgress,
            currentStep: newStep,
            isFlying: true,
            delivered: false
          }
        };
      });
    }, 1000);
  };

  // Load all orders for admin on mount
  useEffect(() => {
    if (isAdmin()) {
      setFilteredOrders(orders);
    }
  }, [isAdmin, orders]);

  // Real-time WebSocket synchronization
  useEffect(() => {
    const handleOrderUpdate = async (orderUpdate: any) => {
      console.log('[Orders] 📦 WebSocket order update received:', orderUpdate.id, orderUpdate.status);
      
      try {
        // Map API order format to OrderContext format
        const { mapApiOrderToOrder } = await import('@/services/orderApiService');
        const mappedOrder = mapApiOrderToOrder(orderUpdate);
        
        // Update filtered orders with mapped order
        setFilteredOrders((prevOrders) => {
          const exists = prevOrders.find((o) => o.id === mappedOrder.id);
          const existingOrder = exists ? prevOrders.find((o) => o.id === mappedOrder.id) : null;
          const updatedOrders = exists
            ? prevOrders.map((o) => (o.id === mappedOrder.id ? mappedOrder : o))
            : [...prevOrders, mappedOrder];
          
          // Normalize status for comparison
          const normalizedStatus = mappedOrder.status?.toLowerCase() || '';
          const existingStatus = existingOrder?.status?.toLowerCase() || '';
          
          // If status changed to "Delivering", start drone tracking
          if ((normalizedStatus === "delivering" || normalizedStatus === "đang giao") && 
              existingStatus !== "delivering" && existingStatus !== "đang giao") {
            console.log('[Orders] 🛸 Starting drone tracking for order:', mappedOrder.id);
            startDroneTracking(mappedOrder.id);
          }
          
          // If status changed to "Delivered" or "Completed", stop drone tracking immediately
          if ((normalizedStatus === "delivered" || normalizedStatus === "completed" || normalizedStatus === "đã giao") &&
              existingStatus !== "delivered" && existingStatus !== "completed" && existingStatus !== "đã giao") {
            console.log('[Orders] 🎉 Order delivered - stopping drone tracking:', mappedOrder.id);
            setDroneStates((prev) => {
              const newStates = { ...prev };
              if (newStates[mappedOrder.id]) {
                // Clear drone state for this order
                delete newStates[mappedOrder.id];
              }
              return newStates;
            });
            
            // Show delivery confirmation toast
            toast.success(`🎉 Đơn hàng ${mappedOrder.id} đã được giao thành công!`, {
              duration: 5000,
              icon: '✅'
            });
          }
          
          return updatedOrders;
        });
      } catch (error) {
        console.error('[Orders] Error mapping order update:', error);
        // Fallback: update with raw order update
        setFilteredOrders((prevOrders) => {
          const exists = prevOrders.find((o) => o.id === orderUpdate.id);
          return exists
            ? prevOrders.map((o) => (o.id === orderUpdate.id ? orderUpdate : o))
            : [...prevOrders, orderUpdate];
        });
      }
    };
    
    connectOrderSocket(handleOrderUpdate);
    return () => disconnectOrderSocket();
  }, []);

  const displayOrders = isAdmin() ? orders : filteredOrders;

  // Enhanced drone tracking component with real-time animation
  const DroneTracking = ({ order }: { order: any }) => {
    const droneState = droneStates[order.id];
    const [isAnimationActive, setIsAnimationActive] = useState(false);

    // Start animation when order status changes to "Delivering"
    // Stop animation when order status changes to "Delivered" or "Completed"
    useEffect(() => {
      const normalizedStatus = order.status?.toLowerCase() || '';
      
      if ((normalizedStatus === "delivering" || normalizedStatus === "đang giao") && !droneState) {
        setIsAnimationActive(true);
        startDroneTracking(order.id);
      } else if (normalizedStatus === "delivered" || normalizedStatus === "completed" || normalizedStatus === "đã giao") {
        setIsAnimationActive(false);
        // Clear drone state
        setDroneStates((prev) => {
          const newStates = { ...prev };
          delete newStates[order.id];
          return newStates;
        });
      }
    }, [order.status, order.id, droneState]);

    const handleDroneComplete = () => {
      updateOrderStatus(order.id, "Completed");
      setIsAnimationActive(false);
      toast.success("🎉 Đơn hàng đã được giao thành công!");
    };

    // Normalize order status for comparison
    const normalizedStatus = order.status?.toLowerCase() || '';
    const isDelivering = normalizedStatus === "delivering" || normalizedStatus === "đang giao";
    const isDelivered = normalizedStatus === "delivered" || normalizedStatus === "completed" || normalizedStatus === "đã giao";
    
    // Show delivery confirmation message if order is delivered (but don't show drone)
    if (isDelivered) {
      return (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          style={{ 
            padding: '20px', 
            background: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)', 
            borderRadius: '12px', 
            color: 'white',
            textAlign: 'center',
            marginTop: '16px',
            boxShadow: '0 4px 12px rgba(40, 167, 69, 0.3)'
          }}
        >
          <div style={{ fontSize: '40px', marginBottom: '12px' }}>✅</div>
          <div style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>
            Đơn hàng đã được giao thành công!
          </div>
          <div style={{ fontSize: '14px', opacity: 0.9 }}>
            Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi
          </div>
        </motion.div>
      );
    }
    
    // Only show drone animation for active deliveries
    if (!isDelivering) {
      return null;
    }

    return (
      <div>
        {/* Use DroneJourney for logged-in users */}
        {user && (
          <DroneJourney
            orderId={order.id}
            isActive={isAnimationActive}
            onComplete={handleDroneComplete}
          />
        )}
        
        {/* Fallback to DroneAnimation for guest users or as backup */}
        {!user && (
          <DroneAnimation
            orderId={order.id}
            isActive={isAnimationActive}
            onComplete={handleDroneComplete}
            deliveryTime={15} // 15 minutes delivery time
          />
        )}
      </div>
    );
  };

  return (
    <Page>
      <Title>
        {isAdmin() ? 'Quản lý đơn hàng' : 'Tra cứu đơn hàng'}
      </Title>
      
      {isAdmin() && (
        <AdminControls>
          <div style={{ color: '#666', fontSize: '14px' }}>
            📊 Tổng số đơn hàng: <strong>{orders.length}</strong>
          </div>
        </AdminControls>
      )}
      
      {!isAdmin() && (
        <SearchForm>
          <Input
            placeholder="Nhập số điện thoại"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            disabled={loading}
          />
          <Button onClick={handleSearch} disabled={loading}>
            {loading ? "Đang tìm..." : "Xem đơn hàng"}
          </Button>
          {phone && (
            <Button 
              onClick={() => {
                setPhone("");
                setFilteredOrders([]);
                toast.success("🔄 Đã làm mới");
              }}
              style={{ background: "var(--border)", color: "var(--text)" }}
            >
              🔄 Làm mới
            </Button>
          )}
        </SearchForm>
      )}

      {loading && (
        <div style={{ margin: "20px 0" }}>
          <LoadingSkeleton />
          <LoadingSkeleton />
          <LoadingSkeleton />
        </div>
      )}

      {displayOrders.length === 0 && !isAdmin() && phone && (
        <EmptyState>
          <h3>Bạn chưa đặt đơn hàng nào!</h3>
          <p>Hãy đặt món ăn để trải nghiệm dịch vụ giao hàng bằng drone.</p>
        </EmptyState>
      )}

      {displayOrders.length === 0 && isAdmin() && (
        <EmptyState>
          <h3>Chưa có đơn hàng nào</h3>
          <p>Khi có đơn hàng mới, chúng sẽ hiển thị ở đây.</p>
        </EmptyState>
      )}

      {displayOrders.map((order) => (
        <OrderCard key={order.id}>
          <OrderHeader>
            <div>
              <h4>Đơn hàng #{order.id.slice(-6)}</h4>
              <div style={{ fontSize: '14px', color: '#666' }}>
                {dayjs(order.id).format('HH:mm - DD/MM/YYYY')} - {order.name}
              </div>
            </div>
            {isAdmin() && (
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <StatusButton 
                  status="Processing"
                  onClick={() => handleStatusUpdate(order.id, 'Processing')}
                >
                  Đang chuẩn bị
                </StatusButton>
                <StatusButton 
                  status="Delivering"
                  onClick={() => handleStatusUpdate(order.id, 'Delivering')}
                >
                  Đang giao
                </StatusButton>
                <StatusButton 
                  status="Completed"
                  onClick={() => handleStatusUpdate(order.id, 'Completed')}
                >
                  Đã giao
                </StatusButton>
              </div>
            )}
          </OrderHeader>
          
          <OrderInfo>
            <div>
              <strong>Trạng thái:</strong> 
              <span style={{ 
                color: order.status === 'Processing' ? '#ff9800' : 
                       order.status === 'Delivering' ? '#2196f3' : '#4caf50',
                fontWeight: 'bold',
                marginLeft: '8px'
              }}>
                {order.status === 'Processing' ? 'Đang chuẩn bị' :
                 order.status === 'Delivering' ? 'Đang giao hàng' : 'Hoàn tất'}
              </span>
            </div>
            <div><strong>Tổng tiền:</strong> {formatVND(order.total)}</div>
            <div><strong>Số điện thoại:</strong> {order.phone}</div>
            <div><strong>Địa chỉ:</strong> {order.address}</div>
          </OrderInfo>
          
          <div style={{ marginBottom: '12px' }}>
            <strong>Chi tiết đơn hàng:</strong>
            <ul style={{ margin: '8px 0', paddingLeft: '20px' }}>
              {order.items.map((item: any, idx: number) => (
                <li key={idx}>
                  {item.name} × {item.qty} — {formatVND(item.price * item.qty)}
                </li>
              ))}
            </ul>
          </div>
          
          <DroneTracking order={order} />
        </OrderCard>
      ))}
    </Page>
  );
};

export default Orders;