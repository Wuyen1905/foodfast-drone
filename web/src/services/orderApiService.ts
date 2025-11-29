import { api } from '@/config/axios';

// [Data Sync] Map backend API order structure to OrderContext Order type
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

// [Fix 500 Error] Validate and sanitize order data before sending to API
const validateOrderData = (order: any): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  // [Fix 500 Error] Validate required fields
  if (!order.name || typeof order.name !== 'string' || !order.name.trim()) {
    errors.push('customerName is required and must be a non-empty string');
  }
  if (!order.phone || typeof order.phone !== 'string' || !order.phone.trim()) {
    errors.push('customerPhone is required and must be a non-empty string');
  }
  if (!order.items || !Array.isArray(order.items) || order.items.length === 0) {
    errors.push('items array is required and must contain at least one item');
  }
  // [Fix 500 Error] Total can be 0 or positive number (allow 0 for free orders)
  if (typeof order.total !== 'number' || order.total < 0 || isNaN(order.total)) {
    errors.push('total must be a non-negative number');
  }
  
  // [Fix 500 Error] Validate items structure
  if (order.items && Array.isArray(order.items)) {
    order.items.forEach((item: any, index: number) => {
      if (!item.name || typeof item.name !== 'string' || !item.name.trim()) {
        errors.push(`items[${index}].name is required and must be a non-empty string`);
      }
      if (typeof item.price !== 'number' || item.price < 0 || isNaN(item.price)) {
        errors.push(`items[${index}].price must be a non-negative number`);
      }
      const qty = item.qty || item.quantity;
      if (typeof qty !== 'number' || qty < 1 || isNaN(qty)) {
        errors.push(`items[${index}].quantity must be a positive integer`);
      }
    });
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
};

