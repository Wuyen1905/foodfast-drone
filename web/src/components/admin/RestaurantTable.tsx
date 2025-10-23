/**
 * Restaurant Table Component
 * Displays and manages all restaurants with full CRUD operations
 */

import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { AdminRestaurant } from '../../types/admin';
import { formatVND } from '../../utils/currency';
import { updateRestaurantStatus } from '../../services/adminService';
import { useAdminAuth } from '../../context/AdminAuthContext';

const Container = styled.div`
  background: white;
  border-radius: 15px;
  padding: 30px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  flex-wrap: wrap;
  gap: 20px;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: 600;
  color: #333;
  margin: 0;
`;

const SearchBar = styled.input`
  padding: 12px 20px;
  border: 2px solid #e1e5e9;
  border-radius: 8px;
  font-size: 14px;
  width: 300px;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #667eea;
  }
  
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const FilterGroup = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

const FilterButton = styled.button<{ $active?: boolean }>`
  padding: 8px 16px;
  border: 2px solid ${props => props.$active ? '#667eea' : '#e1e5e9'};
  background: ${props => props.$active ? '#667eea' : 'white'};
  color: ${props => props.$active ? 'white' : '#666'};
  border-radius: 8px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: #667eea;
    background: ${props => props.$active ? '#5568d3' : '#f8f9fa'};
  }
`;

const TableContainer = styled.div`
  overflow-x: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 900px;
`;

const Thead = styled.thead`
  background: #f8f9fa;
`;

const Th = styled.th`
  padding: 15px;
  text-align: left;
  font-size: 13px;
  font-weight: 600;
  color: #666;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border-bottom: 2px solid #e1e5e9;
`;

const Tbody = styled.tbody``;

const Tr = styled(motion.tr)`
  border-bottom: 1px solid #f0f0f0;
  transition: all 0.3s ease;
  
  &:hover {
    background: #f8f9fa;
  }
`;

const Td = styled.td`
  padding: 18px 15px;
  font-size: 14px;
  color: #333;
`;

const RestaurantName = styled.div`
  font-weight: 600;
  color: #333;
  margin-bottom: 3px;
`;

const RestaurantCategory = styled.div`
  font-size: 12px;
  color: #666;
`;

const StatusBadge = styled.span<{ $status: string }>`
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  background: ${props => {
    switch (props.$status) {
      case 'Active': return '#d4edda';
      case 'Pending': return '#fff3cd';
      case 'Inactive': return '#f8d7da';
      default: return '#e1e5e9';
    }
  }};
  color: ${props => {
    switch (props.$status) {
      case 'Active': return '#155724';
      case 'Pending': return '#856404';
      case 'Inactive': return '#721c24';
      default: return '#666';
    }
  }};
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const ActionButton = styled.button<{ $variant?: 'approve' | 'suspend' | 'edit' }>`
  padding: 8px 14px;
  border: none;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-right: 5px;
  background: ${props => {
    switch (props.$variant) {
      case 'approve': return '#28a745';
      case 'suspend': return '#dc3545';
      case 'edit': return '#007bff';
      default: return '#6c757d';
    }
  }};
  color: white;
  
  &:hover {
    opacity: 0.85;
    transform: translateY(-1px);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

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
  max-width: 500px;
  width: 90%;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
`;

const ModalTitle = styled.h3`
  font-size: 20px;
  font-weight: 600;
  margin: 0 0 15px 0;
  color: #333;
`;

const ModalText = styled.p`
  color: #666;
  margin: 0 0 25px 0;
  line-height: 1.6;
`;

const ModalActions = styled.div`
  display: flex;
  gap: 10px;
  justify-content: flex-end;
`;

const ModalButton = styled.button<{ $primary?: boolean }>`
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  background: ${props => props.$primary ? '#667eea' : '#e1e5e9'};
  color: ${props => props.$primary ? 'white' : '#666'};
  
  &:hover {
    opacity: 0.85;
    transform: translateY(-1px);
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: #999;
`;

interface RestaurantTableProps {
  restaurants: AdminRestaurant[];
  onUpdate: () => void;
}

