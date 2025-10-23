import React, { useState } from 'react';
import styled from 'styled-components';
import dayjs from 'dayjs';
import PaymentIcons from './PaymentIcons';
import { formatVND } from '../utils/currency';

const Card = styled.div`
  background: var(--card); 
  border-radius: 16px; 
  box-shadow: var(--shadow); 
  padding: 16px; 
  margin-bottom: 12px;
  border: 1px solid var(--border);
`;

const Row = styled.div`
  display: flex; 
  justify-content: space-between; 
  align-items: center;
`;

const Btn = styled.button`
  background: var(--primary); 
  color: #fff; 
  border: none; 
  padding: 8px 12px; 
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: var(--primary-light);
    transform: translateY(-1px);
  }
`;

const StatusBtn = styled.button<{ status: string }>`
  background: ${props => {
    switch(props.status) {
      case 'Đang chuẩn bị': return '#ff9800';
      case 'Đang giao': return '#2196f3';
      case 'Đã giao': return '#4caf50';
      default: return 'var(--border)';
    }
  }};
  color: #fff;
  border: none;
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    opacity: 0.8;
    transform: translateY(-1px);
  }
`;

type Props = { 
  order: any; 
  index: number;
  onViewDetails?: (orderId: string) => void;
  isAdmin?: boolean;
};

const OrderCard: React.FC<Props> = ({ order, index, onViewDetails, isAdmin }) => {
  const [open, setOpen] = useState(false);

  const updateOrderStatus = (newStatus: string) => {
    // Update order status in localStorage
    const users = JSON.parse(localStorage.getItem('mock_users') || '[]');
    const userIndex = users.findIndex((u: any) => u.phone === order.userPhone);
    
    if (userIndex !== -1) {
      const orderIndex = users[userIndex].orders.findIndex((o: any) => o.id === order.id);
      if (orderIndex !== -1) {
        users[userIndex].orders[orderIndex].status = newStatus;
        localStorage.setItem('mock_users', JSON.stringify(users));
        
        // Update global order history
        const history = JSON.parse(localStorage.getItem('orderHistory') || '[]');
        const historyIndex = history.findIndex((o: any) => o.id === order.id);
        if (historyIndex !== -1) {
          history[historyIndex].status = newStatus;
          localStorage.setItem('orderHistory', JSON.stringify(history));
        }
        
        // Force page refresh to show updated status
        window.location.reload();
      }
    }
  };

  const getNextStatus = (currentStatus: string) => {
    switch(currentStatus) {
      case 'Đang chuẩn bị': return 'Đang giao';
      case 'Đang giao': return 'Đã giao';
      default: return 'Đang chuẩn bị';
    }
  };

  return (
    <Card>
      <Row>
        <div>
          <div style={{ fontWeight: 700 }}>
            Đơn hàng #{index}
            {isAdmin && order.username && (
              <span style={{ fontSize: '12px', color: 'var(--secondaryText)', marginLeft: '8px' }}>
                ({order.username})
              </span>
            )}
          </div>
          <div style={{ color: 'var(--secondaryText)' }}>
            {dayjs(order.time).format('DD/MM/YYYY HH:mm')}
          </div>
          {isAdmin && order.userPhone && (
            <div style={{ color: 'var(--secondaryText)', fontSize: '12px' }}>
              SĐT: {order.userPhone}
            </div>
          )}
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontWeight: 800 }}>
            {(() => {
              if (typeof order.total === 'number' && !isNaN(order.total)) {
                return formatVND(order.total);
              }
              const calculatedTotal = order.items?.reduce((sum: number, i: any) => {
                const price = Number(i.price) || 0;
                const qty = Number(i.qty) || 0;
                return sum + (price * qty);
              }, 0) || 0;
              return formatVND(calculatedTotal);
            })()}
          </div>
          <div style={{ color: 'var(--secondaryText)' }}>
            <PaymentIcons method={order.paymentMethod} />
          </div>
        </div>
      </Row>
      
      <div style={{ marginTop: 8, color: 'var(--text)' }}>
        Giao đến: {order.userInfo?.address}
      </div>
      
      <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span>Trạng thái:</span>
        {isAdmin ? (
          <StatusBtn 
            status={order.status || 'Đang chuẩn bị'}
            onClick={() => updateOrderStatus(getNextStatus(order.status || 'Đang chuẩn bị'))}
          >
            {order.status || 'Đang chuẩn bị'}
          </StatusBtn>
        ) : (
          <strong>{order.status || 'Đang chuẩn bị'}</strong>
        )}
      </div>
      
      <div style={{ marginTop: 8 }}>
        <Btn onClick={() => setOpen(o => !o)}>
          {open ? 'Ẩn chi tiết' : 'Xem chi tiết'}
        </Btn>
        {onViewDetails && (
          <Btn 
            onClick={() => onViewDetails(order.id)} 
            style={{ marginLeft: '8px', background: 'var(--border)', color: 'var(--text)' }}
          >
            Theo dõi drone
          </Btn>
        )}
      </div>
      
      {open && (
        <div style={{ marginTop: 8 }}>
          {order.items?.map((i: any, idx: number) => {
            const price = Number(i.price) || 0;
            const qty = Number(i.qty) || 0;
            return (
              <div key={idx} style={{ marginBottom: 4 }}>
                {i.name} × {qty} — {formatVND(price * qty)}
              </div>
            );
          })}
        </div>
      )}
    </Card>
  );
};

export default OrderCard;


