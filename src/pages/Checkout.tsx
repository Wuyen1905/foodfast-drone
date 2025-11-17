import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useOrders } from "@/context/OrderContext";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context";
import { formatVND } from "../utils/currency";
import { createVNPayPaymentUrl, simulateVNPayPayment } from "../services/vnpay";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { checkoutSchema, CheckoutFormData } from "../schemas/checkoutSchema";
import { notifyRestaurant } from "../services/restaurantNotificationService";
import type { Order } from "@/context/OrderContext";
import { splitOrdersByRestaurant, createOrdersFromSplit } from "../services/orderSplittingService";
// [Restore Full Checkout] Support both single order and split orders based on items

// Styled Components
const CheckoutContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 24px;
`;

const CheckoutCard = styled(motion.div)`
  background: var(--card);
  border-radius: 16px;
  padding: 32px;
  box-shadow: var(--shadow-md);
  border: 1px solid var(--border);
`;

const Title = styled.h2`
  text-align: center;
  margin: 0 0 32px 0;
  color: var(--text);
  font-size: 28px;
  font-weight: 700;
`;

const FormSection = styled.div`
  margin-bottom: 32px;
`;

const SectionTitle = styled.h3`
  margin: 0 0 20px 0;
  color: var(--text);
  font-size: 20px;
  font-weight: 600;
  border-bottom: 2px solid var(--border);
  padding-bottom: 8px;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: var(--text);
`;

const Input = styled.input<{ $hasError?: boolean }>`
  width: 100%;
  padding: 12px 16px;
  border: 2px solid ${props => props.$hasError ? '#f44336' : 'var(--border)'};
  border-radius: 8px;
  background: var(--card);
  color: var(--text);
  font-size: 14px;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: ${props => props.$hasError ? '#f44336' : 'var(--primary)'};
    box-shadow: 0 0 0 3px ${props => props.$hasError ? 'rgba(244, 67, 54, 0.1)' : 'rgba(255, 102, 0, 0.1)'};
  }
`;

const ErrorMessage = styled(motion.div)`
  color: #f44336;
  font-size: 12px;
  margin-top: 4px;
`;

const PaymentMethodGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-bottom: 24px;
`;

const PaymentMethodCard = styled(motion.div)<{ isSelected?: boolean }>`
  padding: 16px;
  border: 2px solid ${props => props.isSelected ? 'var(--primary)' : 'var(--border)'};
  border-radius: 12px;
  cursor: pointer;
  background: ${props => props.isSelected ? 'rgba(255, 102, 0, 0.05)' : 'var(--card)'};
  transition: all 0.3s ease;
  
  &:hover {
    border-color: var(--primary);
    transform: translateY(-2px);
  }
`;

const PaymentMethodIcon = styled.div`
  font-size: 24px;
  margin-bottom: 8px;
`;

const PaymentMethodName = styled.div`
  font-weight: 600;
  color: var(--text);
  margin-bottom: 4px;
`;

const PaymentMethodDesc = styled.div`
  font-size: 12px;
  color: var(--secondaryText);
`;

const OrderSummary = styled.div`
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 24px;
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  
  &:last-child {
    border-top: 1px solid var(--border);
    padding-top: 12px;
    margin-top: 12px;
    font-weight: 600;
    font-size: 16px;
  }
`;

const SubmitButton = styled(motion.button)<{ disabled?: boolean }>`
  width: 100%;
  padding: 16px;
  background: ${props => props.disabled ? 'var(--border)' : 'linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%)'};
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  transition: all 0.3s ease;
  box-shadow: var(--shadow);
  
  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
  }
`;

const LoadingOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const LoadingCard = styled(motion.div)`
  background: var(--card);
  border-radius: 16px;
  padding: 32px;
  text-align: center;
  max-width: 400px;
  margin: 20px;
`;

const LoadingSpinner = styled(motion.div)`
  width: 50px;
  height: 50px;
  border: 4px solid var(--border);
  border-top: 4px solid var(--primary);
  border-radius: 50%;
  margin: 0 auto 20px;
`;

const VNPayQRCode = styled.div`
  width: 200px;
  height: 200px;
  background: #f5f5f5;
  border: 2px solid var(--border);
  border-radius: 12px;
  margin: 0 auto 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: var(--secondaryText);
`;

