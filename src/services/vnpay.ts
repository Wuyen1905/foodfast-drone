import { VNPayPaymentData } from '../types';

// VNPay Sandbox Configuration
const VNPAY_CONFIG = {
  // Sandbox credentials from VNPay documentation
  TMN_CODE: '2QXUI4J4',
  HASH_SECRET: 'RAOEXHYVSDDIIENYWSLDIIENYWSLDIIEN',
  URL: 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html',
  RETURN_URL: `${typeof window !== 'undefined' ? window.location.origin : ''}/vnpay-return`,
  IPN_URL: `${typeof window !== 'undefined' ? window.location.origin : ''}/api/payment/vnpay/ipn`,
};

/**
 * Format date to VNPay format: YYYYMMDDHHmmss
 */
const formatVNPayDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  return `${year}${month}${day}${hours}${minutes}${seconds}`;
};

/**
 * Generate HMAC-SHA512 hash for VNPay
 * Uses Web Crypto API for secure hashing
 */
const generateSecureHash = async (
  queryString: string,
  hashSecret: string
): Promise<string> => {
  try {
    // Import the hash secret as a key
    const encoder = new TextEncoder();
    const keyData = encoder.encode(hashSecret);
    
    // Import key for HMAC
    const cryptoKey = await crypto.subtle.importKey(
      'raw',
      keyData,
      { name: 'HMAC', hash: 'SHA-512' },
      false,
      ['sign']
    );
    
    // Sign the query string
    const signature = await crypto.subtle.sign(
      'HMAC',
      cryptoKey,
      encoder.encode(queryString)
    );
    
    // Convert to hex string
    const hashArray = Array.from(new Uint8Array(signature));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    
    return hashHex.toUpperCase();
  } catch (error) {
    // Fallback for environments without Web Crypto API (should not happen in modern browsers)
    console.error('Error generating secure hash:', error);
    throw new Error('Failed to generate secure hash');
  }
};

/**
 * Generate VNPay payment URL with proper HMAC-SHA512 signature
 */
export const createVNPayPaymentUrl = async (data: VNPayPaymentData): Promise<string> => {
  const { amount, orderInfo, orderId, returnUrl } = data;
  
  // Convert amount to VNPay format (multiply by 100, ensure integer)
  // Use Math.round to avoid floating point precision issues
  const vnpAmount = Math.round(amount * 100);
  
  // Ensure amount is a positive integer
  if (vnpAmount <= 0 || !Number.isInteger(vnpAmount)) {
    throw new Error('Invalid amount: must be a positive number');
  }
  
  // Generate unique transaction reference if not provided
  const vnpTxnRef = orderId || `ORDER${Date.now()}${Math.random().toString(36).substr(2, 9)}`;
  
  // Get client IP address (for demo, use a placeholder; in production, get from server)
  const vnpIpAddr = '127.0.0.1';
  
  // Format create date
  const vnpCreateDate = formatVNPayDate(new Date());
  
  // Create payment parameters (all required by VNPay)
  const vnpParams: Record<string, string> = {
    vnp_Version: '2.1.0',
    vnp_Command: 'pay',
    vnp_TmnCode: VNPAY_CONFIG.TMN_CODE,
    vnp_Amount: vnpAmount.toString(),
    vnp_CurrCode: 'VND',
    vnp_TxnRef: vnpTxnRef,
    vnp_OrderInfo: orderInfo || `Thanh toan don hang ${vnpTxnRef}`,
    vnp_OrderType: 'other',
    vnp_Locale: 'vn',
    vnp_ReturnUrl: returnUrl || VNPAY_CONFIG.RETURN_URL,
    vnp_IpAddr: vnpIpAddr,
    vnp_CreateDate: vnpCreateDate,
  };
  
  // Remove empty values and sort parameters alphabetically
  const sortedParams: Record<string, string> = {};
  Object.keys(vnpParams)
    .sort()
    .forEach(key => {
      const value = vnpParams[key];
      if (value && value.trim() !== '') {
        sortedParams[key] = value;
      }
    });
  
  // Create query string for hash calculation (without encoding)
  // VNPay requires: key1=value1&key2=value2 (no URL encoding for hash)
  const signData = Object.entries(sortedParams)
    .map(([key, value]) => `${key}=${value}`)
    .join('&');
  
  // Generate HMAC-SHA512 secure hash
  const secureHash = await generateSecureHash(signData, VNPAY_CONFIG.HASH_SECRET);
  
  // Create final query string with URL encoding for actual URL
  const queryString = Object.entries(sortedParams)
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join('&');
  
  // Add secure hash to query string
  const finalUrl = `${VNPAY_CONFIG.URL}?${queryString}&vnp_SecureHash=${secureHash}`;
  
  // Log for debugging (only in development)
  if (process.env.NODE_ENV === 'development') {
    console.log('[VNPay] Payment URL generated:', {
      orderId: vnpTxnRef,
      amount: vnpAmount,
      signData,
      secureHash: secureHash.substring(0, 16) + '...',
    });
  }
  
  return finalUrl;
};

