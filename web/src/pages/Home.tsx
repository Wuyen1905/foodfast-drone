import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import ProductCardSkeletons from '../components/ProductCardSkeleton';
import { useAuth } from '../AuthContext';
import AdminDashboard from './AdminDashboard';

const Page = styled.div`
  padding: var(--spacing-xl) var(--spacing-lg);
  max-width: 1200px;
  margin: 0 auto;
`;

const Hero = styled(motion.section)`
  background: linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%);
  color: #fff;
  padding: 48px 32px;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  margin-bottom: 28px;
`;

const HeroTitle = styled.h1`
  margin: 0;
  font-size: 36px;
  letter-spacing: 0.2px;
  
  @media (max-width: 768px) {
    font-size: 28px;
  }
`;

const Sub = styled.p`
  margin: 8px 0 0;
  opacity: 0.95;
`;

const CTA = styled(Link)`
  display: inline-block;
  background: #fff;
  color: var(--primary);
  border: none;
  padding: 12px 18px;
  border-radius: var(--radius-md);
  box-shadow: var(--shadow);
  font-weight: 800;
  transition: transform .15s ease, box-shadow .15s ease, filter .15s ease;
  margin-top: 16px;
  
  &:hover { 
    transform: translateY(-1px); 
    box-shadow: var(--shadow-md); 
    filter: brightness(1.05); 
  }
`;

const LoginPrompt = styled.div`
  text-align: center;
  padding: 40px 20px;
  background: var(--card);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow);
  margin-bottom: 28px;
`;

const LoginTitle = styled.h2`
  margin: 0 0 16px 0;
  color: var(--text);
`;

const LoginSubtitle = styled.p`
  color: var(--secondaryText);
  margin: 0 0 24px 0;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`;

const Home: React.FC = () => {
  const { user, isAdmin } = useAuth();
  const [items, setItems] = useState(products);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setItems(products);
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Show admin dashboard for admin users
  if (user && isAdmin()) {
    return <AdminDashboard />;
  }

  return (
    <Page>
      <Hero
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <HeroTitle>Giao hàng bằng drone nhanh chóng 🚁</HeroTitle>
        <Sub>Đặt món ăn yêu thích và nhận giao hàng bằng drone trong vài phút.</Sub>
        {user ? (
          <CTA to="/menu">Đặt món ngay</CTA>
        ) : (
          <CTA to="/login">Đăng nhập để tiếp tục</CTA>
        )}
      </Hero>
      
      {!user && (
        <LoginPrompt>
          <LoginTitle>Chào mừng đến với FoodFast!</LoginTitle>
          <LoginSubtitle>
            Đăng nhập để có thể đặt món ăn, theo dõi đơn hàng và trải nghiệm dịch vụ giao hàng bằng drone.
          </LoginSubtitle>
          <CTA to="/login">Đăng nhập ngay</CTA>
        </LoginPrompt>
      )}
      
      {user && (
        <>
          <h2 style={{ marginBottom: '20px', color: 'var(--text)' }}>
            {isAdmin() ? 'Quản lý sản phẩm' : 'Món ăn phổ biến'}
          </h2>
          {loading ? (
            <ProductCardSkeletons count={6} />
          ) : (
            <Grid>
              {items.map((p, index) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <ProductCard product={p} />
                </motion.div>
              ))}
            </Grid>
          )}
        </>
      )}
    </Page>
  );
};

export default Home;