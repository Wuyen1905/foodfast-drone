import { VNPayPaymentData } from '../types';

// VNPay Sandbox Configuration
const VNPAY_CONFIG = {
  // Sandbox credentials from VNPay documentation
  TMN_CODE: '2QXUI4J4',
  HASH_SECRET: 'RAOEXHYVSDDIIENYWSLDIIENYWSLDIIEN',
  URL: 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html',
  RETURN_URL: `${window.location.origin}/vnpay-return`,
};

// Generate VNPay payment URL
export const createVNPayPaymentUrl = (data: VNPayPaymentData): string => {
  const { amount, orderInfo, orderId, returnUrl } = data;
  
  // Convert amount to VNPay format (multiply by 100)
  const vnpAmount = amount * 100;
  
  // Create payment parameters
  const params = new URLSearchParams({
    vnp_Version: '2.1.0',
    vnp_Command: 'pay',
    vnp_TmnCode: VNPAY_CONFIG.TMN_CODE,
    vnp_Amount: vnpAmount.toString(),
    vnp_CurrCode: 'VND',
    vnp_TxnRef: orderId,
    vnp_OrderInfo: orderInfo,
    vnp_OrderType: 'other',
    vnp_Locale: 'vn',
    vnp_ReturnUrl: returnUrl || VNPAY_CONFIG.RETURN_URL,
    vnp_IpAddr: '127.0.0.1',
    vnp_CreateDate: new Date().toISOString().replace(/[-:]/g, '').replace('T', '').split('.')[0],
  });

  // Sort parameters alphabetically for hash calculation
  const sortedParams = Array.from(params.entries())
    .sort(([a], [b]) => a.localeCompare(b));

  // Create secure hash
  const queryString = sortedParams
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join('&');

  // In a real implementation, you would use HMAC-SHA512 for the hash
  // For demo purposes, we'll create a simple hash
  const hash = btoa(queryString + VNPAY_CONFIG.HASH_SECRET).replace(/[+/=]/g, '');
  
  return `${VNPAY_CONFIG.URL}?${queryString}&vnp_SecureHash=${hash}`;
};

// Simulate VNPay payment response
export const simulateVNPayPayment = (): Promise<{
  success: boolean;
  transactionId?: string;
  message: string;
}> => {
  // VNPay payment simulation - in production this would call actual VNPay API
  // No artificial delay - return immediately
  const isSuccess = Math.random() > 0.2;
  
  if (isSuccess) {
    return Promise.resolve({
      success: true,
      transactionId: `VNPAY${Date.now()}`,
      message: 'Thanh toán thành công qua VNPay'
    });
  } else {
    return Promise.resolve({
      success: false,
      message: 'Thanh toán thất bại. Vui lòng thử lại.'
    });
  }
};

// Validate VNPay callback parameters
export const validateVNPayCallback = (params: URLSearchParams): {
  isValid: boolean;
  transactionId?: string;
  amount?: number;
  orderId?: string;
} => {
  const responseCode = params.get('vnp_ResponseCode');
  const transactionId = params.get('vnp_TransactionNo');
  const amount = params.get('vnp_Amount');
  const orderId = params.get('vnp_TxnRef');

  return {
    isValid: responseCode === '00', // VNPay success code
    transactionId: transactionId || undefined,
    amount: amount ? parseInt(amount) / 100 : undefined,
    orderId: orderId || undefined,
  };
};

/**
 * Create VNPay payment URL via backend API
 * This function calls the backend to generate the payment URL
 */
export async function createVNPayUrl(amount: number, orderId: string) {
  const res = await fetch("/api/payment/vnpay/create", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ amount, orderId })
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Payment error");
  return data.url;
}

