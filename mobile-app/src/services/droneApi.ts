/**
 * Drone API service for communicating with backend API (Mobile)
 * Base URL: http://192.168.0.100:8080/api
 */

import axios from 'axios';

const API_BASE_URL = 'http://192.168.0.100:8080/api';

export interface DronePosition {
  lat: number;
  lng: number;
}

export interface DroneWaypoint {
  lat: number;
  lng: number;
}

export type DroneStatus = 'delivering' | 'arrived' | 'returning';

export interface Drone {
  id: string;
  droneCode: string;
  restaurant: string;
  orderId: string | null;
  status: DroneStatus;
  position: DronePosition;
  waypoints: DroneWaypoint[];
  speedMps: number;
  updatedAt: string;
}

export interface DroneUpdate {
  status?: DroneStatus;
  position?: DronePosition;
  waypoints?: DroneWaypoint[];
  speedMps?: number;
  updatedAt?: string;
}

/**
 * Get a single drone by ID
 * @param id Drone ID
 * @returns Drone data
 */
export async function getDrone(id: string): Promise<Drone> {
  const response = await axios.get<Drone>(`${API_BASE_URL}/drones/${id}`);
  return response.data;
}

/**
 * List all drones for a specific restaurant
 * @param restaurant Restaurant ID
 * @returns Array of drones
 */
export async function listDronesByRestaurant(restaurant: string): Promise<Drone[]> {
  const response = await axios.get<Drone[]>(`${API_BASE_URL}/drones`, {
    params: { restaurant },
  });
  // Filter by restaurant if API doesn't support query params
  const drones = Array.isArray(response.data) ? response.data : [];
  return drones.filter((drone: Drone) => drone.restaurant === restaurant);
}

/**
 * Update a drone's position, status, or other properties
 * @param id Drone ID
 * @param update Partial drone update
 * @returns Updated drone data
 */
export async function patchDrone(id: string, update: DroneUpdate): Promise<Drone> {
  const response = await axios.patch<Drone>(`${API_BASE_URL}/drones/${id}`, update);
  return response.data;
}

