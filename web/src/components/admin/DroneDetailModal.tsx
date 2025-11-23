/**
 * Drone Detail Modal Component
 * Shows detailed information about a drone
 */

import React from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { DroneRealtimeData } from '@/services/droneRealtimeService';
import dayjs from 'dayjs';
import { getRestaurantById } from '@/services/adminService';

const Modal = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled(motion.div)`
  background: white;
  border-radius: 15px;
  padding: 30px;
  max-width: 600px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 2px solid #e1e5e9;
`;

const ModalTitle = styled.h3`
  font-size: 20px;
  font-weight: 600;
  margin: 0;
  color: #333;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #666;
  padding: 0;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.3s ease;
  
  &:hover {
    background: #f0f0f0;
    color: #333;
  }
`;

const Section = styled.div`
  margin-bottom: 20px;
`;

const SectionTitle = styled.h4`
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin: 0 0 12px 0;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const InfoLabel = styled.span`
  font-size: 12px;
  color: #666;
  font-weight: 500;
`;

const InfoValue = styled.span`
  font-size: 14px;
  color: #333;
  font-weight: 600;
`;

const StatusBadge = styled.span<{ $status: string }>`
  display: inline-block;
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${props => {
    switch (props.$status) {
      case 'active':
      case 'delivering':
        return '#cce5ff';
      case 'charging':
      case 'returning':
        return '#fff3cd';
      case 'maintenance':
        return '#f8d7da';
      case 'offline':
        return '#e1e5e9';
      default:
        return '#e1e5e9';
    }
  }};
  color: ${props => {
    switch (props.$status) {
      case 'active':
      case 'delivering':
        return '#004085';
      case 'charging':
      case 'returning':
        return '#856404';
      case 'maintenance':
        return '#721c24';
      case 'offline':
        return '#666';
      default:
        return '#666';
    }
  }};
`;

const BatteryBar = styled.div`
  width: 100%;
  height: 10px;
  background: #e1e5e9;
  border-radius: 5px;
  overflow: hidden;
  margin-top: 5px;
`;

const BatteryFill = styled.div<{ $level: number }>`
  height: 100%;
  width: ${props => props.$level}%;
  background: ${props => {
    if (props.$level < 20) return '#dc3545';
    if (props.$level < 50) return '#ffc107';
    return '#28a745';
  }};
  transition: all 0.3s ease;
`;

const ActivityTimeline = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ActivityItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 12px;
  background: #f8f9fa;
  border-radius: 8px;
  border-left: 3px solid #667eea;
`;

const ActivityIcon = styled.div`
  font-size: 20px;
`;

const ActivityContent = styled.div`
  flex: 1;
`;

const ActivityTitle = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #333;
  margin-bottom: 4px;
`;

const ActivityTime = styled.div`
  font-size: 12px;
  color: #666;
