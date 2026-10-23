import type { Config } from "tailwindcss";

/**
 * Design système AJ Prestige — langage Apple (sobriété, verre, grandes typos)
 * avec la palette coucher de soleil de la marque. Les couleurs vivent aussi
 * en variables CSS dans app/globals.css (source unique pour les composants).
 */
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        sand: {
          DEFAULT: "#FDF6EE",
          deep: "#FAF0E4",
        },
        sunset: "#E8734A",
        coral: "#F2A65A",
        terracotta: "#B84A2B",
        rose: "#D45463",
        night: "#1E3A5F",
        abyss: "#0B1626",
        label: "#1D1D1F",
        "label-2": "#6E6E73",
      },
      fontFamily: {
        sans: [
          "var(--font-inter)",
          "-apple-system",
          "BlinkMacSystemFont",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
};

export default config;
