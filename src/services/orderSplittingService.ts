/**
 * Order Splitting Service
 * Handles splitting cart items into separate orders per restaurant
 */

import { Order } from '@/context/OrderContext';

export interface CartItem {
  id: string;
  name: string;
  qty: number;
  price: number;
  restaurantId: string;
}

export interface OrderCreationData {
  name: string;
  phone: string;
  address: string;
  items: CartItem[];
  paymentMethod: 'visa' | 'momo' | 'zalopay' | 'cod' | 'vnpay';
  paymentStatus: 'Đang chờ phê duyệt' | 'completed' | 'failed';
  vnpayTransactionId?: string;
  userId?: string;
  note?: string;
}

export interface SplitOrder {
  restaurantId: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  tax: number;
  total: number;
}

export interface OrderSplitResult {
  paymentSessionId: string;
  orders: SplitOrder[];
  totalAmount: number;
}

/**
 * Calculate delivery fee per order
 * Each restaurant order gets its own delivery fee
 */
const calculateDeliveryFee = (): number => {
  return 25000; // 25k VND per order
};

/**
 * Calculate tax for a subtotal
 */
const calculateTax = (subtotal: number): number => {
  return subtotal * 0.08; // 8% tax
};


/**
 * Group cart items by restaurant ID
 */
export const groupItemsByRestaurant = (items: CartItem[]): Map<string, CartItem[]> => {
  const grouped = new Map<string, CartItem[]>();

  for (const item of items) {
    // Use restaurantId from cart item ONLY - no fallback, no normalization
    if (!item.restaurantId) {
      console.warn(`Missing restaurantId for item ${item.id}, skipping`);
      continue;
    }

    // Use restaurantId exactly as provided (no conversion to rest_2/restaurant_2)
    const restaurantId = item.restaurantId;
    
    if (!grouped.has(restaurantId)) {
      grouped.set(restaurantId, []);
    }
    
    grouped.get(restaurantId)!.push(item);
  }

  return grouped;
};

/**
 * Split cart items into separate orders per restaurant
 */
export const splitOrdersByRestaurant = (
  items: CartItem[],
  deliveryFeePerOrder: number = 25000
): OrderSplitResult => {
  // Group items by restaurant (uses restaurantId exactly as provided, no normalization)
  const groupedItems = groupItemsByRestaurant(items);
  
  // Generate payment session ID (links all orders together)
  const paymentSessionId = `PAY-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  
  // Create order for each restaurant
  const splitOrders: SplitOrder[] = [];
  let totalAmount = 0;

  for (const [restaurantId, restaurantItems] of groupedItems.entries()) {
    // Calculate subtotal for this restaurant
    const subtotal = restaurantItems.reduce((sum, item) => {
      return sum + (item.price * item.qty);
    }, 0);

    // Calculate delivery fee and tax for this restaurant order
    const deliveryFee = deliveryFeePerOrder;
    const tax = calculateTax(subtotal);
    const total = subtotal + deliveryFee + tax;

    splitOrders.push({
      restaurantId, // Use restaurantId exactly as provided (aloha or sweetdreams, no normalization)
      items: restaurantItems,
      subtotal,
      deliveryFee,
      tax,
      total
    });

    totalAmount += total;
  }

  return {
    paymentSessionId,
    orders: splitOrders,
    totalAmount
  };
};

/**
 * Create order objects from split order data
 */
export const createOrdersFromSplit = (
  splitResult: OrderSplitResult,
  orderData: OrderCreationData
): Order[] => {
  const orders: Order[] = [];
  const baseTimestamp = Date.now();

  for (let i = 0; i < splitResult.orders.length; i++) {
    const splitOrder = splitResult.orders[i];
    const orderId = `${baseTimestamp}-${i + 1}`;
    
    const order: Order = {
      id: orderId,
      name: orderData.name,
      phone: orderData.phone,
      address: orderData.address,
      items: splitOrder.items.map(item => ({
        name: item.name,
        qty: item.qty,
        price: item.price
      })),
      total: splitOrder.total,
      status: 'Pending' as const,
      paymentMethod: orderData.paymentMethod,
      paymentStatus: orderData.paymentStatus,
      vnpayTransactionId: orderData.vnpayTransactionId,
      restaurantId: splitOrder.restaurantId,
      userId: orderData.userId,
      paymentSessionId: splitResult.paymentSessionId, // Link all orders together
      createdAt: baseTimestamp + i, // Slight offset to ensure unique timestamps
      updatedAt: baseTimestamp + i,
      dronePath: ["Nhà hàng", "Kho Drone", "Đang giao", "Hoàn tất"]
    };

    orders.push(order);
  }

  return orders;
};

/**
 * Get all orders for a payment session
 */
export const getOrdersByPaymentSession = (
  orders: Order[],
  paymentSessionId: string
): Order[] => {
  return orders.filter(order => order.paymentSessionId === paymentSessionId);
};