`;

interface DroneDetailModalProps {
  drone: DroneRealtimeData | null;
  isOpen: boolean;
  onClose: () => void;
  restaurantName?: string;
}

const DroneDetailModal: React.FC<DroneDetailModalProps> = ({ 
  drone, 
  isOpen, 
  onClose,
  restaurantName 
}) => {
  if (!drone) return null;

  // Get status text in Vietnamese
  const getStatusText = (status: string): string => {
    const statusMap: Record<string, string> = {
      'active': 'Đang hoạt động',
      'delivering': 'Đang giao hàng',
      'charging': 'Đang sạc',
      'returning': 'Đang trở về trạm',
      'maintenance': 'Bảo trì',
      'offline': 'Ngoại tuyến'
    };
    return statusMap[status] || status;
  };

  // Get connection status text
  const getConnectionStatusText = (status?: string): string => {
    const statusMap: Record<string, string> = {
      'online': 'Trực tuyến',
      'lost_signal': 'Mất tín hiệu',
      'disconnected': 'Ngắt kết nối'
    };
    return statusMap[status || 'online'] || 'Trực tuyến';
  };

  // Activity timeline - removed mock data
  // Backend doesn't provide activity events yet, so timeline is not available
  const activities: Array<{ icon: string; title: string; time: string }> = [];

  return (
    <AnimatePresence>
      {isOpen && (
        <Modal
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <ModalContent
            initial={{ scale: 0.8, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.8, y: 50 }}
            onClick={(e) => e.stopPropagation()}
          >
            <ModalHeader>
              <ModalTitle>
                🚁 {drone.code || drone.id}
              </ModalTitle>
              <CloseButton onClick={onClose}>×</CloseButton>
            </ModalHeader>

            <Section>
              <SectionTitle>📊 Thông tin cơ bản</SectionTitle>
              <InfoGrid>
                <InfoItem>
                  <InfoLabel>Mã drone</InfoLabel>
                  <InfoValue>{drone.code || drone.id}</InfoValue>
                </InfoItem>
                <InfoItem>
                  <InfoLabel>Trạng thái</InfoLabel>
                  <StatusBadge $status={drone.status}>
                    {getStatusText(drone.status)}
                  </StatusBadge>
                </InfoItem>
                <InfoItem>
                  <InfoLabel>Nhà hàng</InfoLabel>
                  <InfoValue>{restaurantName || drone.restaurantId || 'N/A'}</InfoValue>
                </InfoItem>
                <InfoItem>
                  <InfoLabel>Kết nối</InfoLabel>
                  <InfoValue>{getConnectionStatusText(drone.connectionStatus)}</InfoValue>
                </InfoItem>
              </InfoGrid>
            </Section>

            <Section>
              <SectionTitle>🔋 Pin và hiệu suất</SectionTitle>
              <InfoGrid>
                <InfoItem>
                  <InfoLabel>Mức pin</InfoLabel>
                  <InfoValue>{drone.battery}%</InfoValue>
                  <BatteryBar>
                    <BatteryFill $level={drone.battery} />
                  </BatteryBar>
                </InfoItem>
                <InfoItem>
                  <InfoLabel>Số chuyến bay</InfoLabel>
                  <InfoValue>{drone.missionsCompleted || 0}</InfoValue>
                </InfoItem>
                <InfoItem>
                  <InfoLabel>Điểm sức khỏe</InfoLabel>
                  <InfoValue>{drone.healthScore || 'N/A'}</InfoValue>
                </InfoItem>
                <InfoItem>
                  <InfoLabel>Bảo trì gần nhất</InfoLabel>
                  <InfoValue>
                    {drone.lastMaintenance 
                      ? dayjs(drone.lastMaintenance).format('DD/MM/YYYY')
                      : 'N/A'}
                  </InfoValue>
                </InfoItem>
              </InfoGrid>
            </Section>

            {drone.status === 'delivering' && (
              <Section>
                <SectionTitle>🚚 Thông tin giao hàng</SectionTitle>
                <InfoGrid>
                  {drone.orderId && (
                    <InfoItem>
                      <InfoLabel>Mã đơn hàng</InfoLabel>
                      <InfoValue>{drone.orderId}</InfoValue>
                    </InfoItem>
                  )}
                  {drone.eta !== undefined && (
                    <InfoItem>
                      <InfoLabel>Thời gian ước tính đến nơi</InfoLabel>
                      <InfoValue>{drone.eta} phút</InfoValue>
                    </InfoItem>
                  )}
                  {drone.speed !== undefined && (
                    <InfoItem>
                      <InfoLabel>Tốc độ hiện tại</InfoLabel>
                      <InfoValue>{drone.speed} km/h</InfoValue>
                    </InfoItem>
                  )}
                  {drone.position && (
                    <InfoItem>
                      <InfoLabel>Vị trí GPS</InfoLabel>
                      <InfoValue>
                        {drone.position.lat.toFixed(6)}, {drone.position.lng.toFixed(6)}
                      </InfoValue>
                    </InfoItem>
                  )}
                </InfoGrid>
              </Section>
            )}

            <Section>
              <SectionTitle>📍 Vị trí</SectionTitle>
              <InfoGrid>
                {drone.position ? (
                  <>
                    <InfoItem>
                      <InfoLabel>Vĩ độ</InfoLabel>
                      <InfoValue>{drone.position.lat.toFixed(6)}</InfoValue>
                    </InfoItem>
                    <InfoItem>
                      <InfoLabel>Kinh độ</InfoLabel>
                      <InfoValue>{drone.position.lng.toFixed(6)}</InfoValue>
                    </InfoItem>
                  </>
                ) : (
                  <InfoItem>
                    <InfoLabel>Vị trí</InfoLabel>
                    <InfoValue>Chưa có dữ liệu</InfoValue>
                  </InfoItem>
                )}
                {drone.speed !== undefined && (
                  <InfoItem>
                    <InfoLabel>Tốc độ</InfoLabel>
                    <InfoValue>{drone.speed} km/h</InfoValue>
                  </InfoItem>
                )}
              </InfoGrid>
            </Section>

            <Section>
              <SectionTitle>📋 Lịch sử hoạt động</SectionTitle>
              <ActivityTimeline>
                {activities.map((activity, index) => (
                  <ActivityItem key={index}>
                    <ActivityIcon>{activity.icon}</ActivityIcon>
                    <ActivityContent>
                      <ActivityTitle>{activity.title}</ActivityTitle>
                      <ActivityTime>{activity.time}</ActivityTime>
                    </ActivityContent>
                  </ActivityItem>
                ))}
              </ActivityTimeline>
            </Section>
          </ModalContent>
        </Modal>
      )}
    </AnimatePresence>
  );
};

export default DroneDetailModal;

