/**
 * Drone API service for communicating with Spring Boot backend
 */

import apiClient from '../config/axios';

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
  const response = await apiClient.get<Drone>(`/drones/${id}`);
  return response.data;
}

/**
 * List all drones for a specific restaurant
 * @param restaurant Restaurant ID or name
 * @returns Array of drones
 */
export async function listDronesByRestaurant(restaurant: string): Promise<Drone[]> {
  const response = await apiClient.get<Drone[]>('/drones', {
    params: { restaurantId: restaurant },
  });
  // If API doesn't support restaurantId param, filter client-side
  const drones = Array.isArray(response.data) ? response.data : [];
  if (drones.length > 0 && drones[0].restaurant) {
    return drones.filter((drone: Drone) => 
      drone.restaurant === restaurant || drone.restaurantId === restaurant
    );
  }
  return drones;
}

/**
 * Get all drones (for admin)
 */
export async function getAllDrones(): Promise<Drone[]> {
  const response = await apiClient.get<Drone[]>('/drones');
  return Array.isArray(response.data) ? response.data : [];
}

/**
 * Update a drone's position, status, or other properties
 * @param id Drone ID
 * @param update Partial drone update
 * @returns Updated drone data
 */
export async function patchDrone(id: string, update: DroneUpdate): Promise<Drone> {
  const response = await apiClient.patch<Drone>(`/drones/${id}`, update);
  return response.data;
}
