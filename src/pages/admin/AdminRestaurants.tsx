import React, { useState } from 'react';
import styled from 'styled-components';
import { Restaurant } from '@/types/auth';
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

const ActionButton = styled.button<{ variant?: 'Sửa' | 'delete' | 'toggle' }>`
  padding: 8px 16px;
  margin-right: 8px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.3s ease;
  
  ${props => {
    switch (props.variant) {
      case 'Sửa':
        return 'background: #28a745; color: white; &:hover { background: #218838; }';
      case 'delete':
        return 'background: #dc3545; color: white; &:hover { background: #c82333; }';
      case 'toggle':
        return 'background: #ffc107; color: #333; &:hover { background: #e0a800; }';
      default:
        return 'background: #6c757d; color: white; &:hover { background: #5a6268; }';
    }
  }}
`;

const StatusBadge = styled.span<{ active: boolean }>`
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
  
  ${props => props.active ? `
    background: #28a745;
    color: white;
  ` : `
    background: #dc3545;
    color: white;
  `}
`;

const RatingStars = styled.div`
  color: #ffc107;
  font-size: 16px;
`;

const AdminRestaurants: React.FC = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([
    {
      id: 'rest_1',
      name: 'FoodFast Restaurant',
      description: 'Original FoodFast restaurant with drone delivery',
      category: 'Fast Food',
      location: 'Downtown',
      rating: 4.5,
      theme: {
        primary: '#FF6600',
        secondary: '#FF8C00',
        accent: '#FFA500'
      },
      ownerId: 'u1',
      isActive: true,
      createdAt: Date.now() - 86400000 * 30
    },
    {
      id: 'rest_2',
      name: 'SweetDreams Bakery',
      description: 'Bản giao hưởng sô cô la lộng lẫy. Những dòng ganache óng ả, đặc quánh buông lơi như dải lụa mềm, bao trọn lấy cốt bánh ẩm mượt. Trên đỉnh, từng đóa hồng kem bơ sô cô la nở rộ, mời gọi một trải nghiệm ngọt ngào đầy đê mê.',
      category: 'Desserts',
      location: 'Mall District',
      rating: 4.8,
      theme: {
        primary: '#E91E63',
        secondary: '#F06292',
        accent: '#F8BBD9'
      },
      ownerId: 'u3',
      isActive: true,
      createdAt: Date.now() - 86400000 * 7
    },
    {
      id: 'rest_3',
      name: 'Pizza Palace',
      description: 'Authentic Italian pizza with drone delivery',
      category: 'Italian',
      location: 'West Side',
      rating: 4.2,
      theme: {
        primary: '#8B4513',
        secondary: '#A0522D',
        accent: '#D2691E'
      },
      ownerId: 'u4',
      isActive: false,
      createdAt: Date.now() - 86400000 * 14
    }
  ]);

  const handleSửa = (restaurantId: string) => {
    console.log('Sửa restaurant:', restaurantId);
    // Implement Sửa functionality
  };

  const handleDelete = (restaurantId: string) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa nhà hàng này?')) {
      setRestaurants(restaurants.filter(restaurant => restaurant.id !== restaurantId));
    }
  };

  const handleToggleStatus = (restaurantId: string) => {
    setRestaurants(restaurants.map(restaurant => 
      restaurant.id === restaurantId 
        ? { ...restaurant, isActive: !restaurant.isActive }
        : restaurant
    ));
  };

  const handleAddRestaurant = () => {
    console.log('Thêm nhà hàng mới');
    // Implement add restaurant functionality
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString();
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push('★');
    }
    if (hasHalfStar) {
      stars.push('☆');
    }
    return stars.join('');
  };

  return (
    <Container>
      <AdminNavigation />
      <Header>
        <Title>🏪 Quản lý nhà hàng</Title>
        <AddButton onClick={handleAddRestaurant}>
          + Thêm nhà hàng
        </AddButton>
      </Header>

      <TableContainer>
        <Table>
          <thead>
            <tr>
              <TableHeader>Tên</TableHeader>
              <TableHeader>Danh mục</TableHeader>
              <TableHeader>Địa điểm</TableHeader>
              <TableHeader>Đánh giá</TableHeader>
              <TableHeader>Trạng thái</TableHeader>
              <TableHeader>Ngày tạo</TableHeader>
              <TableHeader>Hành động</TableHeader>
            </tr>
          </thead>
          <tbody>
            {restaurants.map((restaurant) => (
              <TableRow key={restaurant.id}>
                <TableCell>
                  <strong>{restaurant.name}</strong>
                  <br />
                  <small style={{ color: '#999' }}>{restaurant.description}</small>
                </TableCell>
                <TableCell>{restaurant.category || '-'}</TableCell>
                <TableCell>{restaurant.location || '-'}</TableCell>
                <TableCell>
                  <RatingStars>
                    {renderStars(restaurant.rating || 0)} {restaurant.rating}
                  </RatingStars>
                </TableCell>
                <TableCell>
                  <StatusBadge active={restaurant.isActive}>
                    {restaurant.isActive ? 'Đang hoạt động' : 'Ngừng hoạt động'}
                  </StatusBadge>
                </TableCell>
                <TableCell>{formatDate(restaurant.createdAt)}</TableCell>
                <TableCell>
                  <ActionButton variant="Sửa" onClick={() => handleSửa(restaurant.id)}>
                    Sửa
                  </ActionButton>
                  <ActionButton variant="toggle" onClick={() => handleToggleStatus(restaurant.id)}>
                    {restaurant.isActive ? 'Ngừng hoạt động' : 'Kích hoạt'}
                  </ActionButton>
                  <ActionButton variant="delete" onClick={() => handleDelete(restaurant.id)}>
                    Xóa
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

export default AdminRestaurants;
