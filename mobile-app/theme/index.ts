// theme/index.ts
// Theme for mobile app - matches structure used by screens
// Do NOT change the structure of existing screens.

import { Colors } from '@/constants/theme';

export const theme = {
  colors: {
    primary: '#FC6011', // Orange primary color (matches original mobile theme)
    primaryText: Colors.light.text,
    secondaryText: Colors.light.icon,
    textfield: '#F2F2F2',
    placeholder: '#B6B7B7',
    white: '#ffffff',
    background: Colors.light.background,
  },
  fontFamily: 'System',
};

export type Theme = typeof theme;

