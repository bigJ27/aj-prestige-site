import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.25rem",
        sm: "1.5rem",
        lg: "2rem",
      },
      screens: {
        "2xl": "1200px",
      },
    },
    extend: {
      // Palette "bord de mer au couchant"
      colors: {
        sand: {
          DEFAULT: "#FAFAFA", // blanc cassé — fond principal
          deep: "#F4EAD4", // sable / beige chaud — sections et cartes
        },
        night: "#1B4965", // bleu océan — titres, nav, texte fort
        ink: "#1B4965", // texte courant (bleu océan, hiérarchie par la graisse)
        muted: "#6C584C", // bois flotté — texte secondaire, bordures fines
        terracotta: "#E07A5F", // orange crépuscule — CTA, accents
        sunset: "#C4593F", // orange crépuscule foncé — hovers de CTA
        coral: "#EFB7A2", // teinte claire de l'orange — filets, détails
      },
      fontFamily: {
        serif: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-body)", "Georgia", "serif"],
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.9s cubic-bezier(0.22, 1, 0.36, 1) both",
      },
    },
  },
  plugins: [],
};

export default config;
