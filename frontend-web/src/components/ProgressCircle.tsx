import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

interface ProgressCircleProps {
  progress: number; // 0-100
  size?: number;
  strokeWidth?: number;
  color?: string;
  animated?: boolean;
}

const CircleContainer = styled.div<{ size: number }>`
  position: relative;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  display: inline-block;
`;

const SVG = styled.svg`
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);
`;

const BackgroundCircle = styled.circle<{ strokeWidth: number }>`
  fill: none;
  stroke: #e5e5e5;
  stroke-width: ${props => props.strokeWidth};
`;

const ProgressCircleElement = styled(motion.circle)<{ strokeWidth: number; color: string }>`
  fill: none;
  stroke: ${props => props.color};
  stroke-width: ${props => props.strokeWidth};
  stroke-linecap: round;
  stroke-dasharray: 283;
  stroke-dashoffset: 283;
  transition: stroke-dashoffset 0.3s ease;
`;

const ProgressText = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 14px;
  font-weight: 600;
  color: var(--text);
`;

const ProgressCircle: React.FC<ProgressCircleProps> = ({
  progress,
  size = 80,
  strokeWidth = 6,
  color = '#FF6600',
  animated = true
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <CircleContainer size={size}>
      <SVG>
        <BackgroundCircle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
        />
        <ProgressCircleElement
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          color={color}
          strokeDasharray={circumference}
          strokeDashoffset={animated ? strokeDashoffset : circumference}
          animate={animated ? { strokeDashoffset } : {}}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        />
      </SVG>
      <ProgressText>
        {Math.round(progress)}%
      </ProgressText>
    </CircleContainer>
  );
};

export default ProgressCircle;
