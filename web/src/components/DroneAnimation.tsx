import React, { useState, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';
import { motion, useAnimation } from 'framer-motion';

// Types
interface DronePosition {
  x: number;
  y: number;
}

interface DronePath {
  start: DronePosition;
  end: DronePosition;
  waypoints: DronePosition[];
}

interface DroneAnimationProps {
  orderId: string;
  isActive: boolean;
  onComplete?: () => void;
  deliveryTime?: number; // in minutes
}

// Styled Components
const DroneContainer = styled.div`
  margin-top: 20px;
  padding: 20px;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-radius: 16px;
  border: 1px solid #dee2e6;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
`;

const DroneHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const DroneTitle = styled.h4`
  margin: 0;
  color: #495057;
  font-size: 16px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ETACountdown = styled.div`
  background: linear-gradient(135deg, #007bff 0%, #0056b3 100%);
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
  box-shadow: 0 2px 8px rgba(0, 123, 255, 0.3);
  animation: pulse 2s infinite;
  
  @keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
  }
`;

const MapContainer = styled.div`
  position: relative;
  height: 200px;
  background: linear-gradient(135deg, #87CEEB 0%, #98FB98 50%, #F0E68C 100%);
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 16px;
  box-shadow: inset 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const RoutePath = styled.svg`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
`;

const PathLine = styled.path`
  stroke: rgba(0, 123, 255, 0.3);
  stroke-width: 3;
  fill: none;
  stroke-dasharray: 5, 5;
  animation: dash 2s linear infinite;
  
  @keyframes dash {
    to { stroke-dashoffset: -10; }
  }
`;

const RestaurantMarker = styled(motion.div)`
  position: absolute;
  top: 20px;
  left: 20px;
  width: 32px;
  height: 32px;
  background: linear-gradient(135deg, #dc3545 0%, #c82333 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 16px;
  box-shadow: 0 4px 12px rgba(220, 53, 69, 0.4);
  border: 3px solid white;
  z-index: 10;
`;

const DestinationMarker = styled(motion.div)`
  position: absolute;
  bottom: 20px;
  right: 20px;
  width: 32px;
  height: 32px;
  background: linear-gradient(135deg, #28a745 0%, #1e7e34 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 16px;
  box-shadow: 0 4px 12px rgba(40, 167, 69, 0.4);
  border: 3px solid white;
  z-index: 10;
`;

const DroneIcon = styled(motion.div)`
  position: absolute;
  font-size: 24px;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3));
  z-index: 15;
  cursor: pointer;
`;

const ProgressBarContainer = styled.div`
  margin-bottom: 16px;
`;

const ProgressBar = styled.div`
  height: 12px;
  background: #e9ecef;
  border-radius: 6px;
  overflow: hidden;
  position: relative;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ProgressFill = styled(motion.div)`
  height: 100%;
  background: linear-gradient(90deg, #ff9800 0%, #ffc107 50%, #4caf50 100%);
  border-radius: 6px;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.3) 50%, transparent 100%);
    animation: shimmer 2s infinite;
  }
  
  @keyframes shimmer {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }
`;

const ProgressText = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
  font-size: 12px;
  color: #6c757d;
  font-weight: 500;
`;

const StatusSteps = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
  position: relative;
`;

const StatusStep = styled.div<{ $active?: boolean; $completed?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    top: 16px;
    left: 50%;
    right: -50%;
    height: 3px;
    background: ${props => props.$completed ? '#4caf50' : '#e9ecef'};
    z-index: 1;
    border-radius: 2px;
  }
  
  &:last-child::after {
    display: none;
  }
`;

const StepIcon = styled.div<{ $active?: boolean; $completed?: boolean }>`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: ${props => 
    props.$completed ? 'linear-gradient(135deg, #4caf50 0%, #45a049 100%)' : 
    props.$active ? 'linear-gradient(135deg, #007bff 0%, #0056b3 100%)' : 
    '#e9ecef'};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  z-index: 2;
  position: relative;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
`;

