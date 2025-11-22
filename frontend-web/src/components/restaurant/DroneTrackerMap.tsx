import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import {
  DroneData,
  updateDronePosition,
  getStatusLabel,
  getStatusColor,
  formatDistance,
  formatTime
} from '@/utils/droneUtils';
import { getAllDrones } from '@/api/adminApi';
import { listDronesByRestaurant } from '@/services/droneApi';
import { useDrones, useStartDroneSim } from '@/state/droneStore';

const Container = styled.div`
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  flex-wrap: wrap;
  gap: 16px;
`;

const Title = styled.h2<{ $color?: string }>`
  color: ${props => props.$color || '#FF6600'};
  margin: 0;
  font-size: 24px;
  font-weight: 600;
`;

const Controls = styled.div`
  display: flex;
  gap: 12px;
`;

const Button = styled.button<{ $variant?: string }>`
  padding: 10px 20px;
  border: 2px solid ${props => props.$variant === 'success' ? '#28a745' : props.$variant === 'danger' ? '#dc3545' : '#6c757d'};
  background: ${props => props.$variant === 'success' ? '#28a745' : props.$variant === 'danger' ? '#dc3545' : '#6c757d'};
  color: white;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  transition: all 0.3s ease;
  
  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const MapView = styled.div`
  background: linear-gradient(135deg, #e3f2fd 0%, #fff3e0 100%);
  border-radius: 12px;
  padding: 40px;
  min-height: 400px;
  position: relative;
  border: 2px solid #e1e5e9;
  margin-bottom: 24px;
`;

const DroneMarker = styled(motion.div)<{ $x: number; $y: number; $battery: number }>`
  position: absolute;
  left: ${props => 50 + props.$x * 30}%;
  top: ${props => 50 + props.$y * 30}%;
  transform: translate(-50%, -50%);
  font-size: 32px;
  z-index: 10;
  cursor: pointer;
  filter: ${props => {
    if (props.$battery < 10) return 'drop-shadow(0 0 8px #dc3545) hue-rotate(-20deg)';
    if (props.$battery < 20) return 'drop-shadow(0 0 8px #ffc107) hue-rotate(40deg)';
    return 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))';
  }};
  
  &:hover {
    transform: translate(-50%, -50%) scale(1.2);
  }
`;

const DroneWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
`;

const BatteryWarning = styled(motion.div)<{ $level: number }>`
  position: absolute;
  top: 40px;
  left: 50%;
  transform: translateX(-50%);
  background: ${props => props.$level < 10 ? '#dc3545' : '#ffc107'};
  color: white;
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 700;
  white-space: nowrap;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  z-index: 15;
`;

const DroneStatusLabel = styled(motion.div)<{ $color: string }>`
  position: absolute;
  top: 50px;
  left: 50%;
  transform: translateX(-50%);
  background: ${props => props.$color};
  color: white;
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 10px;
  font-weight: 700;
  white-space: nowrap;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  z-index: 14;
`;

const BatteryIconWrapper = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  background: white;
  padding: 12px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 20;
`;

const BatteryLegendTitle = styled.div`
  font-size: 12px;
  font-weight: 700;
  color: #333;
  margin-bottom: 4px;
`;

const BatteryLegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 11px;
  color: #666;
`;

const BatteryDot = styled.div<{ $color: string }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${props => props.$color};
  border: 2px solid white;
  box-shadow: 0 0 4px ${props => props.$color};
`;

const RestaurantIcon = styled(motion.div)`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  font-size: 48px;
  z-index: 5;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  padding: 12px;
  text-align: left;
  background: #f8f9fa;
  border-bottom: 2px solid #e1e5e9;
  font-weight: 600;
`;

const Td = styled.td`
  padding: 12px;
  border-bottom: 1px solid #e1e5e9;
`;

const StatusBadge = styled.span<{ $color: string }>`
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  background: ${props => props.$color}20;
  color: ${props => props.$color};
  border: 1px solid ${props => props.$color};
`;

const Battery = styled.div<{ $level: number }>`
  width: 80px;
  height: 24px;
  border: 2px solid #333;
  border-radius: 4px;
  position: relative;
  overflow: hidden;
  background: #f0f0f0;
  
  &::before {
    content: '';
    position: absolute;
    right: -6px;
    top: 50%;
    transform: translateY(-50%);
    width: 4px;
    height: 12px;
    background: #333;
    border-radius: 0 2px 2px 0;
  }
  
  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: ${props => props.$level}%;
    background: ${props => {
      if (props.$level > 60) return 'linear-gradient(90deg, #28a745, #43e97b)';
      if (props.$level > 20) return 'linear-gradient(90deg, #ffc107, #ffeb3b)';
      return 'linear-gradient(90deg, #dc3545, #ff6b6b)';
    }};
    transition: width 0.3s ease, background 0.3s ease;
    animation: ${props => props.$level < 20 ? 'pulse 1s infinite' : 'none'};
  }
  
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.7; }
  }
`;

const BatteryText = styled.span`
  position: relative;
  z-index: 1;
  font-size: 11px;
  font-weight: 700;
  color: #333;
  display: block;
  text-align: center;
  line-height: 20px;
  text-shadow: 0 0 2px white;
