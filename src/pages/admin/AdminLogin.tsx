import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAdminAuth } from '@/context/AdminAuthContext';
import toast from 'react-hot-toast';

const LoginContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #007bff 0%, #6610f2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const LoginBox = styled.div`
  background: white;
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  text-align: center;
`;

const Logo = styled.div`
  margin-bottom: 30px;
  
  h1 {
    color: #007bff;
    font-size: 32px;
    font-weight: 800;
    margin: 0;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
  }
  
  p {
    color: #666;
    margin: 8px 0 0;
    font-size: 14px;
  }
`;

const Title = styled.h2`
  color: #333;
  margin-bottom: 30px;
  font-size: 24px;
  font-weight: 600;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Input = styled.input`
  padding: 15px 20px;
  border: 2px solid #e1e5e9;
  border-radius: 10px;
  font-size: 16px;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
  }
`;

const Button = styled.button`
  padding: 15px 20px;
  background: linear-gradient(135deg, #007bff 0%, #6610f2 100%);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(0, 123, 255, 0.3);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const ErrorMessage = styled.div`
  color: #dc3545;
  font-size: 14px;
  margin-top: 10px;
`;

const CredentialsBox = styled.div`
  margin-top: 24px;
  padding: 16px;
  background: #f8f9fa;
  border-radius: 8px;
  border-left: 4px solid #007bff;
`;

const CredentialsTitle = styled.h4`
  margin: 0 0 8px 0;
  color: #495057;
  font-size: 14px;
`;

const CredentialsList = styled.div`
  color: #6c757d;
  font-size: 12px;
  line-height: 1.4;
  
  strong {
    color: #495057;
  }
`;

const BackToHome = styled.div`
  text-align: center;
  margin-top: 20px;
  
  a {
    color: #007bff;
    text-decoration: none;
    font-weight: 500;
    font-size: 14px;
    
    &:hover {
      color: #0056b3;
    }
  }
`;

const AdminLogin: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAdminAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await login(username, password);
    
    if (result.ok) {
      toast.success("🎉 Đăng nhập admin thành công!");
      navigate('/admin/dashboard');
    } else {
      setError(result.message || 'Đăng nhập thất bại');
      toast.error(result.message || 'Đăng nhập thất bại');
    }
    
    setLoading(false);
  };

  return (
    <LoginContainer>
      <LoginBox>
        <Logo>
          <h1>🍽️ FoodFast</h1>
          <p>Hệ thống quản trị</p>
        </Logo>
        <Title>🔐 Đăng nhập quản trị</Title>
        <Form onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="Tên đăng nhập"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Mật khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit" disabled={loading}>
            {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
          </Button>
          {error && <ErrorMessage>{error.includes('Invalid') || error.includes('credentials') ? 'Thông tin đăng nhập không hợp lệ' : error}</ErrorMessage>}
        </Form>

        <CredentialsBox>
          <CredentialsTitle>🔐 Tài khoản Admin:</CredentialsTitle>
          <CredentialsList>
            <div><strong>Admin:</strong> admin / admin123</div>
          </CredentialsList>
        </CredentialsBox>

        <BackToHome>
          <a href="/">← Quay về trang chủ</a>
        </BackToHome>
      </LoginBox>
    </LoginContainer>
  );
};

export default AdminLogin;
