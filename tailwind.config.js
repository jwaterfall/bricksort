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
                    primary: "#ef4444",
                    secondary: "#3b82f6",
                    accent: "#22c55e",
                    neutral: "#1e293b",
                    "base-100": "#0f172a",
                    info: "#3b82f6",
                    success: "#22c55e",
                    warning: "#f59e0b",
                    error: "#ef4444",
                    "rounded-button": "0rem ",
                },
            },
        ],
    },
    plugins: [require("@tailwindcss/typography"), require("daisyui"), require("tailwind-scrollbar")],
};
