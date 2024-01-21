/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');

module.exports = {
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
        border: colors.slate[200],
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: colors.slate[50],
        foreground: colors.slate[700],
        primary: {
          DEFAULT: colors.lime[600],
          foreground: colors.white,
        },
        secondary: {
          DEFAULT: colors.slate[100],
          foreground: colors.slate[600],
        },
        destructive: {
          DEFAULT: colors.red[500],
          foreground: colors.red[50],
        },
        muted: {
          DEFAULT: colors.slate[200],
          foreground: colors.slate[500],
        },
        accent: {
          DEFAULT: colors.slate[200],
          foreground: colors.slate[600],
        },
        popover: {
          DEFAULT: colors.white,
          foreground: colors.slate[700],
        },
        card: {
          DEFAULT: colors.white,
          foreground: colors.slate[700],
        },
      },
      borderRadius: {
        lg: '0.5rem',
        md: '0.375rem',
        sm: '0.25rem',
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
};
