/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "hsl(251,75%,60%)",
        background: "hsl(0,0%,100%)",
        "background-dark": "hsl(229,36%,9%)",
        "button-hover": "hsl(251,75%,70%)",
        text: "hsl(0,0%,0%)",
        "text-secondary": "hsl(0,0%,9%)",
        "text-dark": "hsl(210,100%,99%)",
        "text-dark-secondary": "hsl(226,6%,57%)",
        darken: {
          0.05: "hsla(0,0%,0%,0.05)",
          0.1: "hsla(0,0%,0%,0.1)",
          0.2: "hsla(0,0%,0%,0.2)",
          0.3: "hsla(0,0%,0%,0.3)",
          0.4: "hsla(0,0%,0%,0.4)",
          0.5: "hsla(0,0%,0%,0.5)",
          0.6: "hsla(0,0%,0%,0.6)",
          0.7: "hsla(0,0%,0%,0.7)",
          0.8: "hsla(0,0%,0%,0.8)",
          0.9: "hsla(0,0%,0%,0.9)",
        },
        lighten: {
          0.025: "hsla(0,0%,100%,0.025)",
          0.05: "hsla(0,0%,100%,0.05)",
          0.075: "hsla(0,0%,100%,0.075)",
          0.1: "hsla(0,0%,100%,0.1)",
          0.2: "hsla(0,0%,100%,0.2)",
        },
      },
      fontFamily: {
        sans: ["var(--font-poppins)"],
        lobster: ["var(--font-lobster)"],
      },
    },
  },
  plugins: [],
};
