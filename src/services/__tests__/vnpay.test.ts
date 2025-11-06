import { createVNPayPaymentUrl, simulateVNPayPayment, validateVNPayCallback } from '../vnpay';

describe('VNPay Service', () => {
  describe('createVNPayPaymentUrl', () => {
    it('should create a valid VNPay payment URL', () => {
      const paymentData = {
        amount: 100000,
        orderInfo: 'Test order',
        orderId: 'TEST123',
        returnUrl: 'http://localhost:3000/return'
      };

      const url = createVNPayPaymentUrl(paymentData);
      
      expect(url).toContain('https://sandbox.vnpayment.vn/paymentv2/vpcpay.html');
      expect(url).toContain('vnp_Amount=10000000'); // Amount * 100
      expect(url).toContain('vnp_TxnRef=TEST123');
      expect(url).toContain('vnp_OrderInfo=Test order');
    });
  });

  describe('simulateVNPayPayment', () => {
    it('should return a payment result', async () => {
      const result = await simulateVNPayPayment();
      
      expect(result).toHaveProperty('success');
      expect(result).toHaveProperty('message');
      expect(typeof result.success).toBe('boolean');
      expect(typeof result.message).toBe('string');
    });
  });

  describe('validateVNPayCallback', () => {
    it('should validate successful payment callback', () => {
      const params = new URLSearchParams({
        vnp_ResponseCode: '00',
        vnp_TransactionNo: '12345678',
        vnp_Amount: '10000000',
        vnp_TxnRef: 'TEST123'
      });

      const result = validateVNPayCallback(params);
      
      expect(result.isValid).toBe(true);
      expect(result.transactionId).toBe('12345678');
      expect(result.amount).toBe(100000);
      expect(result.orderId).toBe('TEST123');
    });

    it('should validate failed payment callback', () => {
      const params = new URLSearchParams({
        vnp_ResponseCode: '01',
        vnp_TransactionNo: '12345678',
        vnp_Amount: '10000000',
        vnp_TxnRef: 'TEST123'
      });

      const result = validateVNPayCallback(params);
      
      expect(result.isValid).toBe(false);
    });
  });
});
