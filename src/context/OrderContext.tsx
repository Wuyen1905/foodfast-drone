import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

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
  userId?: string; // User ID for logged-in customers
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
  getOrdersByUserId: (userId: string) => Order[];
  getOrdersByRestaurantId: (restaurantId: string) => Order[];
  updateOrderStatus: (id: string, status: OrderStatus) => void;
  updateOrderPaymentStatus: (id: string, paymentStatus: 'Đang chờ phê duyệt' | 'completed' | 'failed', transactionId?: string) => void;
  confirmOrder: (id: string, confirmedBy?: string) => void;
  rejectOrder: (id: string, reason?: string) => void;
  addOrderNote: (id: string, note: string) => void;
};

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider = ({ children }: { children: ReactNode }) => {
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem("orders");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);

  const addOrder = (order: Order) => {
    const orderWithId = { 
      ...order, 
      id: order.id || Date.now().toString(),
      createdAt: order.createdAt || Date.now()
    };
    setOrders((prev) => [...prev, orderWithId]);
  };

  const getOrdersByPhone = (phone: string) => {
    return orders.filter((o) => o.phone === phone);
  };

  const getOrdersByUserId = (userId: string) => {
    return orders.filter((o) => o.userId === userId);
  };

  const getOrdersByRestaurantId = (restaurantId: string) => {
    return orders.filter((o) => o.restaurantId === restaurantId);
  };

  const updateOrderStatus = (id: string, status: OrderStatus) => {
    setOrders((prev) => prev.map((o) => (o.id === id ? { 
      ...o, 
      status,
      updatedAt: Date.now()
    } : o)));
  };

  const updateOrderPaymentStatus = (id: string, paymentStatus: 'Đang chờ phê duyệt' | 'completed' | 'failed', transactionId?: string) => {
    setOrders((prev) => prev.map((o) => (o.id === id ? { 
      ...o, 
      paymentStatus,
      vnpayTransactionId: transactionId || o.vnpayTransactionId,
      updatedAt: Date.now()
    } : o)));
  };

  const confirmOrder = (id: string, confirmedBy?: string) => {
    setOrders((prev) => prev.map((o) => (o.id === id ? { 
      ...o, 
      status: "Confirmed" as OrderStatus,
      confirmedAt: Date.now(),
      confirmedBy: confirmedBy || o.confirmedBy,
      updatedAt: Date.now()
    } : o)));
  };

  const rejectOrder = (id: string, reason?: string) => {
    setOrders((prev) => prev.map((o) => (o.id === id ? { 
      ...o, 
      status: "Cancelled" as OrderStatus,
      cancelledAt: Date.now(),
      internalNotes: reason ? (o.internalNotes ? `${o.internalNotes}\n[Rejected]: ${reason}` : `[Rejected]: ${reason}`) : o.internalNotes,
      updatedAt: Date.now()
    } : o)));
  };

  const addOrderNote = (id: string, note: string) => {
    setOrders((prev) => prev.map((o) => (o.id === id ? { 
      ...o, 
      internalNotes: o.internalNotes ? `${o.internalNotes}\n${note}` : note,
      updatedAt: Date.now()
    } : o)));
  };

  return (
    <OrderContext.Provider value={{ 
      orders, 
      addOrder, 
      getOrdersByPhone,
      getOrdersByUserId,
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
