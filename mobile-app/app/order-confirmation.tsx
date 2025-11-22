import React from 'react';
import { View, Text, Pressable, StyleSheet, ScrollView } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { theme } from '@/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Clipboard from '@react-native-clipboard/clipboard';

type SummaryOrderItem = {
  productId?: number | string;
  name: string;
  qty: number;
  price: number;
};

type SummaryOrder = {
  id: string;
  restaurantId?: string;
  status?: string;
  total?: number;
  items: SummaryOrderItem[];
};

type SplitSummary = {
  paymentSessionId: string;
  orders: SummaryOrder[];
  totalAmount: number;
};

export default function OrderConfirmation() {
  const params = useLocalSearchParams();
  const orderId = params.orderId as string;
  const confirmationCode = params.confirmationCode as string;
  const rawSummary = params.summary as string | undefined;
  
  // Parse summary if present
  let summary: SplitSummary | null = null;
  if (rawSummary) {
    try {
      summary = JSON.parse(rawSummary);
    } catch (e) {
      console.warn('[OrderConfirmation] Failed to parse summary:', e);
    }
  }
  
  const isMultiOrder = summary && summary.orders && summary.orders.length > 0;

  const copyToClipboard = async () => {
    if (confirmationCode) {
      Clipboard.setString(confirmationCode);
      alert('Confirmation code copied to clipboard!');
    }
  };

  const viewTracking = () => {
    // Use first order ID for tracking if multi-order, otherwise use single orderId
    const trackingOrderId = isMultiOrder && summary?.orders?.[0]?.id ? summary.orders[0].id : orderId;
    router.push({ pathname: '/drone', params: { orderId: trackingOrderId } });
  };

  const goHome = () => {
    router.replace('/home');
  };

  // Save order confirmation to AsyncStorage for persistence
  React.useEffect(() => {
    const saveOrder = async () => {
      try {
        let orderData: any;
        
        if (isMultiOrder && summary) {
          // Multi-order history entry
          orderData = {
            type: 'multi',
            confirmationCode,
            paymentSessionId: summary.paymentSessionId,
            orderCount: summary.orders.length,
            totalAmount: summary.totalAmount,
            timestamp: Date.now()
          };
        } else {
          // Single-order history entry
          orderData = {
            type: 'single',
            orderId,
            confirmationCode,
            timestamp: Date.now()
          };
        }
        
        const existingOrders = await AsyncStorage.getItem('order_history');
        const orders = existingOrders ? JSON.parse(existingOrders) : [];
        orders.push(orderData);
        await AsyncStorage.setItem('order_history', JSON.stringify(orders));
      } catch (error) {
        console.error('[OrderConfirmation] Error saving order:', error);
      }
    };
    saveOrder();
  }, [orderId, confirmationCode, isMultiOrder, summary]);

  // Render single-order view (existing behavior)
  if (!isMultiOrder) {
    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <View style={styles.iconContainer}>
          <Text style={styles.icon}>✓</Text>
        </View>
        
        <Text style={styles.title}>Order Confirmed!</Text>
        
        <View style={styles.infoCard}>
          <Text style={styles.label}>Order ID</Text>
          <Text style={styles.value}>{orderId}</Text>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.label}>Payment Confirmation Code</Text>
          <Text style={styles.confirmationCode}>{confirmationCode}</Text>
          <Pressable style={styles.copyButton} onPress={copyToClipboard}>
            <Text style={styles.copyButtonText}>Copy Code</Text>
          </Pressable>
        </View>

        <Text style={styles.message}>
          Your order has been placed successfully. You can track its delivery status in real-time.
        </Text>

        <Pressable style={styles.primaryButton} onPress={viewTracking}>
          <Text style={styles.primaryButtonText}>Track Delivery</Text>
        </Pressable>

        <Pressable style={styles.secondaryButton} onPress={goHome}>
          <Text style={styles.secondaryButtonText}>Back to Home</Text>
        </Pressable>
      </ScrollView>
    );
  }

  // Render multi-order view
  if (!summary) return null;
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };
  
  const getStatusText = (status?: string) => {
    if (!status) return 'Đang chờ phê duyệt';
    const statusMap: Record<string, string> = {
      'Pending': 'Đang chờ phê duyệt',
      'Confirmed': 'Đã xác nhận',
      'In Progress': 'Đang xử lý',
      'Delivered': 'Đã giao hàng',
      'Cancelled': 'Đã hủy'
    };
    return statusMap[status] || status;
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.iconContainer}>
        <Text style={styles.icon}>✓</Text>
      </View>
      
      <Text style={styles.title}>Đặt hàng thành công!</Text>
      
      {/* Confirmation Code Section */}
      <View style={styles.infoCard}>
        <Text style={styles.label}>Mã xác nhận thanh toán</Text>
        <Text style={styles.confirmationCode}>{confirmationCode}</Text>
        <Pressable style={styles.copyButton} onPress={copyToClipboard}>
          <Text style={styles.copyButtonText}>Copy Code</Text>
        </Pressable>
      </View>

      {/* Overview Section */}
      <View style={styles.multiSection}>
        <Text style={styles.sectionTitle}>Tổng quan đơn hàng</Text>
        <View style={styles.row}>
          <Text style={styles.rowLabel}>Số lượng đơn hàng:</Text>
          <Text style={styles.rowValue}>{summary.orders.length} đơn</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.rowLabel}>Tổng thanh toán:</Text>
          <Text style={[styles.rowValue, { color: theme.colors.primary, fontWeight: '700' }]}>
            {formatCurrency(summary.totalAmount)}
          </Text>
        </View>
      </View>

      {/* Each Order Section */}
      {summary.orders.map((order, index) => (
        <View style={styles.multiSection}>
          <Text style={styles.sectionTitle}>Đơn hàng {index + 1}</Text>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Mã đơn hàng:</Text>
            <Text style={styles.rowValue}>#{order.id}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Nhà hàng:</Text>
            <Text style={styles.rowValue}>{order.restaurantId || 'N/A'}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Trạng thái:</Text>
            <Text style={styles.rowValue}>{getStatusText(order.status)}</Text>
          </View>
          
          <Text style={[styles.sectionTitle, { fontSize: 16, marginTop: 16, marginBottom: 12 }]}>Sản phẩm</Text>
          {order.items.map((item, itemIndex) => (
            <View style={styles.itemRow}>
              <View style={{ flex: 1 }}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemDetails}>
                  Số lượng: {item.qty} × {formatCurrency(item.price)}
                </Text>
              </View>
              <Text style={styles.itemTotal}>{formatCurrency(item.price * item.qty)}</Text>
            </View>
          ))}
          
          <View style={[styles.row, { marginTop: 12, paddingTop: 12, borderTopWidth: 1, borderTopColor: '#e9ecef' }]}>
            <Text style={styles.rowLabel}>Tổng đơn hàng:</Text>
            <Text style={[styles.rowValue, { color: theme.colors.primary, fontWeight: '700' }]}>
              {formatCurrency(order.total || 0)}
            </Text>
          </View>
        </View>
      ))}

      <Text style={styles.message}>
        Bạn đã đặt {summary.orders.length} đơn hàng từ {summary.orders.length} nhà hàng khác nhau.
      </Text>

      <Pressable style={styles.primaryButton} onPress={viewTracking}>
        <Text style={styles.primaryButtonText}>Track Delivery</Text>
      </Pressable>

      <Pressable style={styles.secondaryButton} onPress={goHome}>
        <Text style={styles.secondaryButtonText}>Back to Home</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 24,
    alignItems: 'center',
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#28a745',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    marginTop: 40,
  },
  icon: {
    fontSize: 48,
    color: '#fff',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: theme.colors.primary,
    marginBottom: 32,
    textAlign: 'center',
  },
  infoCard: {
    width: '100%',
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  label: {
    fontSize: 14,
    color: theme.colors.secondaryText,
    marginBottom: 8,
    fontWeight: '600',
  },
  value: {
    fontSize: 18,
    color: theme.colors.primaryText,
    fontWeight: '600',
  },
  confirmationCode: {
    fontSize: 24,
    color: theme.colors.primary,
    fontWeight: '700',
    marginBottom: 12,
    letterSpacing: 2,
  },
  copyButton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  copyButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  message: {
    fontSize: 16,
    color: theme.colors.secondaryText,
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 32,
    lineHeight: 24,
  },
  primaryButton: {
    width: '100%',
    backgroundColor: theme.colors.primary,
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  secondaryButton: {
    width: '100%',
    backgroundColor: 'transparent',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: theme.colors.primary,
  },
  secondaryButtonText: {
    color: theme.colors.primary,
    fontSize: 18,
    fontWeight: '600',
  },
  multiSection: {
    width: '100%',
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: theme.colors.primaryText,
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  rowLabel: {
    fontSize: 14,
    color: theme.colors.secondaryText,
    fontWeight: '500',
  },
  rowValue: {
    fontSize: 14,
    color: theme.colors.primaryText,
    fontWeight: '600',
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 8,
  },
  itemName: {
    fontWeight: '600',
    color: theme.colors.primaryText,
    marginBottom: 4,
    fontSize: 15,
  },
  itemDetails: {
    fontSize: 13,
    color: theme.colors.secondaryText,
  },
  itemTotal: {
    fontWeight: '600',
    color: theme.colors.primaryText,
    fontSize: 15,
  },
});

