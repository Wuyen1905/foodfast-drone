import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { validateVNPayCallback } from '../services/vnpay';
import { useOrders } from '@/context/OrderContext';
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
  const { updateOrderPaymentStatus } = useOrders();
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState<{
    success: boolean;
    message: string;
    transactionId?: string;
  } | null>(null);

  useEffect(() => {
    const processPayment = async () => {
      try {
        // Simulate processing delay
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        const validation = validateVNPayCallback(searchParams);
        
        if (validation.isValid) {
          setResult({
            success: true,
            message: 'Thanh toán VNPay thành công! Đơn hàng của bạn đã được xác nhận.',
            transactionId: validation.transactionId
          });
          
          // Update order payment status if transaction ID exists
          if (validation.transactionId && validation.orderId) {
            updateOrderPaymentStatus(validation.orderId, 'completed', validation.transactionId);
          }
          
          toast.success('Thanh toán thành công!');
        } else {
          setResult({
            success: false,
            message: 'Thanh toán thất bại. Vui lòng thử lại hoặc chọn phương thức thanh toán khác.'
          });
          
          toast.error('Thanh toán thất bại!');
        }
      } catch (error) {
        setResult({
          success: false,
          message: 'Có lỗi xảy ra khi xử lý thanh toán. Vui lòng liên hệ hỗ trợ.'
        });
        toast.error('Có lỗi xảy ra!');
      } finally {
        setLoading(false);
      }
    };

    processPayment();
  }, [searchParams, updateOrderPaymentStatus]);

  const handleContinue = () => {
    if (result?.success) {
      navigate('/orders');
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
          {result?.success ? 'Xem đơn hàng' : 'Thử lại'}
        </Button>
      </Card>
    </Container>
  );
};

export default VNPayReturn;
