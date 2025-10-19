import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { formatVND, formatCurrency, parseCurrency } from '../utils/currency';

describe('Currency Utils', () => {
  describe('formatVND', () => {
    it('formats numbers correctly', () => {
      expect(formatVND(100000)).toBe('100.000 đ');
      expect(formatVND(1500000)).toBe('1.500.000 đ');
      expect(formatVND(0)).toBe('0 đ');
    });

    it('handles invalid inputs', () => {
      expect(formatVND(NaN)).toBe('0 đ');
      expect(formatVND(undefined as any)).toBe('0 đ');
    });
  });

  describe('formatCurrency', () => {
    it('formats with custom symbol', () => {
      expect(formatCurrency(100000, 'USD', '$')).toBe('100.000 $');
      expect(formatCurrency(50000, 'VND', '₫')).toBe('50.000 ₫');
    });
  });

  describe('parseCurrency', () => {
    it('parses Vietnamese currency strings', () => {
      expect(parseCurrency('100.000 đ')).toBe(100000);
      expect(parseCurrency('1.500.000 VND')).toBe(1500000);
      expect(parseCurrency('50,000')).toBe(50000);
    });

    it('handles invalid strings', () => {
      expect(parseCurrency('')).toBe(0);
      expect(parseCurrency('invalid')).toBe(0);
    });
  });
});
