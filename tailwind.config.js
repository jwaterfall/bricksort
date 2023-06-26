/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}', '.storybook/**/*.{js,ts,jsx,tsx}'],
    darkMode: 'class',
    theme: {
        extend: {
            fontFamily: {
                sans: ['var(--font-readex-pro)', 'sans-serif'],
                logo: ['var(--font-lobster)', 'cursive'],
            },
            screens: {
                'hide-scrollbar': { max: '767px' },
            },
            animation: {
                'snackbar-open': 'slide-in-right 150ms cubic-bezier(0.16, 1, 0.3, 1)',
                'snackbar-close': 'fade-out 100ms ease-in',
                'snackbar-swipe-end': 'snackbar-swipe-out 150ms ease-out',
                'spin-slow': 'spin 3s linear infinite',
            },
            keyframes: {
                'fade-out': {
                    '0%': { opacity: 1 },
                    '100%': { opacity: 0 },
                },
                'slide-in-right': {
                    '0%': { transform: 'translateX(50vw)' },
                    '100%': { transform: 'translateX(0)' },
                },
                'snackbar-swipe-out': {
                    '0%': { transform: 'translateX(var(--radix-toast-swipe-end-x))' },
                    '100%': { transform: 'translateX(50vw)' },
                },
            },
            transitionProperty: {
                'switch-thumb': 'box-shadow, transform',
            },
        },
    },
    plugins: [require('tailwind-scrollbar')],
};
