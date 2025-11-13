// [Data Sync] Verification utility to check if web and mobile orders are in sync

import { fetchOrders } from '../services/orderApiService';
import type { Order } from '../context/OrderContext';

/**
 * Verify if orders are synchronized between web and mobile
 * Compares local orders with API orders to detect desynchronization
 */
export const verifyOrderSync = async (localOrders: Order[]): Promise<{
  isSynced: boolean;
  localCount: number;
  apiCount: number;
  differences: string[];
}> => {
  try {
    const apiOrders = await fetchOrders();
    const localCount = localOrders.length;
    const apiCount = apiOrders.length;
    
    const differences: string[] = [];
    
    // Check count mismatch
    if (localCount !== apiCount) {
      differences.push(`Count mismatch: local=${localCount}, api=${apiCount}`);
    }
    
    // Check for missing orders in local
    const localIds = new Set(localOrders.map(o => o.id));
    const apiIds = new Set(apiOrders.map(o => o.id));
    
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
    localOrders.forEach(localOrder => {
      const apiOrder = apiOrders.find(a => a.id === localOrder.id);
      if (apiOrder && apiOrder.status !== localOrder.status) {
        statusMismatches.push(`${localOrder.id}: local=${localOrder.status}, api=${apiOrder.status}`);
      }
    });
    
    if (statusMismatches.length > 0) {
      differences.push(`Status mismatches: ${statusMismatches.join('; ')}`);
    }
    
    const isSynced = differences.length === 0;
    
    // [Data Sync] Log sync status with detailed information
    if (isSynced) {
      console.log(`[SYNC OK ✅] Web orders synchronized: ${localCount} orders match between local and API`);
      if (localCount > 0) {
        console.log(`[SYNC OK ✅] All order IDs in sync:`, Array.from(localIds).sort().join(', '));
      }
    } else {
      console.warn(`[DESYNC ⚠️] Web orders desynchronized:`, differences);
      if (localIds.size > 0) {
        console.warn(`[DESYNC ⚠️] Local order IDs:`, Array.from(localIds).sort().join(', '));
      }
      if (apiIds.size > 0) {
        console.warn(`[DESYNC ⚠️] API order IDs:`, Array.from(apiIds).sort().join(', '));
      }
    }
    
    return {
      isSynced,
      localCount,
      apiCount,
      differences
    };
  } catch (error) {
    console.error('[Sync Verification] Error verifying sync:', error);
    return {
      isSynced: false,
      localCount: localOrders.length,
      apiCount: 0,
      differences: [`Error fetching API orders: ${error}`]
    };
  }
};

/**
 * Verify sync after a specific operation (create, update, delete)
 */
export const verifySyncAfterOperation = async (
  localOrders: Order[],
  operation: string,
  orderId?: string
): Promise<void> => {
  const result = await verifyOrderSync(localOrders);
  
  if (orderId) {
    console.log(`[Sync Check] After ${operation} order ${orderId}:`, {
      synced: result.isSynced ? '✅' : '⚠️',
      localCount: result.localCount,
      apiCount: result.apiCount
    });
  } else {
    console.log(`[Sync Check] After ${operation}:`, {
      synced: result.isSynced ? '✅' : '⚠️',
      localCount: result.localCount,
      apiCount: result.apiCount
    });
  }
};

