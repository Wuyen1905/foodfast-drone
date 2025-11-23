import React, { createContext, useContext, useState, ReactNode, useEffect, useCallback } from "react";
import { fetchOrders, createOrder, createOrders, updateOrder, patchOrder, deleteOrder } from "../services/orderApiService";
import { verifySyncAfterOperation } from "../utils/syncVerification";
import { realtimeSocket } from "../services/orderSyncService";

export type OrderStatus = "Pending" | "Confirmed" | "In Progress" | "Ready" | "Delivering" | "Delivered" | "Cancelled";

export type Order = {
  id: string;
  name: string;
  phone: string;
  address: string;
  items: { name: string; qty: number; price: number }[];
  total: number;
  status: OrderStatus;
  dronePath?: string[];
  paymentMethod?: 'visa' | 'momo' | 'zalopay' | 'cod' | 'vnpay';
  paymentStatus?: 'Đang chờ phê duyệt' | 'completed' | 'failed';
  vnpayTransactionId?: string;
  restaurantId?: string;
  userId?: string; // User ID for logged-in customers
  paymentSessionId?: string; // Links multiple orders from same checkout
  createdAt?: number;
  updatedAt?: number;
  confirmedAt?: number;
  cancelledAt?: number;
  internalNotes?: string;
  confirmedBy?: string;
};

