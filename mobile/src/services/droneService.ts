/**
 * Drone Service (Mobile)
 * Lightweight service for drone-order relationship management
 * Logic only - no UI changes
 */

import axios from 'axios';
import { getBackendUrl } from '../api/getBackendUrl';

// [Data Sync] Use shared backend API server (same as web frontend)
// Uses auto-detection via getBackendUrl
const API_BASE_URL = getBackendUrl();

/**
 * Get drone by order ID from API
 * [AutoSync Fix - Drone Visibility Patch]
 * Enhanced to check both orderId in drone and droneId in order for robust matching
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
 * Release drone from order
 */
export async function releaseDrone(orderId: string): Promise<boolean> {
  try {
    // Fetch all drones
    const response = await axios.get(`${API_BASE_URL}/drones`);
    const drones = Array.isArray(response.data) ? response.data : [];
    
    // Find the drone assigned to this order
    const assignedDrone = drones.find((d: any) => d.orderId === orderId);
    
    if (!assignedDrone) {
      console.warn(`⚠️ No drone found assigned to order ${orderId}`);
      return false;
    }
    
    // Update drone to release it from the order
    await axios.patch(`${API_BASE_URL}/drones/${assignedDrone.id}`, {
      orderId: null,
      status: 'active'
    });
    
    console.log(`✅ Drone ${assignedDrone.id} released from order ${orderId}`);
    return true;
  } catch (error) {
    console.error(`[droneService] Error releasing drone from order ${orderId}:`, error);
    return false;
  }
}

