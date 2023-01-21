const theme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,tsx}"],
  theme: {
    extend: {
      fontFamily: { sans: ["Nunito"] },
      spacing: {
        "fluid-1": "clamp(0.25rem, calc(-0.09rem + 1.71vw), 1.13rem)",
        "fluid-2": "clamp(0.5rem, calc(0.11rem + 1.95vw), 1.5rem)",
        "fluid-3": "clamp(0.75rem, calc(0.16rem + 2.93vw), 2.25rem)",
        "fluid-4": "clamp(1rem, calc(0.22rem + 3.9vw), 3rem)",
        "fluid-5": "clamp(1.5rem, calc(0.33rem + 5.85vw), 4.5rem)",
        "fluid-6": "clamp(2rem, calc(0.44rem + 7.8vw), 6rem)",
        "fluid-7": "clamp(3rem, calc(0.66rem + 11.71vw), 9rem)",
      },
      boxShadow: {
        DEFAULT:
          "0 3px 5px -1px rgba(0,0,0,.2), 0 5px 8px 0 rgba(0,0,0,.14), 0 1px 14px 0 rgba(0,0,0,.12)",
      },
      borderRadius: { DEFAULT: theme.borderRadius.md },
    },
  },
  plugins: [
    require("tailwindcss-fluid-type"),
    require("tailwindcss-themer")({
      themes: [
        {
          name: "light-theme",
          extend: {
            backgroundColor: { 1: "#dfdfdf", 2: "#fffae7" },
            textColor: { 1: "#1a1919", 2: "#373636" },
            colors: { brand: { 1: "#f0b68d", 2: "#e39d6b" } },
          },
        },
        {
          name: "dark-theme",
          extend: {
            backgroundColor: { 1: "#0a0b0a", 2: "#242426" },
            textColor: { 1: "#d4d4ea", 2: "#cccce3" },
            colors: { brand: { 1: "#9899ec", 2: "#abacdb" } },
          },
        },
      ],
    }),
  ],
};
