import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { validateVNPayCallback } from '../services/vnpay';
import { useOrders } from '@/context/OrderContext';
import type { Order } from '@/context/OrderContext';
import { createOrdersFromSplit } from '../services/orderSplittingService';
import toast from 'react-hot-toast';
import { formatVND } from '../utils/currency';

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 24px;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Card = styled(motion.div)`
  background: var(--card);
  border-radius: 16px;
  padding: 32px;
  box-shadow: var(--shadow-md);
  border: 1px solid var(--border);
  text-align: center;
  width: 100%;
`;

const Icon = styled(motion.div)`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin: 0 auto 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
`;

const SuccessIcon = styled(Icon)`
  background: linear-gradient(135deg, #4CAF50, #45a049);
  color: white;
`;

const ErrorIcon = styled(Icon)`
  background: linear-gradient(135deg, #f44336, #d32f2f);
  color: white;
`;

const Title = styled.h2`
  margin: 0 0 16px 0;
  color: var(--text);
  font-size: 24px;
  font-weight: 700;
`;

const Message = styled.p`
  color: var(--secondaryText);
  margin: 0 0 24px 0;
  line-height: 1.6;
`;

const Button = styled(motion.button)`
  padding: 12px 24px;
  background: linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
  }
`;

const LoadingSpinner = styled(motion.div)`
  width: 40px;
  height: 40px;
  border: 4px solid var(--border);
  border-top: 4px solid var(--primary);
  border-radius: 50%;
  margin: 0 auto 24px;
`;

