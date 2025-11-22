import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { getOrders, createOrder, updateOrderStatus as updateOrderStatusApi } from "@/api/orderApi";
import { realtimeSocket } from "@/realtime/socket";

export type OrderStatus = "Pending" | "Confirmed" | "In Progress" | "Ready" | "Delivered" | "Cancelled";

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
  createdAt?: number;
  updatedAt?: number;
  confirmedAt?: number;
  cancelledAt?: number;
  internalNotes?: string;
  confirmedBy?: string;
};

type OrderContextType = {
  orders: Order[];
  addOrder: (order: Order) => void;
  getOrdersByPhone: (phone: string) => Order[];
  getOrdersByRestaurantId: (restaurantId: string) => Order[];
  updateOrderStatus: (id: string, status: OrderStatus) => void;
  updateOrderPaymentStatus: (id: string, paymentStatus: 'Đang chờ phê duyệt' | 'completed' | 'failed', transactionId?: string) => void;
  confirmOrder: (id: string, confirmedBy?: string) => void;
  rejectOrder: (id: string, reason?: string) => void;
  addOrderNote: (id: string, note: string) => void;
};

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider = ({ children }: { children: ReactNode }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  // Load orders from backend on mount
  useEffect(() => {
    const loadOrders = async () => {
      setLoading(true);
      try {
        const data = await getOrders();
        // Transform to Order format
        const transformed = data.map((o: any) => ({
          id: o.id,
          name: o.name || o.customerName,
          phone: o.phone || o.customerPhone,
          address: o.address,
          items: o.items?.map((item: any) => ({
            name: item.name,
            qty: item.qty || item.quantity,
            price: item.price
          })) || [],
          total: o.total,
          status: o.status as OrderStatus,
          dronePath: o.dronePath,
          paymentMethod: o.paymentMethod,
          paymentStatus: o.paymentStatus,
          vnpayTransactionId: o.vnpayTransactionId,
          restaurantId: o.restaurantId || o.restaurant,
          createdAt: o.createdAt,
          updatedAt: o.updatedAt,
          confirmedAt: o.confirmedAt,
          cancelledAt: o.cancelledAt,
          internalNotes: o.internalNotes,
          confirmedBy: o.confirmedBy
        }));
        setOrders(transformed);
      } catch (error) {
        console.error('Failed to load orders:', error);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };
    loadOrders();
  }, []);

  useEffect(() => {
    const unsub = realtimeSocket.onOrderUpdate((order) => {
        setOrders(prev => {
            const exists = prev.find(o => o.id === order.id);
            if (exists) {
                return prev.map(o => o.id === order.id ? order : o);
            }
            return [...prev, order];
        });
    });

    return unsub;
}, []);

  const addOrder = async (order: Order) => {
    try {
      const response = await createOrder({
        customerName: order.name,
        customerPhone: order.phone,
        address: order.address,
        restaurant: order.restaurantId || '',
        items: order.items.map(item => ({
          name: item.name,
          quantity: item.qty,
          price: item.price
        })),
        paymentMethod: order.paymentMethod,
        note: order.internalNotes
      });
      
      // Transform response to Order format and add to state
      const newOrder: Order = {
        id: response.id,
        name: response.name || response.customerName,
        phone: response.phone || response.customerPhone,
        address: response.address,
        items: response.items?.map((item: any) => ({
          name: item.name,
          qty: item.qty || item.quantity,
          price: item.price
        })) || [],
        total: response.total,
        status: response.status as OrderStatus,
        restaurantId: response.restaurantId || response.restaurant,
        createdAt: response.createdAt,
        updatedAt: response.updatedAt
      };
      
      setOrders((prev) => [...prev, newOrder]);
    } catch (error) {
      console.error('Failed to create order:', error);
      throw error;
    }
  };

  const getOrdersByPhone = (phone: string) => {
    return orders.filter((o) => o.phone === phone);
  };

  const getOrdersByRestaurantId = (restaurantId: string) => {
    return orders.filter((o) => o.restaurantId === restaurantId);
  };

  const updateOrderStatus = async (id: string, status: OrderStatus) => {
    try {
      await updateOrderStatusApi(id, status);
      // Update local state after successful API call
      setOrders((prev) => prev.map((o) => (o.id === id ? { 
        ...o, 
        status,
        updatedAt: Date.now()
      } : o)));
    } catch (error) {
      console.error('Failed to update order status:', error);
      throw error;
    }
  };

  const updateOrderPaymentStatus = async (id: string, paymentStatus: 'Đang chờ phê duyệt' | 'completed' | 'failed', transactionId?: string) => {
    try {
      // Update payment status via backend API
      await updateOrderStatusApi(id, paymentStatus === 'completed' ? 'Delivered' : 'Pending');
      // Update local state after successful API call
      setOrders((prev) => prev.map((o) => (o.id === id ? { 
        ...o, 
        paymentStatus,
        vnpayTransactionId: transactionId || o.vnpayTransactionId,
        updatedAt: Date.now()
      } : o)));
    } catch (error) {
      console.error('Failed to update payment status:', error);
      throw error;
    }
  };

  const confirmOrder = async (id: string, confirmedBy?: string) => {
    try {
      await updateOrderStatusApi(id, 'Confirmed');
      // Update local state after successful API call
      setOrders((prev) => prev.map((o) => (o.id === id ? { 
        ...o, 
        status: "Confirmed" as OrderStatus,
        confirmedAt: Date.now(),
        confirmedBy: confirmedBy || o.confirmedBy,
        updatedAt: Date.now()
      } : o)));
    } catch (error) {
      console.error('Failed to confirm order:', error);
      throw error;
    }
  };

  const rejectOrder = async (id: string, reason?: string) => {
    try {
      await updateOrderStatusApi(id, 'Cancelled');
      // Update local state after successful API call
      setOrders((prev) => prev.map((o) => (o.id === id ? { 
        ...o, 
        status: "Cancelled" as OrderStatus,
        cancelledAt: Date.now(),
        internalNotes: reason ? (o.internalNotes ? `${o.internalNotes}\n[Rejected]: ${reason}` : `[Rejected]: ${reason}`) : o.internalNotes,
        updatedAt: Date.now()
      } : o)));
    } catch (error) {
      console.error('Failed to reject order:', error);
      throw error;
    }
  };

  const addOrderNote = async (id: string, note: string) => {
    try {
      // Add note via backend API (using restaurantOrderService)
      const { addOrderNote: addOrderNoteApi } = await import('@/services/restaurantOrderService');
      await addOrderNoteApi(id, note);
      // Update local state after successful API call
      setOrders((prev) => prev.map((o) => (o.id === id ? { 
        ...o, 
        internalNotes: o.internalNotes ? `${o.internalNotes}\n${note}` : note,
        updatedAt: Date.now()
      } : o)));
    } catch (error) {
      console.error('Failed to add order note:', error);
      throw error;
    }
  };

  return (
    <OrderContext.Provider value={{ 
      orders, 
      addOrder, 
      getOrdersByPhone, 
      getOrdersByRestaurantId,
      updateOrderStatus, 
      updateOrderPaymentStatus,
      confirmOrder,
      rejectOrder,
      addOrderNote
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
