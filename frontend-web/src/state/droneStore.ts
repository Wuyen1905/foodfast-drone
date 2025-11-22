/**
 * Drone state store adapter
 * Provides React hooks for drone data without changing UI state keys
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { startDroneSimulation, stopDroneSimulation, getDroneStates, type Drone } from '@/simulation/droneSim';
import { haversineMeters, estimateEtaSeconds, type Coordinates } from '@/utils/geo';
import type { DroneData } from '@/utils/droneUtils';

// Restaurant location (Ho Chi Minh City)
const RESTAURANT_LOCATION: Coordinates = {
  lat: 10.7820,
  lng: 106.6950
};

/**
 * Convert new Drone format to legacy DroneData format for UI compatibility
 */
function adaptDroneToDroneData(drone: Drone): DroneData {
  // Map status: 'delivering' -> 'enroute', 'arrived' -> 'active', 'returning' -> 'returning'
  let status: DroneData['status'] = 'active';
  if (drone.status === 'delivering') {
    status = 'enroute';
  } else if (drone.status === 'arrived') {
    status = 'active';
  } else if (drone.status === 'returning') {
    status = 'returning';
  }

  // Determine destination (last waypoint or current position if no waypoints)
  const destination: Coordinates = drone.waypoints.length > 0
    ? drone.waypoints[drone.waypoints.length - 1]
    : drone.position;

  // Calculate distance remaining
  const distanceRemaining = haversineMeters(drone.position, destination);

  // Convert speed from m/s to km/h
  const speedKmh = (drone.speedMps * 3600) / 1000;

  // Estimate arrival time in minutes
  const etaSeconds = estimateEtaSeconds(distanceRemaining, drone.speedMps);
  const estimatedArrival = Math.round(etaSeconds / 60);

  // Calculate progress (0-100)
  const totalDistance = haversineMeters(RESTAURANT_LOCATION, destination);
  const traveledDistance = haversineMeters(RESTAURANT_LOCATION, drone.position);
  const progress = totalDistance > 0 ? Math.min((traveledDistance / totalDistance) * 100, 100) : 0;

  // Estimate battery (decrease based on distance traveled)
  const battery = Math.max(20, 100 - (traveledDistance / 1000) * 2); // ~2% per km

  return {
    id: drone.id,
    orderId: drone.orderId || `ORD-${drone.id}`,
    status,
    battery: Math.round(battery),
    speed: Math.round(speedKmh),
    currentPosition: drone.position,
    destination,
    restaurantPosition: RESTAURANT_LOCATION,
    distanceRemaining: Math.round(distanceRemaining),
    estimatedArrival,
    progress: Math.round(progress)
  };
}

export interface UseDronesResult {
  drones: DroneData[];
  loading: boolean;
  error: Error | null;
}

const DEBOUNCE_MS = 400;

/**
 * Hook to get drones for a restaurant
 * Automatically starts simulation and provides debounced updates
 * Returns data in legacy DroneData format for UI compatibility
 */
export function useDrones(restaurant: string): UseDronesResult {
  const [drones, setDrones] = useState<DroneData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const lastUpdateRef = useRef<number>(0);

  useEffect(() => {
    if (!restaurant) {
      setDrones([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    // Start simulation
    const stopSim = startDroneSimulation({ restaurant });

    // Poll for updates with debouncing
    const updateDrones = () => {
      const now = Date.now();
      if (now - lastUpdateRef.current < DEBOUNCE_MS) {
        // Debounce: schedule update
        if (debounceTimerRef.current) {
          clearTimeout(debounceTimerRef.current);
        }
        debounceTimerRef.current = setTimeout(() => {
          try {
            const currentDrones = getDroneStates(restaurant);
            // Adapt to legacy DroneData format
            const adaptedDrones = currentDrones.map(adaptDroneToDroneData);
            setDrones(adaptedDrones);
            setLoading(false);
            setError(null);
            lastUpdateRef.current = Date.now();
          } catch (err) {
            setError(err instanceof Error ? err : new Error('Unknown error'));
            setLoading(false);
          }
        }, DEBOUNCE_MS);
      } else {
        // Update immediately
        try {
          const currentDrones = getDroneStates(restaurant);
          // Adapt to legacy DroneData format
          const adaptedDrones = currentDrones.map(adaptDroneToDroneData);
          setDrones(adaptedDrones);
          setLoading(false);
          setError(null);
          lastUpdateRef.current = Date.now();
        } catch (err) {
          setError(err instanceof Error ? err : new Error('Unknown error'));
          setLoading(false);
        }
      }
    };

    // Initial update
    updateDrones();

    // Poll for updates
    const intervalId = setInterval(updateDrones, 1000);

    return () => {
      stopSim();
      if (intervalId) clearInterval(intervalId);
      if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
    };
  }, [restaurant]);

  return { drones, loading, error };
}

/**
 * Hook to start drone simulation (idempotent bootstrap)
 */
export function useStartDroneSim(restaurant: string): () => void {
  const stopSimRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    if (!restaurant) return;

    // Start simulation (idempotent)
    const stopSim = startDroneSimulation({ restaurant });
    stopSimRef.current = stopSim;

    return () => {
      if (stopSimRef.current) {
        stopSimRef.current();
        stopSimRef.current = null;
      }
    };
  }, [restaurant]);

  return useCallback(() => {
    if (stopSimRef.current) {
      stopSimRef.current();
      stopSimRef.current = null;
    }
  }, []);
}

