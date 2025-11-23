import React from 'react';

type Props = { method: 'visa'|'momo'|'zalopay'|'cod' };

const PaymentIcons: React.FC<Props> = ({ method }) => {
  switch (method) {
    case 'visa':
      return <span role="img" aria-label="visa">💳</span>;
    case 'momo':
      return <span role="img" aria-label="momo">🌸</span>;
    case 'zalopay':
      return <span role="img" aria-label="zalopay">💰</span>;
    case 'cod':
      return <span role="img" aria-label="cod">🪙</span>;
    default:
      return null;
  }
};

export default PaymentIcons;


