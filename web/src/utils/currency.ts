import { APP_CONFIG } from '../constants';

// Enhanced Vietnamese Dong Currency Formatter
export const formatVND = (amount: number): string => {
  if (typeof amount !== 'number' || isNaN(amount)) {
    return '0 đ';
  }
  
  // Format with thousands separator and add đ symbol
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount).replace('VND', 'đ');
};

// Alternative format without currency symbol
export const formatVNDNumber = (amount: number): string => {
  if (typeof amount !== 'number' || isNaN(amount)) {
    return '0';
  }
  
  return new Intl.NumberFormat('vi-VN').format(amount);
};

// Format currency with custom symbol
export const formatCurrency = (
  amount: number, 
  currency: string = APP_CONFIG.DEFAULT_CURRENCY,
  symbol: string = 'đ'
): string => {
  if (typeof amount !== 'number' || isNaN(amount)) {
    return `0 ${symbol}`;
  }
  
  const formatted = new Intl.NumberFormat('vi-VN').format(amount);
  return `${formatted} ${symbol}`;
};

// Parse currency string to number
export const parseCurrency = (currencyString: string): number => {
  if (!currencyString) return 0;
  
  // Remove all non-numeric characters except decimal point
  const cleaned = currencyString.replace(/[^\d.,]/g, '');
  
  // Handle Vietnamese number format (comma as thousand separator)
  const normalized = cleaned.replace(/,/g, '');
  
  const parsed = parseFloat(normalized);
  return isNaN(parsed) ? 0 : parsed;
};

// Calculate total with tax
export const calculateTotal = (
  subtotal: number, 
  taxRate: number = 0.1, // 10% VAT
  serviceFee: number = 0
): number => {
  const tax = subtotal * taxRate;
  return subtotal + tax + serviceFee;
};

// Format order total with breakdown
export const formatOrderTotal = (order: {
  subtotal: number;
  tax?: number;
  serviceFee?: number;
  discount?: number;
}) => {
  const { subtotal, tax = 0, serviceFee = 0, discount = 0 } = order;
  const total = subtotal + tax + serviceFee - discount;
  
  return {
    subtotal: formatVND(subtotal),
    tax: formatVND(tax),
    serviceFee: formatVND(serviceFee),
    discount: formatVND(discount),
    total: formatVND(total),
    totalNumber: total,
  };
};