`;

interface DroneTrackerMapProps {
  theme?: {
    primary?: string;
    secondary?: string;
  };
}

const DroneTrackerMap: React.FC<DroneTrackerMapProps> = ({ theme }) => {
  const { user } = useAuth() || {};
  const [isSimulating, setIsSimulating] = useState(false);
  
  // Map restaurant name/ID to API restaurant ID
  const getRestaurantId = (): string => {
    if (user?.restaurantId) {
      return user.restaurantId;
    }
    // Fallback: try to infer from username
    if (user?.username === 'sweetdreams') return 'rest_2';
    if (user?.username === 'aloha_restaurant') return 'restaurant_2';
    // Default to SweetDreams
    return 'rest_2';
  };

  const restaurantId = getRestaurantId();
  
  // Use new drone simulation hooks
  const { drones, loading, error } = useDrones(restaurantId);
  const stopSim = useStartDroneSim(restaurantId);

  // Use drones from hook directly - no fallback
  const displayDrones = drones;

  useEffect(() => {
    if (!isSimulating) return;
    // Note: Position updates should come from backend/WebSocket
    // This simulation is only for UI animation
    const interval = setInterval(() => {
      // Position updates would come from real-time backend updates
      // For now, this is just a placeholder
    }, 1000);
    return () => clearInterval(interval);
  }, [isSimulating]);

  return (
    <Container>
      <Header>
        <Title $color={theme?.primary}>🚁 Mô phỏng hoạt động Drone giao hàng</Title>
        <Controls>
          <Button $variant="success" onClick={() => setIsSimulating(true)} disabled={isSimulating}>
            ▶️ Bắt đầu
          </Button>
          <Button $variant="danger" onClick={() => setIsSimulating(false)} disabled={!isSimulating}>
            ⏸️ Tạm dừng
          </Button>
          <Button onClick={() => { 
            setIsSimulating(false);
            // Reset would reload from backend - handled by useDrones hook
          }}>
            🔄 Đặt lại
          </Button>
        </Controls>
      </Header>

      <MapView>
        {/* Restaurant Icon */}
        <RestaurantIcon
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200 }}
        >
          🏪
        </RestaurantIcon>

        {/* Battery Legend */}
        <BatteryIconWrapper>
          <BatteryLegendTitle>Trạng thái pin</BatteryLegendTitle>
          <BatteryLegendItem>
            <BatteryDot $color="#28a745" />
            <span>&gt; 60%: Tốt</span>
          </BatteryLegendItem>
          <BatteryLegendItem>
            <BatteryDot $color="#ffc107" />
            <span>20-60%: Cảnh báo</span>
          </BatteryLegendItem>
          <BatteryLegendItem>
            <BatteryDot $color="#dc3545" />
            <span>&lt; 20%: Nguy hiểm</span>
          </BatteryLegendItem>
        </BatteryIconWrapper>

        {/* Drones */}
        {loading && (
          <div style={{ textAlign: 'center', padding: '20px', color: '#666' }}>
            Đang tải dữ liệu drone...
          </div>
        )}
        {error && (
          <div style={{ textAlign: 'center', padding: '20px', color: '#dc3545' }}>
            Lỗi khi tải dữ liệu: {error.message}
          </div>
        )}
        {!loading && !error && displayDrones.length === 0 && (
          <div style={{ textAlign: 'center', padding: '20px', color: '#666' }}>
            Không có drone nào
          </div>
        )}
        <AnimatePresence>
          {displayDrones.map(drone => (
            <DroneWrapper key={drone.id}>
              <DroneMarker
                $x={(drone.currentPosition.lng - drone.restaurantPosition.lng) * 1000}
                $y={(drone.currentPosition.lat - drone.restaurantPosition.lat) * 1000}
                $battery={drone.battery}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ 
                  scale: 1,
                  opacity: 1,
                  rotate: isSimulating ? 360 : 0
                }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{
                  scale: { type: 'spring', stiffness: 200 },
                  rotate: {
                    duration: 2,
                    repeat: Infinity,
                    ease: 'linear'
                  }
                }}
              >
                🚁
              </DroneMarker>

              {/* Low Battery Warning */}
              {drone.battery < 20 && (
                <BatteryWarning
                  $level={drone.battery}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    position: 'absolute',
                    left: `${50 + (drone.currentPosition.lng - drone.restaurantPosition.lng) * 1000}%`,
                    top: `${50 + (drone.currentPosition.lat - drone.restaurantPosition.lat) * 1000 + 3}%`
                  }}
                >
                  {drone.battery < 10 ? '⚠️ Pin cực thấp!' : '⚡ Pin yếu'}
                </BatteryWarning>
              )}

              {/* Status Label */}
              <DroneStatusLabel
                $color={getStatusColor(drone.status)}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                style={{
                  position: 'absolute',
                  left: `${50 + (drone.currentPosition.lng - drone.restaurantPosition.lng) * 1000}%`,
                  top: `${50 + (drone.currentPosition.lat - drone.restaurantPosition.lat) * 1000 + 5}%`
                }}
              >
                {getStatusLabel(drone.status)}
              </DroneStatusLabel>
            </DroneWrapper>
          ))}
        </AnimatePresence>
      </MapView>

      <Table>
        <thead>
          <tr>
            <Th>ID Drone</Th>
            <Th>Đơn hàng</Th>
            <Th>Trạng thái</Th>
            <Th>Pin</Th>
            <Th>Tốc độ</Th>
            <Th>Khoảng cách</Th>
            <Th>Thời gian</Th>
          </tr>
        </thead>
        <tbody>
          {displayDrones.map(drone => (
            <tr key={drone.id}>
              <Td><strong>{drone.id}</strong></Td>
              <Td>{drone.orderId}</Td>
              <Td>
                <StatusBadge $color={getStatusColor(drone.status)}>
                  {getStatusLabel(drone.status)}
                </StatusBadge>
              </Td>
              <Td>
                <Battery $level={drone.battery}>
                  <BatteryText>{Math.round(drone.battery)}%</BatteryText>
                </Battery>
              </Td>
              <Td>{Math.round(drone.speed)} km/h</Td>
              <Td>{formatDistance(drone.distanceRemaining)}</Td>
              <Td>{formatTime(drone.estimatedArrival)}</Td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default DroneTrackerMap;

