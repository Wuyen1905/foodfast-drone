import React, { useMemo, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context';
import { getAllProducts, Product } from '../data/products';
import { formatVND } from '../utils/currency';
import CartSkeleton from '../components/CartSkeleton';
import toast from 'react-hot-toast';

const Page = styled.div`
  padding: var(--spacing-xl) var(--spacing-lg);
  max-width: 900px;
  margin: 0 auto;
`;

const Title = styled.h2`
  margin: 0 0 16px 0;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 0;
  border-bottom: 1px solid var(--border);
`;

const Thumb = styled.img`
  width: 56px;
  height: 56px;
  border-radius: var(--radius-sm);
  object-fit: cover;
`;

const Name = styled.div`
  font-weight: 700;
`;

const Sub = styled.div`
  color: var(--secondaryText);
`;

const Button = styled.button`
  background: var(--primary);
  color: #fff;
  border: none;
  padding: 10px 16px;
  border-radius: var(--radius-md);
  box-shadow: var(--shadow);
  cursor: pointer;
  transition: transform .15s ease, box-shadow .15s ease, filter .15s ease;
  
  &:hover { 
    transform: translateY(-1px); 
    box-shadow: var(--shadow-md); 
    filter: brightness(1.03); 
  }
`;

const QtyBtn = styled(Button)`
  background: var(--border); 
  color: var(--text); 
  padding: 6px 10px;
`;

const TotalBar = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid var(--border);
`;

const Total = styled.div`
  color: var(--primary);
  font-weight: 800;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 40px 20px;
  color: var(--secondaryText);
`;

const Cart: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { items, remove, setQty, subtotal } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const productMap = useMemo(() => Object.fromEntries(products.map(p => [p.id, p])), [products]);
  
  const delivery = 25000; // 25,000 VND
  const tax = subtotal * 0.08;
  const total = subtotal + tax + delivery;

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const fetchedProducts = await getAllProducts();
        setProducts(fetchedProducts);
      } catch (error) {
        console.error('Error loading products:', error);
        toast.error('Không thể tải thông tin sản phẩm');
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  const handleRemoveItem = (itemId: string, itemName: string) => {
    remove(itemId);
    toast.success(`✅ Đã xóa "${itemName}" khỏi giỏ hàng`);
  };

  const handleQuantityChange = (itemId: string, newQty: number, itemName: string) => {
    setQty(itemId, newQty);
    toast.success(`📦 Cập nhật số lượng "${itemName}" thành ${newQty}`);
  };

  const handleProceedToCheckout = () => {
    if (items.length === 0) {
      toast.error('Giỏ hàng trống! Vui lòng thêm sản phẩm trước khi thanh toán.');
      return;
    }
    
    // Redirect unauthenticated users to Customer Info Form
    if (!user) {
      toast.success('📝 Vui lòng điền thông tin khách hàng...');
      navigate('/customer-info');
      return;
    }
    
    toast.success('🚀 Chuyển đến trang thanh toán...');
    navigate('/checkout');
  };


  if (loading) {
    return (
      <Page>
        <Title>Giỏ hàng</Title>
        <CartSkeleton count={3} />
      </Page>
    );
  }

  if (items.length === 0) {
    return (
      <Page>
        <Title>Giỏ hàng</Title>
        <EmptyState>
          <p>Giỏ hàng của bạn đang trống — hãy thêm một số món ăn ngon 🍱</p>
          <Link to="/menu" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>
            Xem thực đơn
          </Link>
        </EmptyState>
      </Page>
    );
  }

  return (
    <Page>
      <Title>Giỏ hàng</Title>
      {items.map((c, index) => {
        const p = productMap[c.id];
        if (!p) return null;
        return (
          <motion.div
            key={c.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Row>
              <Thumb 
                src={c.image || ''} 
                alt={c.name} 
                onError={(e) => { 
                  (e.currentTarget.src = 'https://via.placeholder.com/80x80?text=No+Image'); 
                }} 
              />
              <div style={{ flex: 1 }}>
                <Name>{c.name}</Name>
                <Sub>
                  {formatVND(c.price)} • Số lượng:
                  <QtyBtn onClick={() => handleQuantityChange(c.id, Math.max(1, c.qty - 1), c.name)} style={{ marginLeft: 8 }}>
                    -
                  </QtyBtn>
                  <span style={{ margin: '0 8px' }}>{c.qty}</span>
                  <QtyBtn onClick={() => handleQuantityChange(c.id, c.qty + 1, c.name)}>+</QtyBtn>
                </Sub>
              </div>
              <div style={{ fontWeight: 700 }}>{formatVND(c.price * c.qty)}</div>
              <Button onClick={() => handleRemoveItem(c.id, c.name)} style={{ background: 'var(--border)', color: 'var(--text)' }}>
                Xóa
              </Button>
            </Row>
          </motion.div>
        );
      })}
      
      <div style={{ marginTop: 16, borderTop: '1px solid var(--border)', paddingTop: 12 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>Tạm tính</span>
          <span>{formatVND(subtotal)}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>Thuế (8%)</span>
          <span>{formatVND(tax)}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>Phí giao hàng</span>
          <span>{formatVND(delivery)}</span>
        </div>
        <TotalBar>
          <div>Tổng cộng</div>
          <Total>{formatVND(total)}</Total>
        </TotalBar>
        <Button style={{ marginTop: 12 }} onClick={handleProceedToCheckout}>
          Tiến hành thanh toán
        </Button>
      </div>
    </Page>
  );
};

export default Cart;