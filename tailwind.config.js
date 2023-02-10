const colors = require("tailwindcss/colors");

module.exports = {
  // mode: "jit",
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#f0f8ff",
          100: "#e0f1ff",
          200: "#c0e3fe",
          300: "#80c7fd",
          400: "#41ABFC",
          500: "#018ffa",
          600: "#0182E3",
          700: "#017CD9",
          800: "#0176CE",
          900: "#014b82",
        },
        teal: {
          50: "#E6FFFA",
          100: "#B2F5EA",
          200: "#81E6D9",
          300: "#4FD1C5",
          400: "#38B2AC",
          500: "#319795",
          600: "#2C7A7B",
          700: "#285E61",
          800: "#234E52",
        },
        heading: "#1c1c46",
        secondary: "#1a283f",
        muted: "rgba(75, 85, 99)",
      },
      fontSize: {
        "text-5xl": ["3rem", "1.2"],
        "text-6xl": ["3.75rem", "1.2"],
        "text-7xl": ["4.5rem", "1.2"],
        "text-8xl": ["6rem", "1.2"],
        "text-9xl": ["8rem", "1.2"],
        "text-10xl": ["12rem", "1.2"],
      },
    },
    fontFamily: {
      mono: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
      sans: 'Mulish, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
      serif: 'Merriweather, ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
    },
    minWidth: {
      sm: "8em",
    },
    container: {
      screens: {
        sm: "100%",
        md: "100%",
        lg: "920px",
        xl: "1140px",
      },
    },
  },
};
