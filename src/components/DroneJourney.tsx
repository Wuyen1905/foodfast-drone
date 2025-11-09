import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion, useAnimation } from 'framer-motion';
import { useDroneJourney } from '../hooks/useDroneJourney';
import toast from 'react-hot-toast';

// Types
interface DroneJourneyProps {
  orderId: string;
  isActive?: boolean;
  onComplete?: () => void;
}

interface JourneyStage {
  id: string;
  icon: string;
  label: string;
  key: 'preparing' | 'departing' | 'delivering' | 'completed';
  color: string;
}

interface DroneState {
  eta: number;
  progress: number;
  currentStep: number;
  isFlying: boolean;
  delivered: boolean;
  distance: number;
  initialEta: number;
}

// Helper Functions
function calculateETA(distanceKm: number): number {
  const speedKmPerMin = 1.5; // Simulated drone speed
  return Math.ceil(distanceKm / speedKmPerMin); // ETA in minutes
}

function generateRandomDistance(): number {
  return Math.floor(Math.random() * 8) + 2; // Random distance between 2-10 km
}

// Styled Components
const JourneyContainer = styled.div`
  margin-top: 24px;
  padding: 24px;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-radius: 16px;
  border: 1px solid #dee2e6;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
`;

const JourneyHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

const JourneyTitle = styled.h3`
  margin: 0;
  color: #495057;
  font-size: 18px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ETADisplay = styled(motion.div)`
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

const DistanceDisplay = styled.div`
  font-size: 12px;
  color: #6c757d;
  margin-top: 4px;
  text-align: center;
`;

const JourneyStages = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 24px;
  position: relative;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }
`;

const StageCard = styled(motion.div)<{ $active?: boolean; $completed?: boolean; $color?: string }>`
  background: ${props => 
    props.$completed ? 'linear-gradient(135deg, #28a745 0%, #20c997 100%)' :
    props.$active ? (props.$color || 'linear-gradient(135deg, #ff9800 0%, #ffc107 100%)') : 
    'var(--card)'};
  color: ${props => props.$active || props.$completed ? 'white' : 'var(--text)'};
  border-radius: 12px;
  padding: 16px 12px;
  text-align: center;
  position: relative;
  transition: all 0.3s ease;
  border: 2px solid ${props => 
    props.$completed ? '#28a745' :
    props.$active ? (props.$color ? props.$color.split(' ')[0] : '#ff9800') : 
    'var(--border)'};
  box-shadow: ${props => props.$active ? '0 4px 12px rgba(255, 152, 0, 0.3)' : 'var(--shadow)'};
  
  ${props => props.$active && `
    transform: translateY(-4px);
    box-shadow: 0 8px 20px rgba(255, 152, 0, 0.4);
  `}
`;

const StageIcon = styled.div`
  font-size: 24px;
  margin-bottom: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
`;

const StageLabel = styled.div`
  font-size: 12px;
  font-weight: 600;
  line-height: 1.3;
  text-align: center;
  
  @media (max-width: 768px) {
    font-size: 11px;
  }
`;

const ProgressSection = styled.div`
  margin-bottom: 24px;
