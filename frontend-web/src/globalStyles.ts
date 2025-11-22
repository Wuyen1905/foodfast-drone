import { createGlobalStyle } from 'styled-components';
import { THEME_CONFIG } from './constants';

// Enhanced responsive breakpoints
export const BREAKPOINTS = {
  mobile: '420px',
  mobileLarge: '600px', 
  tablet: '768px',
  tabletLarge: '1024px',
  desktop: '1200px',
  desktopLarge: '1440px',
} as const;

// Responsive typography scale
export const TYPOGRAPHY = {
  fontSize: {
    xs: '12px',
    sm: '14px',    // Mobile base
    base: '15px',  // Tablet base
    lg: '16px',    // Desktop base
    xl: '18px',    // Desktop large
    '2xl': '20px',
    '3xl': '24px',
    '4xl': '28px',
    '5xl': '32px',
  },
  lineHeight: {
    tight: '1.25',
    normal: '1.5',
    relaxed: '1.75',
  },
  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
} as const;

// Spacing scale for consistent layouts
export const SPACING = {
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '32px',
  '2xl': '48px',
  '3xl': '64px',
  '4xl': '96px',
} as const;

// Enhanced theme with responsive utilities
export const enhancedTheme = {
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
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '22px',
    xl: '32px',
  },
  shadow: {
    xs: '0 1px 2px rgba(0,0,0,0.05)',
    sm: '0 2px 10px rgba(0,0,0,0.06)',
    md: '0 6px 24px rgba(0,0,0,0.08)',
    lg: '0 10px 40px rgba(0,0,0,0.12)',
    dark: '0 6px 24px rgba(0,0,0,0.3)',
  },
  fontFamily: 'Inter, Metropolis, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif',
  spacing: SPACING,
  typography: TYPOGRAPHY,
  breakpoints: BREAKPOINTS,
};

