// [Data Sync] Verification utility for mobile to check sync with API

import axios from 'axios';

// [Data Sync] Use shared Spring Boot backend API (same as web frontend)
// Note: Mobile uses direct connection to backend (no proxy)
const API_BASE_URL = 'http://192.168.0.100:8080/api';

/**
 * Verify if mobile orders are synchronized with API
 * Fetches all orders from API and compares with local orders
 */
export const verifyMobileSync = async (localOrders: any[]): Promise<{
  isSynced: boolean;
  localCount: number;
  apiCount: number;
  differences: string[];
}> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/orders`);
    const apiOrders = response.data || [];
    
    const localCount = localOrders.length;
    const apiCount = apiOrders.length;
    
    const differences: string[] = [];
    
    // Check count mismatch
    if (localCount !== apiCount) {
      differences.push(`Count mismatch: local=${localCount}, api=${apiCount}`);
    }
    
    // Check for missing orders in local
    const localIds = new Set(localOrders.map((o: any) => o.id));
    const apiIds = new Set(apiOrders.map((o: any) => o.id));
    
    const missingInLocal = Array.from(apiIds).filter(id => !localIds.has(id));
    const extraInLocal = Array.from(localIds).filter(id => !apiIds.has(id));
    
    if (missingInLocal.length > 0) {
      differences.push(`Missing in local: ${missingInLocal.join(', ')}`);
    }
    
    if (extraInLocal.length > 0) {
      differences.push(`Extra in local: ${extraInLocal.join(', ')}`);
    }
    
    // Check for status mismatches
    const statusMismatches: string[] = [];
    localOrders.forEach((localOrder: any) => {
      const apiOrder = apiOrders.find((a: any) => a.id === localOrder.id);
      if (apiOrder && apiOrder.status !== localOrder.status) {
        statusMismatches.push(`${localOrder.id}: local=${localOrder.status}, api=${apiOrder.status}`);
      }
    });
    
    if (statusMismatches.length > 0) {
      differences.push(`Status mismatches: ${statusMismatches.join('; ')}`);
    }
    
    const isSynced = differences.length === 0;
    
    // Log sync status
    if (isSynced) {
      console.log(`[SYNC OK ✅] Mobile orders synchronized: ${localCount} orders match with API`);
    } else {
      console.warn(`[DESYNC ⚠️] Mobile orders desynchronized:`, differences);
    }
    
    return {
      isSynced,
      localCount,
      apiCount,
      differences
    };
  } catch (error) {
    console.error('[Mobile Sync Verification] Error verifying sync:', error);
    console.warn(`[DESYNC ⚠️] Mobile failed to verify sync with API`);
    return {
      isSynced: false,
      localCount: localOrders.length,
      apiCount: 0,
      differences: [`Error fetching API orders: ${error}`]
    };
  }
};

/**
 * Fetch all orders from API (for mobile)
 */
export const fetchAllOrdersFromAPI = async (): Promise<any[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/orders`);
    return response.data || [];
  } catch (error) {
    console.error('[Mobile Sync] Error fetching orders from API:', error);
    return [];
  }
};

