/**
 * Admin Sidebar Component
 * Professional sidebar navigation for admin dashboard
 */

import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const SidebarContainer = styled(motion.div)`
  width: 280px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  min-height: 100vh;
  padding: 30px 0;
  position: fixed;
  left: 0;
  top: 0;
  box-shadow: 4px 0 20px rgba(0, 0, 0, 0.1);
  z-index: 100;
  
  @media (max-width: 768px) {
    width: 100%;
    min-height: auto;
    position: relative;
    padding: 20px 0;
  }
`;

const Logo = styled.div`
  padding: 0 30px 30px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  margin-bottom: 30px;
`;

const LogoTitle = styled.h1`
  font-size: 24px;
  font-weight: 700;
  margin: 0 0 5px 0;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const LogoSubtitle = styled.p`
  font-size: 12px;
  opacity: 0.8;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const NavSection = styled.div`
  margin-bottom: 30px;
`;

const SectionTitle = styled.div`
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  opacity: 0.6;
  padding: 0 30px;
  margin-bottom: 15px;
`;

const NavItem = styled(motion.div)<{ $active?: boolean }>`
  padding: 15px 30px;
  display: flex;
  align-items: center;
  gap: 15px;
  cursor: pointer;
  position: relative;
  background: ${props => props.$active ? 'rgba(255, 255, 255, 0.15)' : 'transparent'};
  border-left: 3px solid ${props => props.$active ? '#ffffff' : 'transparent'};
  
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 3px;
    background: white;
    opacity: ${props => props.$active ? 1 : 0};
    transition: opacity 0.3s ease;
  }
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

const NavIcon = styled.div`
  font-size: 20px;
  width: 24px;
  text-align: center;
`;

const NavLabel = styled.div`
  font-size: 15px;
  font-weight: 500;
  flex: 1;
`;

const NavBadge = styled.div<{ $color?: string }>`
  background: ${props => props.$color || 'rgba(255, 255, 255, 0.2)'};
  color: white;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 600;
`;

const UserInfo = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 20px 30px;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(0, 0, 0, 0.1);
  
  @media (max-width: 768px) {
    position: relative;
    margin-top: 30px;
  }
`;

const UserName = styled.div`
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 5px;
`;

const UserRole = styled.div`
  font-size: 12px;
  opacity: 0.7;
`;

interface AdminSidebarProps {
  activeTab: 'overview' | 'restaurants' | 'customers' | 'drones' | 'logs';
  onTabChange: (tab: 'overview' | 'restaurants' | 'customers' | 'drones' | 'logs') => void;
  adminName: string;
  stats?: {
    pendingRestaurants?: number;
    maintenanceDrones?: number;
  };
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ 
  activeTab, 
  onTabChange, 
  adminName,
  stats 
}) => {
  return (
    <SidebarContainer
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      transition={{ type: 'spring', stiffness: 100 }}
    >
      <Logo>
        <LogoTitle>
          <span>🚁</span>
          FoodFast Admin
        </LogoTitle>
        <LogoSubtitle>Trung tâm Quản trị</LogoSubtitle>
      </Logo>
      
      <NavSection>
        <SectionTitle>Bảng điều khiển</SectionTitle>
        <NavItem
          $active={activeTab === 'overview'}
          onClick={() => onTabChange('overview')}
          whileHover={{ x: 5 }}
          whileTap={{ scale: 0.98 }}
        >
          <NavIcon>📊</NavIcon>
          <NavLabel>Tổng quan</NavLabel>
        </NavItem>
      </NavSection>
      
      <NavSection>
        <SectionTitle>Quản lý</SectionTitle>
        
        <NavItem
          $active={activeTab === 'restaurants'}
          onClick={() => onTabChange('restaurants')}
          whileHover={{ x: 5 }}
          whileTap={{ scale: 0.98 }}
        >
          <NavIcon>🏪</NavIcon>
          <NavLabel>Nhà hàng</NavLabel>
          {stats?.pendingRestaurants ? (
            <NavBadge $color="#FF6B6B">{stats.pendingRestaurants}</NavBadge>
          ) : null}
        </NavItem>
        
        <NavItem
          $active={activeTab === 'customers'}
          onClick={() => onTabChange('customers')}
          whileHover={{ x: 5 }}
          whileTap={{ scale: 0.98 }}
        >
          <NavIcon>👥</NavIcon>
          <NavLabel>Khách hàng</NavLabel>
        </NavItem>
        
        <NavItem
          $active={activeTab === 'drones'}
          onClick={() => onTabChange('drones')}
          whileHover={{ x: 5 }}
          whileTap={{ scale: 0.98 }}
        >
          <NavIcon>🚁</NavIcon>
          <NavLabel>Đội máy bay</NavLabel>
          {stats?.maintenanceDrones ? (
            <NavBadge $color="#FFA500">{stats.maintenanceDrones}</NavBadge>
          ) : null}
        </NavItem>
      </NavSection>
      
      <NavSection>
        <SectionTitle>Hệ thống</SectionTitle>
        
        <NavItem
          $active={activeTab === 'logs'}
          onClick={() => onTabChange('logs')}
          whileHover={{ x: 5 }}
          whileTap={{ scale: 0.98 }}
        >
          <NavIcon>📋</NavIcon>
          <NavLabel>Nhật ký hệ thống</NavLabel>
        </NavItem>
      </NavSection>
      
      <UserInfo>
        <UserName>{adminName}</UserName>
        <UserRole>Quản trị viên hệ thống</UserRole>
      </UserInfo>
    </SidebarContainer>
  );
};

export default AdminSidebar;

