import type { Config } from "tailwindcss";

/**
 * Tailwind ne sert ici qu'aux petits ajustements dans les pages (marges,
 * grilles ponctuelles). Les couleurs et les composants vivent dans
 * app/globals.css : c'est la source unique du design.
 */
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "var(--paper)",
        linen: "var(--linen)",
        sand: "var(--sand)",
        peach: "var(--peach)",
        ink: "var(--ink)",
        "ink-2": "var(--ink-2)",
        "ink-3": "var(--ink-3)",
        terra: "var(--terra)",
        "terra-deep": "var(--terra-deep)",
        pine: "var(--pine)",
      },
      fontFamily: {
        serif: ["var(--serif)"],
        sans: ["var(--sans)"],
      },
    },
  },
  plugins: [],
};

export default config;
