/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                sans: ["var(--font-poppins)"],
                lobster: ["var(--font-lobster)"],
            },
            aspectRatio: {
                "3/4": "3 / 4",
                "4/3": "4 / 3",
            },
        },
    },
    daisyui: {
        themes: [
            {
                bricksort: {
                    ...require("daisyui/src/colors/themes")["[data-theme=lofi]"],
                    primary: "#dc2626",
                },
            },
        ],
    },
    plugins: [require("@tailwindcss/typography"), require("daisyui"), require("tailwind-scrollbar")],
};
