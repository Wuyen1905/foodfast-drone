import { VALIDATION_RULES } from '../constants';

// Validation Error Messages
export const VALIDATION_MESSAGES = {
  NAME: {
    REQUIRED: 'Vui lòng nhập họ và tên',
    MIN_LENGTH: `Họ và tên phải có ít nhất ${VALIDATION_RULES.NAME.MIN_LENGTH} ký tự`,
    MAX_LENGTH: `Họ và tên không được vượt quá ${VALIDATION_RULES.NAME.MAX_LENGTH} ký tự`,
    INVALID_FORMAT: 'Họ và tên chỉ được chứa chữ cái và khoảng trắng',
  },
  EMAIL: {
    REQUIRED: 'Vui lòng nhập địa chỉ email',
    INVALID_FORMAT: 'Địa chỉ email không hợp lệ',
  },
  PHONE: {
    REQUIRED: 'Vui lòng nhập số điện thoại',
    INVALID_FORMAT: 'Số điện thoại phải bắt đầu bằng 0 hoặc +84 và có 10-11 chữ số',
    MIN_LENGTH: `Số điện thoại phải có ít nhất ${VALIDATION_RULES.PHONE.MIN_LENGTH} chữ số`,
    MAX_LENGTH: `Số điện thoại không được vượt quá ${VALIDATION_RULES.PHONE.MAX_LENGTH} chữ số`,
  },
  ADDRESS: {
    REQUIRED: 'Vui lòng nhập địa chỉ giao hàng',
    MIN_LENGTH: `Địa chỉ phải có ít nhất ${VALIDATION_RULES.ADDRESS.MIN_LENGTH} ký tự`,
    MAX_LENGTH: `Địa chỉ không được vượt quá ${VALIDATION_RULES.ADDRESS.MAX_LENGTH} ký tự`,
  },
  PAYMENT: {
    REQUIRED: 'Vui lòng chọn phương thức thanh toán',
  },
} as const;

// Validation Functions
export const validateName = (name: string): string | null => {
  if (!name || name.trim().length === 0) {
    return VALIDATION_MESSAGES.NAME.REQUIRED;
  }
  
  if (name.length < VALIDATION_RULES.NAME.MIN_LENGTH) {
    return VALIDATION_MESSAGES.NAME.MIN_LENGTH;
  }
  
  if (name.length > VALIDATION_RULES.NAME.MAX_LENGTH) {
    return VALIDATION_MESSAGES.NAME.MAX_LENGTH;
  }
  
  if (!VALIDATION_RULES.NAME.PATTERN.test(name)) {
    return VALIDATION_MESSAGES.NAME.INVALID_FORMAT;
  }
  
  return null;
};

export const validateEmail = (email: string): string | null => {
  if (!email || email.trim().length === 0) {
    return VALIDATION_MESSAGES.EMAIL.REQUIRED;
  }
  
  if (!VALIDATION_RULES.EMAIL.PATTERN.test(email)) {
    return VALIDATION_MESSAGES.EMAIL.INVALID_FORMAT;
  }
  
  return null;
};

export const validatePhone = (phone: string): string | null => {
  if (!phone || phone.trim().length === 0) {
    return VALIDATION_MESSAGES.PHONE.REQUIRED;
  }
  
  if (phone.length < VALIDATION_RULES.PHONE.MIN_LENGTH) {
    return VALIDATION_MESSAGES.PHONE.MIN_LENGTH;
  }
  
  if (phone.length > VALIDATION_RULES.PHONE.MAX_LENGTH) {
    return VALIDATION_MESSAGES.PHONE.MAX_LENGTH;
  }
  
  if (!VALIDATION_RULES.PHONE.PATTERN.test(phone)) {
    return VALIDATION_MESSAGES.PHONE.INVALID_FORMAT;
  }
  
  return null;
};

export const validateAddress = (address: string): string | null => {
  if (!address || address.trim().length === 0) {
    return VALIDATION_MESSAGES.ADDRESS.REQUIRED;
  }
  
  if (address.length < VALIDATION_RULES.ADDRESS.MIN_LENGTH) {
    return VALIDATION_MESSAGES.ADDRESS.MIN_LENGTH;
  }
  
  if (address.length > VALIDATION_RULES.ADDRESS.MAX_LENGTH) {
    return VALIDATION_MESSAGES.ADDRESS.MAX_LENGTH;
  }
  
  return null;
};

export const validatePaymentMethod = (paymentMethod: string): string | null => {
  if (!paymentMethod || paymentMethod.trim().length === 0) {
    return VALIDATION_MESSAGES.PAYMENT.REQUIRED;
  }
  
  return null;
};

// Form Validation Interface
export interface FormValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

// Validate entire form
export const validateForm = (formData: {
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  paymentMethod?: string;
}): FormValidationResult => {
  const errors: Record<string, string> = {};
  
  if (formData.name !== undefined) {
    const nameError = validateName(formData.name);
    if (nameError) errors.name = nameError;
  }
  
  if (formData.email !== undefined) {
    const emailError = validateEmail(formData.email);
    if (emailError) errors.email = emailError;
  }
  
  if (formData.phone !== undefined) {
    const phoneError = validatePhone(formData.phone);
    if (phoneError) errors.phone = phoneError;
  }
  
  if (formData.address !== undefined) {
    const addressError = validateAddress(formData.address);
    if (addressError) errors.address = addressError;
  }
  
  if (formData.paymentMethod !== undefined) {
    const paymentError = validatePaymentMethod(formData.paymentMethod);
    if (paymentError) errors.paymentMethod = paymentError;
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

// Sanitize input
export const sanitizeInput = (input: string): string => {
  return input.trim().replace(/\s+/g, ' ');
};

// Format phone number for display
export const formatPhoneNumber = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, '');
  
  if (cleaned.startsWith('84')) {
    return `+${cleaned}`;
  } else if (cleaned.startsWith('0')) {
    return cleaned;
  } else {
    return `0${cleaned}`;
  }
};
