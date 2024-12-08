import type { Config } from 'tailwindcss';
import colors from 'tailwindcss/colors';

const config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: colors.neutral[300],
        input: colors.neutral[200],
        ring: colors.blue[500],
        background: colors.neutral[100],
        foreground: colors.neutral[950],
        primary: {
          DEFAULT: colors.blue[900],
          foreground: colors.white,
        },
        secondary: {
          DEFAULT: colors.neutral[200],
          foreground: colors.neutral[700],
        },
        destructive: {
          DEFAULT: colors.red[500],
          foreground: colors.white,
        },
        muted: {
          DEFAULT: colors.neutral[200],
          foreground: colors.neutral[500],
        },
        accent: {
          DEFAULT: colors.neutral[400],
          foreground: colors.white,
        },
        popover: {
          DEFAULT: colors.white,
          foreground: colors.neutral[900],
        },
        card: {
          DEFAULT: colors.white,
          foreground: colors.neutral[900],
        },
      },
      borderRadius: {
        lg: '1.5rem',
        md: '1rem',
        sm: '0.75rem',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;

export default config;
