import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Primary — a confident cobalt/azure for actions and links.
        brand: {
          50: "#eef3ff",
          100: "#dfe8ff",
          200: "#c4d2ff",
          300: "#9fb4ff",
          400: "#7089fb",
          500: "#4c63f0",
          600: "#3547db", // primary action
          700: "#2b39b4",
          800: "#27338f",
          900: "#243072",
        },
        // Structure & text — deep navy neutrals (cool, professional).
        ink: {
          50: "#f4f6fa",
          100: "#e6eaf2",
          200: "#c9d2e2",
          300: "#a2b0c9",
          400: "#6c7d9c",
          500: "#48587a",
          600: "#33415c",
          700: "#22304b",
          800: "#152139",
          900: "#0b1f3a", // deep navy — dark surfaces
        },
        // Featured / premium placements.
        accent: {
          50: "#fdf7e7",
          100: "#faedc4",
          200: "#f4d987",
          300: "#eec152",
          400: "#e3a81f",
          500: "#c68a0c",
          600: "#a06d09",
        },
        // Cool paper background.
        paper: "#f5f7fb",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "Roboto", "sans-serif"],
        display: ["var(--font-display)", "var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        // "mono" is intentionally aliased to the sans stack: labels use Inter,
        // not a monospace face (kept as a class alias for existing markup).
        mono: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(11, 31, 58, 0.04), 0 4px 16px rgba(11, 31, 58, 0.05)",
        lift: "0 10px 30px -12px rgba(11, 31, 58, 0.18)",
      },
      borderRadius: {
        xl: "0.875rem",
        "2xl": "1.125rem",
      },
      backgroundImage: {
        // Faint meridian / coordinate grid used behind the hero.
        meridian:
          "linear-gradient(rgba(11,31,58,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(11,31,58,0.045) 1px, transparent 1px)",
      },
    },
  },
  plugins: [],
};

export default config;
