// FILE: tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/styles/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "dark-bg": "#020617",
        "dark-card": "rgba(15, 23, 42, 0.7)",
        "dark-border": "rgba(148, 163, 184, 0.2)",
        "dark-text-secondary": "#94a3b8",
        "brand-primary": "#6366f1",
        "brand-secondary": "#4f46e5",
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
      },
      backdropBlur: {
        xl: "20px",
      },

      // 👇 added this
      animation: {
        "gradient-move": "gradient-move 3s ease infinite",
      },
      keyframes: {
        "gradient-move": {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
