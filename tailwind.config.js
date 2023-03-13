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
                "2/3": "2 / 3",
                "3/2": "3 / 2",
                "3/4": "3 / 4",
                "4/3": "4 / 3",
            },
            colors: {
                gray: {
                    900: "#0F1112",
                    800: "#151718",
                    700: "#181A1E",
                    600: "#1E2125",
                    500: "#24282D",
                    400: "#55565C",
                    300: "#7A7B81",
                    200: "#A0A1A7",
                    100: "#C7C8CD",
                    50: "#EDEEEF",
                },
            },
        },
    },
    plugins: [require("tailwind-scrollbar")],
};
