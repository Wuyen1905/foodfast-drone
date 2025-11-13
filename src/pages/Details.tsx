import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { products, getProductImage } from '../data/products';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { formatVND } from '../utils/currency';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';

const Page = styled.div`
  padding: var(--spacing-xl) var(--spacing-lg);
  max-width: 1000px;
  margin: 0 auto;
`;

const Bread = styled.nav`
  color: #777; 
  font-size: 14px; 
  margin-bottom: 12px;
`;

const Wrap = styled.div`
  display: grid; 
  grid-template-columns: 1fr 1fr; 
  gap: 24px; 
  
  @media (max-width: 900px) { 
    grid-template-columns: 1fr; 
    gap: 16px;
  }
`;

const Img = styled.img`
  width: 100%; 
  aspect-ratio: 16/9; 
  object-fit: cover; 
  border-radius: var(--radius-md); 
  box-shadow: var(--shadow-md);
`;

const Title = styled.h2`
  margin: 0;
`;

const Price = styled.div`
  color: var(--primary); 
  font-weight: 800; 
  font-size: 20px;
`;

const Desc = styled.p`
  color: #555;
  line-height: 1.6;
`;

const Row = styled.div`
  display: flex; 
  align-items: center; 
  gap: 10px; 
  margin-top: 12px;
`;

const QtyBtn = styled.button`
  width: 36px; 
  height: 36px; 
  border-radius: 10px; 
  border: 1px solid var(--border); 
  background: var(--card); 
  cursor: pointer;
  color: var(--text);
`;

const Button = styled.button`
  background: var(--primary); 
  color: #fff; 
  border: none; 
  padding: 10px 14px; 
  border-radius: var(--radius); 
  cursor: pointer; 
  box-shadow: var(--shadow);
  transition: transform 0.2s ease;
  
  &:hover {
    transform: translateY(-1px);
  }
`;

const Ghost = styled(Button)`
  background: var(--border); 
  color: var(--text);
`;

const Details: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { add } = useCart();
  const { user } = useAuth();
  const product = products.find(p => p.id === id);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  if (!product) return <Page>Sản phẩm không tìm thấy.</Page>;

  const addToCart = () => { 
    // Check if user is logged in
    if (!user) {
      Swal.fire({
        title: "Hãy đăng nhập để tiếp tục mua hàng!",
        text: "Bạn cần đăng nhập để thêm món vào giỏ hàng và theo dõi đơn hàng của mình.",
        icon: "warning",
        confirmButtonText: "Đăng nhập ngay",
        cancelButtonText: "Hủy",
        showCancelButton: true,
        confirmButtonColor: "#007bff",
        cancelButtonColor: "#6c757d"
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
        }
      });
      return;
    }

    // Include restaurant information when adding to cart
    // Map restaurant names to correct IDs: SweetDreams -> rest_2, Aloha -> restaurant_2
    const getRestaurantId = (restaurantName: string): string => {
      if (restaurantName === "SweetDreams") return "rest_2";
      if (restaurantName === "Aloha" || restaurantName === "Aloha Kitchen") return "restaurant_2";
      // Default fallback (should not happen, but handle gracefully)
      return "rest_2";
    };
    
    add(product.id, qty, { 
      name: product.name, 
      image: getProductImage(product), 
      price: product.price,
      restaurant: product.restaurant,
      restaurantId: getRestaurantId(product.restaurant || "")
    }); 
    toast.success('🛒 Đã thêm vào giỏ hàng thành công!'); 
  };
  
  const buyNow = () => { 
    // Check if user is logged in
    if (!user) {
      Swal.fire({
        title: "Hãy đăng nhập để tiếp tục mua hàng!",
        text: "Bạn cần đăng nhập để mua hàng và theo dõi đơn hàng của mình.",
        icon: "warning",
        confirmButtonText: "Đăng nhập ngay",
        cancelButtonText: "Hủy",
        showCancelButton: true,
        confirmButtonColor: "#007bff",
        cancelButtonColor: "#6c757d"
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
        }
      });
      return;
    }

    // Include restaurant information when adding to cart
    // Map restaurant names to correct IDs: SweetDreams -> rest_2, Aloha -> restaurant_2
    const getRestaurantId = (restaurantName: string): string => {
      if (restaurantName === "SweetDreams") return "rest_2";
      if (restaurantName === "Aloha" || restaurantName === "Aloha Kitchen") return "restaurant_2";
      // Default fallback (should not happen, but handle gracefully)
      return "rest_2";
    };
    
    add(product.id, qty, { 
      name: product.name, 
      image: getProductImage(product), 
      price: product.price,
      restaurant: product.restaurant,
      restaurantId: getRestaurantId(product.restaurant || "")
    }); 
    navigate('/checkout'); 
  };

  if (loading) {
    return (
      <Page>
        <div className="skeleton" style={{ height: '20px', width: '200px', marginBottom: '12px' }} />
        <Wrap>
          <div className="skeleton" style={{ height: '300px' }} />
          <div>
            <div className="skeleton" style={{ height: '24px', width: '60%', marginBottom: '12px' }} />
            <div className="skeleton" style={{ height: '20px', width: '40%', marginBottom: '16px' }} />
            <div className="skeleton" style={{ height: '80px', marginBottom: '16px' }} />
            <div className="skeleton" style={{ height: '40px', width: '100%' }} />
          </div>
        </Wrap>
      </Page>
    );
  }

  return (
    <Page>
      <Bread>
        <Link to="/">Trang chủ</Link> &gt; <Link to="/menu">Thực đơn</Link> &gt; <span>{product.name}</span>
      </Bread>
      <Wrap>
        <Img src={getProductImage(product)} alt={product.name} />
        <div>
          <Title>{product.name}</Title>
          <Price>{formatVND(product.price)}</Price>
          <Desc>{product.description}</Desc>
          <Row>
            <QtyBtn onClick={() => setQty(q => Math.max(1, q - 1))}>-</QtyBtn>
            <span>{qty}</span>
            <QtyBtn onClick={() => setQty(q => q + 1)}>+</QtyBtn>
          </Row>
          <Row>
            <Button onClick={addToCart}>Thêm vào giỏ</Button>
            <Ghost onClick={buyNow}>Mua ngay</Ghost>
          </Row>
        </div>
      </Wrap>
    </Page>
  );
};

export default Details;