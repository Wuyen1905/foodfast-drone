/**
 * Order Service (Mobile)
 * Lightweight service for order management and real-time sync
 * Logic only - no UI changes
 */

import axios from 'axios';

// [Data Sync] Use shared backend API server (same as web frontend)
// Uses environment variable - required for production
const API_BASE_URL = process.env.API_BASE_URL || 'https://api.foodfast.com/api';

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

