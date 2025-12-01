/**
 * Order Service (Mobile)
 * Lightweight service for order management and real-time sync
 * Logic only - no UI changes
 */

import axios from 'axios';
import { getBackendUrl } from '../api/getBackendUrl';

// [Data Sync] Use shared backend API server (same as web frontend)
// Uses auto-detection via getBackendUrl
const API_BASE_URL = getBackendUrl();

/**
 * Get order by ID from API
 */
export async function getOrderById(orderId: string): Promise<any | null> {
  try {
    const response = await axios.get(`${API_BASE_URL}/orders/${orderId}`);
    return response.data;
  } catch (error) {
    console.error(`[orderService] Error fetching order ${orderId}:`, error);
    return null;
  }
}

