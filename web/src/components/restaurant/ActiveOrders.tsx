import React from 'react';
import styled from 'styled-components';
import OrderTracking from './OrderTracking';

interface ActiveOrdersProps {
  restaurantId?: string;
  theme?: {
    primary?: string;
    secondary?: string;
    accent?: string;
  };
}

const OrdersWrapper = styled.div`
  /* Wrapper styling if needed */
`;

const ActiveOrders: React.FC<ActiveOrdersProps> = ({ 
  restaurantId = 'default', 
  theme = {
    primary: '#FF6600',
    secondary: '#e55a00',
    accent: '#ff8534'
  }
}) => {
  return (
    <OrdersWrapper>
      <OrderTracking restaurantId={restaurantId} theme={theme} />
    </OrdersWrapper>
  );
};

export default ActiveOrders;

