import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 0;
  border-bottom: 1px solid var(--border);
`;

const ThumbSkeleton = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 8px;
`;

const ContentSkeleton = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const NameSkeleton = styled.div`
  height: 16px;
  width: 60%;
`;

const SubSkeleton = styled.div`
  height: 14px;
  width: 40%;
`;

const PriceSkeleton = styled.div`
  height: 16px;
  width: 80px;
`;

const ButtonSkeleton = styled.div`
  width: 80px;
  height: 32px;
  border-radius: 8px;
`;

const CartItemSkeleton: React.FC = () => {
  return (
    <Row>
      <ThumbSkeleton className="skeleton" />
      <ContentSkeleton>
        <NameSkeleton className="skeleton" />
        <SubSkeleton className="skeleton" />
      </ContentSkeleton>
      <PriceSkeleton className="skeleton" />
      <ButtonSkeleton className="skeleton" />
    </Row>
  );
};

const CartSkeleton: React.FC<{ count?: number }> = ({ count = 3 }) => {
  return (
    <Container>
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.1 }}
        >
          <CartItemSkeleton />
        </motion.div>
      ))}
    </Container>
  );
};

export default CartSkeleton;
