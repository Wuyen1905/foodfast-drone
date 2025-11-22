/**
 * Customer Table Component
 * Displays and manages all customers with account management features
 */

import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { AdminCustomer } from '../../types/admin';
import { formatVND } from '../../utils/currency';
import { suspendCustomer, reactivateCustomer } from '@/api/adminApi';
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
  margin-bottom: 20px;
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

const CustomerName = styled.div`
  font-weight: 600;
  color: #333;
  margin-bottom: 3px;
`;

const CustomerEmail = styled.div`
  font-size: 12px;
  color: #666;
`;

const StatusBadge = styled.span<{ $status: string }>`
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  background: ${props => props.$status === 'Active' ? '#d4edda' : '#f8d7da'};
  color: ${props => props.$status === 'Active' ? '#155724' : '#721c24'};
`;

const ActionButton = styled.button<{ $variant?: 'suspend' | 'activate' | 'view' }>`
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
      case 'suspend': return '#dc3545';
      case 'activate': return '#28a745';
      case 'view': return '#17a2b8';
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
  max-height: 80vh;
  overflow-y: auto;
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

const ModalButton = styled.button<{ $primary?: boolean; $danger?: boolean }>`
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  background: ${props => props.$danger ? '#dc3545' : props.$primary ? '#667eea' : '#e1e5e9'};
  color: ${props => props.$primary || props.$danger ? 'white' : '#666'};
  
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

const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #f0f0f0;
  
  &:last-child {
    border-bottom: none;
  }
`;

const DetailLabel = styled.span`
  color: #666;
  font-weight: 500;
`;

const DetailValue = styled.span`
  color: #333;
  font-weight: 600;
