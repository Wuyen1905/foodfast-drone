/**
 * Drone Path Service
 * Lightweight service for simulating drone movement along a path
 * Logic only - no UI changes
 */

export interface PathPoint {
  x: number;
  y: number;
}

export interface DronePath {
  path: PathPoint[];
}

/**
 * Simulate drone movement along a path
 * Calls callback with each new position as drone moves
 * @param drone - Drone object with path array
 * @param callback - Function called with each new position {x, y}
 * @param intervalMs - Time between movements in milliseconds (default: 2000ms)
 * @returns Cleanup function to stop the simulation
 */
export function simulateDronePath(
  drone: any,
  callback: (position: PathPoint) => void,
  intervalMs: number = 2000
): (() => void) | null {
  if (!drone?.path || !Array.isArray(drone.path) || drone.path.length === 0) {
    console.warn('[dronePathService] No path data available for drone');
    return null;
  }

  let currentIndex = 0;
  
  // Start from first path point
  if (drone.path.length > 0) {
    callback(drone.path[0]);
  }

  // Move to next point every intervalMs
  const intervalId = setInterval(() => {
    currentIndex++;
    
    if (currentIndex >= drone.path.length) {
      // Reached destination
      clearInterval(intervalId);
      return;
    }
    
    const newPos = drone.path[currentIndex];
    callback(newPos);
  }, intervalMs);

  // Return cleanup function
  return () => {
    clearInterval(intervalId);
  };
}

/**
 * Generate a simple path from start to end position
 * Creates 5 waypoints between start and end
 * @param start - Starting position {x, y}
 * @param end - Ending position {x, y}
 * @returns Array of path points
 */
export function generatePath(
  start: PathPoint,
  end: PathPoint,
  waypointCount: number = 5
): PathPoint[] {
  const path: PathPoint[] = [start];
  
  // Generate intermediate waypoints
  for (let i = 1; i < waypointCount; i++) {
    const ratio = i / waypointCount;
    path.push({
      x: start.x + (end.x - start.x) * ratio,
      y: start.y + (end.y - start.y) * ratio
    });
  }
  
  path.push(end);
  return path;
}

/**
 * Convert GPS coordinates (lat/lng) to simple x/y coordinates for visualization
 * Simple linear mapping for display purposes
 * @param position - GPS position {lat, lng}
 * @param bounds - Map bounds {minLat, maxLat, minLng, maxLng}
 * @param width - Display width in pixels
 * @param height - Display height in pixels
 * @returns Mapped x/y coordinates
 */
export function gpsToXY(
  position: { lat: number; lng: number },
  bounds: { minLat: number; maxLat: number; minLng: number; maxLng: number },
  width: number,
  height: number
): PathPoint {
  const latRange = bounds.maxLat - bounds.minLat;
  const lngRange = bounds.maxLng - bounds.minLng;
  
  // Normalize coordinates (0-1 range)
  const normalizedLat = (position.lat - bounds.minLat) / latRange;
  const normalizedLng = (position.lng - bounds.minLng) / lngRange;
  
  // Map to x/y coordinates (flip y-axis for screen coordinates)
  return {
    x: normalizedLng * width,
    y: (1 - normalizedLat) * height // Flip y-axis
  };
}

/**
 * Generate path from drone's waypoints or position
 * Falls back to generated path if no waypoints available
 * @param drone - Drone object with position, waypoints, or destination
 * @returns Array of path points
 */
export function getDronePath(drone: any): PathPoint[] {
  // If drone has explicit path, use it
  if (drone.path && Array.isArray(drone.path) && drone.path.length > 0) {
    return drone.path;
  }

  // If drone has waypoints, convert them to path
  if (drone.waypoints && Array.isArray(drone.waypoints) && drone.waypoints.length > 0) {
    const path: PathPoint[] = [];
    
    // Start from current position
    if (drone.position) {
      path.push({ x: drone.position.lat * 100, y: drone.position.lng * 100 });
    }
    
    // Add waypoints
    drone.waypoints.forEach((wp: any) => {
      path.push({ x: wp.lat * 100, y: wp.lng * 100 });
    });
    
    return path;
  }

  // Fallback: Generate simple path from position
  if (drone.position) {
    const start: PathPoint = { x: drone.position.lat * 100, y: drone.position.lng * 100 };
    // Assume destination is slightly offset
    const end: PathPoint = {
      x: start.x + 0.5,
      y: start.y + 0.5
    };
    return generatePath(start, end);
  }

  // Default path if nothing available
  return [
    { x: 10, y: 10 },
    { x: 20, y: 15 },
    { x: 30, y: 25 },
    { x: 40, y: 30 },
    { x: 50, y: 40 }
  ];
}