/**
 * Validate VNPay callback response and verify secure hash
 */
export const validateVNPayCallback = async (
  params: URLSearchParams
): Promise<{
  isValid: boolean;
  transactionId?: string;
  amount?: number;
  orderId?: string;
  responseCode?: string;
  responseMessage?: string;
}> => {
  try {
    // Extract parameters
    const responseCode = params.get('vnp_ResponseCode');
    const transactionId = params.get('vnp_TransactionNo');
    const amount = params.get('vnp_Amount');
    const orderId = params.get('vnp_TxnRef');
    const secureHash = params.get('vnp_SecureHash');
    const orderInfo = params.get('vnp_OrderInfo');
    
    // Check if response code indicates success
    const isSuccess = responseCode === '00';
    
    // Verify secure hash if present
    let hashValid = true;
    if (secureHash) {
      // Reconstruct sign data from callback parameters (excluding vnp_SecureHash and vnp_SecureHashType)
      const callbackParams: Record<string, string> = {};
      params.forEach((value, key) => {
        if (key !== 'vnp_SecureHash' && key !== 'vnp_SecureHashType') {
          callbackParams[key] = value;
        }
      });
      
      // Sort and create sign data
      const sortedKeys = Object.keys(callbackParams).sort();
      const signData = sortedKeys
        .map(key => `${key}=${callbackParams[key]}`)
        .join('&');
      
      // Generate hash and compare
      const calculatedHash = await generateSecureHash(signData, VNPAY_CONFIG.HASH_SECRET);
      hashValid = calculatedHash.toUpperCase() === secureHash.toUpperCase();
      
      // Log for debugging
      if (process.env.NODE_ENV === 'development') {
        console.log('[VNPay] Callback validation:', {
          responseCode,
          orderId,
          amount,
          hashValid,
          signData: signData.substring(0, 50) + '...',
        });
      }
    }
    
    // Response is valid if success code and hash is valid (if present)
    const isValid = isSuccess && hashValid;
    
    // Get response message
    const responseMessages: Record<string, string> = {
      '00': 'Giao dịch thành công',
      '07': 'Trừ tiền thành công. Giao dịch bị nghi ngờ (liên quan tới lừa đảo, giao dịch bất thường).',
      '09': 'Thẻ/Tài khoản chưa đăng ký dịch vụ InternetBanking',
      '10': 'Xác thực thông tin thẻ/tài khoản không đúng quá 3 lần',
      '11': 'Đã hết hạn chờ thanh toán. Vui lòng thực hiện lại giao dịch.',
      '12': 'Thẻ/Tài khoản bị khóa.',
      '13': 'Nhập sai mật khẩu xác thực giao dịch (OTP).',
      '51': 'Tài khoản không đủ số dư để thực hiện giao dịch.',
      '65': 'Tài khoản đã vượt quá hạn mức giao dịch trong ngày.',
      '75': 'Ngân hàng thanh toán đang bảo trì.',
      '79': 'Nhập sai mật khẩu thanh toán quá số lần quy định.',
      '99': 'Lỗi không xác định',
    };
    
    const responseMessage = responseMessages[responseCode || '99'] || 'Lỗi không xác định';
    
    return {
      isValid,
      transactionId: transactionId || undefined,
      amount: amount ? Math.round(parseInt(amount) / 100) : undefined,
      orderId: orderId || undefined,
      responseCode: responseCode || undefined,
      responseMessage,
    };
  } catch (error) {
    console.error('[VNPay] Error validating callback:', error);
    return {
      isValid: false,
      responseMessage: 'Lỗi xác thực giao dịch',
    };
  }
};

/**
 * Simulate VNPay payment response (for development/testing)
 * In production, this would redirect to actual VNPay URL
 */
export const simulateVNPayPayment = (): Promise<{
  success: boolean;
  transactionId?: string;
  message: string;
}> => {
  return new Promise((resolve) => {
    // Simulate network delay
    setTimeout(() => {
      // For testing: always return success when form is properly filled
      // In real implementation, this would redirect to VNPay
      const isSuccess = true; // Changed to always succeed when form is valid
      
      if (isSuccess) {
        resolve({
          success: true,
          transactionId: `VNPAY${Date.now()}`,
          message: 'Thanh toán thành công qua VNPay'
        });
      } else {
        resolve({
          success: false,
          message: 'Thanh toán thất bại. Vui lòng thử lại.'
        });
      }
    }, 1500); // Reduced delay for better UX
  });
};

/**
 * Create and redirect to VNPay payment URL
 * This function generates the payment URL and redirects the user
 */
export const redirectToVNPay = async (
  paymentData: VNPayPaymentData
): Promise<void> => {
  try {
    const paymentUrl = await createVNPayPaymentUrl(paymentData);
    
    // Redirect to VNPay payment page
    if (typeof window !== 'undefined') {
      window.location.href = paymentUrl;
    }
  } catch (error) {
    console.error('[VNPay] Error creating payment URL:', error);
    throw new Error('Không thể tạo URL thanh toán VNPay');
  }
};