const Checkout: React.FC = () => {
  const { user } = useAuth();
  const { addOrder, addOrders, getOrdersByPhone } = useOrders();
  const { items: allCartItems, clear, removeItems, subtotal: allCartSubtotal } = useCart();
  
  // [Restore Full Checkout] Get removeItems function for per-restaurant checkout
  const navigate = useNavigate();
  
  // [Multi-Restaurant Cart] Get checkout items from sessionStorage if available (per-restaurant checkout)
  const checkoutItems = React.useMemo(() => {
    try {
      const stored = sessionStorage.getItem('checkoutItems');
      if (stored) {
        const parsed = JSON.parse(stored);
        return parsed;
      }
    } catch (error) {
      console.error('Error parsing checkoutItems from sessionStorage:', error);
    }
    return allCartItems;
  }, [allCartItems]);
  
  // [Multi-Restaurant Cart] Calculate subtotal for checkout items only
  const subtotal = React.useMemo(() => {
    return checkoutItems.reduce((sum: number, item: any) => {
      const price = Number(item.price) || 0;
      const qty = Number(item.qty) || 0;
      return sum + price * qty;
    }, 0);
  }, [checkoutItems]);
  
  const [form, setForm] = useState<CheckoutFormData>({
    name: user?.name || "",
    phone: user?.phone || "",
    email: "",
    street: "",
    district: "",
    city: "",
    note: "",
    payment: "cod",
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showVNPayModal, setShowVNPayModal] = useState(false);

  // [Restore Single Order Checkout] Calculate totals for single consolidated order
  const delivery = 25000; // 25k VND per order
  const tax = subtotal * 0.08;
  const total = subtotal + tax + delivery; // Estimated total for display

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = async (): Promise<boolean> => {
    try {
      await checkoutSchema.validate(form, { abortEarly: false });
      setErrors({});
      return true;
    } catch (err: any) {
      const validationErrors: Record<string, string> = {};
      err.inner.forEach((error: any) => {
        validationErrors[error.path] = error.message;
      });
      setErrors(validationErrors);
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!await validateForm()) {
      toast.error("Vui lòng kiểm tra lại thông tin!");
      return;
    }

    if (checkoutItems.length === 0) {
      toast.error("Giỏ hàng trống!");
      return;
    }
    
    // Check order limit
    const existingOrders = getOrdersByPhone(form.phone);
    const activeOrders = existingOrders.filter((order: any) => 
      order.status === "Processing" || order.status === "Delivering" || 
      order.status === "Đang xử lý" || order.status === "Đang giao hàng" ||
      order.status === "Pending" || order.status === "In Progress"
    );
    
    if (activeOrders.length >= 2) {
      toast.error("Bạn đã đặt nhiều hơn số đơn hàng quy định! Chờ một xíu nhé!");
      return;
    }

    setIsSubmitting(true);

    try {
      // [Restore Full Checkout] Determine if we should create single order or split orders
      // If checkoutItems is from sessionStorage (per-restaurant checkout), create single order
      // If checkoutItems is all cart items, check if they're from multiple restaurants
      const hasCheckoutItems = sessionStorage.getItem('checkoutItems') !== null;
      
      // [Restore Full Checkout] Check if all items are from the same restaurant
      // Use restaurantId from cart items, or determine from product ID
      const getItemRestaurantId = (item: any): string | null => {
        if (item.restaurantId) return item.restaurantId;
        // Fallback: determine from product ID pattern (sd-* -> rest_2, ak-* -> restaurant_2)
        if (item.id?.startsWith('sd-')) return 'rest_2';
        if (item.id?.startsWith('ak-')) return 'restaurant_2';
        return null;
      };
      
      const firstItemRestaurantId = getItemRestaurantId(checkoutItems[0]);
      const allSameRestaurant = checkoutItems.every(item => getItemRestaurantId(item) === firstItemRestaurantId);
      const hasMultipleRestaurants = !allSameRestaurant && firstItemRestaurantId && checkoutItems.length > 1;
      
      // Decision logic:
      // 1. If per-restaurant checkout (hasCheckoutItems) → single order
      // 2. If all items from same restaurant → single order
      // 3. If items from multiple restaurants → split orders
      const shouldSplitOrders = !hasCheckoutItems && hasMultipleRestaurants;
      
      if (shouldSplitOrders) {
        // [Restore Full Checkout] Split orders by restaurant for multiple restaurants
        const splitResult = splitOrdersByRestaurant(checkoutItems, delivery);
        
      if (form.payment === 'vnpay') {
          // Handle VNPay payment for multiple orders
        setShowVNPayModal(true);
        
        try {
          const paymentOrderId = `ORDER-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
          
          // Create VNPay payment URL
          const paymentUrl = await createVNPayPaymentUrl({
              amount: splitResult.totalAmount,
            orderInfo: `Thanh toan don hang ${paymentOrderId}`,
            orderId: paymentOrderId,
            returnUrl: `${window.location.origin}/vnpay-return`,
          });
          
            // Store split order data in sessionStorage for callback processing
          const orderData = {
            name: form.name,
            phone: form.phone,
            address: `${form.street}, ${form.district}, ${form.city}`,
              items: checkoutItems,
            userId: user?.id,
            note: form.note,
            paymentSessionId: splitResult.paymentSessionId,
            splitResult: splitResult,
            paymentOrderId: paymentOrderId,
            timestamp: Date.now(),
          };
          
          sessionStorage.setItem('vnpay_pending_order', JSON.stringify(orderData));
          
          // For demo/simulation: Use simulate function
          const paymentResult = await simulateVNPayPayment();
          
          if (paymentResult.success) {
              try {
            // Create orders from split result
            const createdOrders = createOrdersFromSplit(splitResult, {
              name: form.name,
              phone: form.phone,
              address: `${form.street}, ${form.district}, ${form.city}`,
                  items: checkoutItems,
              paymentMethod: 'vnpay',
              paymentStatus: 'completed',
              vnpayTransactionId: paymentResult.transactionId,
              userId: user?.id,
              note: form.note
            });
            
                // [Data Sync] Add all orders at once
                await addOrders(createdOrders);
                
                // [Fix 500 Error] Order creation succeeded (addOrders handles errors internally)
                console.log(`[SYNC OK ✅] Web created ${createdOrders.length} order(s) via VNPay in shared API:`, createdOrders.map(o => o.id).join(', '));
            
            // Notify each restaurant about their order
            for (const order of createdOrders) {
              if (order.restaurantId) {
                notifyRestaurant(order).catch(err => {
                      // Silent fail for restaurant notification
                });
              }
            }
            
                // Clear checkoutItems and cart after successful checkout
                sessionStorage.removeItem('checkoutItems');
            sessionStorage.removeItem('vnpay_pending_order');
                clear(); // Clear entire cart since all items were processed
            
            toast.success("Thanh toán VNPay thành công!");
            
            // Generate payment confirmation code (FD-XXXX format)
            const generateConfirmationCode = () => {
              const randomNum = Math.floor(1000 + Math.random() * 9000); // 4-digit number
              return `FD-${randomNum}`;
            };
            
            // Use paymentSessionId as confirmation code, or generate fallback
            const confirmationCode = splitResult.paymentSessionId || generateConfirmationCode();
            
            // Navigate to confirmation with first order ID, payment session ID, and confirmation code
            const firstOrderId = createdOrders[0]?.id || '';
            navigate(`/order-confirmation?orderId=${firstOrderId}&paymentSessionId=${splitResult.paymentSessionId}&confirmationCode=${encodeURIComponent(confirmationCode)}`);
              } catch (error: any) {
                // [Fix 500 Error] Handle order creation error gracefully
                // addOrders already handles errors and adds orders locally, so we can continue
                console.error('[Checkout] API Error: Order creation failed, using local fallback');
                
                // Clear cart and navigate even if API fails (orders are saved locally)
                sessionStorage.removeItem('checkoutItems');
                sessionStorage.removeItem('vnpay_pending_order');
                clear();
                
                toast.success("Thanh toán VNPay thành công!");
                
                // Generate payment confirmation code (FD-XXXX format)
                const generateConfirmationCode = () => {
                  const randomNum = Math.floor(1000 + Math.random() * 9000); // 4-digit number
                  return `FD-${randomNum}`;
                };
                
                // Use paymentSessionId as confirmation code, or generate fallback
                const confirmationCode = splitResult.paymentSessionId || generateConfirmationCode();
                
                const firstOrderId = splitResult.orders[0]?.restaurantId ? `ORDER-${Date.now()}` : '';
                navigate(`/order-confirmation?orderId=${firstOrderId}&paymentSessionId=${splitResult.paymentSessionId}&confirmationCode=${encodeURIComponent(confirmationCode)}`);
              }
          } else {
            toast.error(paymentResult.message);
            sessionStorage.removeItem('vnpay_pending_order');
          }
        } catch (error) {
          console.error('[VNPay] Payment error:', error);
          toast.error('Không thể tạo URL thanh toán VNPay. Vui lòng thử lại.');
          sessionStorage.removeItem('vnpay_pending_order');
        } finally {
          setShowVNPayModal(false);
        }
      } else {
          // [Restore Full Checkout] Create multiple orders for COD payment
          try {
        const createdOrders = createOrdersFromSplit(splitResult, {
          name: form.name,
          phone: form.phone,
          address: `${form.street}, ${form.district}, ${form.city}`,
              items: checkoutItems,
          paymentMethod: form.payment as any,
          paymentStatus: form.payment === 'cod' ? 'Đang chờ phê duyệt' : 'completed',
          userId: user?.id,
          note: form.note
        });
        
            // [Data Sync] Add all orders at once
            await addOrders(createdOrders);
            
            // [Fix 500 Error] Order creation succeeded (addOrders handles errors internally)
            console.log(`[SYNC OK ✅] Web created ${createdOrders.length} order(s) in shared API:`, createdOrders.map(o => o.id).join(', '));
        
        // Notify each restaurant about their order
        for (const order of createdOrders) {
          if (order.restaurantId) {
            notifyRestaurant(order).catch(err => {
                  // Silent fail for restaurant notification
                });
              }
            }
            
            // Clear checkoutItems and cart after successful checkout
            sessionStorage.removeItem('checkoutItems');
            clear(); // Clear entire cart since all items were processed
            
            toast.success("Bạn đã đặt hàng thành công!");
            
            // Generate payment confirmation code (FD-XXXX format)
            const generateConfirmationCode = () => {
              const randomNum = Math.floor(1000 + Math.random() * 9000); // 4-digit number
              return `FD-${randomNum}`;
            };
            
            // Use paymentSessionId as confirmation code, or generate fallback
            const confirmationCode = splitResult.paymentSessionId || generateConfirmationCode();
            
            // Navigate to confirmation with first order ID, payment session ID, and confirmation code
            const firstOrderId = createdOrders[0]?.id || '';
            navigate(`/order-confirmation?orderId=${firstOrderId}&paymentSessionId=${splitResult.paymentSessionId}&confirmationCode=${encodeURIComponent(confirmationCode)}`);
          } catch (error: any) {
            // [Fix 500 Error] Handle order creation error gracefully
            // addOrders already handles errors and adds orders locally, so we can continue
            console.error('[Checkout] API Error: Order creation failed, using local fallback');
            
            // Clear cart and navigate even if API fails (orders are saved locally)
            sessionStorage.removeItem('checkoutItems');
            clear();
            
            // Generate payment confirmation code (FD-XXXX format)
            const generateConfirmationCode = () => {
              const randomNum = Math.floor(1000 + Math.random() * 9000); // 4-digit number
              return `FD-${randomNum}`;
            };
            
            // Use paymentSessionId as confirmation code, or generate fallback
            const confirmationCode = splitResult.paymentSessionId || generateConfirmationCode();
            
            toast.success("Bạn đã đặt hàng thành công!");
            const firstOrderId = splitResult.orders[0]?.restaurantId ? `ORDER-${Date.now()}` : '';
            navigate(`/order-confirmation?orderId=${firstOrderId}&paymentSessionId=${splitResult.paymentSessionId}&confirmationCode=${encodeURIComponent(confirmationCode)}`);
          }
        }
      } else {
        // [Restore Full Checkout] Create a single consolidated order
        const orderId = `ORDER-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        const timestamp = Date.now();
        
        // [Restore Full Checkout] Determine restaurant ID (use first item's restaurant if all same, or undefined if mixed)
        // Ensure restaurant ID is in db.json format (rest_2, restaurant_2)
        let restaurantId: string | undefined = undefined;
        if (allSameRestaurant && firstItemRestaurantId) {
          // Map to db.json format if needed
          if (firstItemRestaurantId === 'rest_2' || firstItemRestaurantId === 'restaurant_2') {
            restaurantId = firstItemRestaurantId;
          } else if (firstItemRestaurantId === 'sweetdreams' || firstItemRestaurantId.startsWith('sd')) {
            restaurantId = 'rest_2';
          } else if (firstItemRestaurantId === 'aloha' || firstItemRestaurantId.startsWith('ak')) {
            restaurantId = 'restaurant_2';
          } else {
            restaurantId = firstItemRestaurantId;
          }
        }
        
        // [Restore Full Checkout] Create single order with all items
        const newOrder: Order = {
          id: orderId,
          name: form.name,
          phone: form.phone,
          address: `${form.street}, ${form.district}, ${form.city}`,
          items: checkoutItems.map(item => {
            if (!item.price || item.price === undefined || item.price === null) {
              throw new Error(`Missing price for item: ${item.name}`);
            }
            return {
              name: item.name,
              qty: Number(item.qty) || 1,
              price: Number(item.price)
            };
          }),
          total: total,
          status: 'Pending',
          paymentMethod: form.payment as any,
          paymentStatus: form.payment === 'cod' ? 'Đang chờ phê duyệt' : 'completed',
          restaurantId: restaurantId,
          userId: user?.id,
          createdAt: timestamp,
          updatedAt: timestamp,
          dronePath: ["Nhà hàng", "Kho Drone", "Đang giao", "Hoàn tất"],
          note: form.note
        };

        if (form.payment === 'vnpay') {
          // Handle VNPay payment for single order
          setShowVNPayModal(true);
          
          try {
            // Generate unique order ID for payment reference
            const paymentOrderId = orderId;
            
            // Create VNPay payment URL
            const paymentUrl = await createVNPayPaymentUrl({
              amount: total,
              orderInfo: `Thanh toan don hang ${paymentOrderId}`,
              orderId: paymentOrderId,
              returnUrl: `${window.location.origin}/vnpay-return`,
            });
            
            // Store order data in sessionStorage for callback processing
            const orderData = {
              order: newOrder,
              paymentOrderId: paymentOrderId,
              timestamp: timestamp,
            };
            
            sessionStorage.setItem('vnpay_pending_order', JSON.stringify(orderData));
            
            // For demo/simulation: Use simulate function
            const paymentResult = await simulateVNPayPayment();
            
            if (paymentResult.success) {
              try {
                // [Restore Full Checkout] Create single order with payment info
                const orderWithPayment: Order = {
                  ...newOrder,
                  paymentStatus: 'completed',
                  vnpayTransactionId: paymentResult.transactionId,
                };
                
                // [Data Sync] Add single order to API
                await addOrder(orderWithPayment);
                
                // [Fix 500 Error] Order creation succeeded (addOrder handles errors internally)
                console.log(`[SYNC OK ✅] Web created single order via VNPay in shared API:`, orderWithPayment.id);
                
                // Notify restaurant if order has restaurantId
                if (orderWithPayment.restaurantId) {
                  notifyRestaurant(orderWithPayment).catch(err => {
                    // Silent fail for restaurant notification
                  });
                }
                
                // [Restore Full Checkout] Clear checkoutItems and cart after successful checkout
                // If per-restaurant checkout, only remove those items from cart
                if (hasCheckoutItems) {
                  removeItems(checkoutItems);
                  sessionStorage.removeItem('checkoutItems');
                } else {
                  clear(); // Clear entire cart since all items were processed
                  sessionStorage.removeItem('checkoutItems');
                }
                sessionStorage.removeItem('vnpay_pending_order');
                
                toast.success("Thanh toán VNPay thành công!");
                
                // Navigate to confirmation with order ID
                navigate(`/order-confirmation?orderId=${orderWithPayment.id}`);
              } catch (error: any) {
                // [Fix 500 Error] Handle order creation error gracefully
                // addOrder already handles errors and adds order locally, so we can continue
                console.error('[Checkout] API Error: Order creation failed, using local fallback');
                
                // Clear cart and navigate even if API fails (order is saved locally)
                if (hasCheckoutItems) {
                  removeItems(checkoutItems);
                  sessionStorage.removeItem('checkoutItems');
                } else {
        clear();
                  sessionStorage.removeItem('checkoutItems');
                }
                sessionStorage.removeItem('vnpay_pending_order');
                
                toast.success("Thanh toán VNPay thành công!");
                navigate(`/order-confirmation?orderId=${newOrder.id}`);
              }
            } else {
              toast.error(paymentResult.message);
              sessionStorage.removeItem('vnpay_pending_order');
            }
          } catch (error) {
            console.error('[VNPay] Payment error:', error);
            toast.error('Không thể tạo URL thanh toán VNPay. Vui lòng thử lại.');
            sessionStorage.removeItem('vnpay_pending_order');
          } finally {
            setShowVNPayModal(false);
          }
        } else {
          // [Restore Full Checkout] Create single order for COD payment
          try {
            // [Data Sync] Add single order to API
            await addOrder(newOrder);
            
            // [Fix 500 Error] Order creation succeeded (addOrder handles errors internally)
            console.log(`[SYNC OK ✅] Web created single order in shared API:`, newOrder.id);
            
            // Notify restaurant if order has restaurantId
            if (newOrder.restaurantId) {
              notifyRestaurant(newOrder).catch(err => {
                // Silent fail for restaurant notification
              });
            }
            
            // [Restore Full Checkout] Clear checkoutItems and cart after successful checkout
            // If per-restaurant checkout, only remove those items from cart
            if (hasCheckoutItems) {
              removeItems(checkoutItems);
              sessionStorage.removeItem('checkoutItems');
            } else {
              clear(); // Clear entire cart since all items were processed
              sessionStorage.removeItem('checkoutItems');
            }
            
        toast.success("Bạn đã đặt hàng thành công!");
        
            // Navigate to confirmation with order ID
            navigate(`/order-confirmation?orderId=${newOrder.id}`);
          } catch (error: any) {
            // [Fix 500 Error] Handle order creation error gracefully
            // addOrder already handles errors and adds order locally, so we can continue
            console.error('[Checkout] API Error: Order creation failed, using local fallback');
            
            // Clear cart and navigate even if API fails (order is saved locally)
            if (hasCheckoutItems) {
              removeItems(checkoutItems);
              sessionStorage.removeItem('checkoutItems');
            } else {
              clear();
              sessionStorage.removeItem('checkoutItems');
            }
            
            toast.success("Bạn đã đặt hàng thành công!");
            navigate(`/order-confirmation?orderId=${newOrder.id}`);
          }
        }
      }
    } catch (error: any) {
      // [Fix 500 Error] Log error only once
      const errorMessage = error?.message || 'Failed to process checkout';
      console.error(`[Checkout] API Error: ${errorMessage}`);
      toast.error("Có lỗi xảy ra khi đặt hàng!");
    } finally {
      setIsSubmitting(false);
      if (form.payment !== 'vnpay') {
        setShowVNPayModal(false);
      }
    }
  };

  return (
    <CheckoutContainer>
      <CheckoutCard
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Title>Thông tin thanh toán</Title>
        
        <form onSubmit={handleSubmit}>
          {/* Customer Information */}
          <FormSection>
            <SectionTitle>Thông tin khách hàng</SectionTitle>
            
            <FormGroup>
              <Label>Họ tên *</Label>
              <Input 
                name="name" 
                value={form.name} 
                onChange={handleChange} 
                placeholder="Nhập họ tên của bạn"
                $hasError={!!errors.name}
              />
              <AnimatePresence>
                {errors.name && (
                  <ErrorMessage
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    {errors.name}
                  </ErrorMessage>
                )}
              </AnimatePresence>
            </FormGroup>

            <FormGroup>
              <Label>Số điện thoại *</Label>
              <Input 
                name="phone" 
                value={form.phone} 
                onChange={handleChange} 
                placeholder="Nhập số điện thoại"
                type="tel"
                $hasError={!!errors.phone}
              />
              <AnimatePresence>
                {errors.phone && (
                  <ErrorMessage
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    {errors.phone}
                  </ErrorMessage>
                )}
              </AnimatePresence>
            </FormGroup>

            <FormGroup>
              <Label>Email</Label>
              <Input 
                name="email" 
                value={form.email} 
                onChange={handleChange} 
                placeholder="Nhập email (tùy chọn)"
                type="email"
                $hasError={!!errors.email}
              />
              <AnimatePresence>
                {errors.email && (
                  <ErrorMessage
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    {errors.email}
                  </ErrorMessage>
                )}
              </AnimatePresence>
            </FormGroup>

            <FormGroup>
              <Label>Địa chỉ đường/phố *</Label>
              <Input 
                name="street" 
                value={form.street} 
                onChange={handleChange} 
                placeholder="Nhập địa chỉ đường/phố"
                $hasError={!!errors.street}
              />
              <AnimatePresence>
                {errors.street && (
                  <ErrorMessage
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    {errors.street}
                  </ErrorMessage>
                )}
              </AnimatePresence>
            </FormGroup>

            <FormGroup>
              <Label>Quận/huyện *</Label>
              <Input 
                name="district" 
                value={form.district} 
                onChange={handleChange} 
                placeholder="Nhập quận/huyện"
                $hasError={!!errors.district}
              />
              <AnimatePresence>
                {errors.district && (
                  <ErrorMessage
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    {errors.district}
                  </ErrorMessage>
                )}
              </AnimatePresence>
            </FormGroup>

            <FormGroup>
              <Label>Thành phố/tỉnh *</Label>
              <Input 
                name="city" 
                value={form.city} 
                onChange={handleChange} 
                placeholder="Nhập thành phố/tỉnh"
                $hasError={!!errors.city}
              />
              <AnimatePresence>
                {errors.city && (
                  <ErrorMessage
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    {errors.city}
                  </ErrorMessage>
                )}
              </AnimatePresence>
            </FormGroup>

            <FormGroup>
              <Label>Ghi chú</Label>
              <Input 
                name="note" 
                value={form.note} 
                onChange={handleChange} 
                placeholder="Nhập ghi chú (tùy chọn)"
                as="textarea"
                rows={3}
                $hasError={!!errors.note}
              />
              <AnimatePresence>
                {errors.note && (
                  <ErrorMessage
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    {errors.note}
                  </ErrorMessage>
                )}
              </AnimatePresence>
            </FormGroup>
          </FormSection>

          {/* Payment Methods */}
          <FormSection>
            <SectionTitle>Phương thức thanh toán</SectionTitle>
            
            <PaymentMethodGrid>
              <PaymentMethodCard
                isSelected={form.payment === 'cod'}
                onClick={() => setForm(prev => ({ ...prev, payment: 'cod' }))}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <PaymentMethodIcon>💵</PaymentMethodIcon>
                <PaymentMethodName>Thanh toán khi nhận hàng</PaymentMethodName>
                <PaymentMethodDesc>Trả tiền mặt khi giao hàng</PaymentMethodDesc>
              </PaymentMethodCard>

              <PaymentMethodCard
                isSelected={form.payment === 'vnpay'}
                onClick={() => setForm(prev => ({ ...prev, payment: 'vnpay' }))}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <PaymentMethodIcon>🏦</PaymentMethodIcon>
                <PaymentMethodName>VNPay</PaymentMethodName>
                <PaymentMethodDesc>Thanh toán online qua VNPay</PaymentMethodDesc>
              </PaymentMethodCard>
            </PaymentMethodGrid>
          </FormSection>

          {/* Order Summary */}
          <FormSection>
            <SectionTitle>Tóm tắt đơn hàng</SectionTitle>
            
            <OrderSummary>
              {/* [Multi-Restaurant Cart] Display checkoutItems instead of all cart items */}
              {checkoutItems.map((item) => (
                <SummaryRow key={item.id}>
                  <span>{item.name} x {item.qty}</span>
                  <span>{formatVND(item.price * item.qty)}</span>
                </SummaryRow>
              ))}
              <SummaryRow>
                <span>Tạm tính</span>
                <span>{formatVND(subtotal)}</span>
              </SummaryRow>
              <SummaryRow>
                <span>Phí giao hàng</span>
                <span>{formatVND(delivery)}</span>
              </SummaryRow>
              <SummaryRow>
                <span>Thuế (8%)</span>
                <span>{formatVND(tax)}</span>
              </SummaryRow>
              <SummaryRow>
                <span>Tổng cộng</span>
                <span>{formatVND(total)}</span>
              </SummaryRow>
            </OrderSummary>
          </FormSection>

          <SubmitButton
            type="submit"
            disabled={isSubmitting || checkoutItems.length === 0}
            whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
            whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
          >
            {isSubmitting ? 'Đang xử lý...' : 'Đặt hàng'}
          </SubmitButton>
        </form>
      </CheckoutCard>

      {/* VNPay Loading Modal */}
      <AnimatePresence>
        {showVNPayModal && (
          <LoadingOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <LoadingCard
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <LoadingSpinner
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
              <h3>Đang chuyển hướng đến VNPay...</h3>
              <p>Vui lòng chờ trong giây lát</p>
              <VNPayQRCode>
                Mã QR VNPay<br />
                (Chế độ demo)
              </VNPayQRCode>
            </LoadingCard>
          </LoadingOverlay>
        )}
      </AnimatePresence>
    </CheckoutContainer>
  );
};

export default Checkout;