// [Data Sync] Map OrderContext Order type to backend API order structure
export const mapOrderToApiOrder = (order: any): any => {
  // [Fix 500 Error] Validate order data before mapping
  const validation = validateOrderData(order);
  if (!validation.valid) {
    throw new Error(`Invalid order data: ${validation.errors.join(', ')}`);
  }
  
  // Normalize restaurant ID to backend API format
  let restaurantId = order.restaurantId;
  if (restaurantId) {
    if (restaurantId === 'sweetdreams' || restaurantId.startsWith('sd')) {
      restaurantId = 'rest_2';
    } else if (restaurantId === 'aloha' || restaurantId.startsWith('ak')) {
      restaurantId = 'restaurant_2';
    }
  }
  
  // [Fix 500 Error] Validate and sanitize items first (before building apiOrder)
  const validItems = (order.items || []).map((item: any) => {
    if (!item.name || typeof item.name !== 'string' || !item.name.trim()) {
      throw new Error('Item name is required and must be a non-empty string');
    }
    
    // [Fix 500 Error] Validate and sanitize quantity
    const quantity = Math.max(1, parseInt(String(item.qty || item.quantity || 1)));
    if (isNaN(quantity) || quantity < 1) {
      throw new Error(`Invalid quantity for item "${item.name}": ${item.qty || item.quantity}`);
    }
    
    // [Fix 500 Error] Validate and sanitize price
    if (item.price === undefined || item.price === null) {
      throw new Error("Missing price for item: " + item.name);
    }
    const price = Number(item.price);
    if (isNaN(price) || price < 0) {
      throw new Error(`Invalid price for item "${item.name}": ${item.price}`);
    }
    
    return {
      name: String(item.name).trim(),
      quantity: quantity,
      price: Math.round(Number(price)),
    };
  });
  
  // [Fix 500 Error] Calculate total from items (more reliable than using order.total)
  const total = validItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  
  // [Fix 500 Error] Safely parse customerId - only include if userId is a valid number
  let customerId: number | undefined = undefined;
  if (order.userId) {
    const userIdStr = String(order.userId);
    const parsed = parseInt(userIdStr, 10);
    // Only set customerId if it's a valid positive number
    if (!isNaN(parsed) && parsed > 0 && userIdStr === String(parsed)) {
      customerId = parsed;
    }
  }
  
  // [Fix 500 Error] Generate orderTime (format: "HH:MM") - required by backend API
  let orderTime: string;
  try {
    const timestamp = order.createdAt || Date.now();
    const date = new Date(timestamp);
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    orderTime = `${hours}:${minutes}`;
  } catch (error) {
    // Fallback to current time if date parsing fails
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    orderTime = `${hours}:${minutes}`;
  }
  
  // [Fix 500 Error] Build order payload matching backend API structure exactly
  const apiOrder: any = {
    id: order.id || `ORDER-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    status: mapOrderStatusToApiStatus(order.status || 'Pending'),
    total: total,
    customerName: String(order.name || '').trim(),
    customerPhone: String(order.phone || '').trim(),
    items: validItems,
    orderTime: orderTime, // Required by backend API
  };
  
  // [Fix 500 Error] Add restaurantId if available (required for restaurant orders)
  if (restaurantId) {
    apiOrder.restaurantId = restaurantId;
  }
  
  // [Fix 500 Error] Add optional fields only if they have valid values
  if (order.address && typeof order.address === 'string' && order.address.trim()) {
    apiOrder.address = order.address.trim();
  }
  
  if (order.paymentMethod && typeof order.paymentMethod === 'string') {
    apiOrder.paymentMethod = order.paymentMethod;
  }
  
  if (order.paymentStatus && typeof order.paymentStatus === 'string') {
    apiOrder.paymentStatus = order.paymentStatus;
  }
  
  if (order.vnpayTransactionId && typeof order.vnpayTransactionId === 'string') {
    apiOrder.vnpayTransactionId = order.vnpayTransactionId;
  }
  
  if (order.userId && typeof order.userId === 'string') {
    apiOrder.userId = order.userId;
  }
  
  if (customerId && typeof customerId === 'number') {
    apiOrder.customerId = customerId;
  }
  
  if (order.paymentSessionId && typeof order.paymentSessionId === 'string') {
    apiOrder.paymentSessionId = order.paymentSessionId;
  }
  
  // [Fix 500 Error] Timestamps (optional, but include for consistency)
  if (order.createdAt && typeof order.createdAt === 'number') {
    apiOrder.createdAt = order.createdAt;
  }
  
  if (order.updatedAt && typeof order.updatedAt === 'number') {
    apiOrder.updatedAt = order.updatedAt;
  }
  
  // [Fix 500 Error] Order status tracking fields (optional)
  if (order.confirmedAt && typeof order.confirmedAt === 'number') {
    apiOrder.confirmedAt = order.confirmedAt;
  }
  
  if (order.cancelledAt && typeof order.cancelledAt === 'number') {
    apiOrder.cancelledAt = order.cancelledAt;
  }
  
  if (order.internalNotes && typeof order.internalNotes === 'string') {
    apiOrder.internalNotes = order.internalNotes;
  }
  
  if (order.confirmedBy && typeof order.confirmedBy === 'string') {
    apiOrder.confirmedBy = order.confirmedBy;
  }
  
  if (order.droneId && typeof order.droneId === 'string') {
    apiOrder.droneId = order.droneId;
  }
  
  if (order.estimatedDelivery && typeof order.estimatedDelivery === 'string') {
    apiOrder.estimatedDelivery = order.estimatedDelivery;
  }
  
  return apiOrder;
};

// [Data Sync] Map API status to OrderStatus
// Maps Java enum (uppercase) to frontend status
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

// [Data Sync] Map OrderStatus to API status
// Maps frontend status to Java enum (uppercase)
const mapOrderStatusToApiStatus = (orderStatus: string): string => {
  const statusMap: Record<string, string> = {
    'Pending': 'PENDING',
    'Confirmed': 'CONFIRMED',
    'In Progress': 'PREPARING',
    'Ready': 'READY',
    'Delivering': 'DELIVERING',
    'Delivered': 'DELIVERED',
    'Cancelled': 'CANCELLED',
  };
  return statusMap[orderStatus] || 'PENDING';
};

// [Fix 500 Error] Track if error was already logged to prevent spam
let lastLoggedError: string | null = null;
let errorLogTimeout: NodeJS.Timeout | null = null;

// [Data Sync] Fetch all orders from API
export const fetchOrders = async (): Promise<any[]> => {
  try {
    const response = await api.get('/orders');
    
    // [Fix 500 Error] Reset error tracking on success
    lastLoggedError = null;
    if (errorLogTimeout) {
      clearTimeout(errorLogTimeout);
      errorLogTimeout = null;
    }
    
    // [Fix Infinite Loop] Validate response data
    if (!response.data) {
      return [];
    }
    
    // [Fix Infinite Loop] Handle both array and object responses
    const ordersArray = Array.isArray(response.data) ? response.data : [];
    const mappedOrders = ordersArray.map(mapApiOrderToOrder);
    
    // [Fix 500 Error] Log success only once
    if (mappedOrders.length > 0) {
      console.log(`[OrderApiService] ✅ Orders fetched successfully: ${mappedOrders.length} orders`);
    }
    
    return mappedOrders;
  } catch (error: any) {
    // [Fix 500 Error] Handle 500 errors gracefully without spamming console
    const errorKey = error?.response?.status ? `status-${error.response.status}` : 'network-error';
    const errorMessage = error?.response?.status 
      ? `Server error ${error.response.status}: ${error.response.statusText || 'Internal Server Error'}`
      : `Network error: ${error.message || 'Failed to fetch orders'}`;
    
    // [Fix 500 Error] Log error only once per unique error type
    if (lastLoggedError !== errorKey) {
      lastLoggedError = errorKey;
      console.error(`[OrderApiService] API Error: ${errorMessage}`);
      
      // Reset error tracking after 5 seconds to allow logging new errors
      if (errorLogTimeout) {
        clearTimeout(errorLogTimeout);
      }
      errorLogTimeout = setTimeout(() => {
        lastLoggedError = null;
      }, 5000);
    }
    
    // Throw error to be handled by caller
    throw new Error(errorMessage);
  }
};

// [Data Sync] Fetch order by ID
export const fetchOrderById = async (id: string): Promise<any | null> => {
  try {
    const response = await api.get(`/orders/${id}`);
    return mapApiOrderToOrder(response.data);
  } catch (error) {
    console.error('[OrderApiService] Error fetching order:', error);
    return null;
  }
};

// [Data Sync] Create new order in API
export const createOrder = async (order: any): Promise<any> => {
  try {
    // [Fix 500 Error] Validate and map order data
    const apiOrder = mapOrderToApiOrder(order);
    
    // [Fix 500 Error] Validate API order before sending
    if (!apiOrder.customerName || !apiOrder.customerPhone || !apiOrder.items || apiOrder.items.length === 0) {
      throw new Error('Invalid order: missing required fields (customerName, customerPhone, or items)');
    }
    
    // [Fix 500 Error] Validate total matches sum of items
    const calculatedTotal = apiOrder.items.reduce((sum: number, item: any) => {
      return sum + (item.price * item.quantity);
    }, 0);
    // Allow small rounding differences (0.01)
    if (Math.abs(apiOrder.total - calculatedTotal) > 0.01) {
      console.warn(`[OrderApiService] Order total (${apiOrder.total}) doesn't match items total (${calculatedTotal}), using calculated total`);
      apiOrder.total = Math.round(calculatedTotal * 100) / 100;
    }
    
    // [Fix 500 Error] Send POST request to API
    const response = await api.post('/orders', apiOrder);
    
    // [Fix 500 Error] Validate response
    if (!response.data || !response.data.id) {
      throw new Error('Invalid response from server: order data missing or incomplete');
    }
    
    const createdOrder = mapApiOrderToOrder(response.data);
    console.log(`[OrderApiService] ✅ Order created successfully: ${createdOrder.id}`);
    return createdOrder;
  } catch (error: any) {
    // [Fix 500 Error] Handle errors gracefully - extract error message
    const statusCode = error?.response?.status;
    const errorData = error?.response?.data;
    const errorMessage = errorData?.message 
      || errorData?.error 
      || error?.message 
      || `Failed to create order${statusCode ? ` (Status: ${statusCode})` : ''}`;
    
    // [Fix 500 Error] Log error only once per unique error type (prevent spam)
    const errorKey = `create-order-${statusCode || 'unknown'}`;
    if (lastLoggedError !== errorKey) {
      lastLoggedError = errorKey;
      
      // [Fix 500 Error] Reset error tracking after 5 seconds
      if (errorLogTimeout) {
        clearTimeout(errorLogTimeout);
      }
      errorLogTimeout = setTimeout(() => {
        lastLoggedError = null;
      }, 5000);
      if (statusCode === 500) {
        console.error(`[OrderApiService] API Error: Server error (500) - ${errorMessage}`);
      } else {
        console.error(`[OrderApiService] API Error: ${errorMessage} (Status: ${statusCode || 'unknown'})`);
      }
      
      if (errorLogTimeout) {
        clearTimeout(errorLogTimeout);
      }
      errorLogTimeout = setTimeout(() => {
        lastLoggedError = null;
      }, 5000);
    }
    
    throw error;
  }
};