const VNPayReturn: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { addOrder, addOrders, updateOrderPaymentStatus, refreshOrders } = useOrders();
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState<{
    success: boolean;
    message: string;
    transactionId?: string;
  } | null>(null);

  useEffect(() => {
    const processPayment = async () => {
      try {
        // TODO: Backend integration in Phase 2 - removed setTimeout delay
        
        // Validate VNPay callback with proper hash verification
        const validation = await validateVNPayCallback(searchParams);
        
        if (validation.isValid) {
          setResult({
            success: true,
            message: validation.responseMessage || 'Thanh toán VNPay thành công! Đơn hàng của bạn đã được xác nhận.',
            transactionId: validation.transactionId
          });
          
          // [Restore Full Checkout] Check if there's a pending order in sessionStorage (from checkout)
          const pendingOrderData = sessionStorage.getItem('vnpay_pending_order');
          if (pendingOrderData) {
            try {
              const storedData = JSON.parse(pendingOrderData);
              console.log('[VNPay Return] Pending order data found:', storedData);
              
              // [Restore Full Checkout] Handle both single order and split orders
              if (storedData.order) {
                // Single order format
                try {
                  const orderToCreate: Order = {
                    ...storedData.order,
                    paymentStatus: 'completed' as const,
                    vnpayTransactionId: validation.transactionId,
                  };
                  
                  console.log('[VNPay Return] Creating single order from pending order data...');
                  
                  // Save single order to API
                  await addOrder(orderToCreate);
                  
                  // [Fix 500 Error] Order creation succeeded (addOrder handles errors internally)
                  console.log(`[SYNC OK ✅] VNPay Return created single order in shared API:`, orderToCreate.id);
                  
                  // Refresh orders to ensure they're in context
                  await refreshOrders();
                } catch (error: any) {
                  // [Fix 500 Error] Handle order creation error gracefully
                  // addOrder already handles errors and adds order locally
                  console.error('[VNPay Return] API Error: Order creation failed, using local fallback');
                  await refreshOrders();
                }
              } else if (storedData.splitResult) {
                // Split orders format (multiple restaurants)
                try {
                  console.log('[VNPay Return] Creating multiple orders from split result...');
                  
                  // Create orders from split result with payment information
                  const createdOrders = createOrdersFromSplit(storedData.splitResult, {
                    name: storedData.name,
                    phone: storedData.phone,
                    address: storedData.address,
                    items: storedData.items,
                    paymentMethod: 'vnpay',
                    paymentStatus: 'completed',
                    vnpayTransactionId: validation.transactionId,
                    userId: storedData.userId,
                    note: storedData.note
                  });
                  
                  // Save orders to API
                  await addOrders(createdOrders);
                  
                  // [Fix 500 Error] Order creation succeeded (addOrders handles errors internally)
                  console.log(`[SYNC OK ✅] VNPay Return created ${createdOrders.length} order(s) in shared API:`, createdOrders.map(o => o.id).join(', '));
                  
                  // Refresh orders to ensure they're in context
                  await refreshOrders();
                } catch (error: any) {
                  // [Fix 500 Error] Handle order creation error gracefully
                  // addOrders already handles errors and adds orders locally
                  console.error('[VNPay Return] API Error: Order creation failed, using local fallback');
                  await refreshOrders();
                }
              } else {
                console.warn('[VNPay Return] No valid order data found in pending order');
              }
              
              // Clear pending order data after processing
              sessionStorage.removeItem('vnpay_pending_order');
            } catch (err) {
              console.error('[VNPay Return] Error processing pending order:', err);
              toast.error('Có lỗi xảy ra khi tạo đơn hàng. Vui lòng liên hệ hỗ trợ.');
            }
          } else {
            // [Restore Full Checkout] No pending order data - try to update existing order
            if (validation.transactionId && validation.orderId) {
              await updateOrderPaymentStatus(validation.orderId, 'completed', validation.transactionId);
            }
          }
          
          toast.success('Thanh toán thành công!');
        } else {
          // Get error message from validation
          const errorMessage = validation.responseMessage 
            ? `Thanh toán thất bại: ${validation.responseMessage}`
            : 'Thanh toán thất bại. Vui lòng thử lại hoặc chọn phương thức thanh toán khác.';
          
          setResult({
            success: false,
            message: errorMessage
          });
          
          // Update order payment status to failed if order ID exists
          if (validation.orderId) {
            updateOrderPaymentStatus(validation.orderId, 'failed');
          }
          
          // Clear pending order data on failure
          sessionStorage.removeItem('vnpay_pending_order');
          
          toast.error('Thanh toán thất bại!');
        }
      } catch (error) {
        console.error('[VNPay Return] Error processing payment:', error);
        setResult({
          success: false,
          message: 'Có lỗi xảy ra khi xử lý thanh toán. Vui lòng liên hệ hỗ trợ.'
        });
        
        // Clear pending order data on error
        sessionStorage.removeItem('vnpay_pending_order');
        
        toast.error('Có lỗi xảy ra!');
      } finally {
        setLoading(false);
      }
    };

    processPayment();
  }, [searchParams, addOrder, addOrders, updateOrderPaymentStatus, refreshOrders]);

  const handleContinue = () => {
    if (result?.success) {
      // [Fix Order Creation] Navigate to order history page
      // Refresh orders before navigation to ensure they're loaded
      refreshOrders().then(() => {
        navigate('/order-history');
      }).catch(() => {
        // If refresh fails, still navigate - orders should be in API
        navigate('/order-history');
      });
    } else {
      navigate('/checkout');
    }
  };

  if (loading) {
    return (
      <Container>
        <Card
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <LoadingSpinner
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <Title>Đang xử lý thanh toán...</Title>
          <Message>Vui lòng chờ trong giây lát</Message>
        </Card>
      </Container>
    );
  }

  return (
    <Container>
      <Card
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {result?.success ? (
          <>
            <SuccessIcon
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            >
              ✓
            </SuccessIcon>
            <Title>Thanh toán thành công!</Title>
            <Message>{result.message}</Message>
            {result.transactionId && (
              <Message>
                <strong>Mã giao dịch:</strong> {result.transactionId}
              </Message>
            )}
          </>
        ) : (
          <>
            <ErrorIcon
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            >
              ✗
            </ErrorIcon>
            <Title>Thanh toán thất bại</Title>
            <Message>{result?.message}</Message>
          </>
        )}
        
        <Button
          onClick={handleContinue}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {result?.success ? 'Xem lịch sử đơn hàng' : 'Thử lại'}
        </Button>
      </Card>
    </Container>
  );
};

export default VNPayReturn;
