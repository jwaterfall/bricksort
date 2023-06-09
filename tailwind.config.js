/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-poppins)', 'Poppins'],
        lobster: ['var(--font-lobster)', 'Lobster'],
      },
      screens: {
        'hide-scrollbar': { max: '767px' },
      },
      colors: {
        primary: {
          100: '#E98888',
          200: '#39292C',
        },
        success: {
          100: '#63E2B7',
          200: '#243834',
        },
        error: {
          100: '#E98888',
          200: '#39292C',
        },
        warning: {
          100: '#F2C97D',
          200: '#3B342B',
        },
        info: {
          100: '#70C0E8',
          200: '#26333C',
        },
      },
    },
  },
  plugins: [require('tailwind-scrollbar')],
};
