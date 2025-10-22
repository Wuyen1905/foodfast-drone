/**
 * Drone Simulation Service
 * Handles mock drone data and position updates for restaurant dashboard
 */

export interface DroneCoordinates {
  lat: number;
  lng: number;
}

export interface DroneData {
  id: string;
  orderId: string;
  status: 'active' | 'enroute' | 'returning' | 'charging';
  battery: number; // 0-100
  speed: number; // km/h
  currentPosition: DroneCoordinates;
  destination: DroneCoordinates;
  restaurantPosition: DroneCoordinates;
  distanceRemaining: number; // meters
  estimatedArrival: number; // minutes
  progress: number; // 0-100
}

// Mock restaurant location (Hanoi, Vietnam)
const RESTAURANT_LOCATION: DroneCoordinates = {
  lat: 21.0285,
  lng: 105.8542
};

// Helper function to calculate distance between two coordinates (Haversine formula)
function calculateDistance(coord1: DroneCoordinates, coord2: DroneCoordinates): number {
  const R = 6371000; // Earth radius in meters
  const lat1 = coord1.lat * Math.PI / 180;
  const lat2 = coord2.lat * Math.PI / 180;
  const deltaLat = (coord2.lat - coord1.lat) * Math.PI / 180;
  const deltaLng = (coord2.lng - coord1.lng) * Math.PI / 180;

  const a = Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
    Math.cos(lat1) * Math.cos(lat2) *
    Math.sin(deltaLng / 2) * Math.sin(deltaLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}

// Generate random coordinate near restaurant
function generateRandomDestination(): DroneCoordinates {
  const offsetLat = (Math.random() - 0.5) * 0.05; // ~2.5km radius
  const offsetLng = (Math.random() - 0.5) * 0.05;
  
  return {
    lat: RESTAURANT_LOCATION.lat + offsetLat,
    lng: RESTAURANT_LOCATION.lng + offsetLng
  };
}

// Generate mock drone data
export function generateMockDrones(count: number = 8): DroneData[] {
  const drones: DroneData[] = [];
  const statuses: DroneData['status'][] = ['active', 'enroute', 'enroute', 'enroute', 'returning', 'charging'];
  
  for (let i = 0; i < count; i++) {
    const destination = generateRandomDestination();
    const status = statuses[i % statuses.length];
    
    // Calculate starting position based on status
    let currentPosition: DroneCoordinates;
    let progress: number;
    
    if (status === 'charging' || status === 'active') {
      currentPosition = { ...RESTAURANT_LOCATION };
      progress = 0;
    } else if (status === 'returning') {
      progress = 75 + Math.random() * 20;
      currentPosition = {
        lat: destination.lat + (RESTAURANT_LOCATION.lat - destination.lat) * (progress / 100),
        lng: destination.lng + (RESTAURANT_LOCATION.lng - destination.lng) * (progress / 100)
      };
    } else {
      progress = Math.random() * 70;
      currentPosition = {
        lat: RESTAURANT_LOCATION.lat + (destination.lat - RESTAURANT_LOCATION.lat) * (progress / 100),
        lng: RESTAURANT_LOCATION.lng + (destination.lng - RESTAURANT_LOCATION.lng) * (progress / 100)
      };
    }

    const distanceRemaining = calculateDistance(currentPosition, 
      status === 'returning' ? RESTAURANT_LOCATION : destination);
    const speed = 30 + Math.random() * 20; // 30-50 km/h
    const estimatedArrival = Math.round((distanceRemaining / 1000) / speed * 60); // minutes
    
    drones.push({
      id: `DRONE-${String(i + 1).padStart(3, '0')}`,
      orderId: `ORD-${Math.floor(10000 + Math.random() * 90000)}`,
      status,
      battery: status === 'charging' ? 30 + Math.random() * 30 : 60 + Math.random() * 40,
      speed,
      currentPosition,
      destination,
      restaurantPosition: RESTAURANT_LOCATION,
      distanceRemaining: Math.round(distanceRemaining),
      estimatedArrival,
      progress
    });
  }
  
  return drones;
}

// Update drone position (simulate movement)
export function updateDronePosition(drone: DroneData, deltaTime: number = 1): DroneData {
  // Charging mode: recharge battery
  if (drone.status === 'charging') {
    const newBattery = Math.min(100, drone.battery + 2); // Charge at 2% per update
    
    // If fully charged, switch to active mode
    if (newBattery >= 100) {
      return {
        ...drone,
        battery: 100,
        status: 'active',
        progress: 0
      };
    }
    
    return {
      ...drone,
      battery: newBattery
    };
  }

  const target = drone.status === 'returning' ? drone.restaurantPosition : drone.destination;
  const distance = calculateDistance(drone.currentPosition, target);
  
  // If very close to target, change status
  if (distance < 50) {
    if (drone.status === 'returning') {
      // Drone has returned to base - start charging
      return {
        ...drone,
        status: 'charging',
        currentPosition: drone.restaurantPosition,
        progress: 0,
        distanceRemaining: 0,
        estimatedArrival: 0
      };
    } else if (drone.status === 'enroute') {
      // Reached destination - return to base
      return {
        ...drone,
        status: 'returning',
        progress: 0,
        currentPosition: drone.destination
      };
    }
  }

  // Calculate movement
  const speedMetersPerSecond = (drone.speed * 1000) / 3600;
  const distanceToMove = speedMetersPerSecond * deltaTime;
  const ratio = Math.min(distanceToMove / distance, 1);

  const newPosition: DroneCoordinates = {
    lat: drone.currentPosition.lat + (target.lat - drone.currentPosition.lat) * ratio,
    lng: drone.currentPosition.lng + (target.lng - drone.currentPosition.lng) * ratio
  };

  const newDistanceRemaining = calculateDistance(newPosition, target);
  const newEstimatedArrival = Math.round((newDistanceRemaining / 1000) / drone.speed * 60);
  
  // Calculate progress
  const totalDistance = calculateDistance(drone.restaurantPosition, drone.destination);
  const traveledDistance = calculateDistance(drone.restaurantPosition, newPosition);
  const newProgress = Math.min((traveledDistance / totalDistance) * 100, 100);

  // Smart Battery Management: Drain based on distance and speed
  // 1% battery per 5 seconds of flight time = 0.2% per second
  const batteryDrain = 0.2 * deltaTime;
  const newBattery = Math.max(0, drone.battery - batteryDrain);
  
  // Auto-return logic: If battery drops below 10%, force return to base
  let newStatus = drone.status;
  if (newBattery < 10 && drone.status !== 'returning') {
    newStatus = 'returning';
  } else if (newBattery < 20 && newBattery >= 10 && drone.status === 'active') {
    // If battery is low but above 10%, continue current mission but show warning
    newStatus = drone.status;
  }
  
  return {
    ...drone,
    currentPosition: newPosition,
    distanceRemaining: Math.round(newDistanceRemaining),
    estimatedArrival: newStatus === 'returning' ? 0 : newEstimatedArrival, // Pause ETA when returning
    battery: newBattery,
    progress: newProgress,
    status: newStatus
  };
}

// Get status label in Vietnamese
export function getStatusLabel(status: DroneData['status']): string {
  const labels = {
    'active': 'Đang giao hàng',
    'enroute': 'Đang bay tới',
    'returning': 'Đang quay về nhà hàng',
    'charging': 'Đang sạc pin'
  };
  return labels[status];
}

// Get idle status label
export function getIdleLabel(): string {
  return 'Sẵn sàng';
}

// Get status color
export function getStatusColor(status: DroneData['status']): string {
  const colors = {
    'active': '#28a745',
    'enroute': '#ff9800',
    'returning': '#dc3545',
    'charging': '#6c757d'
  };
  return colors[status];
}

// Format distance
export function formatDistance(meters: number): string {
  if (meters < 1000) {
    return `${Math.round(meters)}m`;
  }
  return `${(meters / 1000).toFixed(1)}km`;
}

// Format time
export function formatTime(minutes: number): string {
  if (minutes < 1) {
    return '< 1 phút';
  }
  if (minutes < 60) {
    return `${Math.round(minutes)} phút`;
  }
  const hours = Math.floor(minutes / 60);
  const mins = Math.round(minutes % 60);
  return `${hours}h ${mins}p`;
}
