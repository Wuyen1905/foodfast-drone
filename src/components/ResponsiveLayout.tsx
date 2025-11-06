import React from 'react';
import styled from 'styled-components';

// Simple wrapper that allows natural responsive behavior via CSS media queries
// No manual toggle - layout automatically adapts to screen width
const LayoutContainer = styled.div`
  position: relative;
  width: 100%;
  min-height: 100vh;
  background: var(--bg);
  
  /* Responsive behavior handled automatically by CSS media queries */
  /* No forced mobile frame - layout adapts naturally to screen size */
`;

interface ResponsiveLayoutProps {
  children: React.ReactNode;
}

const ResponsiveLayout: React.FC<ResponsiveLayoutProps> = ({ children }) => {
  return (
    <LayoutContainer>
      {children}
    </LayoutContainer>
  );
};

export default ResponsiveLayout;
