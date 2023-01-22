/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                sans: ["Poppins", "sans-serif"],
                lobster: ["Lobster", "cursive"],
            },
            aspectRatio: {
                "2/3": "2 / 3",
                "3/2": "3 / 2",
                "3/4": "3 / 4",
                "4/3": "4 / 3",
            },
        },
    },
    plugins: [require("tailwind-scrollbar")],
};
