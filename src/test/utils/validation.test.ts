import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { validateName, validateEmail, validatePhone, validateAddress } from '../utils/validation';

describe('Validation Utils', () => {
  describe('validateName', () => {
    it('validates correct names', () => {
      expect(validateName('Nguyễn Văn A')).toBeNull();
      expect(validateName('Trần Thị B')).toBeNull();
      expect(validateName('Lê Hoàng C')).toBeNull();
    });

    it('rejects names with numbers', () => {
      expect(validateName('Nguyễn Văn 123')).toBeTruthy();
      expect(validateName('User123')).toBeTruthy();
    });

    it('rejects names that are too short or long', () => {
      expect(validateName('A')).toBeTruthy(); // Too short
      expect(validateName('A'.repeat(51))).toBeTruthy(); // Too long
    });

    it('rejects empty names', () => {
      expect(validateName('')).toBeTruthy();
      expect(validateName('   ')).toBeTruthy();
    });
  });

  describe('validateEmail', () => {
    it('validates correct emails', () => {
      expect(validateEmail('test@example.com')).toBeNull();
      expect(validateEmail('user.name@domain.co.uk')).toBeNull();
      expect(validateEmail('test+tag@example.org')).toBeNull();
    });

    it('rejects invalid emails', () => {
      expect(validateEmail('invalid-email')).toBeTruthy();
      expect(validateEmail('test@')).toBeTruthy();
      expect(validateEmail('@example.com')).toBeTruthy();
      expect(validateEmail('')).toBeTruthy();
    });
  });

  describe('validatePhone', () => {
    it('validates correct phone numbers', () => {
      expect(validatePhone('0123456789')).toBeNull();
      expect(validatePhone('0987654321')).toBeNull();
      expect(validatePhone('+84123456789')).toBeNull();
      expect(validatePhone('+84987654321')).toBeNull();
    });

    it('rejects invalid phone numbers', () => {
      expect(validatePhone('123456789')).toBeTruthy(); // No leading 0 or +84
      expect(validatePhone('012345678')).toBeTruthy(); // Too short
      expect(validatePhone('01234567890')).toBeTruthy(); // Too long
      expect(validatePhone('')).toBeTruthy(); // Empty
    });
  });

  describe('validateAddress', () => {
    it('validates correct addresses', () => {
      expect(validateAddress('123 Đường ABC, Quận 1, TP.HCM')).toBeNull();
      expect(validateAddress('Số 456, Phường XYZ, Quận 2')).toBeNull();
    });

    it('rejects addresses that are too short or long', () => {
      expect(validateAddress('123')).toBeTruthy(); // Too short
      expect(validateAddress('A'.repeat(201))).toBeTruthy(); // Too long
      expect(validateAddress('')).toBeTruthy(); // Empty
    });
  });
});