// [Data Sync] Create multiple orders in API
export const createOrders = async (orders: any[]): Promise<any[]> => {
  try {
    // [Fix 500 Error] Validate all orders before sending
    const apiOrders = orders.map((order, index) => {
      try {
        return mapOrderToApiOrder(order);
      } catch (error: any) {
        throw new Error(`Invalid order at index ${index}: ${error.message}`);
      }
    });
    
    // Create orders sequentially to avoid race conditions
    const createdOrders: any[] = [];
    let successCount = 0;
    let errorCount = 0;
    
    for (const apiOrder of apiOrders) {
      try {
        // [Fix 500 Error] Validate API order before sending
        if (!apiOrder.customerName || !apiOrder.customerPhone || !apiOrder.items || apiOrder.items.length === 0) {
          throw new Error('Invalid order: missing required fields (customerName, customerPhone, or items)');
        }
        
        if (!apiOrder.orderTime) {
          throw new Error('Invalid order: missing orderTime');
        }
        
        const response = await api.post('/orders', apiOrder);
        
        // [Fix 500 Error] Validate response
        if (!response.data || !response.data.id) {
          throw new Error('Invalid response from server: order data missing or incomplete');
        }
        
        createdOrders.push(mapApiOrderToOrder(response.data));
        successCount++;
      } catch (error: any) {
        errorCount++;
        // [Fix 500 Error] Log error only once for batch operations (prevent spam)
        if (errorCount === 1) {
          const statusCode = error?.response?.status;
          const errorMessage = error?.response?.data?.message 
            || error?.message 
            || `Failed to create order${statusCode ? ` (Status: ${statusCode})` : ''}`;
          console.error(`[OrderApiService] API Error: ${errorMessage} (order ${errorCount} of ${apiOrders.length} failed)`);
        }
        // Continue with other orders even if one fails
      }
    }
    
    // [Fix 500 Error] Log summary
    if (successCount > 0) {
      console.log(`[OrderApiService] ✅ Created ${successCount}/${apiOrders.length} order(s) successfully`);
    }
    
    // [Fix 500 Error] Return created orders (partial success is acceptable)
    // If all failed, return empty array (caller can handle this)
    return createdOrders;
  } catch (error: any) {
    // [Fix 500 Error] Handle mapping/validation errors
    const errorMessage = error?.message || 'Failed to create orders';
    console.error(`[OrderApiService] API Error: ${errorMessage}`);
    throw new Error(errorMessage);
  }
};

