import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { formatVND } from '../../utils/currency';

interface QuickStatsProps {
  stats: {
    totalCustomers: number;
    totalOrders: number;
    activeDrones: number;
    completedDeliveries: number;
    todayRevenue?: number;
    avgDeliveryTime?: number;
  };
  theme?: {
    primary?: string;
    secondary?: string;
  };
}

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 24px;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 16px;
  }
`;

const StatCard = styled(motion.div)`
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  border: 1px solid #e1e5e9;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, var(--gradient-start), var(--gradient-end));
  }
`;

const StatIcon = styled.div<{ $gradient: string }>`
  width: 56px;
  height: 56px;
  border-radius: 14px;
  background: ${props => props.$gradient};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  margin-bottom: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const StatValue = styled.div`
  font-size: 36px;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 6px;
  line-height: 1;
`;

const StatLabel = styled.div`
  color: #6c757d;
  font-size: 14px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const StatChange = styled.div<{ $positive: boolean }>`
  font-size: 12px;
  margin-top: 8px;
  color: ${props => props.$positive ? '#28a745' : '#dc3545'};
  font-weight: 600;
  
  &::before {
    content: '${props => props.$positive ? '↗' : '↘'}';
    margin-right: 4px;
  }
`;

const QuickStats: React.FC<QuickStatsProps> = ({ stats, theme }) => {
  const statCards = [
    {
      id: 'customers',
      icon: '👥',
      value: stats.totalCustomers,
      label: 'Tổng khách hàng',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      gradientStart: '#667eea',
      gradientEnd: '#764ba2',
    },
    {
      id: 'orders',
      icon: '📦',
      value: stats.totalOrders,
      label: 'Tổng đơn hàng',
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      gradientStart: '#f093fb',
      gradientEnd: '#f5576c',
    },
    {
      id: 'drones',
      icon: '🚁',
      value: stats.activeDrones,
      label: 'Drone đang bay',
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      gradientStart: '#4facfe',
      gradientEnd: '#00f2fe',
    },
    {
      id: 'completed',
      icon: '✅',
      value: stats.completedDeliveries,
      label: 'Đã hoàn tất',
      gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      gradientStart: '#43e97b',
      gradientEnd: '#38f9d7',
    },
  ];

  // Add optional stats if provided
  if (stats.todayRevenue !== undefined) {
    statCards.push({
      id: 'revenue',
      icon: '💰',
      value: stats.todayRevenue,
      label: 'Doanh thu hôm nay',
      gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
      gradientStart: '#fa709a',
      gradientEnd: '#fee140',
    });
  }

  if (stats.avgDeliveryTime !== undefined) {
    statCards.push({
      id: 'avgTime',
      icon: '⏱️',
      value: stats.avgDeliveryTime,
      label: 'TG giao TB (phút)',
      gradient: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
      gradientStart: '#30cfd0',
      gradientEnd: '#330867',
    });
  }

  return (
    <StatsGrid>
      {statCards.map((stat, index) => (
        <StatCard
          key={stat.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          style={{
            '--gradient-start': stat.gradientStart,
            '--gradient-end': stat.gradientEnd,
          } as React.CSSProperties}
        >
          <StatIcon $gradient={stat.gradient}>
            {stat.icon}
          </StatIcon>
          <StatValue>
            {stat.id === 'revenue' && typeof stat.value === 'number'
              ? formatVND(stat.value)
              : stat.value}
          </StatValue>
          <StatLabel>{stat.label}</StatLabel>
        </StatCard>
      ))}
    </StatsGrid>
  );
};

export default QuickStats;

