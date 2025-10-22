import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '@/context';
import toast from 'react-hot-toast';

const Page = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%);
  padding: 20px;
`;

const Card = styled(motion.div)`
  background: var(--card);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  padding: 40px;
  width: 100%;
  max-width: 400px;
  border: 1px solid var(--border);
`;

const Title = styled.h1`
  text-align: center;
  margin: 0 0 8px 0;
  color: var(--text);
`;

const Subtitle = styled.p`
  text-align: center;
  color: var(--secondaryText);
  margin: 0 0 32px 0;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Input = styled.input<{ hasError?: boolean }>`
  width: 100%;
  padding: 12px 16px;
  border-radius: var(--radius-md);
  border: 1px solid ${props => props.hasError ? '#e74c3c' : 'var(--border)'};
  background: var(--card);
  color: var(--text);
  font-size: 16px;
  transition: border-color 0.2s ease;
  
  &:focus {
    border-color: ${props => props.hasError ? '#e74c3c' : 'var(--primary)'};
    outline: none;
  }
  
  &::placeholder {
    color: var(--secondaryText);
  }
`;

const Button = styled(motion.button)`
  background: var(--primary);
  color: #fff;
  border: none;
  padding: 14px 20px;
  border-radius: var(--radius-md);
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: var(--primary-light);
    transform: translateY(-1px);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const ErrorMessage = styled.div`
  color: #e74c3c;
  font-size: 14px;
  margin-top: 4px;
`;

const LinkText = styled(Link)`
  color: var(--primary);
  text-decoration: none;
  font-weight: 600;
  
  &:hover {
    text-decoration: underline;
  }
`;

const Divider = styled.div`
  text-align: center;
  color: var(--secondaryText);
  margin: 20px 0;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    height: 1px;
    background: var(--border);
  }
  
  span {
    background: var(--card);
    padding: 0 16px;
  }
`;

interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Register: React.FC = () => {
  const navigate = useNavigate();
  const { register: registerUser, loading } = useAuth();
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<RegisterFormData>();

  const password = watch('password');

  const onSubmit = async (data: RegisterFormData) => {
    setError('');
    
    if (data.password !== data.confirmPassword) {
      setError('Mật khẩu xác nhận không khớp');
      return;
    }
    
    const success = await registerUser(data.name, data.email, data.password);
    
    if (success) {
      toast.success('🎉 Đăng ký thành công! Chào mừng bạn đến với FoodFast!');
      navigate('/');
    } else {
      setError('Email này đã được sử dụng');
    }
  };

  return (
    <Page>
      <Card
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Title>Đăng ký</Title>
        <Subtitle>Tạo tài khoản mới để trải nghiệm FoodFast! 🚁</Subtitle>
        
        <Form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Input
              {...register('name', { 
                required: 'Họ tên là bắt buộc',
                minLength: {
                  value: 2,
                  message: 'Họ tên phải có ít nhất 2 ký tự'
                }
              })}
              type="text"
              placeholder="Họ và tên"
              hasError={!!errors.name}
            />
            {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
          </div>
          
          <div>
            <Input
              {...register('email', { 
                required: 'Email là bắt buộc',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Email không hợp lệ'
                }
              })}
              type="email"
              placeholder="Email của bạn"
              hasError={!!errors.email}
            />
            {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
          </div>
          
          <div>
            <Input
              {...register('password', { 
                required: 'Mật khẩu là bắt buộc',
                minLength: {
                  value: 6,
                  message: 'Mật khẩu phải có ít nhất 6 ký tự'
                }
              })}
              type="password"
              placeholder="Mật khẩu"
              hasError={!!errors.password}
            />
            {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
          </div>
          
          <div>
            <Input
              {...register('confirmPassword', { 
                required: 'Xác nhận mật khẩu là bắt buộc',
                validate: (value) => value === password || 'Mật khẩu xác nhận không khớp'
              })}
              type="password"
              placeholder="Xác nhận mật khẩu"
              hasError={!!errors.confirmPassword}
            />
            {errors.confirmPassword && <ErrorMessage>{errors.confirmPassword.message}</ErrorMessage>}
          </div>
          
          {error && <ErrorMessage>{error}</ErrorMessage>}
          
          <Button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {loading ? 'Đang đăng ký...' : 'Đăng ký'}
          </Button>
        </Form>
        
        <Divider>
          <span>hoặc</span>
        </Divider>
        
        <div style={{ textAlign: 'center' }}>
          Đã có tài khoản? <LinkText to="/login">Đăng nhập ngay</LinkText>
        </div>
      </Card>
    </Page>
  );
};

export default Register;
