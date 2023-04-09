/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                sans: ['var(--font-poppins)'],
                lobster: ['var(--font-lobster)'],
            },
        },
    },
    plugins: [require('@tailwindcss/line-clamp'), require('tailwind-scrollbar')],
};
