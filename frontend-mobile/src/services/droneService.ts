/**
 * Drone Service (Mobile Frontend)
 * Lightweight service for drone-order relationship management and path simulation
 * [Bind simulateDronePath Fix]
 */

import axios from 'axios';

// [Data Sync] Use shared Spring Boot backend API (same as web frontend)
const API_BASE_URL = 'http://192.168.0.100:8080/api';

export interface PathPoint {
  x: number;
  y: number;
}

/**
 * Get drone by order ID from API
 * [Bind simulateDronePath Fix]
 */
export async function getDroneByOrder(orderId: string): Promise<any | null> {
  try {
    // Fetch order to get droneId if available
    let orderData = null;
    try {
      const orderResponse = await axios.get(`${API_BASE_URL}/orders/${orderId}`);
      orderData = orderResponse.data;
    } catch (err) {
      // Order might not exist, continue with drone search
      console.warn(`[droneService] Could not fetch order ${orderId}, searching by orderId only`);
    }
    
    // Fetch all drones
    const response = await axios.get(`${API_BASE_URL}/drones`);
    const drones = Array.isArray(response.data) ? response.data : [];
    
    // First try: Find drone by orderId field in drone
    let assignedDrone = drones.find((d: any) => d.orderId === orderId);
    
    // Second try: If order has droneId, find drone by ID
    if (!assignedDrone && orderData?.droneId) {
      assignedDrone = drones.find((d: any) => d.id === orderData.droneId);
    }
    
    return assignedDrone || null;
  } catch (error) {
    console.error(`[droneService] Error fetching drone for order ${orderId}:`, error);
    return null;
  }
}

/**
 * Simulate drone movement along a path
 * [Bind simulateDronePath Fix]
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
    console.warn('[droneService] No path data available for drone');
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
 * Generate path from drone's waypoints or position
 * Falls back to default path if no waypoints available
 * [Bind simulateDronePath Fix]
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

  // Default path if nothing available
  return [
    { x: 10, y: 10 },
    { x: 20, y: 15 },
    { x: 30, y: 25 },
    { x: 40, y: 30 },
    { x: 50, y: 40 }
  ];
}