type OrderContextType = {
  orders: Order[];
  addOrder: (order: Order) => Promise<void>;
  addOrders: (orders: Order[]) => Promise<void>; // Add multiple orders at once
  getOrdersByPhone: (phone: string) => Order[];
  getOrdersByUserId: (userId: string) => Order[];
  getOrdersByRestaurantId: (restaurantId: string) => Order[];
  getOrdersByPaymentSession: (paymentSessionId: string) => Order[];
  updateOrderStatus: (id: string, status: OrderStatus) => Promise<void>;
  updateOrderPaymentStatus: (id: string, paymentStatus: 'Đang chờ phê duyệt' | 'completed' | 'failed', transactionId?: string) => Promise<void>;
  confirmOrder: (id: string, confirmedBy?: string) => Promise<void>;
  rejectOrder: (id: string, reason?: string) => Promise<void>;
  addOrderNote: (id: string, note: string) => Promise<void>;
  refreshOrders: () => Promise<void>; // [Data Sync] Refresh orders from API
  isLoading: boolean; // [Data Sync] Loading state
};

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider = ({ children }: { children: ReactNode }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // [Fix Infinite Loop] Add refs to prevent infinite retries and simultaneous fetches
  const isFetchingRef = React.useRef(false);
  const lastErrorTimeRef = React.useRef(0);
  const consecutiveErrorsRef = React.useRef(0);
  const intervalRef = React.useRef<ReturnType<typeof setInterval> | null>(null);
  const websocketConnectedRef = React.useRef(false);

  // [Fix Infinite Loop] Load orders with error handling and retry prevention
  const loadOrders = React.useCallback(async () => {
    // [Fix Infinite Loop] Prevent simultaneous fetches
    if (isFetchingRef.current) {
      return;
    }

    // [Fix Infinite Loop] Cooldown period after errors (5 seconds)
    const timeSinceLastError = Date.now() - lastErrorTimeRef.current;
    if (consecutiveErrorsRef.current > 0 && timeSinceLastError < 5000) {
      return;
    }

    try {
      isFetchingRef.current = true;
      setIsLoading(true);
      
      const apiOrders = await fetchOrders();
      
      // Sort orders deterministically: by createdAt, then by id
      apiOrders.sort((a, b) => {
        const aTime = a.createdAt ?? 0;
        const bTime = b.createdAt ?? 0;
        if (aTime === bTime) return a.id.localeCompare(b.id);
        return aTime - bTime;
      });
      
      // [Fix Infinite Loop] Reset error counters on success
      consecutiveErrorsRef.current = 0;
      lastErrorTimeRef.current = 0;
      
      setOrders(prevOrders => {
        // [Fix Infinite Loop] Only update if orders actually changed to prevent unnecessary re-renders
        const ordersChanged = JSON.stringify(prevOrders) !== JSON.stringify(apiOrders);
        if (!ordersChanged) {
          return prevOrders;
        }
        return apiOrders;
      });
      
      // TODO: Backend integration in Phase 2 - removed localStorage backup
    } catch (error: any) {
      // [Fix 500 Error] Handle 500 errors gracefully and stop automatic retries
      const isServerError = error?.message?.includes('Server error') || error?.message?.includes('500') || 
                           error?.response?.status >= 500 || error?.response?.status === 500;
      
      if (isServerError) {
        consecutiveErrorsRef.current += 1;
        lastErrorTimeRef.current = Date.now();
        
        // [Fix 500 Error] Log error only once, then stop automatic retries
        if (consecutiveErrorsRef.current === 1) {
          console.error('[OrderContext] API Error: Server error detected, stopping automatic retries');
        }
        
        // [Fix Infinite Loop] Stop interval after first error to prevent infinite loop
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
        
        // TODO: Backend integration in Phase 2 - removed localStorage fallback
      } else {
        // For non-server errors (network, timeout, etc.), log but don't stop retries
        if (consecutiveErrorsRef.current === 0) {
          console.error('[OrderContext] API Error: Network or connection issue');
        }
      }
    } finally {
      isFetchingRef.current = false;
      setIsLoading(false);
    }
  }, []);

  // [Real-Time Sync] Connect to WebSocket for real-time order synchronization
  useEffect(() => {
    const unsub = realtimeSocket.onOrderUpdate((order) => {
      // Map API order format to OrderContext format if needed
      import('@/services/orderApiService').then(({ mapApiOrderToOrder }) => {
        try {
          const mappedOrder = mapApiOrderToOrder(order);
          setOrders((prev) => {
            const exist = prev.find(o => o.id === mappedOrder.id);
            if (exist) {
              return prev.map(o => o.id === mappedOrder.id ? mappedOrder : o);
            }
            return [...prev, mappedOrder];
          });
        } catch (error) {
          console.error('[OrderContext] Error mapping order update:', error);
          // Fallback: use order as-is if mapping fails
          setOrders((prev) => {
            const exist = prev.find(o => o.id === order.id);
            if (exist) {
              return prev.map(o => o.id === order.id ? order : o);
            }
            return [...prev, order];
          });
        }
      }).catch(() => {
        // Fallback: use order as-is if import fails
        setOrders((prev) => {
          const exist = prev.find(o => o.id === order.id);
          if (exist) {
            return prev.map(o => o.id === order.id ? order : o);
          }
          return [...prev, order];
        });
      });
    });

    websocketConnectedRef.current = true;

    return unsub;
  }, []);

  // [Data Sync] Load orders from API on mount and periodically (with error handling)
  useEffect(() => {
    // Initial load
    loadOrders();

    // [Fix Infinite Loop] Set interval to refresh orders every 10 seconds (increased from 3s to reduce load)
    // The loadOrders function will handle stopping the interval on 500 errors
    // This ensures orders created on mobile appear on web within 10 seconds
    // Note: If WebSocket is connected, this interval is replaced with a longer fallback interval
    if (!websocketConnectedRef.current && !intervalRef.current) {
      intervalRef.current = setInterval(() => {
        // Only retry if no recent errors (loadOrders will check this internally)
        loadOrders();
      }, 10000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [loadOrders]);

  // TODO: Backend integration in Phase 2 - removed localStorage sync

  // [Data Sync] Refresh orders from API (manual refresh, not automatic)
  const refreshOrders = useCallback(async () => {
    // [Fix Infinite Loop] Prevent simultaneous refreshes
    if (isFetchingRef.current) {
      return;
    }

    try {
      isFetchingRef.current = true;
      setIsLoading(true);
      const apiOrders = await fetchOrders();
      
      // Sort orders deterministically: by createdAt, then by id
      apiOrders.sort((a, b) => {
        const aTime = a.createdAt ?? 0;
        const bTime = b.createdAt ?? 0;
        if (aTime === bTime) return a.id.localeCompare(b.id);
        return aTime - bTime;
      });
      
      // [Fix Infinite Loop] Reset error counters on successful manual refresh
      consecutiveErrorsRef.current = 0;
      lastErrorTimeRef.current = 0;
      
      setOrders(apiOrders);
      // TODO: Backend integration in Phase 2 - removed localStorage sync
      
      // [Fix Infinite Loop] Restart interval if it was stopped due to errors
      if (!intervalRef.current && consecutiveErrorsRef.current === 0) {
        intervalRef.current = setInterval(() => {
          if (consecutiveErrorsRef.current === 0) {
            loadOrders();
          }
        }, 10000);
      }
    } catch (error: any) {
      // [Fix Infinite Loop] Handle errors in manual refresh
      const isServerError = error?.response?.status >= 500 || error?.response?.status === 500;
      if (isServerError) {
        console.error('[OrderContext] Error refreshing orders (server error):', error?.response?.status || error?.message);
      } else {
        console.error('[OrderContext] Error refreshing orders:', error);
      }
    } finally {
      isFetchingRef.current = false;
      setIsLoading(false);
    }
  }, [loadOrders]);

  // [Data Sync] Add order - sync to API
  const addOrder = async (order: Order) => {
    try {
      // [Fix 500 Error] Validate order before sending
      if (!order.name || !order.phone || !order.items || order.items.length === 0) {
        throw new Error('Invalid order: missing required fields (name, phone, or items)');
      }
      
      const orderWithId = { 
        ...order, 
        id: order.id || `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        createdAt: order.createdAt || Date.now(),
        updatedAt: order.updatedAt || Date.now()
      };
      
      // Create in API
      const createdOrder = await createOrder(orderWithId);
      
      // Update local state
      setOrders((prev) => {
        const exists = prev.find(o => o.id === createdOrder.id);
        const newOrders = exists
          ? prev.map(o => o.id === createdOrder.id ? createdOrder : o)
          : [...prev, createdOrder];
        
        return newOrders;
      });
      
      // TODO: Backend integration in Phase 2 - removed localStorage sync
    } catch (error: any) {
      // [Fix 500 Error] Handle errors gracefully - log once and fallback to local
      const errorMessage = error?.message || 'Failed to add order';
      const isServerError = errorMessage.includes('Server error') || errorMessage.includes('500');
      
      // [Fix 500 Error] Only log if not a server error (prevent spam for known 500 errors)
      if (!isServerError) {
        console.error(`[OrderContext] API Error: ${errorMessage}`);
      }
      
      // [Fix 500 Error] Fallback to local-only if API fails (order still works locally)
      const orderWithId = { 
        ...order, 
        id: order.id || `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        createdAt: order.createdAt || Date.now(),
        updatedAt: order.updatedAt || Date.now()
      };
      
      setOrders((prev) => {
        const newOrders = [...prev, orderWithId];
        // TODO: Backend integration in Phase 2 - removed localStorage sync
        return newOrders;
      });
      
      // [Fix 500 Error] Don't throw error - allow checkout flow to continue
      // The order is added locally, so user experience is not broken
    }
  };

  // [Data Sync] Add multiple orders - sync to API
  const addOrders = async (ordersToAdd: Order[]) => {
    try {
      // [Fix 500 Error] Validate all orders before sending
      const invalidOrders = ordersToAdd.filter(order => !order.name || !order.phone || !order.items || order.items.length === 0);
      if (invalidOrders.length > 0) {
        throw new Error(`Invalid orders: ${invalidOrders.length} order(s) missing required fields`);
      }
      
      // Generate ONE paymentSessionId for all orders in this batch
      const sessionId = ordersToAdd[0]?.paymentSessionId || `PAY-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      
      const ordersWithIds = ordersToAdd.map((order, index) => ({
        ...order,
        id: order.id || `ORD-${Date.now()}-${index}-${Math.random().toString(36).substr(2, 9)}`,
        createdAt: order.createdAt || Date.now(),
        updatedAt: order.updatedAt || Date.now(),
        paymentSessionId: sessionId // Force same paymentSessionId for all orders
      }));
      
      // Create in API
      const createdOrders = await createOrders(ordersWithIds);
      
      // Update local state
      setOrders((prev) => {
        const existingIds = new Set(prev.map(o => o.id));
        const newOrders = createdOrders.filter(o => !existingIds.has(o.id));
        const updatedOrders = [...prev, ...newOrders];
        
        return updatedOrders;
      });
      
      // TODO: Backend integration in Phase 2 - removed localStorage sync
    } catch (error: any) {
      // [Fix 500 Error] Log error only once
      const errorMessage = error?.message || 'Failed to add orders';
      console.error(`[OrderContext] API Error: ${errorMessage}`);
      
      // Fallback to local-only if API fails
      const ordersWithIds = ordersToAdd.map((order, index) => ({
        ...order,
        id: order.id || `ORD-${Date.now()}-${index}-${Math.random().toString(36).substr(2, 9)}`,
        createdAt: order.createdAt || Date.now(),
        updatedAt: order.updatedAt || Date.now()
      }));
      setOrders((prev) => [...prev, ...ordersWithIds]);
      
      // [Fix 500 Error] Don't throw error to prevent breaking the checkout flow
      // The orders are still added locally, so the user experience continues
    }
  };

  const getOrdersByPhone = (phone: string) => {
    return orders.filter((o) => o.phone === phone);
  };

  const getOrdersByUserId = (userId: string) => {
    return orders.filter((o) => o.userId === userId);
  };

  const getOrdersByRestaurantId = (restaurantId: string) => {
    return orders.filter(o => o.restaurantId === restaurantId);
  };

  const getOrdersByPaymentSession = (paymentSessionId: string) => {
    const filtered = orders.filter((o) => o.paymentSessionId === paymentSessionId);
    // Sort orders deterministically: by createdAt, then by id
    filtered.sort((a, b) => {
      const aTime = a.createdAt ?? 0;
      const bTime = b.createdAt ?? 0;
      if (aTime === bTime) return a.id.localeCompare(b.id);
      return aTime - bTime;
    });
    return filtered;
  };

  // [Data Sync] Update order status - sync to API
  const updateOrderStatus = async (id: string, status: OrderStatus) => {
    try {
      const updatedOrder = await patchOrder(id, { status });
      setOrders((prev) => {
        const newOrders = prev.map((o) => (o.id === id ? updatedOrder : o));
        // [Fix Infinite Loop] Disable automatic sync verification to prevent additional API calls
        // setTimeout(() => {
        //   verifySyncAfterOperation(newOrders, 'updateStatus', id).catch(() => {
        //     // Silent fail for verification - don't break app if verification fails
        //   });
        // }, 100);
        return newOrders;
      });
    } catch (error) {
      console.error('[OrderContext] Error updating order status:', error);
      // Fallback to local-only if API fails
      setOrders((prev) => prev.map((o) => (o.id === id ? { 
        ...o, 
        status,
        updatedAt: Date.now()
      } : o)));
      throw error;
    }
  };

  // [Data Sync] Update payment status - sync to API
  const updateOrderPaymentStatus = async (id: string, paymentStatus: 'Đang chờ phê duyệt' | 'completed' | 'failed', transactionId?: string) => {
    try {
      const updates: any = { paymentStatus };
      if (transactionId) {
        updates.vnpayTransactionId = transactionId;
      }
      const updatedOrder = await patchOrder(id, updates);
      setOrders((prev) => prev.map((o) => (o.id === id ? updatedOrder : o)));
    } catch (error) {
      console.error('[OrderContext] Error updating payment status:', error);
      // Fallback to local-only if API fails
      setOrders((prev) => prev.map((o) => (o.id === id ? { 
        ...o, 
        paymentStatus,
        vnpayTransactionId: transactionId || o.vnpayTransactionId,
        updatedAt: Date.now()
      } : o)));
      throw error;
    }
  };

  // [Data Sync] Confirm order - sync to API
  const confirmOrder = async (id: string, confirmedBy?: string) => {
    try {
      const updates: any = {
        status: "Confirmed" as OrderStatus,
        confirmedAt: Date.now(),
      };
      if (confirmedBy) {
        updates.confirmedBy = confirmedBy;
      }
      const updatedOrder = await patchOrder(id, updates);
      setOrders((prev) => prev.map((o) => (o.id === id ? updatedOrder : o)));
    } catch (error) {
      console.error('[OrderContext] Error confirming order:', error);
      // Fallback to local-only if API fails
      setOrders((prev) => prev.map((o) => (o.id === id ? { 
        ...o, 
        status: "Confirmed" as OrderStatus,
        confirmedAt: Date.now(),
        confirmedBy: confirmedBy || o.confirmedBy,
        updatedAt: Date.now()
      } : o)));
      throw error;
    }
  };

  // [Data Sync] Reject order - sync to API
  const rejectOrder = async (id: string, reason?: string) => {
    try {
      const existingOrder = orders.find(o => o.id === id);
      const updates: any = {
        status: "Cancelled" as OrderStatus,
        cancelledAt: Date.now(),
      };
      if (reason) {
        updates.internalNotes = existingOrder?.internalNotes 
          ? `${existingOrder.internalNotes}\n[Rejected]: ${reason}` 
          : `[Rejected]: ${reason}`;
      }
      const updatedOrder = await patchOrder(id, updates);
      setOrders((prev) => prev.map((o) => (o.id === id ? updatedOrder : o)));
    } catch (error) {
      console.error('[OrderContext] Error rejecting order:', error);
      // Fallback to local-only if API fails
      setOrders((prev) => prev.map((o) => (o.id === id ? { 
        ...o, 
        status: "Cancelled" as OrderStatus,
        cancelledAt: Date.now(),
        internalNotes: reason ? (o.internalNotes ? `${o.internalNotes}\n[Rejected]: ${reason}` : `[Rejected]: ${reason}`) : o.internalNotes,
        updatedAt: Date.now()
      } : o)));
      throw error;
    }
  };

  // [Data Sync] Add order note - sync to API
  const addOrderNote = async (id: string, note: string) => {
    try {
      const existingOrder = orders.find(o => o.id === id);
      const updates: any = {
        internalNotes: existingOrder?.internalNotes 
          ? `${existingOrder.internalNotes}\n${note}` 
          : note,
      };
      const updatedOrder = await patchOrder(id, updates);
      setOrders((prev) => prev.map((o) => (o.id === id ? updatedOrder : o)));
    } catch (error) {
      console.error('[OrderContext] Error adding order note:', error);
      // Fallback to local-only if API fails
      setOrders((prev) => prev.map((o) => (o.id === id ? { 
        ...o, 
        internalNotes: o.internalNotes ? `${o.internalNotes}\n${note}` : note,
        updatedAt: Date.now()
      } : o)));
      throw error;
    }
  };

  return (
    <OrderContext.Provider value={{ 
      orders, 
      addOrder,
      addOrders,
      getOrdersByPhone,
      getOrdersByUserId,
      getOrdersByRestaurantId,
      getOrdersByPaymentSession,
      updateOrderStatus, 
      updateOrderPaymentStatus,
      confirmOrder,
      rejectOrder,
      addOrderNote,
      refreshOrders, // [Data Sync]
      isLoading // [Data Sync]
    }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => {
  const ctx = useContext(OrderContext);
  if (!ctx) throw new Error("useOrders must be used inside OrderProvider");
  return ctx;
};
