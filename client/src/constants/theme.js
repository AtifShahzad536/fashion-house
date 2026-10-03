/**
 * Centralized Design System & Theme Constants
 * Royal Bridal Atelier - Zurielle
 */

export const ADMIN_BASE_PATH = '/zurielle-atelier-portal-2026';

export const THEME = {
  colors: {
    // Primary Clean Luxury Palette (No yellow cream/sand)
    ivory: '#FDFBF7',
    cream: '#F9FAFB',
    sand: '#F3F4F6',
    sandLight: '#F8FAFC',

    // Accent Couture Palette - Royal Crimson & Deep Wine
    gold: '#991B1B',
    goldHover: '#7F1D1D',
    goldLight: '#FEF2F2',
    deepGold: '#881337',

    // Romantic Rose & Blush Tones
    blush: '#FDF2F4',
    blushHover: '#FCE7F3',
    dustyRose: '#E11D48',
    roseMuted: '#9F1239',

    // Text & Contrast (Crisp Noir & Slate)
    charcoal: '#111827',
    charcoalLight: '#1F2937',
    mutedText: '#4B5563',
    lightText: '#9CA3AF',

    // Borders & UI Surfaces (Crisp Clean White Cards & Subtle Gray Borders)
    border: '#E5E7EB',
    borderLight: '#F3F4F6',
    card: '#FFFFFF',
    overlayDark: 'rgba(17, 24, 39, 0.5)',
    overlayLight: 'rgba(255, 255, 255, 0.9)',
  },

  // Standard Border Radius - Strictly 6px
  borderRadius: {
    base: '6px',
    card: '5px',
    button: '6px',
    input: '6px',
    modal: '6px',
    badge: '4px',
    circle: '9999px',
  },

  // Typography Hierarchy
  typography: {
    fontFamily: {
      sans: "'Inter', system-ui, -apple-system, sans-serif",
      serif: "'Cinzel', 'Playfair Display', serif",
      accent: "'Cormorant Garamond', Georgia, serif",
    },
    lineHeights: {
      tight: 1.15,
      heading: 1.25,
      body: 1.6,
    }
  },

  // Animation Durations & Easing
  animation: {
    fast: '0.2s cubic-bezier(0.16, 1, 0.3, 1)',
    normal: '0.35s cubic-bezier(0.16, 1, 0.3, 1)',
    slow: '0.6s cubic-bezier(0.16, 1, 0.3, 1)',
    gsapEase: 'power2.out',
    smoothScrollDuration: 1.2,
  },

  // Elevation & Shadows
  shadows: {
    sm: '0 2px 8px -2px rgba(28, 25, 23, 0.04), 0 1px 4px -1px rgba(28, 25, 23, 0.02)',
    md: '0 8px 24px -6px rgba(28, 25, 23, 0.06), 0 4px 12px -2px rgba(28, 25, 23, 0.03)',
    lg: '0 16px 36px -8px rgba(28, 25, 23, 0.08), 0 8px 20px -4px rgba(28, 25, 23, 0.04)',
    goldGlow: '0 0 20px rgba(180, 83, 60, 0.25)',
  },

  // Breakpoints
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  }
};

export default THEME;