`;

interface CustomerTableProps {
  customers: AdminCustomer[];
  onUpdate: () => void;
}

type ModalType = 'suspend' | 'activate' | 'view' | null;

const CustomerTable: React.FC<CustomerTableProps> = ({ customers, onUpdate }) => {
  const { admin } = useAdminAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Active' | 'Suspended'>('All');
  const [modalType, setModalType] = useState<ModalType>(null);
  const [selectedCustomer, setSelectedCustomer] = useState<AdminCustomer | null>(null);

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         customer.phone.includes(searchQuery);
    const matchesStatus = statusFilter === 'All' || customer.accountStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const openModal = (customer: AdminCustomer, type: ModalType) => {
    setSelectedCustomer(customer);
    setModalType(type);
  };

  const closeModal = () => {
    setModalType(null);
    setSelectedCustomer(null);
  };

  const handleSuspend = () => {
    if (!selectedCustomer || !admin) return;
    
    const success = suspendCustomer(selectedCustomer.id, admin.id, admin.name);
    if (success) {
      onUpdate();
      closeModal();
    }
  };

  const handleActivate = () => {
    if (!selectedCustomer || !admin) return;
    
    const success = reactivateCustomer(selectedCustomer.id, admin.id, admin.name);
    if (success) {
      onUpdate();
      closeModal();
    }
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <Container>
      <Header>
        <Title>Quản lý khách hàng</Title>
        <SearchBar
          type="text"
          placeholder="Tìm kiếm khách hàng..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </Header>
      
      <FilterGroup>
        <FilterButton 
          $active={statusFilter === 'All'} 
          onClick={() => setStatusFilter('All')}
        >
          Tất cả ({customers.length})
        </FilterButton>
        <FilterButton 
          $active={statusFilter === 'Active'} 
          onClick={() => setStatusFilter('Active')}
        >
          🟢 Hoạt động ({customers.filter(c => c.accountStatus === 'Active').length})
        </FilterButton>
        <FilterButton 
          $active={statusFilter === 'Suspended'} 
          onClick={() => setStatusFilter('Suspended')}
        >
          🔴 Tạm ngưng ({customers.filter(c => c.accountStatus === 'Suspended').length})
        </FilterButton>
      </FilterGroup>
      
      <TableContainer>
        <Table>
          <Thead>
            <tr>
              <Th>Khách hàng</Th>
              <Th>Số điện thoại</Th>
              <Th>Đơn hàng</Th>
              <Th>Tổng chi tiêu</Th>
              <Th>Trạng thái</Th>
              <Th>Ngày tham gia</Th>
              <Th>Thao tác</Th>
            </tr>
          </Thead>
          <Tbody>
            {filteredCustomers.length === 0 ? (
              <tr>
                <td colSpan={7}>
                  <EmptyState>
                    <div style={{ fontSize: '48px', marginBottom: '15px' }}>👥</div>
                    <div>Không tìm thấy khách hàng</div>
                  </EmptyState>
                </td>
              </tr>
            ) : (
              filteredCustomers.map((customer, index) => (
                <Tr
                  key={customer.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Td>
                    <CustomerName>{customer.name}</CustomerName>
                    <CustomerEmail>{customer.email}</CustomerEmail>
                  </Td>
                  <Td>{customer.phone}</Td>
                  <Td>{customer.totalOrders}</Td>
                  <Td>{formatVND(customer.totalSpend)}</Td>
                  <Td>
                    <StatusBadge $status={customer.accountStatus}>
                      {customer.accountStatus}
                    </StatusBadge>
                  </Td>
                  <Td>{formatDate(customer.createdAt)}</Td>
                  <Td>
                    <ActionButton
                      $variant="view"
                      onClick={() => openModal(customer, 'view')}
                    >
                      Xem
                    </ActionButton>
                    {customer.accountStatus === 'Active' ? (
                      <ActionButton
                        $variant="suspend"
                        onClick={() => openModal(customer, 'suspend')}
                      >
                        Tạm ngưng
                      </ActionButton>
                    ) : (
                      <ActionButton
                        $variant="activate"
                        onClick={() => openModal(customer, 'activate')}
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
        {modalType && selectedCustomer && (
          <Modal
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <ModalContent
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              onClick={(e) => e.stopPropagation()}
            >
              {modalType === 'view' && (
                <>
                  <ModalTitle>Chi tiết khách hàng</ModalTitle>
                  <div style={{ marginBottom: '25px' }}>
                    <DetailRow>
                      <DetailLabel>Tên:</DetailLabel>
                      <DetailValue>{selectedCustomer.name}</DetailValue>
                    </DetailRow>
                    <DetailRow>
                      <DetailLabel>Email:</DetailLabel>
                      <DetailValue>{selectedCustomer.email}</DetailValue>
                    </DetailRow>
                    <DetailRow>
                      <DetailLabel>Số điện thoại:</DetailLabel>
                      <DetailValue>{selectedCustomer.phone}</DetailValue>
                    </DetailRow>
                    <DetailRow>
                      <DetailLabel>Tổng đơn hàng:</DetailLabel>
                      <DetailValue>{selectedCustomer.totalOrders}</DetailValue>
                    </DetailRow>
                    <DetailRow>
                      <DetailLabel>Tổng chi tiêu:</DetailLabel>
                      <DetailValue>{formatVND(selectedCustomer.totalSpend)}</DetailValue>
                    </DetailRow>
                    <DetailRow>
                      <DetailLabel>Trạng thái tài khoản:</DetailLabel>
                      <DetailValue>
                        <StatusBadge $status={selectedCustomer.accountStatus}>
                          {selectedCustomer.accountStatus === 'Active' ? 'Hoạt động' : 'Tạm ngưng'}
                        </StatusBadge>
                      </DetailValue>
                    </DetailRow>
                    <DetailRow>
                      <DetailLabel>Ngày tham gia:</DetailLabel>
                      <DetailValue>{formatDate(selectedCustomer.createdAt)}</DetailValue>
                    </DetailRow>
                    {selectedCustomer.lastOrderDate && (
                      <DetailRow>
                        <DetailLabel>Đơn hàng gần nhất:</DetailLabel>
                        <DetailValue>{formatDate(selectedCustomer.lastOrderDate)}</DetailValue>
                      </DetailRow>
                    )}
                  </div>
                  <ModalActions>
                    <ModalButton onClick={closeModal}>Đóng</ModalButton>
                  </ModalActions>
                </>
              )}
              
              {modalType === 'suspend' && (
                <>
                  <ModalTitle>Tạm ngưng tài khoản khách hàng</ModalTitle>
                  <ModalText>
                    Bạn có chắc chắn muốn tạm ngưng tài khoản của <strong>{selectedCustomer.name}</strong>?
                    <span style={{ display: 'block', marginTop: '15px', color: '#dc3545', fontWeight: 500 }}>
                      ⚠️ Hành động này sẽ:
                    </span>
                    <ul style={{ marginTop: '10px', paddingLeft: '20px' }}>
                      <li>Ngăn khách hàng đặt đơn hàng mới</li>
                      <li>Tạm thời vô hiệu hóa quyền truy cập tài khoản</li>
                      <li>Được ghi lại trong hệ thống</li>
                    </ul>
                  </ModalText>
                  <ModalActions>
                    <ModalButton onClick={closeModal}>Hủy</ModalButton>
                    <ModalButton $danger onClick={handleSuspend}>
                      Xác nhận tạm ngưng
                    </ModalButton>
                  </ModalActions>
                </>
              )}
              
              {modalType === 'activate' && (
                <>
                  <ModalTitle>Kích hoạt lại tài khoản khách hàng</ModalTitle>
                  <ModalText>
                    Bạn có chắc chắn muốn kích hoạt lại tài khoản của <strong>{selectedCustomer.name}</strong>?
                    <span style={{ display: 'block', marginTop: '10px', color: '#28a745' }}>
                      ✓ Hành động này sẽ khôi phục toàn bộ quyền truy cập tài khoản và khả năng đặt hàng.
                    </span>
                  </ModalText>
                  <ModalActions>
                    <ModalButton onClick={closeModal}>Hủy</ModalButton>
                    <ModalButton $primary onClick={handleActivate}>
                      Xác nhận kích hoạt
                    </ModalButton>
                  </ModalActions>
                </>
              )}
            </ModalContent>
          </Modal>
        )}
      </AnimatePresence>
    </Container>
  );
};

export default CustomerTable;

