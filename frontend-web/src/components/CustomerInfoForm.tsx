import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { validateForm, sanitizeInput, formatPhoneNumber } from '../utils/validation';
import { PAYMENT_METHODS } from '../constants';

// Types
interface CustomerInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
  paymentMethod: string;
  notes?: string;
}

interface ValidationErrors {
  [key: string]: string;
}

// Styled Components
const FormContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 24px;
`;

const FormCard = styled(motion.div)`
  background: var(--card);
  border-radius: 16px;
  padding: 32px;
  box-shadow: var(--shadow-md);
  border: 1px solid var(--border);
`;

const FormTitle = styled.h2`
  text-align: center;
  margin: 0 0 32px 0;
  color: var(--text);
  font-size: 28px;
  font-weight: 700;
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

const FullWidthField = styled.div`
  grid-column: 1 / -1;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: 8px;
  font-weight: 600;
  color: var(--text);
  font-size: 14px;
`;

const Input = styled.input<{ hasError?: boolean }>`
  padding: 12px 16px;
  border: 2px solid ${props => props.hasError ? '#dc3545' : 'var(--border)'};
  border-radius: 8px;
  background: var(--card);
  color: var(--text);
  font-size: 14px;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: ${props => props.hasError ? '#dc3545' : 'var(--primary)'};
    box-shadow: 0 0 0 3px ${props => props.hasError ? 'rgba(220, 53, 69, 0.1)' : 'rgba(255, 102, 0, 0.1)'};
  }
`;

const Select = styled.select<{ hasError?: boolean }>`
  padding: 12px 16px;
  border: 2px solid ${props => props.hasError ? '#dc3545' : 'var(--border)'};
  border-radius: 8px;
  background: var(--card);
  color: var(--text);
  font-size: 14px;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: ${props => props.hasError ? '#dc3545' : 'var(--primary)'};
    box-shadow: 0 0 0 3px ${props => props.hasError ? 'rgba(220, 53, 69, 0.1)' : 'rgba(255, 102, 0, 0.1)'};
  }
`;

const TextArea = styled.textarea<{ hasError?: boolean }>`
  padding: 12px 16px;
  border: 2px solid ${props => props.hasError ? '#dc3545' : 'var(--border)'};
  border-radius: 8px;
  background: var(--card);
  color: var(--text);
  font-size: 14px;
  min-height: 80px;
  resize: vertical;
  transition: all 0.3s ease;
  font-family: inherit;
  
  &:focus {
    outline: none;
    border-color: ${props => props.hasError ? '#dc3545' : 'var(--primary)'};
    box-shadow: 0 0 0 3px ${props => props.hasError ? 'rgba(220, 53, 69, 0.1)' : 'rgba(255, 102, 0, 0.1)'};
  }
`;

const RadioGroup = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 8px;
`;

const RadioOption = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-size: 14px;
  color: var(--text);
  
  input[type="radio"] {
    accent-color: var(--primary);
  }
`;

const ErrorText = styled(motion.div)`
  color: #dc3545;
  font-size: 12px;
  margin-top: 4px;
  font-weight: 500;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 32px;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Button = styled(motion.button)<{ variant?: 'primary' | 'secondary' }>`
  flex: 1;
  padding: 16px 24px;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  ${props => props.variant === 'primary' ? `
    background: linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%);
    color: white;
    box-shadow: var(--shadow);
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: var(--shadow-md);
    }
  ` : `
    background: var(--border);
    color: var(--text);
    border: 1px solid var(--border);
    
    &:hover {
      background: var(--text);
      color: var(--card);
    }
  `}
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const RequiredIndicator = styled.span`
  color: #dc3545;
  margin-left: 2px;
`;

