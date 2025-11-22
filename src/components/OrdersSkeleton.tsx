import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Card = styled.div`
  background: var(--card);
  border-radius: var(--radius);
  padding: 16px;
  box-shadow: var(--shadow);
  border: 1px solid var(--border);
`;

const TitleSkeleton = styled.div`
  height: 24px;
  width: 40%;
  margin-bottom: 16px;
`;

const RowSkeleton = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
`;

const LabelSkeleton = styled.div`
  height: 16px;
  width: 30%;
`;

const ValueSkeleton = styled.div`
  height: 16px;
  width: 20%;
`;

const ButtonSkeleton = styled.div`
  height: 40px;
  width: 100%;
  margin-top: 16px;
`;

const OrderCardSkeleton: React.FC = () => {
  return (
    <Card>
      <TitleSkeleton className="skeleton" />
      <RowSkeleton>
        <LabelSkeleton className="skeleton" />
        <ValueSkeleton className="skeleton" />
      </RowSkeleton>
      <RowSkeleton>
        <LabelSkeleton className="skeleton" />
        <ValueSkeleton className="skeleton" />
      </RowSkeleton>
      <RowSkeleton>
        <LabelSkeleton className="skeleton" />
        <ValueSkeleton className="skeleton" />
      </RowSkeleton>
      <ButtonSkeleton className="skeleton" />
    </Card>
  );
};

const OrdersSkeleton: React.FC<{ count?: number }> = ({ count = 4 }) => {
  return (
    <Container>
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
        >
          <OrderCardSkeleton />
        </motion.div>
      ))}
    </Container>
  );
};

export default OrdersSkeleton;
