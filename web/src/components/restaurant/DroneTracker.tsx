import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useOrders } from '@/context/OrderContext';
import DroneAnimation from '../DroneAnimation';

interface DroneTrackerProps {
  restaurantId?: string;
  theme?: {
    primary?: string;
    secondary?: string;
  };
}

const TrackerContainer = styled.div`
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const TrackerHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 16px;
    align-items: flex-start;
  }
`;

const TrackerTitle = styled.h2<{ $primary?: string }>`
  color: ${props => props.$primary || '#333'};
  margin: 0;
  font-size: 24px;
  font-weight: 600;
`;

const ControlsBar = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
`;

const ControlButton = styled.button<{ $active?: boolean; $color?: string }>`
  padding: 8px 16px;
  border: 2px solid ${props => props.$color || '#FF6600'};
  background: ${props => props.$active ? (props.$color || '#FF6600') : 'white'};
  color: ${props => props.$active ? 'white' : (props.$color || '#FF6600')};
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.$color || '#FF6600'};
    color: white;
    transform: translateY(-2px);
  }
`;

const MapView = styled.div`
  background: linear-gradient(135deg, #667eea15 0%, #764ba215 100%);
  border-radius: 12px;
  padding: 32px;
  min-height: 400px;
  position: relative;
  border: 2px dashed #e1e5e9;
  margin-bottom: 24px;
  overflow: hidden;
`;

const MapGrid = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: 
    linear-gradient(rgba(0, 0, 0, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 0, 0, 0.03) 1px, transparent 1px);
  background-size: 40px 40px;
  pointer-events: none;
`;

const DroneMarker = styled(motion.div)<{ $x: number; $y: number }>`
  position: absolute;
  left: ${props => props.$x}%;
  top: ${props => props.$y}%;
  transform: translate(-50%, -50%);
  font-size: 32px;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
  z-index: 10;
`;

const LocationMarker = styled.div<{ $x: number; $y: number; $color: string }>`
  position: absolute;
  left: ${props => props.$x}%;
  top: ${props => props.$y}%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

const MarkerIcon = styled.div<{ $color: string }>`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: ${props => props.$color};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  border: 3px solid white;
`;

const MarkerLabel = styled.div`
  background: rgba(0, 0, 0, 0.75);
  color: white;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  white-space: nowrap;
`;

const FlightPath = styled(motion.div)<{ $fromX: number; $fromY: number; $toX: number; $toY: number }>`
  position: absolute;
  left: ${props => props.$fromX}%;
  top: ${props => props.$fromY}%;
  width: ${props => Math.sqrt(Math.pow(props.$toX - props.$fromX, 2) + Math.pow(props.$toY - props.$fromY, 2))}%;
  height: 3px;
  background: linear-gradient(90deg, #4facfe 0%, #00f2fe 100%);
  transform-origin: left center;
  transform: rotate(${props => Math.atan2(props.$toY - props.$fromY, props.$toX - props.$fromX)}rad);
  box-shadow: 0 2px 8px rgba(79, 172, 254, 0.4);
`;

const DroneList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 16px;
`;

const DroneCard = styled(motion.div)<{ $status: string }>`
  background: white;
  border-radius: 12px;
  padding: 16px;
  border: 2px solid ${props => {
    switch(props.$status) {
      case 'Delivering': return '#4facfe';
      case 'Processing': return '#ffc107';
      case 'Completed': return '#43e97b';
      default: return '#e1e5e9';
    }
  }};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
`;

const DroneCardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

const DroneId = styled.div`
  font-weight: 700;
  color: #333;
  font-size: 16px;
`;

const DroneStatus = styled.div<{ $status: string }>`
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${props => {
    switch(props.$status) {
      case 'Delivering': return '#cce5ff';
      case 'Processing': return '#fff3cd';
      case 'Completed': return '#d4edda';
      default: return '#f8f9fa';
    }
  }};
  color: ${props => {
    switch(props.$status) {
      case 'Delivering': return '#004085';
      case 'Processing': return '#856404';
      case 'Completed': return '#155724';
      default: return '#6c757d';
    }
  }};
`;

const DroneInfo = styled.div`
  font-size: 13px;
  color: #666;
  line-height: 1.6;
  
  strong {
    color: #333;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: #999;
`;

const DroneTracker: React.FC<DroneTrackerProps> = ({ restaurantId, theme }) => {
  const { orders } = useOrders();
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map');
  const [simulationMode, setSimulationMode] = useState(false);
  const [dronePositions, setDronePositions] = useState<{ [key: string]: { x: number; y: number } }>({});

  const restaurantPos = { x: 20, y: 50 };
  
  const activeOrders = orders.filter(order => order.status === 'Delivering');
  
  // Simulate drone movement
  useEffect(() => {
    if (!simulationMode || activeOrders.length === 0) return;
    
    const interval = setInterval(() => {
      setDronePositions(prev => {
        const newPositions = { ...prev };
        
        activeOrders.forEach((order, index) => {
          const targetX = 80;
          const targetY = 20 + (index * 15);
          
          const currentPos = newPositions[order.id] || { x: restaurantPos.x, y: restaurantPos.y };
          
          // Move drone towards target
          const dx = targetX - currentPos.x;
          const dy = targetY - currentPos.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance > 1) {
            const speed = 0.5; // % per frame
            newPositions[order.id] = {
              x: currentPos.x + (dx / distance) * speed,
              y: currentPos.y + (dy / distance) * speed,
            };
          }
        });
        
        return newPositions;
      });
    }, 50);
    
    return () => clearInterval(interval);
  }, [simulationMode, activeOrders.length]);

  const getStatusLabel = (status: string) => {
    switch(status) {
      case 'Processing': return 'Đang chuẩn bị';
      case 'Delivering': return 'Đang giao';
      case 'Completed': return 'Hoàn tất';
      default: return status;
    }
  };

  return (
    <TrackerContainer>
      <TrackerHeader>
        <TrackerTitle $primary={theme?.primary}>🚁 Theo dõi Drone</TrackerTitle>
        <ControlsBar>
          <ControlButton
            $active={viewMode === 'map'}
            $color={theme?.primary}
            onClick={() => setViewMode('map')}
          >
            🗺️ Bản đồ
          </ControlButton>
          <ControlButton
            $active={viewMode === 'list'}
            $color={theme?.primary}
            onClick={() => setViewMode('list')}
          >
            📋 Danh sách
          </ControlButton>
          <ControlButton
            $active={simulationMode}
            $color="#6f42c1"
            onClick={() => setSimulationMode(!simulationMode)}
          >
            {simulationMode ? '⏸️ Dừng' : '▶️ Mô phỏng'}
          </ControlButton>
        </ControlsBar>
      </TrackerHeader>

      {viewMode === 'map' ? (
        <MapView>
          <MapGrid />
          
          {/* Restaurant Marker */}
          <LocationMarker $x={restaurantPos.x} $y={restaurantPos.y} $color="#FF6600">
            <MarkerIcon $color="#FF6600">🏪</MarkerIcon>
            <MarkerLabel>Nhà hàng</MarkerLabel>
          </LocationMarker>

          {/* Active Drones */}
          <AnimatePresence>
            {activeOrders.map((order, index) => {
              const targetX = 80;
              const targetY = 20 + (index * 15);
              const dronePos = simulationMode 
                ? dronePositions[order.id] || restaurantPos 
                : { x: (restaurantPos.x + targetX) / 2, y: (restaurantPos.y + targetY) / 2 };
              
              return (
                <React.Fragment key={order.id}>
                  {/* Flight Path */}
                  <FlightPath
                    $fromX={restaurantPos.x}
                    $fromY={restaurantPos.y}
                    $toX={targetX}
                    $toY={targetY}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    exit={{ scaleX: 0 }}
                  />
                  
                  {/* Drone */}
                  <DroneMarker
                    $x={dronePos.x}
                    $y={dronePos.y}
                    initial={{ scale: 0 }}
                    animate={{ 
                      scale: 1,
                      rotate: simulationMode ? 360 : 0,
                    }}
                    transition={{
                      rotate: {
                        duration: 2,
                        repeat: Infinity,
                        ease: 'linear'
                      }
                    }}
                  >
                    🚁
                  </DroneMarker>
                  
                  {/* Customer Marker */}
                  <LocationMarker $x={targetX} $y={targetY} $color="#4facfe">
                    <MarkerIcon $color="#4facfe">📍</MarkerIcon>
                    <MarkerLabel>{order.name}</MarkerLabel>
                  </LocationMarker>
                </React.Fragment>
              );
            })}
          </AnimatePresence>

          {activeOrders.length === 0 && (
            <EmptyState>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>🚁</div>
              <div>Không có drone nào đang hoạt động</div>
            </EmptyState>
          )}
        </MapView>
      ) : (
        <DroneList>
          {orders.length === 0 ? (
            <EmptyState>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>📦</div>
              <div>Chưa có đơn hàng nào</div>
            </EmptyState>
          ) : (
            orders.map((order, index) => (
              <DroneCard
                key={order.id}
                $status={order.status}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <DroneCardHeader>
                  <DroneId>Drone #{order.id.slice(-6)}</DroneId>
                  <DroneStatus $status={order.status}>
                    {getStatusLabel(order.status)}
                  </DroneStatus>
                </DroneCardHeader>
                <DroneInfo>
                  <div><strong>Khách:</strong> {order.name}</div>
                  <div><strong>SĐT:</strong> {order.phone}</div>
                  <div><strong>Địa chỉ:</strong> {order.address}</div>
                  <div><strong>Món:</strong> {order.items?.length || 0} món</div>
                </DroneInfo>
              </DroneCard>
            ))
          )}
        </DroneList>
      )}
      
      {/* Optional: Include DroneAnimation component for detailed view */}
      {simulationMode && activeOrders.length > 0 && (
        <div style={{ marginTop: '24px' }}>
          <DroneAnimation
            orderId={activeOrders[0].id}
            isActive={true}
            deliveryTime={10}
          />
        </div>
      )}
    </TrackerContainer>
  );
};

export default DroneTracker;

