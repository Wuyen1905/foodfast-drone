import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

export type Order = {
  id: string;
  name: string;
  phone: string;
  address: string;
  items: { name: string; qty: number; price: number }[];
  total: number;
  status: "Processing" | "Delivering" | "Completed";
  dronePath?: string[];
  paymentMethod?: 'visa' | 'momo' | 'zalopay' | 'cod' | 'vnpay';
  paymentStatus?: 'Đang chờ phê duyệt' | 'completed' | 'failed';
  vnpayTransactionId?: string;
};

type OrderContextType = {
  orders: Order[];
  addOrder: (order: Order) => void;
  getOrdersByPhone: (phone: string) => Order[];
  updateOrderStatus: (id: string, status: Order["status"]) => void;
  updateOrderPaymentStatus: (id: string, paymentStatus: 'Đang chờ phê duyệt' | 'completed' | 'failed', transactionId?: string) => void;
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
    setOrders((prev) => [...prev, { ...order, id: Date.now().toString() }]);
  };

  const getOrdersByPhone = (phone: string) => {
    return orders.filter((o) => o.phone === phone);
  };

  const updateOrderStatus = (id: string, status: Order["status"]) => {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
  };

  const updateOrderPaymentStatus = (id: string, paymentStatus: 'Đang chờ phê duyệt' | 'completed' | 'failed', transactionId?: string) => {
    setOrders((prev) => prev.map((o) => (o.id === id ? { 
      ...o, 
      paymentStatus,
      vnpayTransactionId: transactionId || o.vnpayTransactionId
    } : o)));
  };

  return (
    <OrderContext.Provider value={{ orders, addOrder, getOrdersByPhone, updateOrderStatus, updateOrderPaymentStatus }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => {
  const ctx = useContext(OrderContext);
  if (!ctx) throw new Error("useOrders must be used inside OrderProvider");
  return ctx;
};
