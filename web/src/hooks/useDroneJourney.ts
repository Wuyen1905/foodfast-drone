import { useState, useEffect, useRef, useCallback } from 'react';

// Types
interface DroneJourneyState {
  isActive: boolean;
  currentStage: number;
  progress: number;
  eta: number;
  isPaused: boolean;
}

interface UseDroneJourneyReturn {
  isJourneyActive: boolean;
  journeyProgress: number;
  journeyETA: number;
  currentJourneyStage: number;
  startJourney: () => void;
  pauseJourney: () => void;
  resumeJourney: () => void;
}

// Journey stages configuration
const JOURNEY_STAGES = [
  { duration: 2 * 60, label: 'preparing' },    // 2 minutes - preparing
  { duration: 1 * 60, label: 'departing' },    // 1 minute - departing
  { duration: 12 * 60, label: 'delivering' },  // 12 minutes - delivering
  { duration: 0, label: 'completed' }          // 0 minutes - completed
];

const TOTAL_JOURNEY_TIME = JOURNEY_STAGES.reduce((total, stage) => total + stage.duration, 0);

export const useDroneJourney = (
  orderId: string,
  isActive: boolean
): UseDroneJourneyReturn => {
  // State
  const [journeyState, setJourneyState] = useState<DroneJourneyState>({
    isActive: false,
    currentStage: 0,
    progress: 0,
    eta: 0,
    isPaused: false
  });

  // Refs
  const intervalRef = useRef<NodeJS.Timeout>();
  const startTimeRef = useRef<number>();
  const pausedTimeRef = useRef<number>(0);

  // Calculate journey progress based on elapsed time
  const calculateProgress = useCallback((elapsedSeconds: number): {
    stage: number;
    progress: number;
    eta: number;
  } => {
    let remainingTime = TOTAL_JOURNEY_TIME - elapsedSeconds;
    let currentStage = 0;
    let stageProgress = 0;

    // Find current stage
    for (let i = 0; i < JOURNEY_STAGES.length; i++) {
      const stageDuration = JOURNEY_STAGES[i].duration;
      
      if (remainingTime <= stageDuration) {
        currentStage = i;
        stageProgress = stageDuration > 0 ? (stageDuration - remainingTime) / stageDuration : 1;
        break;
      }
      
      remainingTime -= stageDuration;
    }

    // Calculate overall progress
    const overallProgress = Math.min((elapsedSeconds / TOTAL_JOURNEY_TIME) * 100, 100);
    
    return {
      stage: Math.min(currentStage, JOURNEY_STAGES.length - 1),
      progress: overallProgress,
      eta: Math.max(remainingTime, 0)
    };
  }, []);

  // Update journey state
  const updateJourneyState = useCallback(() => {
    if (!journeyState.isActive || journeyState.isPaused || !startTimeRef.current) {
      return;
    }

    const now = Date.now();
    const elapsedSeconds = (now - startTimeRef.current) / 1000;
    const { stage, progress, eta } = calculateProgress(elapsedSeconds);

    setJourneyState(prev => ({
      ...prev,
      currentStage: stage,
      progress: progress,
      eta: eta
    }));

    // Check if journey is completed
    if (progress >= 100 && eta <= 0) {
      setJourneyState(prev => ({
        ...prev,
        isActive: false,
        currentStage: JOURNEY_STAGES.length - 1,
        progress: 100,
        eta: 0
      }));
    }
  }, [journeyState.isActive, journeyState.isPaused, calculateProgress]);

  // Start journey
  const startJourney = useCallback(() => {
    if (journeyState.isActive) return;

    const now = Date.now();
    startTimeRef.current = now;
    pausedTimeRef.current = 0;

    setJourneyState(prev => ({
      ...prev,
      isActive: true,
      isPaused: false,
      currentStage: 0,
      progress: 0,
      eta: TOTAL_JOURNEY_TIME
    }));

    // Start interval for updates
    intervalRef.current = setInterval(updateJourneyState, 1000);
  }, [journeyState.isActive, updateJourneyState]);

  // Pause journey
  const pauseJourney = useCallback(() => {
    if (!journeyState.isActive || journeyState.isPaused) return;

    const now = Date.now();
    pausedTimeRef.current = now;

    setJourneyState(prev => ({
      ...prev,
      isPaused: true
    }));

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  }, [journeyState.isActive, journeyState.isPaused]);

  // Resume journey
  const resumeJourney = useCallback(() => {
    if (!journeyState.isActive || !journeyState.isPaused) return;

    const now = Date.now();
    const pausedDuration = (now - pausedTimeRef.current) / 1000;
    
    // Adjust start time to account for pause duration
    if (startTimeRef.current) {
      startTimeRef.current += pausedDuration * 1000;
    }

    setJourneyState(prev => ({
      ...prev,
      isPaused: false
    }));

    // Resume interval
    intervalRef.current = setInterval(updateJourneyState, 1000);
  }, [journeyState.isActive, journeyState.isPaused, updateJourneyState]);

  // Handle external active state changes
  useEffect(() => {
    if (isActive && !journeyState.isActive) {
      startJourney();
    } else if (!isActive && journeyState.isActive) {
      setJourneyState(prev => ({
        ...prev,
        isActive: false,
        isPaused: false
      }));
      
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }
  }, [isActive, journeyState.isActive, startJourney]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return {
    isJourneyActive: journeyState.isActive,
    journeyProgress: journeyState.progress,
    journeyETA: journeyState.eta,
    currentJourneyStage: journeyState.currentStage,
    startJourney,
    pauseJourney,
    resumeJourney
  };
};
