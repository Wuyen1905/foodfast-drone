import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../AuthContext";
import styled from "styled-components";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

// Styled Components
const LoginContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
`;

const LoginCard = styled(motion.div)`
  background: white;
  border-radius: 16px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  padding: 40px;
  width: 100%;
  max-width: 420px;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #FF6600 0%, #FF8C00 100%);
  }
`;

const LoginTitle = styled.h2`
  text-align: center;
  margin: 0 0 32px 0;
  color: #333;
  font-size: 28px;
  font-weight: 700;
`;

const FormGroup = styled.div`
  margin-bottom: 24px;
  position: relative;
`;

const InputContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const InputIcon = styled.div`
  position: absolute;
  left: 16px;
  color: #666;
  font-size: 18px;
  z-index: 1;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 16px 16px 16px 48px;
  border: 2px solid #e1e5e9;
  border-radius: 12px;
  font-size: 16px;
  transition: all 0.3s ease;
  background: #f8f9fa;
  
  &:focus {
    outline: none;
    border-color: #FF6600;
    background: white;
    box-shadow: 0 0 0 3px rgba(255, 102, 0, 0.1);
  }
  
  &::placeholder {
    color: #999;
  }
`;

const LoginButton = styled(motion.button)`
  width: 100%;
  padding: 16px;
  background: linear-gradient(135deg, #FF6600 0%, #FF8C00 100%);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 8px;
  
  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(255, 102, 0, 0.3);
  }
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
  }
`;

const ErrorMessage = styled(motion.div)`
  color: #dc3545;
  background: #f8d7da;
  border: 1px solid #f5c6cb;
  border-radius: 8px;
  padding: 12px;
  margin-top: 16px;
  font-size: 14px;
`;

const CredentialsBox = styled.div`
  margin-top: 32px;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 12px;
  border-left: 4px solid #FF6600;
`;

const CredentialsTitle = styled.h4`
  margin: 0 0 12px 0;
  color: #495057;
  font-size: 16px;
`;

const CredentialsList = styled.div`
  color: #6c757d;
  font-size: 14px;
  line-height: 1.6;
  
  strong {
    color: #495057;
  }
`;

const BackToHome = styled(motion.div)`
  text-align: center;
  margin-top: 24px;
  
  a {
    color: #FF6600;
    text-decoration: none;
    font-weight: 500;
    transition: color 0.3s ease;
    
    &:hover {
      color: #FF8C00;
    }
  }
`;

const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location: any = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    
    try {
      const res = await login(username.trim(), password);
      setBusy(false);
      if (res.ok) {
        toast.success("🎉 Đăng nhập thành công!");
        navigate(from, { replace: true });
      } else {
        setError(res.message || "Đăng nhập thất bại");
        toast.error(res.message || "Đăng nhập thất bại");
      }
    } catch (error) {
      setBusy(false);
      setError("Có lỗi xảy ra, vui lòng thử lại");
      toast.error("Có lỗi xảy ra, vui lòng thử lại");
    }
  };

  return (
    <LoginContainer>
      <LoginCard
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <LoginTitle>Đăng nhập</LoginTitle>
        
        <form onSubmit={onSubmit}>
          <FormGroup>
            <InputContainer>
              <InputIcon>👤</InputIcon>
              <StyledInput
                type="text"
                placeholder="Nhập tên đăng nhập"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                disabled={busy}
              />
            </InputContainer>
          </FormGroup>

          <FormGroup>
            <InputContainer>
              <InputIcon>🔒</InputIcon>
              <StyledInput
                type="password"
                placeholder="Nhập mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={busy}
              />
            </InputContainer>
          </FormGroup>

          <LoginButton
            type="submit"
            disabled={busy}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {busy ? "Đang đăng nhập..." : "Đăng nhập"}
          </LoginButton>

          {error && (
            <ErrorMessage
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {error}
            </ErrorMessage>
          )}
        </form>

        <CredentialsBox>
          <CredentialsTitle>📋 Tài khoản mẫu:</CredentialsTitle>
          <CredentialsList>
            <div><strong>Admin:</strong> admin / admin123</div>
            <div><strong>User:</strong> user / user123</div>
          </CredentialsList>
        </CredentialsBox>

        <BackToHome>
          <a href="/">← Quay về trang chủ</a>
        </BackToHome>
      </LoginCard>
    </LoginContainer>
  );
};

export default Login;
