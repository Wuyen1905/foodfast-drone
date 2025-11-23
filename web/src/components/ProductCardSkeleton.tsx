import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  background: var(--card);
  border-radius: var(--radius);
  padding: 16px;
  box-shadow: var(--shadow);
  border: 1px solid var(--border);
`;

const ImageSkeleton = styled.div`
  width: 100%;
  height: 200px;
  margin-bottom: 12px;
`;

const TitleSkeleton = styled.div`
  height: 20px;
  width: 70%;
  margin-bottom: 8px;
`;

const PriceSkeleton = styled.div`
  height: 16px;
  width: 40%;
  margin-bottom: 12px;
`;

const ButtonSkeleton = styled.div`
  height: 36px;
  width: 100%;
`;

const ProductCardSkeleton: React.FC = () => {
  return (
    <Card>
      <ImageSkeleton className="skeleton" />
      <TitleSkeleton className="skeleton" />
      <PriceSkeleton className="skeleton" />
      <ButtonSkeleton className="skeleton" />
    </Card>
  );
};

const ProductCardSkeletons: React.FC<{ count?: number }> = ({ count = 6 }) => {
  return (
    <Container>
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
        >
          <ProductCardSkeleton />
        </motion.div>
      ))}
    </Container>
  );
};

export default ProductCardSkeletons;
