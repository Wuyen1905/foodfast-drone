import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const NavContainer = styled.nav`
  background: white;
  padding: 15px 30px;
  border-radius: 15px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 15px;
    padding: 20px;
  }
`;

const NavTitle = styled.h2`
  color: #333;
  margin: 0;
  font-size: 24px;
  font-weight: 600;
  
  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 15px;
  
  @media (max-width: 768px) {
    flex-wrap: wrap;
    justify-content: center;
  }
`;

const NavLink = styled.button<{ $active?: boolean }>`
  padding: 10px 20px;
  background: ${props => props.$active ? '#007bff' : 'transparent'};
  color: ${props => props.$active ? 'white' : '#666'};
  border: 2px solid ${props => props.$active ? '#007bff' : '#e1e5e9'};
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
  text-decoration: none;
  
  &:hover {
    background: ${props => props.$active ? '#0056b3' : '#f8f9fa'};
    border-color: ${props => props.$active ? '#0056b3' : '#007bff'};
    color: ${props => props.$active ? 'white' : '#007bff'};
    transform: translateY(-1px);
  }
  
  @media (max-width: 768px) {
    padding: 8px 16px;
    font-size: 14px;
  }
`;

const AdminNavigation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { path: '/admin/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/admin/users', label: 'Users', icon: '👥' },
    { path: '/admin/restaurants', label: 'Restaurants', icon: '🏪' },
    { path: '/admin/orders', label: 'Orders', icon: '📦' }
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <NavContainer>
      <NavTitle>Admin Panel</NavTitle>
      <NavLinks>
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            $active={location.pathname === item.path}
            onClick={() => handleNavigation(item.path)}
          >
            {item.icon} {item.label}
          </NavLink>
        ))}
      </NavLinks>
    </NavContainer>
  );
};

export default AdminNavigation;
