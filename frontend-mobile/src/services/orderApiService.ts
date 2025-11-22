import apiClient from '../config/axios';

// [Data Sync] Map API order structure to frontend Order type
export const mapApiOrderToOrder = (apiOrder: any): any => {
  // Build items array
  const items = (apiOrder.items || []).map((item: any) => {
    const qty = item.quantity || item.qty || 1;
    const price = item.price || 0;
    return {
      name: item.name,
      qty,
      price,
    };
  });

  // Compute safe itemsTotal
  const itemsTotal = items.reduce((sum: number, item: any) => {
    const price = Number(item.price) || 0;
    const qty = Number(item.qty) || 0;
    return sum + price * qty;
  }, 0);

  // Use backend total always (backend calculates with shipping + tax)
  const total = apiOrder.total ?? itemsTotal;

  // Fix createdAt mapping
  const createdAt = apiOrder.createdAt
    ? apiOrder.createdAt
    : apiOrder.orderTime
      ? new Date(apiOrder.orderTime).getTime()
      : Date.now();

  // Map API status to OrderStatus
  const mapApiStatusToOrderStatus = (apiStatus: string): string => {
    const statusMap: Record<string, string> = {
      'PENDING': 'Pending',
      'CONFIRMED': 'Confirmed',
      'PREPARING': 'In Progress',
      'READY': 'Ready',
      'DELIVERING': 'Delivering',
      'DELIVERED': 'Delivered',
      'CANCELLED': 'Cancelled',
      // Support lowercase for backward compatibility
      'pending': 'Pending',
      'confirmed': 'Confirmed',
      'preparing': 'In Progress',
      'ready': 'Ready',
      'delivering': 'Delivering',
      'delivered': 'Delivered',
      'cancelled': 'Cancelled',
    };
    const normalizedStatus = apiStatus?.toUpperCase();
    return statusMap[normalizedStatus] || statusMap[apiStatus?.toLowerCase()] || 'Pending';
  };

  return {
    id: apiOrder.id,
    name: apiOrder.customerName || apiOrder.name || '',
    phone: apiOrder.customerPhone || apiOrder.phone || '',
    address: apiOrder.address || apiOrder.customerAddress || '',
    items,
    total,
    status: mapApiStatusToOrderStatus(apiOrder.status),
    dronePath: apiOrder.dronePath,
    paymentMethod: apiOrder.paymentMethod || 'cod',
    paymentStatus: apiOrder.paymentStatus || 'Đang chờ phê duyệt',
    vnpayTransactionId: apiOrder.vnpayTransactionId,
    restaurantId: apiOrder.restaurantId,
    userId: apiOrder.userId,
    paymentSessionId: apiOrder.paymentSessionId,
    createdAt,
    updatedAt: apiOrder.updatedAt || Date.now(),
    confirmedAt: apiOrder.confirmedAt,
    cancelledAt: apiOrder.cancelledAt,
    internalNotes: apiOrder.internalNotes,
    confirmedBy: apiOrder.confirmedBy,
  };
};

// [Data Sync] Fetch orders from API with optional filters
export const fetchOrders = async (filters?: {
  paymentSessionId?: string;
  phone?: string;
  restaurantId?: string;
}): Promise<any[]> => {
  const params: any = {};
  if (filters?.paymentSessionId) {
    params.paymentSessionId = filters.paymentSessionId;
  } else {
    if (filters?.phone) params.phone = filters.phone;
    if (filters?.restaurantId) params.restaurant = filters.restaurantId;
  }

  const response = await apiClient.get('/orders', { params });
  return Array.isArray(response.data)
    ? response.data.map(mapApiOrderToOrder)
    : [];
};

// [Data Sync] Fetch order by ID
export const fetchOrderById = async (id: string): Promise<any | null> => {
  try {
    const response = await apiClient.get(`/orders/${id}`);
    return mapApiOrderToOrder(response.data);
  } catch (error) {
    console.error('[OrderApiService] Error fetching order:', error);
    return null;
  }
};

