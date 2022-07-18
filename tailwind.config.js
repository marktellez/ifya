module.exports = {
  content: [
    "./src/pages/**/*.{jsx, js}",
    "./src/features/**/*.{jsx, js}",
    "./src/ui/**/*.{jsx, js}",
  ],
  important: true,
  theme: {
    extend: {
      fontFamily: {
        sans: ["Roboto Slab", "sans-serif"],
        serif: ["Ruda", "serif"],
      },
      colors: {
        blue: {
          DEFAULT: "#3BA8F6",
          50: "#EBF6FE",
          100: "#D7EDFD",
          200: "#B0DCFB",
          300: "#89CAFA",
          400: "#62B9F8",
          500: "#3BA8F6",
          600: "#0B8DE9",
          700: "#086AAF",
          800: "#054674",
          900: "#03233A",
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography")],
};