const RestaurantTable: React.FC<RestaurantTableProps> = ({ restaurants, onUpdate }) => {
  const { admin } = useAdminAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Active' | 'Pending' | 'Inactive'>('All');
  const [modalData, setModalData] = useState<{ restaurant: AdminRestaurant; action: string } | null>(null);

  const filteredRestaurants = restaurants.filter(restaurant => {
    const matchesSearch = restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         restaurant.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || restaurant.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = (restaurant: AdminRestaurant, newStatus: AdminRestaurant['status']) => {
    setModalData({ restaurant, action: newStatus });
  };

  const confirmAction = () => {
    if (!modalData || !admin) return;
    
    const success = updateRestaurantStatus(
      modalData.restaurant.id,
      modalData.action as AdminRestaurant['status'],
      admin.id,
      admin.name
    );
    
    if (success) {
      onUpdate();
      setModalData(null);
    }
  };

  return (
    <Container>
      <Header>
        <Title>Quản lý nhà hàng</Title>
        <SearchBar
          type="text"
          placeholder="Tìm kiếm nhà hàng..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </Header>
      
      <FilterGroup>
        <FilterButton 
          $active={statusFilter === 'All'} 
          onClick={() => setStatusFilter('All')}
        >
          Tất cả ({restaurants.length})
        </FilterButton>
        <FilterButton 
          $active={statusFilter === 'Active'} 
          onClick={() => setStatusFilter('Active')}
        >
          🟢 Hoạt động ({restaurants.filter(r => r.status === 'Active').length})
        </FilterButton>
        <FilterButton 
          $active={statusFilter === 'Pending'} 
          onClick={() => setStatusFilter('Pending')}
        >
          🟠 Chờ duyệt ({restaurants.filter(r => r.status === 'Pending').length})
        </FilterButton>
        <FilterButton 
          $active={statusFilter === 'Inactive'} 
          onClick={() => setStatusFilter('Inactive')}
        >
          🔴 Không hoạt động ({restaurants.filter(r => r.status === 'Inactive').length})
        </FilterButton>
      </FilterGroup>
      
      <TableContainer>
        <Table>
          <Thead>
            <tr>
              <Th>Nhà hàng</Th>
              <Th>Trạng thái</Th>
              <Th>Đơn hàng</Th>
              <Th>Doanh thu</Th>
              <Th>Đánh giá</Th>
              <Th>Máy bay</Th>
              <Th>Thao tác</Th>
            </tr>
          </Thead>
          <Tbody>
            {filteredRestaurants.length === 0 ? (
              <tr>
                <td colSpan={7}>
                  <EmptyState>
                    <div style={{ fontSize: '48px', marginBottom: '15px' }}>🏪</div>
                    <div>Không tìm thấy nhà hàng</div>
                  </EmptyState>
                </td>
              </tr>
            ) : (
              filteredRestaurants.map((restaurant, index) => (
                <Tr
                  key={restaurant.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Td>
                    <RestaurantName>{restaurant.name}</RestaurantName>
                    <RestaurantCategory>{restaurant.category}</RestaurantCategory>
                  </Td>
                  <Td>
                    <StatusBadge $status={restaurant.status}>
                      {restaurant.status}
                    </StatusBadge>
                  </Td>
                  <Td>{restaurant.totalOrders.toLocaleString()}</Td>
                  <Td>{formatVND(restaurant.totalRevenue)}</Td>
                  <Td>
                    <Rating>
                      ⭐ {restaurant.rating.toFixed(1)}
                    </Rating>
                  </Td>
                  <Td>{restaurant.droneCount} chiếc</Td>
                  <Td>
                    {restaurant.status === 'Pending' && (
                      <ActionButton
                        $variant="approve"
                        onClick={() => handleStatusChange(restaurant, 'Active')}
                      >
                        Phê duyệt
                      </ActionButton>
                    )}
                    {restaurant.status === 'Active' && (
                      <ActionButton
                        $variant="suspend"
                        onClick={() => handleStatusChange(restaurant, 'Inactive')}
                      >
                        Tạm ngưng
                      </ActionButton>
                    )}
                    {restaurant.status === 'Inactive' && (
                      <ActionButton
                        $variant="approve"
                        onClick={() => handleStatusChange(restaurant, 'Active')}
                      >
                        Kích hoạt
                      </ActionButton>
                    )}
                  </Td>
                </Tr>
              ))
            )}
          </Tbody>
        </Table>
      </TableContainer>
      
      <AnimatePresence>
        {modalData && (
          <Modal
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setModalData(null)}
          >
            <ModalContent
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              onClick={(e) => e.stopPropagation()}
            >
              <ModalTitle>Xác nhận hành động</ModalTitle>
              <ModalText>
                Bạn có chắc chắn muốn thay đổi trạng thái của <strong>{modalData.restaurant.name}</strong> sang{' '}
                <strong>{modalData.action === 'Active' ? 'Hoạt động' : modalData.action === 'Inactive' ? 'Không hoạt động' : 'Chờ duyệt'}</strong>?
                {modalData.action === 'Inactive' && (
                  <span style={{ display: 'block', marginTop: '10px', color: '#dc3545' }}>
                    ⚠️ Hành động này sẽ tạm thời vô hiệu hóa tất cả dịch vụ của nhà hàng này.
                  </span>
                )}
              </ModalText>
              <ModalActions>
                <ModalButton onClick={() => setModalData(null)}>
                  Hủy
                </ModalButton>
                <ModalButton $primary onClick={confirmAction}>
                  Xác nhận
                </ModalButton>
              </ModalActions>
            </ModalContent>
          </Modal>
        )}
      </AnimatePresence>
    </Container>
  );
};

export default RestaurantTable;