const CustomerInfoForm: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<CustomerInfo>({
    name: '',
    email: '',
    phone: '',
    address: '',
    paymentMethod: '',
    notes: ''
  });
  
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: keyof CustomerInfo, value: string) => {
    const sanitizedValue = sanitizeInput(value);
    setFormData(prev => ({ ...prev, [field]: sanitizedValue }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form using utility function
    const validation = validateForm(formData);
    
    if (!validation.isValid) {
      setErrors(validation.errors);
      toast.error('Vui lòng kiểm tra lại thông tin đã nhập.');
      return;
    }

    setIsSubmitting(true);

    try {
      // Format phone number
      const formattedPhone = formatPhoneNumber(formData.phone);
      
      // Customer info is passed via navigation state
      // No localStorage database logic - data flows through app state
      
      toast.success('✅ Thông tin khách hàng đã được lưu!');
      navigate('/checkout', { state: { customerInfo: { ...formData, phone: formattedPhone } } });
    } catch (error) {
      toast.error('Có lỗi xảy ra. Vui lòng thử lại.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate('/menu');
  };

  return (
    <FormContainer>
      <FormCard
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <FormTitle>Thông tin khách hàng</FormTitle>
        
        <form onSubmit={handleSubmit}>
          <FormGrid>
            <FormGroup>
              <Label>
                Họ và tên <RequiredIndicator>*</RequiredIndicator>
              </Label>
              <Input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                hasError={!!errors.name}
                placeholder="Nhập họ và tên đầy đủ"
              />
              {errors.name && (
                <ErrorText
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {errors.name}
                </ErrorText>
              )}
            </FormGroup>

            <FormGroup>
              <Label>
                Email <RequiredIndicator>*</RequiredIndicator>
              </Label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                hasError={!!errors.email}
                placeholder="example@email.com"
              />
              {errors.email && (
                <ErrorText
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {errors.email}
                </ErrorText>
              )}
            </FormGroup>

            <FormGroup>
              <Label>
                Số điện thoại <RequiredIndicator>*</RequiredIndicator>
              </Label>
              <Input
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                hasError={!!errors.phone}
                placeholder="0xxxxxxxxx hoặc +84xxxxxxxxx"
              />
              {errors.phone && (
                <ErrorText
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {errors.phone}
                </ErrorText>
              )}
            </FormGroup>

            <FormGroup>
              <Label>
                Phương thức thanh toán <RequiredIndicator>*</RequiredIndicator>
              </Label>
              <Select
                value={formData.paymentMethod}
                onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
                hasError={!!errors.paymentMethod}
              >
                <option value="">Chọn phương thức thanh toán</option>
                <option value={PAYMENT_METHODS.VNPAY}>💳 VNPay</option>
                <option value={PAYMENT_METHODS.CASH}>💵 Thanh toán khi nhận hàng</option>
              </Select>
              {errors.paymentMethod && (
                <ErrorText
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {errors.paymentMethod}
                </ErrorText>
              )}
            </FormGroup>

            <FullWidthField>
              <FormGroup>
                <Label>
                  Địa chỉ giao hàng <RequiredIndicator>*</RequiredIndicator>
                </Label>
                <TextArea
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  hasError={!!errors.address}
                  placeholder="Số nhà, tên đường, phường/xã, quận/huyện, thành phố"
                />
                {errors.address && (
                  <ErrorText
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {errors.address}
                  </ErrorText>
                )}
              </FormGroup>
            </FullWidthField>

            <FullWidthField>
              <FormGroup>
                <Label>
                  Ghi chú thêm (tùy chọn)
                </Label>
                <TextArea
                  value={formData.notes}
                  onChange={(e) => handleInputChange('notes', e.target.value)}
                  hasError={!!errors.notes}
                  placeholder="Ghi chú đặc biệt cho đơn hàng..."
                  maxLength={200}
                />
                {errors.notes && (
                  <ErrorText
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {errors.notes}
                  </ErrorText>
                )}
                <div style={{ fontSize: '12px', color: '#6c757d', marginTop: '4px' }}>
                  {formData.notes?.length || 0}/200 ký tự
                </div>
              </FormGroup>
            </FullWidthField>
          </FormGrid>

          <ButtonGroup>
            <Button
              type="button"
              variant="secondary"
              onClick={handleCancel}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Hủy
            </Button>
            <Button
              type="submit"
              variant="primary"
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isSubmitting ? 'Đang xử lý...' : 'Tiếp tục'}
            </Button>
          </ButtonGroup>
        </form>
      </FormCard>
    </FormContainer>
  );
};

export default CustomerInfoForm;
