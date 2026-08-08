import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Accent — Notion's soft blue. Used for links, active states, subtle
        // highlights and the primary CTA. Never loud.
        brand: {
          50: "#eaf4fb",
          100: "#d3e5ef", // Notion light-blue highlight
          200: "#aacce8",
          300: "#7fb2de",
          400: "#4f97d6",
          500: "#2383e2", // Notion blue
          600: "#1a6fc4",
          700: "#175aa0",
          800: "#15497f",
          900: "#123a63",
        },
        // Structure & text — Notion's warm near-black grays.
        ink: {
          50: "#f7f6f3",
          100: "#e9e9e7", // Notion hairline border
          200: "#e0dfdb",
          300: "#c9c8c3",
          400: "#9b9a97", // muted text
          500: "#787774", // secondary text
          600: "#605e59",
          700: "#4a4842",
          800: "#37352f", // Notion body/ink
          900: "#2b2a26", // headings
        },
        // Featured / premium placements — same soft blue (no gold).
        accent: {
          50: "#eaf4fb",
          100: "#d3e5ef",
          200: "#aacce8",
          300: "#7fb2de",
          400: "#4f97d6",
          500: "#2383e2",
          600: "#1a6fc4",
        },
        // Pure white page (Notion light).
        paper: "#ffffff",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "Roboto", "sans-serif"],
        // Headings use the same clean sans (Notion style) — just heavier weight.
        display: ["var(--font-sans)", "ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "sans-serif"],
        mono: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        // Notion barely uses shadows — soft, low elevation.
        card: "0 1px 2px rgba(15, 15, 15, 0.04), 0 1px 3px rgba(15, 15, 15, 0.03)",
        lift: "0 6px 18px -8px rgba(15, 15, 15, 0.16)",
      },
      borderRadius: {
        xl: "0.75rem",
        "2xl": "0.875rem",
      },
      backgroundImage: {
        meridian: "none",
      },
    },
  },
  plugins: [],
};

export default config;
