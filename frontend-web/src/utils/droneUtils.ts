/**
 * Drone utility functions
 * Helper functions for drone data formatting and manipulation
 */

export interface DroneData {
  id: string;
  orderId: string;
  status: 'active' | 'enroute' | 'returning';
  battery: number;
  speed: number;
  currentPosition: { lat: number; lng: number };
  destination: { lat: number; lng: number };
  restaurantPosition: { lat: number; lng: number };
  distanceRemaining: number;
  estimatedArrival: number;
  progress: number;
}

export const getStatusLabel = (status: string): string => {
  const labels: Record<string, string> = {
    'active': 'Sẵn sàng',
    'enroute': 'Đang bay',
    'returning': 'Đang trở về',
    'Idle': 'Sẵn sàng',
    'Delivering': 'Đang giao hàng',
    'Charging': 'Đang sạc',
    'Maintenance': 'Bảo trì'
  };
  return labels[status] || status;
};

export const getStatusColor = (status: string): string => {
  const colors: Record<string, string> = {
    'active': '#28a745',
    'enroute': '#007bff',
    'returning': '#ffc107',
    'Idle': '#28a745',
    'Delivering': '#007bff',
    'Charging': '#ffc107',
    'Maintenance': '#dc3545'
  };
  return colors[status] || '#6c757d';
};

export const formatDistance = (meters: number): string => {
  if (meters < 1000) {
    return `${Math.round(meters)}m`;
  }
  return `${(meters / 1000).toFixed(1)}km`;
};

export const formatTime = (minutes: number): string => {
  if (minutes < 60) {
    return `${Math.round(minutes)} phút`;
  }
  const hours = Math.floor(minutes / 60);
  const mins = Math.round(minutes % 60);
  return `${hours}h ${mins > 0 ? mins + ' phút' : ''}`;
};

export const updateDronePosition = (drone: DroneData, deltaSeconds: number): DroneData => {
  // Simple position update simulation
  // In real app, this would come from backend
  const speedMps = drone.speed / 3.6; // Convert km/h to m/s
  const distanceDelta = speedMps * deltaSeconds;
  
  // Calculate direction vector
  const dx = drone.destination.lng - drone.currentPosition.lng;
  const dy = drone.destination.lat - drone.currentPosition.lat;
  const distance = Math.sqrt(dx * dx + dy * dy);
  
  if (distance < 0.0001) {
    // Reached destination
    return {
      ...drone,
      currentPosition: drone.destination,
      distanceRemaining: 0,
      status: drone.status === 'enroute' ? 'active' : drone.status
    };
  }
  
  // Move towards destination
  const ratio = Math.min(distanceDelta / (distance * 111000), 1); // 111000m per degree
  const newLng = drone.currentPosition.lng + dx * ratio;
  const newLat = drone.currentPosition.lat + dy * ratio;
  
  const newDistance = Math.sqrt(
    Math.pow((drone.destination.lng - newLng) * 111000, 2) +
    Math.pow((drone.destination.lat - newLat) * 111000, 2)
  );
  
  return {
    ...drone,
    currentPosition: { lat: newLat, lng: newLng },
    distanceRemaining: Math.max(0, newDistance),
    progress: Math.min(100, ((drone.distanceRemaining - newDistance) / drone.distanceRemaining) * 100 + drone.progress)
  };
};

