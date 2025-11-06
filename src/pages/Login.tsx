import { useState, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context";
import { USERS } from "@/data/mockData";
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

const Login = () => {
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const location: any = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  // Get redirect path based on user role and restaurant (memoized to prevent infinite loops)
  const getRedirectPath = useCallback((loggedInUser: any): string => {
    console.log("🧭 [Login] Calculating redirect path for user:", { 
      username: loggedInUser?.username, 
      role: loggedInUser?.role, 
      restaurantId: loggedInUser?.restaurantId 
    });
    
    if (!loggedInUser) {
      console.log("⚠️ [Login] No user provided, returning from:", from);
      return from;
    }

    // Restaurant-specific redirects
    if (loggedInUser.role === 'restaurant') {
      // SweetDreams Bakery
      if (loggedInUser.restaurantId === 'rest_2' || loggedInUser.username === 'sweetdreams') {
        console.log("🍰 [Login] Redirecting to SweetDreams dashboard");
        return '/restaurant/sweetdreams';
      }
      // Aloha Kitchen
      if (loggedInUser.restaurantId === 'restaurant_2' || loggedInUser.username === 'aloha_restaurant') {
        console.log("🍜 [Login] Redirecting to Aloha dashboard");
        return '/aloha-dashboard';
      }
      // Generic restaurant dashboard
      console.log("🏪 [Login] Redirecting to generic restaurant dashboard");
      return '/restaurant';
    }

    // Note: Admin login is handled separately at /admin/login

    // Customer - redirect to previous page or home
    const customerPath = from === '/login' ? '/' : from;
    console.log("👤 [Login] Redirecting customer to:", customerPath);
    return customerPath;
  }, [from]);

  // Fallback useEffect: Check if user is already logged in and redirect them
  useEffect(() => {
    console.log("🔄 [Login] Checking if user is already logged in:", { 
      hasUser: !!user,
      username: user?.username,
      role: user?.role 
    });
    
    if (user) {
      const redirectPath = getRedirectPath(user);
      console.log("✅ [Login] User already logged in, redirecting to:", redirectPath);
      navigate(redirectPath, { replace: true });
    }
  }, [user, navigate, getRedirectPath]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("📝 [Login] Form submitted with username:", username);
    
    setBusy(true);
    setError(null);
    
    try {
      console.log("📞 [Login] Calling login() function...");
      const res = await login(username.trim(), password);
      console.log("📨 [Login] Login response received:", res);
      
      if (res.ok) {
        console.log("✅ [Login] Login succeeded, showing success toast");
        toast.success("🎉 Đăng nhập thành công!");
        
        // Find the logged-in user directly from USERS data
        const loggedInUser = USERS.find(u => u.username === username.trim() && u.role !== 'admin');
        console.log("👤 [Login] Found logged-in user:", loggedInUser);
        console.log("🔍 [Login] User details:", {
          username: loggedInUser?.username,
          role: loggedInUser?.role,
          restaurantId: loggedInUser?.restaurantId,
          name: loggedInUser?.name
        });
        
        if (loggedInUser) {
          // Calculate redirect path using the helper function
          const redirectPath = getRedirectPath(loggedInUser);
          console.log("🚀 [Login] Redirecting to:", redirectPath);
          
          // Immediate redirect after successful login
          navigate(redirectPath, { replace: true });
          console.log("✅ [Login] Navigation completed");
        } else {
          console.warn("⚠️ [Login] Could not find user data for:", username);
          // Fallback to home page
          navigate('/', { replace: true });
        }
      } else {
        console.log("❌ [Login] Login failed:", res.message);
        setError(res.message || "Đăng nhập thất bại");
        toast.error(res.message || "Đăng nhập thất bại");
      }
      
      setBusy(false);
    } catch (error) {
      console.error("💥 [Login] Exception during login:", error);
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

        <div style={{ textAlign: 'center', marginTop: '24px', color: '#666', fontSize: '14px' }}>
          Chưa có tài khoản? <a href="/register" style={{ color: '#FF6600', textDecoration: 'none', fontWeight: '500' }}>Đăng ký tại đây</a>
        </div>

        <BackToHome>
          <a href="/">← Quay về trang chủ</a>
        </BackToHome>
      </LoginCard>
    </LoginContainer>
  );
};

export default Login;
