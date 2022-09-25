module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#FDA592",
          100: "#FC927C",
          200: "#FC8066",
          300: "#FB6E51",
          400: "#FB5C3B",
          500: "#E14321",
          600: "#C83B1E",
          700: "#AF341A",
          800: "#962C16",
          900: "#7D2513",
          DEFAULT: "#FA4A25",
        },
        inverted: {
          50: "#999999",
          100: "#858585",
          200: "#707070",
          300: "#5C5C5C",
          400: "#474747",
          500: "#2E2E2E",
          600: "#292929",
          700: "#242424",
          800: "#1F1F1F",
          900: "#1A1A1A",
          DEFAULT: "#333333",
        },
      },
    },
  },
  plugins: [],
};
