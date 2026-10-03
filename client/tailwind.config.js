/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bridal: {
          ivory: '#FDFBF7',
          cream: '#F9FAFB',
          sand: '#F3F4F6',
          gold: '#991B1B',
          goldHover: '#7F1D1D',
          deepGold: '#881337',
          goldLight: '#FEF2F2',
          blush: '#FDF2F4',
          dustyRose: '#E11D48',
          roseMuted: '#9F1239',
          charcoal: '#111827',
          mutedText: '#4B5563',
          lightText: '#9CA3AF',
          border: '#E5E7EB',
          borderLight: '#F3F4F6',
          card: '#FFFFFF',
          darkBg: '#0F172A',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['Cinzel', 'Playfair Display', 'serif'],
        accent: ['Cormorant Garamond', 'serif'],
      },
      borderRadius: {
        DEFAULT: '6px',
        sm: '4px',
        md: '6px',
        lg: '6px',
        xl: '6px',
        '2xl': '6px',
        '3xl': '6px',
        card: '4px',
        btn: '6px',
        input: '6px',
      },
      boxShadow: {
        'luxury-sm': '0 2px 8px -2px rgba(28, 25, 23, 0.04), 0 1px 4px -1px rgba(28, 25, 23, 0.02)',
        'luxury': '0 8px 24px -6px rgba(28, 25, 23, 0.06), 0 4px 12px -2px rgba(28, 25, 23, 0.03)',
        'luxury-lg': '0 16px 36px -8px rgba(28, 25, 23, 0.08), 0 8px 20px -4px rgba(28, 25, 23, 0.04)',
        'gold-glow': '0 0 20px rgba(180, 83, 60, 0.25)',
      },
      letterSpacing: {
        widest: '.2em',
        luxury: '.15em',
      }
    },
  },
  plugins: [],
};
