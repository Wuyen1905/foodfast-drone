import { APP_CONFIG } from "../constants";

// 🔹 Định dạng VNĐ chuẩn
export const formatVND = (amount: number): string => {
  if (typeof amount !== "number" || isNaN(amount)) return "0 ₫";
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })
    .format(amount)
    .replace("VND", "₫");
};

// 🔹 Định dạng số có dấu phẩy, không kèm ký hiệu tiền
export const formatVNDNumber = (amount: number): string => {
  if (typeof amount !== "number" || isNaN(amount)) return "0";
  return new Intl.NumberFormat("vi-VN").format(amount);
};

// 🔹 Cho phép đổi ký hiệu tuỳ loại tiền
export const formatCurrency = (
  amount: number,
  currency: string = APP_CONFIG.DEFAULT_CURRENCY,
  symbol: string = "₫"
): string => {
  if (typeof amount !== "number" || isNaN(amount)) return `0 ${symbol}`;
  const formatted = new Intl.NumberFormat("vi-VN").format(amount);
  return `${formatted} ${symbol}`;
};

// 🔹 Chuyển từ chuỗi tiền tệ sang số
export const parseCurrency = (currencyString: string): number => {
  if (!currencyString) return 0;
  const cleaned = currencyString.replace(/[^\d.,]/g, "");
  const normalized = cleaned.replace(/,/g, "");
  const parsed = parseFloat(normalized);
  return isNaN(parsed) ? 0 : parsed;
};

// 🔹 Tính tổng sau thuế và phí
export const calculateTotal = (
  subtotal: number,
  taxRate: number = 0.1, // 10%
  serviceFee: number = 0
): number => {
  const tax = subtotal * taxRate;
  return subtotal + tax + serviceFee;
};

// 🔹 Định dạng tổng đơn hàng với chi tiết
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