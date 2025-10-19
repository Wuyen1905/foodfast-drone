import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Product, getProductImage } from '../data/products';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { formatVND } from '../utils/currency';
import toast from 'react-hot-toast';

const Card = styled(motion.div)<{ isAdmin?: boolean }>`
  background: var(--card);
  border-radius: var(--radius-lg);
  padding: 16px;
  box-shadow: var(--shadow);
  border: 1px solid var(--border);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  ${props => props.isAdmin && `
    border: 2px solid #e74c3c;
    box-shadow: 0 0 0 1px rgba(231, 76, 60, 0.1);
    
    &::after {
      content: 'ADMIN';
      position: absolute;
      top: 8px;
      right: 8px;
      background: #e74c3c;
      color: white;
      padding: 2px 6px;
      border-radius: 4px;
      font-size: 10px;
      font-weight: bold;
      z-index: 10;
    }
  `}
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, var(--primary), var(--primary-light));
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &:hover::before {
    opacity: 1;
  }
  
  &:hover {
    box-shadow: var(--shadow-md);
    transform: translateY(-2px);
  }
`;

const ThumbWrap = styled(Link)`
  display: block;
  position: relative;
  border-radius: var(--radius-md);
  overflow: hidden;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: scale(1.02);
  }
`;

const Thumb = styled.img`
  width: 100%;
  aspect-ratio: 16/9;
  object-fit: cover;
  display: block;
  transition: transform 0.3s ease;
`;

const Title = styled(Link)`
  display: block;
  margin-top: 12px;
  font-weight: 700;
  color: var(--text);
  text-decoration: none;
  transition: color 0.2s ease;
  
  &:hover {
    color: var(--primary);
  }
`;

const PriceRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 8px;
`;

const Price = styled.div`
  color: var(--primary);
  font-weight: 800;
  font-size: 18px;
`;

const Category = styled.span`
  color: var(--secondaryText);
  font-size: 12px;
  background: var(--border);
  padding: 4px 8px;
  border-radius: 12px;
`;

const Actions = styled.div`
  display: flex; 
  gap: 8px; 
  margin-top: 12px;
`;

const Button = styled(motion.button)`
  flex: 1;
  background: var(--primary);
  color: #fff;
  border: none;
  padding: 12px 16px;
  border-radius: var(--radius-md);
  box-shadow: var(--shadow);
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s ease;
  
  &:hover {
    background: var(--primary-light);
    transform: translateY(-1px);
    box-shadow: var(--shadow-md);
  }
`;

const Ghost = styled(motion.button)`
  background: var(--border); 
  color: var(--text);
  border: none;
  padding: 12px 16px;
  border-radius: var(--radius-md);
  cursor: pointer;
  font-size: 18px;
  transition: all 0.2s ease;
  
  &:hover {
    background: var(--primary);
    color: #fff;
    transform: scale(1.05);
  }
`;

const Tag = styled(motion.span)`
  position: absolute; 
  top: 8px; 
  left: 8px;
  font-size: 12px; 
  color: #fff; 
  background: var(--primary);
  padding: 6px 12px; 
  border-radius: 999px;
  font-weight: 600;
  box-shadow: 0 2px 8px rgba(0,0,0,0.2);
`;

type Props = { 
  product: Product;
  isAdmin?: boolean;
  onEdit?: (product: Product) => void;
  onDelete?: (productId: string) => void;
  onAddToCart?: (product: Product) => void;
};

const ProductCard: React.FC<Props> = ({ product, isAdmin, onEdit, onDelete, onAddToCart }) => {
  const { add } = useCart();
  const { toggle, has } = useWishlist();
  const img = getProductImage(product);

  const onAddCart = () => { 
    if (onAddToCart) {
      onAddToCart(product);
    } else {
      add(product.id, 1, { name: product.name, image: img, price: product.price }); 
      toast.success('🛒 Đã thêm vào giỏ hàng!'); 
    }
  };
  
  const onWishlist = () => { 
    toggle(product.id); 
    toast.success(has(product.id) ? 'Đã xóa khỏi danh sách yêu thích' : 'Đã thêm vào danh sách yêu thích ❤️'); 
  };

  return (
    <Card 
      isAdmin={isAdmin}
      whileHover={{ y: -4, scale: 1.01 }} 
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <ThumbWrap to={`/details/${product.id}`} aria-label={product.name}>
        {product.tag && (
          <Tag
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            {product.tag}
          </Tag>
        )}
        <Thumb src={img} alt={product.name} onError={(e) => { (e.currentTarget.src = 'https://via.placeholder.com/400x300?text=No+Image'); }} />
      </ThumbWrap>
      <Title to={`/details/${product.id}`}>{product.name}</Title>
      <PriceRow>
        <Price>{formatVND(product.price)}</Price>
        <Category>{product.category}</Category>
      </PriceRow>
      <Actions>
        {isAdmin ? (
          <>
            <Button 
              onClick={() => onEdit?.(product)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{ background: '#2196f3' }}
            >
              ✏️ Chỉnh sửa
            </Button>
            <Ghost 
              onClick={() => onDelete?.(product.id)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              style={{ color: '#e74c3c' }}
            >
              🗑️ Xóa
            </Ghost>
          </>
        ) : (
          <>
            <Button 
              onClick={onAddCart}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Thêm vào giỏ
            </Button>
            <Ghost 
              onClick={onWishlist}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {has(product.id) ? '♥' : '♡'}
            </Ghost>
          </>
        )}
      </Actions>
    </Card>
  );
};

export default ProductCard;


