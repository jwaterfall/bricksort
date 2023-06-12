/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}', '.storybook/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-readex-pro)', 'sans-serif'],
      },
      screens: {
        'hide-scrollbar': { max: '767px' },
      },
      animation: {
        'toast-open': 'toast-slide-in 150ms cubic-bezier(0.16, 1, 0.3, 1)',
        'toast-close': 'toast-hide 100ms ease-in',
        'toast-swipe-end': 'toast-swipe-out 100ms ease-out',
        'spin-slow': 'spin 3s linear infinite',
      },
      keyframes: {
        'toast-hide': {
          '0%': { opacity: 1 },
          '100%': { opacity: 0 },
        },
        'toast-slide-in': {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        'toast-swipe-out': {
          '0%': { transform: 'translateX(var(--radix-toast-swipe-end-x))' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
    },
  },
  plugins: [require('tailwind-scrollbar')],
};
