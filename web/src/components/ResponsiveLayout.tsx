import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const LayoutContainer = styled.div<{ viewMode: 'mobile' | 'desktop' }>`
  position: relative;
  transition: all 0.3s ease;
  
  ${props => props.viewMode === 'mobile' && `
    max-width: 375px;
    margin: 0 auto;
    border: 2px solid var(--border);
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 10px 30px rgba(0,0,0,0.2);
    background: var(--card);
  `}
  
  ${props => props.viewMode === 'desktop' && `
    max-width: 100%;
    margin: 0;
    border: none;
    border-radius: 0;
    box-shadow: none;
  `}
`;

const ToggleContainer = styled.div`
  position: fixed;
  top: 80px;
  right: 20px;
  z-index: 1000;
  display: flex;
  gap: 8px;
  background: var(--card);
  padding: 8px;
  border-radius: 12px;
  box-shadow: var(--shadow-md);
  border: 1px solid var(--border);
`;

const ToggleButton = styled(motion.button)<{ active: boolean }>`
  padding: 8px 12px;
  border: none;
  border-radius: 8px;
  background: ${props => props.active ? 'var(--primary)' : 'transparent'};
  color: ${props => props.active ? '#fff' : 'var(--text)'};
  cursor: pointer;
  font-size: 12px;
  font-weight: 600;
  transition: all 0.2s ease;
  
  &:hover {
    background: ${props => props.active ? 'var(--primary)' : 'var(--border)'};
  }
`;

const MobileFrame = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow-y: auto;
  background: var(--bg);
`;

const DesktopFrame = styled.div`
  position: relative;
  width: 100%;
  min-height: 100vh;
  background: var(--bg);
`;

interface ResponsiveLayoutProps {
  children: React.ReactNode;
}

const ResponsiveLayout: React.FC<ResponsiveLayoutProps> = ({ children }) => {
  const [viewMode, setViewMode] = useState<'mobile' | 'desktop'>('desktop');

  return (
    <>
      <ToggleContainer>
        <ToggleButton
          active={viewMode === 'mobile'}
          onClick={() => setViewMode('mobile')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          📱 Mobile
        </ToggleButton>
        <ToggleButton
          active={viewMode === 'desktop'}
          onClick={() => setViewMode('desktop')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          💻 Desktop
        </ToggleButton>
      </ToggleContainer>
      
      <LayoutContainer viewMode={viewMode}>
        {viewMode === 'mobile' ? (
          <MobileFrame>
            {children}
          </MobileFrame>
        ) : (
          <DesktopFrame>
            {children}
          </DesktopFrame>
        )}
      </LayoutContainer>
    </>
  );
};

export default ResponsiveLayout;
