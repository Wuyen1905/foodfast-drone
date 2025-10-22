import React, { useState } from 'react';
import styled from 'styled-components';
import { User } from '@/types/auth';
import AdminNavigation from '@/components/admin/AdminNavigation';

const Container = styled.div`
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

const AddButton = styled.button`
  padding: 12px 24px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
  
  &:hover {
    background: #0056b3;
    transform: translateY(-1px);
  }
`;

const TableContainer = styled.div`
  background: white;
  border-radius: 15px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  
  @media (max-width: 768px) {
    overflow-x: auto;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.th`
  background: #f8f9fa;
  padding: 20px;
  text-align: left;
  font-weight: 600;
  color: #333;
  border-bottom: 1px solid #e9ecef;
`;

const TableCell = styled.td`
  padding: 20px;
  border-bottom: 1px solid #e9ecef;
  color: #666;
`;

const TableRow = styled.tr`
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: #f8f9fa;
  }
`;

const ActionButton = styled.button<{ $variant?: 'Sửa' | 'delete' }>`
  padding: 8px 16px;
  margin-right: 8px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.3s ease;
  
  ${props => props.$variant === 'Sửa' ? `
    background: #28a745;
    color: white;
    &:hover {
      background: #218838;
    }
  ` : `
    background: #dc3545;
    color: white;
    &:hover {
      background: #c82333;
    }
  `}
`;

const StatusBadge = styled.span<{ $status: string }>`
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
  
  ${props => {
    switch (props.$status) {
      case 'admin':
        return 'background: #dc3545; color: white;';
      case 'restaurant':
        return 'background: #ffc107; color: #333;';
      case 'customer':
        return 'background: #28a745; color: white;';
      default:
        return 'background: #6c757d; color: white;';
    }
  }}
`;

const AdminUsers: React.FC = () => {
  const [users, setUsers] = useState<User[]>([
    {
      id: 'u1',
      name: 'Admin User',
      username: 'admin',
      role: 'admin',
      email: 'admin@foodfast.com',
      orderCount: 0,
      createdAt: Date.now() - 86400000 * 365
    },
    {
      id: 'u2',
      name: 'John Doe',
      username: 'john_doe',
      role: 'customer',
      phone: '0123456789',
      email: 'john@example.com',
      orderCount: 15,
      createdAt: Date.now() - 86400000 * 30
    },
    {
      id: 'u3',
      name: 'Jane Smith',
      username: 'jane_smith',
      role: 'customer',
      phone: '0987654321',
      email: 'jane@example.com',
      orderCount: 8,
      createdAt: Date.now() - 86400000 * 15
    },
    {
      id: 'u4',
      name: 'Restaurant Owner',
      username: 'restaurant_owner',
      role: 'restaurant',
      email: 'owner@restaurant.com',
      restaurantId: 'rest_1',
      orderCount: 0,
      createdAt: Date.now() - 86400000 * 60
    }
  ]);

  const handleSửa = (userId: string) => {
    console.log('Sửa user:', userId);
    // Implement edit functionality
  };

  const handleDelete = (userId: string) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(user => user.id !== userId));
    }
  };

  const handleAddUser = () => {
    console.log('Add new user');
    // Implement add user functionality
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString();
  };

  return (
    <Container>
      <AdminNavigation />
      <Header>
        <Title>👥 Manage Users</Title>
        <AddButton onClick={handleAddUser}>
          + Add User
        </AddButton>
      </Header>

      <TableContainer>
        <Table>
          <thead>
            <tr>
              <TableHeader>Name</TableHeader>
              <TableHeader>Email</TableHeader>
              <TableHeader>Phone</TableHeader>
              <TableHeader>Role</TableHeader>
              <TableHeader>Orders</TableHeader>
              <TableHeader>Created</TableHeader>
              <TableHeader>Actions</TableHeader>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <strong>{user.name}</strong>
                  <br />
                  <small style={{ color: '#999' }}>@{user.username}</small>
                </TableCell>
                <TableCell>{user.email || '-'}</TableCell>
                <TableCell>{user.phone || '-'}</TableCell>
                <TableCell>
                  <StatusBadge $status={user.role}>
                    {user.role.toUpperCase()}
                  </StatusBadge>
                </TableCell>
                <TableCell>{user.orderCount || 0}</TableCell>
                <TableCell>{formatDate(user.createdAt || Date.now())}</TableCell>
                <TableCell>
                  <ActionButton $variant="Sửa" onClick={() => handleSửa(user.id)}>
                    Edit
                  </ActionButton>
                  <ActionButton $variant="delete" onClick={() => handleDelete(user.id)}>
                    Delete
                  </ActionButton>
                </TableCell>
              </TableRow>
            ))}
          </tbody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default AdminUsers;
