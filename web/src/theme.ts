import { createGlobalStyle } from 'styled-components';
import { THEME_CONFIG } from './constants';

export const theme = {
  colors: {
    // Primary Colors
    primary: THEME_CONFIG.COLORS.PRIMARY,
    primaryLight: '#ff8533',
    primaryDark: '#e55a00',
    
    // Secondary Colors
    secondary: THEME_CONFIG.COLORS.SECONDARY,
    secondaryLight: '#ffa726',
    secondaryDark: '#f57c00',
    
    // Status Colors
    success: THEME_CONFIG.COLORS.SUCCESS,
    warning: THEME_CONFIG.COLORS.WARNING,
    error: THEME_CONFIG.COLORS.ERROR,
    info: THEME_CONFIG.COLORS.INFO,
    
    // Legacy Colors (for backward compatibility)
    background: '#FFFFFF',
    backgroundDark: '#121212',
    text: '#222222',
    textDark: '#EAEAEA',
    secondaryText: '#7C7D7E',
    textfield: '#F2F2F2',
    placeholder: '#B6B7B7',
    white: '#ffffff',
    card: '#ffffff',
    cardDark: '#1e1e1e',
    border: '#e5e5e5',
    borderDark: '#333333',
  },
  radius: {
    sm: '8px',
    md: '16px',
    lg: '22px',
  },
  shadow: {
    sm: '0 2px 10px rgba(0,0,0,0.06)',
    md: '0 6px 24px rgba(0,0,0,0.08)',
    dark: '0 6px 24px rgba(0,0,0,0.3)',
  },
  fontFamily: 'Inter, Metropolis, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif',
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
  },
};

export const GlobalStyle = createGlobalStyle`
  :root {
    --primary: ${theme.colors.primary};
    --primary-light: ${theme.colors.primaryLight};
    --bg: ${theme.colors.background};
    --bg-dark: ${theme.colors.backgroundDark};
    --text: ${theme.colors.text};
    --text-dark: ${theme.colors.textDark};
    --card: ${theme.colors.card};
    --card-dark: ${theme.colors.cardDark};
    --border: ${theme.colors.border};
    --border-dark: ${theme.colors.borderDark};
    --radius: ${theme.radius.md};
    --shadow: ${theme.shadow.sm};
    --shadow-md: ${theme.shadow.md};
  }

  *, *::before, *::after { 
    box-sizing: border-box; 
  }
  
  html, body, #root { 
    height: 100%; 
  }
  
  body {
    margin: 0;
    font-family: ${theme.fontFamily};
    color: var(--text);
    background: var(--bg);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    transition: background-color 0.3s ease, color 0.3s ease;
  }

  [data-theme="dark"] {
    --bg: ${theme.colors.backgroundDark};
    --text: ${theme.colors.textDark};
    --card: ${theme.colors.cardDark};
    --border: ${theme.colors.borderDark};
    --shadow: ${theme.shadow.dark};
  }

  a { 
    color: inherit; 
    text-decoration: none; 
  }
  
  img { 
    display: block; 
    max-width: 100%; 
  }

  .skeleton {
    background: linear-gradient(90deg, #f0f0f0 25%, #e2e2e2 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
    border-radius: var(--radius);
  }

  @keyframes shimmer {
    100% { 
      background-position: -200% 0; 
    }
  }

  [data-theme="dark"] .skeleton {
    background: linear-gradient(90deg, #2a2a2a 25%, #3a3a3a 50%, #2a2a2a 75%);
    background-size: 200% 100%;
  }
`;

export type AppTheme = typeof theme;
declare module 'styled-components' {
  export interface DefaultTheme extends AppTheme {}
}


