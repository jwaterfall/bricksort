/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                sans: ["var(--font-poppins)"],
                lobster: ["var(--font-lobster)"],
            },
        },
    },
    daisyui: {
        themes: [
            {
                bricksort: {
                    ...require("daisyui/src/colors/themes")["[data-theme=lofi]"],
                    primary: "#DC2626",
                    info: "#2563EB",
                    success: "#16A34A",
                    warning: "#CA8A04",
                    error: "#DC2626",
                },
            },
        ],
    },
    plugins: [require("@tailwindcss/typography"), require("daisyui"), require("tailwind-scrollbar")],
};
