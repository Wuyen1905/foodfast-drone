import React from 'react';
import styled from 'styled-components';
import MenuManagement from './MenuManagement';

interface MyMenuProps {
  restaurantId?: string;
  theme?: {
    primary?: string;
    secondary?: string;
    accent?: string;
  };
}

const MenuWrapper = styled.div`
  /* Wrapper styling if needed */
`;

const MyMenu: React.FC<MyMenuProps> = ({ 
  restaurantId = 'default',
  theme = {
    primary: '#FF6600',
    secondary: '#e55a00',
    accent: '#ff8534'
  }
}) => {
  return (
    <MenuWrapper>
      <MenuManagement restaurantId={restaurantId} theme={theme} />
    </MenuWrapper>
  );
};

export default MyMenu;