const StepLabel = styled.span<{ $active?: boolean }>`
  margin-top: 8px;
  font-size: 11px;
  font-weight: ${props => props.$active ? '600' : '400'};
  color: ${props => props.$active ? '#007bff' : '#6c757d'};
  text-align: center;
`;

const ControlsContainer = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 16px;
`;

const ControlButton = styled(motion.button)<{ $variant: 'pause' | 'resume' }>`
  padding: 8px 16px;
  border: none;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  background: ${props => props.variant === 'pause' ? '#ffc107' : '#28a745'};
  color: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  }
`;

const DroneAnimation: React.FC<DroneAnimationProps> = ({
  orderId,
  isActive,
  onComplete,
  deliveryTime = 15 // default 15 minutes
}) => {
  // State
  const [currentPosition, setCurrentPosition] = useState<DronePosition>({ x: 20, y: 20 });
  const [progress, setProgress] = useState(0);
  const [eta, setEta] = useState(deliveryTime * 60); // convert to seconds
  const [isPaused, setIsPaused] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  
  // Refs
  const animationRef = useRef<number>();
  const startTimeRef = useRef<number>();
  
  // Animation controls
  const droneControls = useAnimation();
  const progressControls = useAnimation();
  
  // Delivery path
  const deliveryPath: DronePath = {
    start: { x: 20, y: 20 },
    end: { x: 320, y: 160 },
    waypoints: [
      { x: 80, y: 40 },
      { x: 140, y: 60 },
      { x: 200, y: 80 },
      { x: 260, y: 120 }
    ]
  };
  
  // Steps for delivery process
  const deliverySteps = [
    { icon: "🚀", label: "Rời nhà hàng", key: "departure" },
    { icon: "🛫", label: "Đang bay", key: "flying" },
    { icon: "📍", label: "Tiếp cận", key: "approaching" },
    { icon: "✅", label: "Hoàn tất", key: "delivered" }
  ];
  
  // Calculate path length
  const calculatePathLength = useCallback((path: DronePath): number => {
    let totalLength = 0;
    const points = [path.start, ...path.waypoints, path.end];
    
    for (let i = 0; i < points.length - 1; i++) {
      const dx = points[i + 1].x - points[i].x;
      const dy = points[i + 1].y - points[i].y;
      totalLength += Math.sqrt(dx * dx + dy * dy);
    }
    
    return totalLength;
  }, []);
  
  // Calculate current position on path
  const getPositionOnPath = useCallback((progress: number): DronePosition => {
    const points = [deliveryPath.start, ...deliveryPath.waypoints, deliveryPath.end];
    const totalLength = calculatePathLength(deliveryPath);
    const targetLength = (progress / 100) * totalLength;
    
    let currentLength = 0;
    
    for (let i = 0; i < points.length - 1; i++) {
      const dx = points[i + 1].x - points[i].x;
      const dy = points[i + 1].y - points[i].y;
      const segmentLength = Math.sqrt(dx * dx + dy * dy);
      
      if (currentLength + segmentLength >= targetLength) {
        const segmentProgress = (targetLength - currentLength) / segmentLength;
        return {
          x: points[i].x + dx * segmentProgress,
          y: points[i].y + dy * segmentProgress
        };
      }
      
      currentLength += segmentLength;
    }
    
    return deliveryPath.end;
  }, [deliveryPath, calculatePathLength]);
  
  // Animation loop
  const animate = useCallback((timestamp: number) => {
    if (!startTimeRef.current) {
      startTimeRef.current = timestamp;
    }
    
    if (!isPaused) {
      const elapsed = (timestamp - startTimeRef.current) / 1000; // seconds
      const totalTime = deliveryTime * 60; // total time in seconds
      const newProgress = Math.min((elapsed / totalTime) * 100, 100);
      const newEta = Math.max(totalTime - elapsed, 0);
      
      setProgress(newProgress);
      setEta(newEta);
      
      // Update drone position
      const newPosition = getPositionOnPath(newProgress);
      setCurrentPosition(newPosition);
      
      // Update current step
      const stepIndex = Math.floor((newProgress / 100) * deliverySteps.length);
      setCurrentStep(Math.min(stepIndex, deliverySteps.length - 1));
      
      // Complete delivery when finished
      if (newProgress >= 100 && eta > 0) {
        setEta(0);
        onComplete?.();
        return;
      }
    }
    
    if (progress < 100) {
      animationRef.current = requestAnimationFrame(animate);
    }
  }, [isPaused, deliveryTime, eta, progress, deliverySteps.length, getPositionOnPath, onComplete]);
  
  // Start/stop animation based on isActive
  useEffect(() => {
    if (isActive && !isPaused) {
      startTimeRef.current = undefined;
      animationRef.current = requestAnimationFrame(animate);
    } else {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    }
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isActive, isPaused, animate]);
  
  // Animate drone movement
  useEffect(() => {
    droneControls.start({
      x: currentPosition.x,
      y: currentPosition.y,
      transition: { duration: 0.1, ease: "linear" }
    });
  }, [currentPosition, droneControls]);
  
  // Animate progress bar
  useEffect(() => {
    progressControls.start({
      width: `${progress}%`,
      transition: { duration: 0.1, ease: "linear" }
    });
  }, [progress, progressControls]);
  
  // Format ETA
  const formatETA = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes} phút ${remainingSeconds} giây`;
  };
  
  // Generate path for SVG
  const generatePathString = (): string => {
    const points = [deliveryPath.start, ...deliveryPath.waypoints, deliveryPath.end];
    return points.map((point, index) => 
      `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`
    ).join(' ');
  };
  
  return (
    <DroneContainer>
      <DroneHeader>
        <DroneTitle>
          🛩️ Hành trình Drone
        </DroneTitle>
        {eta > 0 && (
          <ETACountdown>
            ⏱️ Còn lại: {formatETA(eta)}
          </ETACountdown>
        )}
      </DroneHeader>
      
      <MapContainer>
        <RoutePath>
          <PathLine d={generatePathString()} />
        </RoutePath>
        
        <RestaurantMarker
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          🏪
        </RestaurantMarker>
        
        <DestinationMarker
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        >
          🏠
        </DestinationMarker>
        
        <DroneIcon
          animate={droneControls}
          initial={{ x: deliveryPath.start.x, y: deliveryPath.start.y }}
          whileHover={{ scale: 1.2 }}
        >
          🛩️
        </DroneIcon>
      </MapContainer>
      
      <ProgressBarContainer>
        <ProgressBar>
          <ProgressFill
            initial={{ width: 0 }}
            animate={progressControls}
          />
        </ProgressBar>
        <ProgressText>
          <span>Tiến độ giao hàng</span>
          <span>{Math.round(progress)}%</span>
        </ProgressText>
      </ProgressBarContainer>
      
      <StatusSteps>
        {deliverySteps.map((step, index) => (
          <StatusStep
            key={step.key}
            $active={currentStep === index}
            $completed={currentStep > index || eta === 0}
          >
            <StepIcon
              $active={currentStep === index}
              $completed={currentStep > index || eta === 0}
            >
              {step.icon}
            </StepIcon>
            <StepLabel $active={currentStep === index}>
              {step.label}
            </StepLabel>
          </StatusStep>
        ))}
      </StatusSteps>
      
      <ControlsContainer>
        <ControlButton
          $variant={isPaused ? 'resume' : 'pause'}
          onClick={() => setIsPaused(!isPaused)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isPaused ? '▶️ Tiếp tục' : '⏸️ Tạm dừng'}
        </ControlButton>
      </ControlsContainer>
    </DroneContainer>
  );
};

export default DroneAnimation;
