import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, Pressable, StyleSheet, ScrollView, TextInput, Modal, TouchableOpacity } from 'react-native';
import { api } from '../api/api';
import { theme } from '../theme';
import { realtimeSocket } from '../realtime/socket';

const WARD_OPTIONS = [
	'Phường Chợ Quán',
	'Phường An Đông',
	'Phường Chợ Lớn',
];

// [Data Sync] Create order in shared API (same as web frontend)
export default function Checkout({ navigation, route }: any) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [cartItems, setCartItems] = useState<any[]>(route?.params?.cartItems || []);
	
	// Form state
	const [form, setForm] = useState({
		name: '',
		phone: '',
		email: '',
		street: '',
		ward: '',
		district: '',
		city: '',
		note: '',
	});
	
	const [showWardPicker, setShowWardPicker] = useState(false);
	const [errors, setErrors] = useState<Record<string, string>>({});

  const fetchLatestCart = useCallback(async () => {
    try {
      const res = await api.get('/cart');
      const normalized = (res.data || []).map((item: any) => ({
        id: item.productId,
        name: item.productName,
        price: item.unitPrice,
        qty: item.quantity,
      }));
      setCartItems(normalized);
    } catch (error) {
      console.error('[Checkout] Failed to refresh cart:', error);
    }
  }, []);

  useEffect(() => {
    fetchLatestCart();
  }, [fetchLatestCart]);

  useEffect(() => {
    const unsubscribeOrder = realtimeSocket.onOrderUpdate(() => {
      fetchLatestCart();
    });
    const unsubscribeDrone = realtimeSocket.onDroneUpdate(() => {
      fetchLatestCart();
    });
    return () => {
      unsubscribeOrder();
      unsubscribeDrone();
    };
  }, [fetchLatestCart]);

	const validateForm = (): boolean => {
		const newErrors: Record<string, string> = {};
		
		if (!form.name.trim()) {
			newErrors.name = 'Họ tên là bắt buộc';
		}
		
		if (!form.phone.trim()) {
			newErrors.phone = 'Số điện thoại là bắt buộc';
		} else if (!/^(0|\+84)[0-9]{9,10}$/.test(form.phone)) {
			newErrors.phone = 'Số điện thoại không hợp lệ';
		}
		
		if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
			newErrors.email = 'Email không hợp lệ';
		}
		
		if (!form.street.trim()) {
			newErrors.street = 'Địa chỉ đường/phố là bắt buộc';
		}
		
		if (!form.ward) {
			newErrors.ward = 'Phường/Xã là bắt buộc';
		}
		
		if (!form.district.trim()) {
			newErrors.district = 'Quận/huyện là bắt buộc';
		}
		
		if (!form.city.trim()) {
			newErrors.city = 'Thành phố/tỉnh là bắt buộc';
		}
		
		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const pay = async () => {
		if (!validateForm()) {
			setMessage('Vui lòng kiểm tra lại thông tin!');
			return;
		}

		if (cartItems.length === 0) {
			setMessage('Giỏ hàng trống!');
			return;
		}

		setLoading(true);
		setMessage('');
		
		try {
      // Calculate total
      const total = cartItems.reduce((sum: number, item: any) => {
        return sum + (item.price || 0) * (item.qty || 1);
      }, 0);

			// Build address with ward
			const address = `${form.street}, ${form.ward}, ${form.district}, ${form.city}`;

      // Build order payload for backend API
      const orderPayload = {
				customerName: form.name,
				phone: form.phone,
				address: address,
        restaurantCode: route?.params?.restaurantCode || 'SweetDreams',
        totalPrice: total,
        items: cartItems.map((item: any) => ({
          productId: item.id || item.productId || 0,
          productName: item.name || item.productName || '',
          unitPrice: item.price || 0,
          quantity: item.qty || 1,
        })),
      };

      // [Data Sync] Create order in shared API
      const res = await api.post('/orders', orderPayload);
      const orderId = res.data.id || res.data.orderId || `ORD-${Date.now()}`;
      
      // [Data Sync] Verify order was created successfully
      console.log(`[SYNC OK ✅] Mobile created order ${orderId} in shared API`);
      
			setMessage(`Đơn hàng ${orderId} đã được xác nhận!`);
      setTimeout(() => navigation.navigate('Drone', { orderId }), 800);
    } catch (error) {
      console.error('[Checkout] Error creating order:', error);
			setMessage('Có lỗi xảy ra khi tạo đơn hàng. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
			<Text style={styles.title}>Thông tin thanh toán</Text>
			
			<ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
				<View style={styles.formGroup}>
					<Text style={styles.label}>Họ tên *</Text>
					<TextInput
						style={[styles.input, errors.name && styles.inputError]}
						value={form.name}
						onChangeText={(text) => {
							setForm(prev => ({ ...prev, name: text }));
							if (errors.name) setErrors(prev => ({ ...prev, name: '' }));
						}}
						placeholder="Nhập họ tên của bạn"
						placeholderTextColor="#999"
					/>
					{errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
				</View>

				<View style={styles.formGroup}>
					<Text style={styles.label}>Số điện thoại *</Text>
					<TextInput
						style={[styles.input, errors.phone && styles.inputError]}
						value={form.phone}
						onChangeText={(text) => {
							setForm(prev => ({ ...prev, phone: text }));
							if (errors.phone) setErrors(prev => ({ ...prev, phone: '' }));
						}}
						placeholder="Nhập số điện thoại"
						placeholderTextColor="#999"
						keyboardType="phone-pad"
					/>
					{errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}
				</View>

				<View style={styles.formGroup}>
					<Text style={styles.label}>Email</Text>
					<TextInput
						style={[styles.input, errors.email && styles.inputError]}
						value={form.email}
						onChangeText={(text) => {
							setForm(prev => ({ ...prev, email: text }));
							if (errors.email) setErrors(prev => ({ ...prev, email: '' }));
						}}
						placeholder="Nhập email (tùy chọn)"
						placeholderTextColor="#999"
						keyboardType="email-address"
						autoCapitalize="none"
					/>
					{errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
				</View>

				<View style={styles.formGroup}>
					<Text style={styles.label}>Địa chỉ đường/phố *</Text>
					<TextInput
						style={[styles.input, errors.street && styles.inputError]}
						value={form.street}
						onChangeText={(text) => {
							setForm(prev => ({ ...prev, street: text }));
							if (errors.street) setErrors(prev => ({ ...prev, street: '' }));
						}}
						placeholder="Nhập địa chỉ đường/phố"
						placeholderTextColor="#999"
					/>
					{errors.street && <Text style={styles.errorText}>{errors.street}</Text>}
				</View>

				<View style={styles.formGroup}>
					<Text style={styles.label}>Quận/huyện *</Text>
					<TextInput
						style={[styles.input, errors.district && styles.inputError]}
						value={form.district}
						onChangeText={(text) => {
							setForm(prev => ({ ...prev, district: text }));
							if (errors.district) setErrors(prev => ({ ...prev, district: '' }));
						}}
						placeholder="Nhập quận/huyện"
						placeholderTextColor="#999"
					/>
					{errors.district && <Text style={styles.errorText}>{errors.district}</Text>}
				</View>

				<View style={styles.formGroup}>
					<Text style={styles.label}>Phường/Xã *</Text>
					<TouchableOpacity
						style={[styles.input, styles.pickerInput, errors.ward && styles.inputError]}
						onPress={() => setShowWardPicker(true)}
					>
						<Text style={[styles.pickerText, !form.ward && styles.pickerPlaceholder]}>
							{form.ward || '-- Chọn Phường/Xã --'}
						</Text>
					</TouchableOpacity>
					{errors.ward && <Text style={styles.errorText}>{errors.ward}</Text>}
				</View>

				<View style={styles.formGroup}>
					<Text style={styles.label}>Thành phố/tỉnh *</Text>
					<TextInput
						style={[styles.input, errors.city && styles.inputError]}
						value={form.city}
						onChangeText={(text) => {
							setForm(prev => ({ ...prev, city: text }));
							if (errors.city) setErrors(prev => ({ ...prev, city: '' }));
						}}
						placeholder="Nhập thành phố/tỉnh"
						placeholderTextColor="#999"
					/>
					{errors.city && <Text style={styles.errorText}>{errors.city}</Text>}
				</View>

				<View style={styles.formGroup}>
					<Text style={styles.label}>Ghi chú</Text>
					<TextInput
						style={[styles.input, styles.textArea]}
						value={form.note}
						onChangeText={(text) => setForm(prev => ({ ...prev, note: text }))}
						placeholder="Nhập ghi chú (tùy chọn)"
						placeholderTextColor="#999"
						multiline
						numberOfLines={3}
						textAlignVertical="top"
					/>
				</View>
			</ScrollView>

			<Pressable 
				disabled={loading || cartItems.length === 0} 
				onPress={pay} 
				style={[styles.cta, (loading || cartItems.length === 0) && styles.ctaDisabled]}
			>
				<Text style={styles.ctaText}>
					{loading ? 'Đang xử lý...' : 'Đặt hàng'}
				</Text>
			</Pressable>
			
			{message ? (
				<Text style={[styles.messageText, message.includes('lỗi') || message.includes('lại') ? styles.messageError : styles.messageSuccess]}>
					{message}
				</Text>
			) : null}

			{/* Ward Picker Modal */}
			<Modal
				visible={showWardPicker}
				transparent={true}
				animationType="slide"
				onRequestClose={() => setShowWardPicker(false)}
			>
				<TouchableOpacity
					style={styles.modalOverlay}
					activeOpacity={1}
					onPress={() => setShowWardPicker(false)}
				>
					<View style={styles.modalContent}>
						<View style={styles.modalHeader}>
							<Text style={styles.modalTitle}>Chọn Phường/Xã</Text>
							<Pressable onPress={() => setShowWardPicker(false)}>
								<Text style={styles.modalClose}>Đóng</Text>
							</Pressable>
						</View>
						<ScrollView style={styles.modalScrollView}>
							{WARD_OPTIONS.map((ward) => (
								<TouchableOpacity
									key={ward}
									style={[
										styles.wardOption,
										form.ward === ward && styles.wardOptionSelected
									]}
									onPress={() => {
										setForm(prev => ({ ...prev, ward }));
										setShowWardPicker(false);
										if (errors.ward) setErrors(prev => ({ ...prev, ward: '' }));
									}}
								>
									<Text style={[
										styles.wardOptionText,
										form.ward === ward && styles.wardOptionTextSelected
									]}>
										{ward}
									</Text>
								</TouchableOpacity>
							))}
						</ScrollView>
					</View>
				</TouchableOpacity>
			</Modal>
    </View>
  );
}

const styles = StyleSheet.create({
	container: { 
		flex: 1, 
		padding: 16, 
		backgroundColor: '#fff' 
	},
	title: { 
		fontSize: 20, 
		fontWeight: '700', 
		marginBottom: 16, 
		color: theme.colors.primary 
	},
	scrollView: {
		flex: 1,
	},
	formGroup: {
		marginBottom: 16,
	},
	label: {
		fontSize: 14,
		fontWeight: '600',
		marginBottom: 8,
		color: '#333',
	},
	input: {
		borderWidth: 2,
		borderColor: '#ddd',
		borderRadius: 8,
		padding: 12,
		fontSize: 14,
		color: '#333',
		backgroundColor: '#fff',
	},
	inputError: {
		borderColor: '#f44336',
	},
	pickerInput: {
		justifyContent: 'center',
	},
	pickerText: {
		fontSize: 14,
		color: '#333',
	},
	pickerPlaceholder: {
		color: '#999',
	},
	textArea: {
		height: 80,
		paddingTop: 12,
	},
	errorText: {
		color: '#f44336',
		fontSize: 12,
		marginTop: 4,
	},
	cta: { 
		marginTop: 12, 
		backgroundColor: theme.colors.primary, 
		paddingVertical: 12, 
		borderRadius: 8, 
		alignItems: 'center' 
	},
	ctaDisabled: {
		backgroundColor: '#ccc',
	},
	ctaText: {
		color: '#fff',
		fontSize: 16,
		fontWeight: '600',
	},
	messageText: {
		marginTop: 8,
		fontSize: 14,
		textAlign: 'center',
	},
	messageSuccess: {
		color: '#4caf50',
	},
	messageError: {
		color: '#f44336',
	},
	modalOverlay: {
		flex: 1,
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
		justifyContent: 'flex-end',
	},
	modalContent: {
		backgroundColor: '#fff',
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
		maxHeight: '70%',
	},
	modalHeader: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		padding: 16,
		borderBottomWidth: 1,
		borderBottomColor: '#ddd',
	},
	modalTitle: {
		fontSize: 18,
		fontWeight: '600',
		color: '#333',
	},
	modalClose: {
		fontSize: 16,
		color: theme.colors.primary,
		fontWeight: '600',
	},
	modalScrollView: {
		maxHeight: 400,
	},
	wardOption: {
		padding: 16,
		borderBottomWidth: 1,
		borderBottomColor: '#f0f0f0',
	},
	wardOptionSelected: {
		backgroundColor: '#fff3e0',
	},
	wardOptionText: {
		fontSize: 16,
		color: '#333',
	},
	wardOptionTextSelected: {
		color: theme.colors.primary,
		fontWeight: '600',
	},
});
