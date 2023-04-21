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
        },
    },
    plugins: [require('tailwind-scrollbar')],
};
