/**
 * Drone Simulation Service
 * Provides types and utilities for drone tracking and simulation
 */

export interface DroneData {
  id: string;
  restaurant: string;
  orderId: string | null;
  status: 'delivering' | 'arrived' | 'returning';
  position: {
    lat: number;
    lng: number;
  };
  currentPosition: {
    lat: number;
    lng: number;
  };
  restaurantPosition: {
    lat: number;
    lng: number;
  };
  waypoints: any[];
  speedMps: number;
  speed: number; // km/h
  battery: number; // percentage
  distanceRemaining: number; // meters
  estimatedArrival: number; // seconds
  updatedAt: string;
}

/**
 * Update drone position for simulation
 */
export function updateDronePosition(drone: DroneData, deltaSeconds: number): DroneData {
  if (drone.status !== 'delivering' || !drone.orderId) {
    return drone;
  }

  // Simple simulation: move drone towards destination
  const speedMps = drone.speedMps || 10; // default 10 m/s = 36 km/h
  const distanceMoved = speedMps * deltaSeconds;
  
  // Calculate direction towards destination
  const dx = drone.position.lng - drone.currentPosition.lng;
  const dy = drone.position.lat - drone.currentPosition.lat;
  const distance = Math.sqrt(dx * dx + dy * dy);
  
  if (distance < 0.001) {
    // Reached destination
    return {
      ...drone,
      status: 'arrived',
      currentPosition: drone.position,
      distanceRemaining: 0,
      estimatedArrival: 0
    };
  }
  
  // Move towards destination
  const moveRatio = Math.min(1, distanceMoved / (distance * 111000)); // Convert lat/lng degrees to meters (approx)
  const newLat = drone.currentPosition.lat + dy * moveRatio;
  const newLng = drone.currentPosition.lng + dx * moveRatio;
  const newDistance = Math.sqrt(
    Math.pow((drone.position.lat - newLat) * 111000, 2) +
    Math.pow((drone.position.lng - newLng) * 111000, 2)
  );
  
  return {
    ...drone,
    currentPosition: { lat: newLat, lng: newLng },
    distanceRemaining: newDistance,
    estimatedArrival: newDistance / speedMps,
    speed: speedMps * 3.6 // Convert m/s to km/h
  };
}

/**
 * Get status label in Vietnamese
 */
export function getStatusLabel(status: string): string {
  switch (status?.toLowerCase()) {
    case 'delivering':
      return 'Đang giao hàng';
    case 'arrived':
      return 'Đã đến';
    case 'returning':
      return 'Đang quay về';
    default:
      return status || 'Không xác định';
  }
}

/**
 * Get status color
 */
export function getStatusColor(status: string): string {
  switch (status?.toLowerCase()) {
    case 'delivering':
      return '#28a745'; // green
    case 'arrived':
      return '#007bff'; // blue
    case 'returning':
      return '#6c757d'; // gray
    default:
      return '#6c757d';
  }
}

/**
 * Format distance in meters to readable string
 */
export function formatDistance(meters: number): string {
  if (meters < 1000) {
    return `${Math.round(meters)} m`;
  }
  return `${(meters / 1000).toFixed(1)} km`;
}

/**
 * Format time in seconds to readable string
 */
export function formatTime(seconds: number): string {
  if (seconds < 60) {
    return `${Math.round(seconds)} giây`;
  }
  if (seconds < 3600) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.round(seconds % 60);
    return secs > 0 ? `${minutes} phút ${secs} giây` : `${minutes} phút`;
  }
  const hours = Math.floor(seconds / 3600);
  const mins = Math.round((seconds % 3600) / 60);
  return mins > 0 ? `${hours} giờ ${mins} phút` : `${hours} giờ`;
}

/**
 * Simulate drone (placeholder for backward compatibility)
 */
export const simulateDrone = () => {
  return [];
};