// [Data Sync] Update order in API
export const updateOrder = async (id: string, updates: Partial<any>): Promise<any> => {
  try {
    const existingOrder = await fetchOrderById(id);
    if (!existingOrder) {
      throw new Error(`Order ${id} not found`);
    }
    
    const updatedOrder = { ...existingOrder, ...updates, updatedAt: Date.now() };
    const apiOrder = mapOrderToApiOrder(updatedOrder);
    const response = await api.put(`/orders/${id}`, apiOrder);
    return mapApiOrderToOrder(response.data);
  } catch (error) {
    console.error('[OrderApiService] Error updating order:', error);
    throw error;
  }
};

// [Data Sync] Patch order in API (partial update)
export const patchOrder = async (id: string, updates: Partial<any>): Promise<any> => {
  const safeId = id.trim();
  if (!safeId) {
    throw new Error("[OrderApiService] Cannot patch order without ID");
  }
  try {
    const apiUpdates: any = {};
    
    // Map status if provided
    if (updates.status) {
      apiUpdates.status = mapOrderStatusToApiStatus(updates.status);
    }
    
    // Map other fields
    if (updates.paymentStatus) apiUpdates.paymentStatus = updates.paymentStatus;
    if (updates.vnpayTransactionId) apiUpdates.vnpayTransactionId = updates.vnpayTransactionId;
    if (updates.confirmedBy) apiUpdates.confirmedBy = updates.confirmedBy;
    if (updates.internalNotes) apiUpdates.internalNotes = updates.internalNotes;
    if (updates.confirmedAt) apiUpdates.confirmedAt = updates.confirmedAt;
    if (updates.cancelledAt) apiUpdates.cancelledAt = updates.cancelledAt;
    
    if (typeof updates.droneId === "string") {
      apiUpdates.droneId = updates.droneId;
    }

    apiUpdates.updatedAt = Date.now();
    
    // IMPORTANT:
    // Use the order ID exactly as provided by the backend (do NOT change case),
    // so that it matches the ID stored in the H2 database.
    console.debug("[OrderApiService] Patching order:", {
      id: safeId,
      updates: apiUpdates,
    });

    const response = await api.patch(
      `/orders/${encodeURIComponent(safeId)}`,
      apiUpdates
    );
    return mapApiOrderToOrder(response.data);
  } catch (error) {
    console.error('[OrderApiService] Error patching order:', error);
    throw error;
  }
};

// [Data Sync] Delete order from API
export const deleteOrder = async (id: string): Promise<void> => {
  try {
    await api.delete(`/orders/${id}`);
  } catch (error) {
    console.error('[OrderApiService] Error deleting order:', error);
    throw error;
  }
};