`;

const ProgressBarContainer = styled.div`
  background: #e9ecef;
  border-radius: 10px;
  height: 16px;
  overflow: hidden;
  position: relative;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ProgressFill = styled(motion.div)<{ progress: number }>`
  height: 100%;
  background: linear-gradient(90deg, #ff8c00 ${props => props.progress}%, #e0e0e0 ${props => props.progress}%);
  border-radius: 10px;
  position: relative;
  transition: all 0.8s ease-in-out;
  
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

const DroneAnimation = styled.div`
  min-height: 250px;
  height: 250px;
  background: linear-gradient(135deg, #87CEEB 0%, #98FB98 50%, #F0E68C 100%);
  border-radius: 12px;
  position: relative;
  overflow: visible;
  margin-top: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const DroneIcon = styled(motion.div)`
  font-size: 32px;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3));
  z-index: 10;
  cursor: pointer;
`;

const FlightPath = styled.svg`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  min-height: 250px;
  pointer-events: none;
  overflow: visible;
`;

const PathLine = styled.path`
  stroke: rgba(0, 123, 255, 0.4);
  stroke-width: 4;
  fill: none;
  stroke-dasharray: 8, 8;
  animation: dash 3s linear infinite;
  
  @keyframes dash {
    to { stroke-dashoffset: -16; }
  }
`;

const DroneTrail = styled(motion.div)`
  position: absolute;
  width: 4px;
  height: 4px;
  background: rgba(0, 123, 255, 0.6);
  border-radius: 50%;
  pointer-events: none;
`;

const DroneJourney: React.FC<DroneJourneyProps> = ({
  orderId,
  isActive = false,
  onComplete
}) => {
  const [droneState, setDroneState] = useState<DroneState>({
    eta: 0,
    progress: 0,
    currentStep: 0,
    isFlying: false,
    delivered: false,
    distance: 0,
    initialEta: 0
  });
  
  const droneControls = useAnimation();
  const progressControls = useAnimation();
  const intervalRef = useRef<NodeJS.Timeout>();
  const realtimeUpdateRef = useRef<NodeJS.Timeout>();
  const trailRefs = useRef<HTMLDivElement[]>([]);
  const isInitializedRef = useRef<boolean>(false);
  
  // Journey stages with color coding
  const stages: JourneyStage[] = [
    { id: 'preparing', icon: '📦', label: 'Chuẩn bị hàng tại nhà hàng', key: 'preparing', color: '#6c757d' },
    { id: 'departing', icon: '🚁', label: 'Drone đang rời kho', key: 'departing', color: '#ff9800' },
    { id: 'delivering', icon: '🛬', label: 'Đang giao hàng', key: 'delivering', color: '#2196f3' },
    { id: 'completed', icon: '✅', label: 'Đã giao thành công', key: 'completed', color: '#28a745' }
  ];

  // Load drone state from localStorage - only initialize once per orderId
  useEffect(() => {
    // Prevent state updates during render by using a ref guard
    if (isInitializedRef.current) return;
    
    const savedState = localStorage.getItem(`drone-state-${orderId}`);
    if (savedState) {
      try {
        const parsed = JSON.parse(savedState);
        // Use setTimeout to defer state update to next tick, avoiding render-phase updates
        setTimeout(() => {
          setDroneState(parsed);
          isInitializedRef.current = true;
        }, 0);
      } catch (error) {
        console.error('Error parsing saved drone state:', error);
      }
    } else if (isActive) {
      // Initialize new drone state
      const distance = generateRandomDistance();
      const initialEta = calculateETA(distance);
      const newState: DroneState = {
        eta: initialEta,
        progress: 0,
        currentStep: 0,
        isFlying: true,
        delivered: false,
        distance,
        initialEta
      };
      // Use setTimeout to defer state update to next tick, avoiding render-phase updates
      setTimeout(() => {
        setDroneState(newState);
        localStorage.setItem(`drone-state-${orderId}`, JSON.stringify(newState));
        isInitializedRef.current = true;
      }, 0);
    }
  }, [orderId, isActive]);

  // Reset initialization flag when orderId changes
  useEffect(() => {
    isInitializedRef.current = false;
  }, [orderId]);

  // Save drone state to localStorage whenever it changes
  useEffect(() => {
    if (droneState.distance > 0) {
      localStorage.setItem(`drone-state-${orderId}`, JSON.stringify(droneState));
    }
  }, [droneState, orderId]);

  // ETA countdown timer
  useEffect(() => {
    if (droneState.eta > 0 && droneState.isFlying && !droneState.delivered) {
      intervalRef.current = setInterval(() => {
        setDroneState(prev => {
          const newEta = Math.max(0, prev.eta - 1);
          const newProgress = ((prev.initialEta - newEta) / prev.initialEta) * 100;
          const newStep = Math.floor(newProgress / 25); // 4 steps total
          
          if (newEta === 0) {
            clearInterval(intervalRef.current!);
            // Defer toast and onComplete callback to next tick to avoid updating parent during render
            setTimeout(() => {
              toast.success('🎉 Giao hàng đã hoàn tất!');
              onComplete?.();
            }, 0);
            return {
              ...prev,
              eta: 0,
              progress: 100,
              currentStep: 4,
              isFlying: false,
              delivered: true
            };
          }
          
          return {
            ...prev,
            eta: newEta,
            progress: newProgress,
            currentStep: newStep,
            isFlying: true,
            delivered: false
          };
        });
      }, 1000);
      
      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    }
  }, [droneState.eta, droneState.isFlying, droneState.delivered, droneState.initialEta, onComplete]);

  // [DroneRealtime] Simulated realtime update - polls every 4 seconds to simulate backend updates
  useEffect(() => {
    // Only run realtime simulation when drone is active and flying (simulating "Delivering" status)
    if (isActive && droneState.isFlying && !droneState.delivered && droneState.initialEta > 0) {
      console.info(`[DroneRealtime] Starting realtime simulation for order: ${orderId}`);
      
      realtimeUpdateRef.current = setInterval(() => {
        setDroneState(prev => {
          // Skip if already completed or not flying
          if (prev.delivered || !prev.isFlying || prev.eta <= 0) {
            if (realtimeUpdateRef.current) {
              clearInterval(realtimeUpdateRef.current);
              realtimeUpdateRef.current = undefined;
            }
            return prev;
          }

          // Simulate receiving update from backend API
          // Calculate expected progress based on elapsed time
          const elapsedMinutes = prev.initialEta - prev.eta;
          const totalMinutes = prev.initialEta;
          const expectedProgress = (elapsedMinutes / totalMinutes) * 100;
          
          // Add small random variation to simulate real backend updates (±0.5%)
          const variation = (Math.random() - 0.5) * 1;
          const newProgress = Math.min(100, Math.max(prev.progress, expectedProgress + variation));
          
          // Calculate new ETA based on progress (more conservative to avoid conflicts with main timer)
          const progressIncrease = newProgress - prev.progress;
          const newEta = Math.max(0, Math.floor(prev.eta - (progressIncrease / 100) * prev.initialEta));
          const newStep = Math.floor(newProgress / 25); // 4 steps total
          
          // Log realtime update for debugging
          console.info(`[DroneRealtime] Updating progress: ${Math.round(newProgress)}% | ETA: ${newEta} phút | Order: ${orderId}`);
          
          // Only update if progress has meaningfully changed (avoid unnecessary state updates)
          if (Math.abs(newProgress - prev.progress) < 0.1 && Math.abs(newEta - prev.eta) < 1) {
            return prev;
          }
          
          return {
            ...prev,
            eta: newEta,
            progress: newProgress,
            currentStep: newStep,
            isFlying: true,
            delivered: false
          };
        });
      }, 4000); // Update every 4 seconds (simulating backend polling)
      
      return () => {
        if (realtimeUpdateRef.current) {
          clearInterval(realtimeUpdateRef.current);
          realtimeUpdateRef.current = undefined;
          console.info(`[DroneRealtime] Stopped realtime simulation for order: ${orderId}`);
        }
      };
    } else {
      // Clean up interval if drone is not active
      if (realtimeUpdateRef.current) {
        clearInterval(realtimeUpdateRef.current);
        realtimeUpdateRef.current = undefined;
      }
    }
  }, [isActive, droneState.isFlying, droneState.delivered, droneState.initialEta, orderId]);

  // Animate drone movement along flight path
  useEffect(() => {
    if (droneState.isFlying && !droneState.delivered) {
      const flightPath = [
        { x: 20, y: 60 },
        { x: 120, y: 40 },
        { x: 220, y: 60 },
        { x: 320, y: 60 }
      ];

      const currentPosition = flightPath[Math.min(droneState.currentStep, flightPath.length - 1)];
      
      droneControls.start({
        x: currentPosition.x,
        y: currentPosition.y,
        rotate: [0, 15, -15, 0],
        scale: [1, 1.1, 1],
        transition: { 
          duration: 2, 
          ease: "easeInOut",
          repeat: droneState.isFlying ? Infinity : 0
        }
      });
    }
  }, [droneState.currentStep, droneState.isFlying, droneState.delivered, droneControls]);

  // Animate progress bar
  useEffect(() => {
    progressControls.start({
      width: `${droneState.progress}%`,
      transition: { duration: 0.8, ease: "easeInOut" }
    });
  }, [droneState.progress, progressControls]);

  // Generate flight path SVG
  const generatePathString = (): string => {
    const points = [
      { x: 20, y: 60 },
      { x: 120, y: 40 },
      { x: 220, y: 60 },
      { x: 320, y: 60 }
    ];
    
    return points.map((point, index) => 
      `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`
    ).join(' ');
  };

  // Format ETA display
  const formatETA = (minutes: number): string => {
    if (minutes <= 0) return 'Đã hoàn tất';
    return `${minutes} phút`;
  };

  if (!isActive && !droneState.isFlying && !droneState.delivered) {
    return null;
  }

  return (
    <JourneyContainer>
      <JourneyHeader>
        <JourneyTitle>
          🛩️ Hành trình Drone Giao Hàng
        </JourneyTitle>
        {droneState.eta > 0 && (
          <ETADisplay
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            ⏱️ Còn lại: {formatETA(droneState.eta)}
          </ETADisplay>
        )}
      </JourneyHeader>

      {droneState.distance > 0 && (
        <DistanceDisplay>
          📍 Khoảng cách: {droneState.distance}km
        </DistanceDisplay>
      )}

      <JourneyStages>
        {stages.map((stage, index) => (
          <StageCard
            key={stage.id}
            $active={droneState.currentStep === index}
            $completed={droneState.currentStep > index}
            $color={stage.color}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
          >
            <StageIcon>
              {stage.icon}
            </StageIcon>
            <StageLabel>
              {stage.label}
            </StageLabel>
          </StageCard>
        ))}
      </JourneyStages>

      <ProgressSection>
        <ProgressBarContainer>
          <ProgressFill
            progress={droneState.progress}
            initial={{ width: 0 }}
            animate={progressControls}
          />
        </ProgressBarContainer>
        <ProgressText>
          <span>Tiến độ giao hàng</span>
          <span>{Math.round(droneState.progress)}%</span>
        </ProgressText>
      </ProgressSection>

      <DroneAnimation>
        <FlightPath>
          <PathLine d={generatePathString()} />
        </FlightPath>
        
        <DroneIcon
          animate={droneControls}
          initial={{ x: 20, y: 60 }}
          whileHover={{ scale: 1.2 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          🛩️
        </DroneIcon>
        
        {/* Drone trail effect */}
        {droneState.isFlying && !droneState.delivered && (
          <DroneTrail
            animate={{
              x: [20, 120, 220, 320],
              y: [60, 40, 60, 60],
              opacity: [0, 1, 1, 0]
            }}
            transition={{
              duration: droneState.eta * 10,
              ease: "easeInOut",
              repeat: Infinity
            }}
          />
        )}
      </DroneAnimation>
    </JourneyContainer>
  );
};

export default DroneJourney;
