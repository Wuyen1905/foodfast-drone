/**
 * Drone Summary Bar Component
 * Shows fleet overview statistics
 */

import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { DroneRealtimeData } from '@/services/droneRealtimeService';

const SummaryBar = styled.div`
  background: white;
  border-radius: 12px;
  padding: 20px 25px;
  margin-bottom: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  align-items: center;
`;

const SummaryTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const SummaryStats = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  flex: 1;
`;

const StatItem = styled(motion.div)<{ $color?: string }>`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background: ${props => props.$color || '#f8f9fa'};
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
`;

const StatIcon = styled.span`
  font-size: 18px;
`;

const StatLabel = styled.span`
  color: #666;
`;

const StatValue = styled.span`
  color: #333;
  font-weight: 600;
`;

interface DroneSummaryBarProps {
  drones: DroneRealtimeData[];
}

const DroneSummaryBar: React.FC<DroneSummaryBarProps> = ({ drones }) => {
  // Calculate statistics
  const totalDrones = drones.length;
  const activeDrones = drones.filter(d => d.status === 'active' || d.status === 'delivering').length;
  const deliveringDrones = drones.filter(d => d.status === 'delivering').length;
  const chargingDrones = drones.filter(d => d.status === 'charging' || d.status === 'returning').length;
  const maintenanceDrones = drones.filter(d => d.status === 'maintenance').length;
  const offlineDrones = drones.filter(d => 
    d.connectionStatus === 'lost_signal' || 
    d.connectionStatus === 'disconnected' ||
    d.status === 'offline'
  ).length;

  const stats = [
    {
      icon: '🚁',
      label: 'Tổng số',
      value: totalDrones,
      color: '#e3f2fd'
    },
    {
      icon: '🟢',
      label: 'Đang hoạt động',
      value: activeDrones,
      color: '#e8f5e9'
    },
    {
      icon: '🔵',
      label: 'Đang giao hàng',
      value: deliveringDrones,
      color: '#e3f2fd'
    },
    {
      icon: '🟡',
      label: 'Đang sạc',
      value: chargingDrones,
      color: '#fff9e6'
    },
    {
      icon: '🔧',
      label: 'Bảo trì',
      value: maintenanceDrones,
      color: '#ffe7e7'
    },
    {
      icon: '🔴',
      label: 'Lỗi kết nối',
      value: offlineDrones,
      color: offlineDrones > 0 ? '#ffebee' : '#f5f5f5'
    }
  ];

  return (
    <SummaryBar>
      <SummaryTitle>📊 Tổng quan đội bay</SummaryTitle>
      <SummaryStats>
        {stats.map((stat, index) => (
          <StatItem
            key={stat.label}
            $color={stat.color}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <StatIcon>{stat.icon}</StatIcon>
            <StatLabel>{stat.label}:</StatLabel>
            <StatValue>{stat.value}</StatValue>
          </StatItem>
        ))}
      </SummaryStats>
    </SummaryBar>
  );
};

export default DroneSummaryBar;

