import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAdminAuth } from '@/context/AdminAuthContext';
import AdminNavigation from '@/components/admin/AdminNavigation';

const DashboardContainer = styled.div`
  min-height: 100vh;
  background: #f8f9fa;
  padding: 20px;
`;

const Header = styled.header`
  background: white;
  padding: 20px 30px;
  border-radius: 15px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h1`
  color: #333;
  margin: 0;
  font-size: 28px;
  font-weight: 600;
`;

const LogoutButton = styled.button`
  padding: 10px 20px;
  background: #dc3545;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
  
  &:hover {
    background: #c82333;
    transform: translateY(-1px);
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 15px;
  }
`;

const StatCard = styled.div`
  background: white;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  }
`;

const StatIcon = styled.div`
  font-size: 48px;
  margin-bottom: 15px;
`;

const StatNumber = styled.div`
  font-size: 32px;
  font-weight: 700;
  color: #333;
  margin-bottom: 5px;
`;

const StatLabel = styled.div`
  color: #666;
  font-size: 16px;
  font-weight: 500;
`;

const NavigationGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 15px;
  }
`;

const NavCard = styled.div`
  background: white;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  }
`;

const NavIcon = styled.div`
  font-size: 48px;
  margin-bottom: 15px;
`;

const NavTitle = styled.h3`
  color: #333;
  margin: 0 0 10px 0;
  font-size: 20px;
  font-weight: 600;
`;

const NavDescription = styled.p`
  color: #666;
  margin: 0;
  font-size: 14px;
`;

const AdminDashboard: React.FC = () => {
  const { admin, logout } = useAdminAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  // Mock data - in a real app, this would come from an API
  const stats = {
    totalUsers: 1247,
    totalRestaurants: 23,
    totalOrders: 8943,
    totalRevenue: 1250000
  };

  const navigationItems = [
    {
      icon: '👥',
      title: 'Manage Users',
      description: 'View, Sửa, and manage user accounts',
      path: '/admin/users'
    },
    {
      icon: '🏪',
      title: 'Manage Restaurants',
      description: 'Oversee restaurant accounts and settings',
      path: '/admin/restaurants'
    },
    {
      icon: '📦',
      title: 'Manage Orders',
      description: 'Monitor and manage all orders',
      path: '/admin/orders'
    },
    {
      icon: '💸',
      title: 'Transactions',
      description: 'View financial reports and transactions',
      path: '/admin/transactions'
    }
  ];

  return (
    <DashboardContainer>
      <AdminNavigation />
      <Header>
        <Title>Admin Dashboard</Title>
        <div>
          <span style={{ marginRight: '15px', color: '#666' }}>
            Welcome, {admin?.name}
          </span>
          <LogoutButton onClick={handleLogout}>
            Logout
          </LogoutButton>
        </div>
      </Header>

      <StatsGrid>
        <StatCard>
          <StatIcon>👥</StatIcon>
          <StatNumber>{stats.totalUsers.toLocaleString()}</StatNumber>
          <StatLabel>Total Users</StatLabel>
        </StatCard>
        <StatCard>
          <StatIcon>🏪</StatIcon>
          <StatNumber>{stats.totalRestaurants}</StatNumber>
          <StatLabel>Total Restaurants</StatLabel>
        </StatCard>
        <StatCard>
          <StatIcon>📦</StatIcon>
          <StatNumber>{stats.totalOrders.toLocaleString()}</StatNumber>
          <StatLabel>Tổng số đơn</StatLabel>
        </StatCard>
        <StatCard>
          <StatIcon>💸</StatIcon>
          <StatNumber>${stats.totalRevenue.toLocaleString()}</StatNumber>
          <StatLabel>Total Revenue</StatLabel>
        </StatCard>
      </StatsGrid>

      <NavigationGrid>
        {navigationItems.map((item, index) => (
          <NavCard key={index} onClick={() => handleNavigation(item.path)}>
            <NavIcon>{item.icon}</NavIcon>
            <NavTitle>{item.title}</NavTitle>
            <NavDescription>{item.description}</NavDescription>
          </NavCard>
        ))}
      </NavigationGrid>
    </DashboardContainer>
  );
};

export default AdminDashboard;