// Global responsive styles
export const GlobalStyle = createGlobalStyle`
  :root {
    /* CSS Custom Properties for responsive design */
    --primary: ${enhancedTheme.colors.primary};
    --primary-light: ${enhancedTheme.colors.primaryLight};
    --primary-dark: ${enhancedTheme.colors.primaryDark};
    --secondary: ${enhancedTheme.colors.secondary};
    --success: ${enhancedTheme.colors.success};
    --warning: ${enhancedTheme.colors.warning};
    --error: ${enhancedTheme.colors.error};
    --info: ${enhancedTheme.colors.info};
    
    --bg: ${enhancedTheme.colors.background};
    --bg-dark: ${enhancedTheme.colors.backgroundDark};
    --text: ${enhancedTheme.colors.text};
    --text-dark: ${enhancedTheme.colors.textDark};
    --text-secondary: ${enhancedTheme.colors.secondaryText};
    --card: ${enhancedTheme.colors.card};
    --card-dark: ${enhancedTheme.colors.cardDark};
    --border: ${enhancedTheme.colors.border};
    --border-dark: ${enhancedTheme.colors.borderDark};
    
    --radius-xs: ${enhancedTheme.radius.xs};
    --radius-sm: ${enhancedTheme.radius.sm};
    --radius-md: ${enhancedTheme.radius.md};
    --radius-lg: ${enhancedTheme.radius.lg};
    --radius-xl: ${enhancedTheme.radius.xl};
    
    --shadow-xs: ${enhancedTheme.shadow.xs};
    --shadow-sm: ${enhancedTheme.shadow.sm};
    --shadow-md: ${enhancedTheme.shadow.md};
    --shadow-lg: ${enhancedTheme.shadow.lg};
    --shadow-dark: ${enhancedTheme.shadow.dark};
    
    /* Responsive font sizes */
    --font-xs: ${TYPOGRAPHY.fontSize.xs};
    --font-sm: ${TYPOGRAPHY.fontSize.sm};
    --font-base: ${TYPOGRAPHY.fontSize.base};
    --font-lg: ${TYPOGRAPHY.fontSize.lg};
    --font-xl: ${TYPOGRAPHY.fontSize.xl};
    --font-2xl: ${TYPOGRAPHY.fontSize['2xl']};
    --font-3xl: ${TYPOGRAPHY.fontSize['3xl']};
    --font-4xl: ${TYPOGRAPHY.fontSize['4xl']};
    --font-5xl: ${TYPOGRAPHY.fontSize['5xl']};
    
    /* Responsive spacing */
    --spacing-xs: ${SPACING.xs};
    --spacing-sm: ${SPACING.sm};
    --spacing-md: ${SPACING.md};
    --spacing-lg: ${SPACING.lg};
    --spacing-xl: ${SPACING.xl};
    --spacing-2xl: ${SPACING['2xl']};
    --spacing-3xl: ${SPACING['3xl']};
    --spacing-4xl: ${SPACING['4xl']};
    
    /* Breakpoint values for media queries */
    --bp-mobile: ${BREAKPOINTS.mobile};
    --bp-mobile-large: ${BREAKPOINTS.mobileLarge};
    --bp-tablet: ${BREAKPOINTS.tablet};
    --bp-tablet-large: ${BREAKPOINTS.tabletLarge};
    --bp-desktop: ${BREAKPOINTS.desktop};
    --bp-desktop-large: ${BREAKPOINTS.desktopLarge};
  }

  /* Reset and base styles */
  *, *::before, *::after { 
    box-sizing: border-box; 
  }
  
  html {
    height: 100%;
    font-size: 14px; /* Mobile-first base font size */
    
    /* Responsive font scaling */
    @media (min-width: ${BREAKPOINTS.tablet}) {
      font-size: 15px; /* Tablet */
    }
    
    @media (min-width: ${BREAKPOINTS.desktop}) {
      font-size: 16px; /* Desktop */
    }
  }
  
  body {
    margin: 0;
    padding: 0;
    font-family: ${enhancedTheme.fontFamily};
    font-size: 1rem;
    line-height: ${TYPOGRAPHY.lineHeight.normal};
    color: var(--text);
    background: var(--bg);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    transition: background-color 0.3s ease, color 0.3s ease;
    overflow-x: hidden; /* Prevent horizontal scroll */
  }
  
  #root {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  /* Dark theme support */
  [data-theme="dark"] {
    --bg: ${enhancedTheme.colors.backgroundDark};
    --text: ${enhancedTheme.colors.textDark};
    --card: ${enhancedTheme.colors.cardDark};
    --border: ${enhancedTheme.colors.borderDark};
    --shadow-sm: ${enhancedTheme.shadow.dark};
    --shadow-md: ${enhancedTheme.shadow.dark};
  }

  /* Typography */
  h1, h2, h3, h4, h5, h6 {
    margin: 0;
    font-weight: ${TYPOGRAPHY.fontWeight.bold};
    line-height: ${TYPOGRAPHY.lineHeight.tight};
  }

  h1 { font-size: var(--font-4xl); }
  h2 { font-size: var(--font-3xl); }
  h3 { font-size: var(--font-2xl); }
  h4 { font-size: var(--font-xl); }
  h5 { font-size: var(--font-lg); }
  h6 { font-size: var(--font-base); }

  p {
    margin: 0 0 var(--spacing-md) 0;
    line-height: ${TYPOGRAPHY.lineHeight.normal};
  }

  /* Links */
  a { 
    color: inherit; 
    text-decoration: none; 
    transition: color 0.2s ease;
  }
  
  a:hover {
    color: var(--primary);
  }

  /* Images */
  img { 
    display: block; 
    max-width: 100%; 
    height: auto;
  }

  /* Form elements */
  input, textarea, select, button {
    font-family: inherit;
    font-size: inherit;
  }

  button {
    cursor: pointer;
    border: none;
    background: none;
    padding: 0;
  }

  /* Utility classes for responsive design */
  
  /* Container */
  .container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 var(--spacing-md);
    
    @media (min-width: ${BREAKPOINTS.tablet}) {
      padding: 0 var(--spacing-lg);
    }
    
    @media (min-width: ${BREAKPOINTS.desktop}) {
      padding: 0 var(--spacing-xl);
    }
  }

  /* Grid system */
  .grid-2 {
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--spacing-md);
    
    @media (min-width: ${BREAKPOINTS.tablet}) {
      grid-template-columns: repeat(2, 1fr);
      gap: var(--spacing-lg);
    }
  }

  .grid-3 {
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--spacing-md);
    
    @media (min-width: ${BREAKPOINTS.tablet}) {
      grid-template-columns: repeat(2, 1fr);
    }
    
    @media (min-width: ${BREAKPOINTS.desktop}) {
      grid-template-columns: repeat(3, 1fr);
      gap: var(--spacing-lg);
    }
  }

  .grid-4 {
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--spacing-md);
    
    @media (min-width: ${BREAKPOINTS.tablet}) {
      grid-template-columns: repeat(2, 1fr);
    }
    
    @media (min-width: ${BREAKPOINTS.desktop}) {
      grid-template-columns: repeat(4, 1fr);
      gap: var(--spacing-lg);
    }
  }

  /* Card component */
  .card {
    background: var(--card);
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-sm);
    padding: var(--spacing-lg);
    border: 1px solid var(--border);
    transition: box-shadow 0.2s ease, transform 0.2s ease;
    
    &:hover {
      box-shadow: var(--shadow-md);
      transform: translateY(-2px);
    }
    
    @media (max-width: ${BREAKPOINTS.tablet}) {
      padding: var(--spacing-md);
      margin-bottom: var(--spacing-md);
    }
  }

  /* Button styles */
  .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: var(--spacing-sm) var(--spacing-md);
    border-radius: var(--radius-sm);
    font-weight: ${TYPOGRAPHY.fontWeight.medium};
    font-size: var(--font-sm);
    text-decoration: none;
    border: none;
    cursor: pointer;
    transition: all 0.2s ease;
    min-height: 44px; /* Touch-friendly minimum */
    
    @media (max-width: ${BREAKPOINTS.tablet}) {
      width: 100%;
      padding: var(--spacing-md);
      font-size: var(--font-base);
    }
    
    &.btn-primary {
      background: var(--primary);
      color: white;
      
      &:hover {
        background: var(--primary-dark);
        transform: translateY(-1px);
      }
    }
    
    &.btn-secondary {
      background: var(--secondary);
      color: white;
      
      &:hover {
        background: var(--primary-dark);
      }
    }
    
    &.btn-outline {
      background: transparent;
      color: var(--primary);
      border: 2px solid var(--primary);
      
      &:hover {
        background: var(--primary);
        color: white;
      }
    }
    
    &.btn-ghost {
      background: transparent;
      color: var(--text);
      
      &:hover {
        background: var(--border);
      }
    }
  }

  /* Input styles */
  .input {
    width: 100%;
    padding: var(--spacing-md);
    border: 2px solid var(--border);
    border-radius: var(--radius-sm);
    font-size: var(--font-base);
    background: var(--card);
    color: var(--text);
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
    min-height: 44px; /* Touch-friendly minimum */
    
    &:focus {
      outline: none;
      border-color: var(--primary);
      box-shadow: 0 0 0 3px rgba(255, 102, 0, 0.1);
    }
    
    &::placeholder {
      color: var(--text-secondary);
    }
    
    @media (max-width: ${BREAKPOINTS.tablet}) {
      font-size: var(--font-base);
      padding: var(--spacing-md);
    }
  }

  /* Table responsive styles */
  .table-responsive {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    
    table {
      width: 100%;
      min-width: 600px; /* Minimum width to prevent cramping */
      border-collapse: collapse;
      
      th, td {
        padding: var(--spacing-sm) var(--spacing-md);
        text-align: left;
        border-bottom: 1px solid var(--border);
        
        @media (max-width: ${BREAKPOINTS.tablet}) {
          padding: var(--spacing-xs) var(--spacing-sm);
          font-size: var(--font-sm);
        }
      }
      
      th {
        background: var(--border);
        font-weight: ${TYPOGRAPHY.fontWeight.semibold};
        font-size: var(--font-sm);
      }
    }
  }

  /* Responsive text utilities */
  .text-xs { font-size: var(--font-xs); }
  .text-sm { font-size: var(--font-sm); }
  .text-base { font-size: var(--font-base); }
  .text-lg { font-size: var(--font-lg); }
  .text-xl { font-size: var(--font-xl); }
  .text-2xl { font-size: var(--font-2xl); }
  .text-3xl { font-size: var(--font-3xl); }
  .text-4xl { font-size: var(--font-4xl); }
  .text-5xl { font-size: var(--font-5xl); }

  /* Responsive spacing utilities */
  .p-xs { padding: var(--spacing-xs); }
  .p-sm { padding: var(--spacing-sm); }
  .p-md { padding: var(--spacing-md); }
  .p-lg { padding: var(--spacing-lg); }
  .p-xl { padding: var(--spacing-xl); }
  
  .px-xs { padding-left: var(--spacing-xs); padding-right: var(--spacing-xs); }
  .px-sm { padding-left: var(--spacing-sm); padding-right: var(--spacing-sm); }
  .px-md { padding-left: var(--spacing-md); padding-right: var(--spacing-md); }
  .px-lg { padding-left: var(--spacing-lg); padding-right: var(--spacing-lg); }
  .px-xl { padding-left: var(--spacing-xl); padding-right: var(--spacing-xl); }
  
  .py-xs { padding-top: var(--spacing-xs); padding-bottom: var(--spacing-xs); }
  .py-sm { padding-top: var(--spacing-sm); padding-bottom: var(--spacing-sm); }
  .py-md { padding-top: var(--spacing-md); padding-bottom: var(--spacing-md); }
  .py-lg { padding-top: var(--spacing-lg); padding-bottom: var(--spacing-lg); }
  .py-xl { padding-top: var(--spacing-xl); padding-bottom: var(--spacing-xl); }

  .m-xs { margin: var(--spacing-xs); }
  .m-sm { margin: var(--spacing-sm); }
  .m-md { margin: var(--spacing-md); }
  .m-lg { margin: var(--spacing-lg); }
  .m-xl { margin: var(--spacing-xl); }
  
  .mx-auto { margin-left: auto; margin-right: auto; }
  .my-auto { margin-top: auto; margin-bottom: auto; }

  /* Flexbox utilities */
  .flex { display: flex; }
  .flex-col { flex-direction: column; }
  .flex-row { flex-direction: row; }
  .items-center { align-items: center; }
  .items-start { align-items: flex-start; }
  .items-end { align-items: flex-end; }
  .justify-center { justify-content: center; }
  .justify-between { justify-content: space-between; }
  .justify-start { justify-content: flex-start; }
  .justify-end { justify-content: flex-end; }
  .flex-wrap { flex-wrap: wrap; }
  .flex-1 { flex: 1; }

  /* Responsive visibility */
  .hidden { display: none; }
  .block { display: block; }
  .inline-block { display: inline-block; }
  
  @media (max-width: ${BREAKPOINTS.tablet}) {
    .hidden-mobile { display: none; }
    .block-mobile { display: block; }
  }
  
  @media (min-width: ${BREAKPOINTS.tablet}) {
    .hidden-tablet { display: none; }
    .block-tablet { display: block; }
  }
  
  @media (min-width: ${BREAKPOINTS.desktop}) {
    .hidden-desktop { display: none; }
    .block-desktop { display: block; }
  }

  /* Width utilities */
  .w-full { width: 100%; }
  .w-auto { width: auto; }
  .w-fit { width: fit-content; }
  
  /* Height utilities */
  .h-full { height: 100%; }
  .h-screen { height: 100vh; }
  .h-auto { height: auto; }

  /* Skeleton loading animation */
  .skeleton {
    background: linear-gradient(90deg, #f0f0f0 25%, #e2e2e2 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
    border-radius: var(--radius-sm);
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

  /* Drone animation responsive scaling */
  .drone-container {
    position: relative;
    width: 100%;
    height: auto;
    overflow: hidden;
    
    @media (max-width: ${BREAKPOINTS.tablet}) {
      max-height: 300px;
    }
    
    @media (max-width: ${BREAKPOINTS.mobileLarge}) {
      max-height: 250px;
    }
  }

  /* Chart and visualization responsive scaling */
  .chart-container {
    width: 100%;
    height: auto;
    min-height: 200px;
    
    @media (min-width: ${BREAKPOINTS.tablet}) {
      min-height: 300px;
    }
    
    @media (min-width: ${BREAKPOINTS.desktop}) {
      min-height: 400px;
    }
  }

  /* Restaurant dashboard responsive adjustments */
  .restaurant-dashboard {
    padding: var(--spacing-md);
    
    @media (min-width: ${BREAKPOINTS.tablet}) {
      padding: var(--spacing-lg);
    }
    
    @media (min-width: ${BREAKPOINTS.desktop}) {
      padding: var(--spacing-xl);
    }
  }

  /* Login/Register form responsive adjustments */
  .auth-form {
    width: 100%;
    max-width: 400px;
    margin: 0 auto;
    padding: var(--spacing-lg);
    
    @media (max-width: ${BREAKPOINTS.tablet}) {
      max-width: 100%;
      padding: var(--spacing-md);
    }
  }

  /* Menu grid responsive adjustments */
  .menu-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--spacing-md);
    
    @media (min-width: ${BREAKPOINTS.tablet}) {
      grid-template-columns: repeat(2, 1fr);
      gap: var(--spacing-lg);
    }
    
    @media (min-width: ${BREAKPOINTS.desktop}) {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  /* Cart responsive adjustments */
  .cart-container {
    padding: var(--spacing-md);
    
    @media (min-width: ${BREAKPOINTS.tablet}) {
      padding: var(--spacing-lg);
    }
  }

  /* Navigation responsive adjustments */
  .nav-container {
    padding: var(--spacing-sm) var(--spacing-md);
    
    @media (min-width: ${BREAKPOINTS.tablet}) {
      padding: var(--spacing-md) var(--spacing-lg);
    }
  }

  /* Toast notifications responsive positioning */
  .Toastify__toast-container {
    @media (max-width: ${BREAKPOINTS.tablet}) {
      width: 100% !important;
      left: 0 !important;
      right: 0 !important;
      padding: var(--spacing-md);
    }
  }

  /* Scrollbar styling */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background: var(--border);
    border-radius: var(--radius-sm);
  }

  ::-webkit-scrollbar-thumb {
    background: var(--primary);
    border-radius: var(--radius-sm);
    
    &:hover {
      background: var(--primary-dark);
    }
  }

  /* Focus styles for accessibility */
  *:focus {
    outline: 2px solid var(--primary);
    outline-offset: 2px;
  }

  /* Print styles */
  @media print {
    .no-print {
      display: none !important;
    }
    
    body {
      background: white !important;
      color: black !important;
    }
  }
`;

export type EnhancedTheme = typeof enhancedTheme;
declare module 'styled-components' {
  export interface DefaultTheme extends EnhancedTheme {}
}
