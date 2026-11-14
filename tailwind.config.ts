import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "#09090b",
        surface: {
          DEFAULT: "#111115",
          elevated: "#18181f",
          card: "#131318",
        },
        border: {
          subtle: "rgba(255, 255, 255, 0.08)",
          medium: "rgba(255, 255, 255, 0.14)",
          highlight: "rgba(255, 255, 255, 0.22)",
        },
        accent: {
          DEFAULT: "#10b981",
          hover: "#059669",
          dim: "rgba(16, 185, 129, 0.12)",
          glow: "rgba(16, 185, 129, 0.25)",
          border: "rgba(16, 185, 129, 0.35)",
        },
        text: {
          primary: "#f4f4f6",
          secondary: "#a1a1aa",
          muted: "#71717a",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      boxShadow: {
        bezel: "inset 0 1px 0 rgba(255, 255, 255, 0.08)",
        "bezel-elevated": "inset 0 1px 0 rgba(255, 255, 255, 0.14), 0 12px 36px -4px rgba(0, 0, 0, 0.65)",
      },
      borderRadius: {
        outer: "1.5rem",
        inner: "1.125rem",
      },
    },
  },
  plugins: [],
};

export default config;

