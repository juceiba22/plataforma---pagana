import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background, #131316)",
        surface: "var(--surface, #131316)",
        "surface-obsidian": "#0b0b0e",
        "surface-coal": "#141419",
        "surface-charcoal": "#1d1c24",
        "surface-raised": "#25242e",
        "surface-dim": "#131316",
        "surface-bright": "#39393c",
        "surface-container-lowest": "#0e0e11",
        "surface-container-low": "#1b1b1e",
        "surface-container": "#1f1f22",
        "surface-container-high": "#2a2a2d",
        "surface-container-highest": "#353438",
        "surface-variant": "#353438",
        "on-surface": "var(--on-surface, #e5e1e6)",
        "on-surface-variant": "#dfbfbc",
        "inverse-surface": "#e5e1e6",
        "inverse-on-surface": "#303033",
        outline: "#a78a88",
        "outline-variant": "#58413f",
        "surface-tint": "#ffb3ae",

        // Primary crimson wine tones
        primary: "var(--primary, #ffb3ae)",
        "primary-container": "var(--primary-container, #9e2a2b)",
        "on-primary": "var(--on-primary, #68000c)",
        "on-primary-container": "var(--on-primary-container, #ffb9b4)",
        "primary-fixed": "#ffdad7",
        "primary-fixed-dim": "#ffb3ae",
        "on-primary-fixed": "#410004",
        "on-primary-fixed-variant": "#8a1b1e",
        "crimson-wine": "#9e2a2b",
        "crimson-glow": "#c1383a",

        // Secondary gold/amber tones
        secondary: "var(--secondary, #fabc4d)",
        "secondary-container": "#bd8718",
        "on-secondary": "#432c00",
        "on-secondary-container": "#3a2600",
        "secondary-fixed": "#ffdead",
        "secondary-fixed-dim": "#fabc4d",
        "amber-mystic": "#e5a93c",
        "amber-light": "#f4c46b",

        // Tertiary & Bone tones
        tertiary: "#efbf67",
        "tertiary-container": "#704f00",
        "on-tertiary": "#412d00",
        "on-tertiary-container": "#f3c36a",
        "tertiary-fixed": "#ffdea7",
        "tertiary-fixed-dim": "#efbf67",
        "bone-white": "#f7f4eb",
        "bone-dim": "#c8c4b8",
        "bone-muted": "#8a877e",

        // Error tones
        error: "#ffb4ab",
        "error-container": "#93000a",
        "on-error": "#690005",
        "on-error-container": "#ffdad6",
      },
      fontFamily: {
        cinzel: ["var(--font-cinzel)", '"Cinzel Decorative"', "serif"],
        epilogue: ["var(--font-epilogue)", '"Epilogue"', "sans-serif"],
        jakarta: ["var(--font-jakarta)", '"Plus Jakarta Sans"', "sans-serif"],
      },
      spacing: {
        "space-2xs": "0.25rem",
        "space-xs": "0.5rem",
        "space-sm": "0.75rem",
        "space-md": "1rem",
        "space-lg": "1.5rem",
        "space-xl": "2rem",
        "space-2xl": "3rem",
        "space-3xl": "4.5rem",
        "space-4xl": "6rem",
        "gutter-mobile": "1rem",
        "gutter-desktop": "2rem",
        "container-max": "78rem",
      },
      maxWidth: {
        "container-max": "78rem",
      },
      boxShadow: {
        "ritual-glow": "0 0 24px rgba(158, 42, 43, 0.5)",
        "gold-glow": "0 0 20px rgba(250, 188, 77, 0.35)",
        "altar-rim": "inset 0 1px 0 rgba(244, 196, 107, 0.3), 0 12px 32px -4px rgba(0, 0, 0, 0.8), 0 0 24px -2px rgba(158, 42, 43, 0.35)",
        "modal-double": "0 0 0 1px rgba(229, 169, 60, 0.25), 0 24px 48px -8px rgba(0, 0, 0, 0.95)",
      },
      backgroundImage: {
        "radial-spotlight": "radial-gradient(ellipse at top, rgba(158,42,43,0.22) 0%, transparent 70%)",
        "gold-spotlight": "radial-gradient(ellipse at center, rgba(229,169,60,0.15) 0%, transparent 65%)",
      },
    },
  },
  plugins: [],
};

export default config;
