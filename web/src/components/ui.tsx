import styled, { keyframes } from 'styled-components';

export const Page = styled.div`
  padding: 32px 24px;
  max-width: 1200px;
  margin: 0 auto;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 20px;
  @media (max-width: 1024px) { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  @media (max-width: 640px) { grid-template-columns: 1fr; }
`;

export const Card = styled.div`
  background: ${({ theme }) => theme.colors.card};
  border-radius: ${({ theme }) => theme.radius.md};
  padding: 12px;
  box-shadow: ${({ theme }) => theme.shadow.sm};
  border: 1px solid rgba(0,0,0,0.04);
  transition: transform .2s ease, box-shadow .2s ease;
  &:hover { transform: translateY(-2px) scale(1.01); box-shadow: ${({ theme }) => theme.shadow.md}; }
`;

export const Tag = styled.span`
  font-size: 12px;
  color: #fff;
  background: ${({ theme }) => theme.colors.primary};
  padding: 4px 8px;
  border-radius: 999px;
  display: inline-block;
`;

export const Button = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  border: none;
  padding: 12px 18px;
  border-radius: ${({ theme }) => theme.radius.md};
  box-shadow: ${({ theme }) => theme.shadow.sm};
  cursor: pointer;
  transition: transform .15s ease, box-shadow .15s ease, filter .15s ease;
  &:hover { transform: translateY(-1px); box-shadow: ${({ theme }) => theme.shadow.md}; filter: brightness(1.03); }
`;

export const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const Section = styled.section`
  margin: 20px 0;
  animation: ${fadeIn} .35s ease both;
`;


