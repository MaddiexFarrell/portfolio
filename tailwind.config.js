/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        // Clean grotesque sans throughout
        sans: [
          "Inter",
          "system-ui",
          "-apple-system",
          "sans-serif",
        ],
      },
      colors: {
        // Paper tones — driven by CSS variables so after-hours mode can flip
        // the whole palette with one class (see index.css).
        sand: {
          DEFAULT: "rgb(var(--c-sand) / <alpha-value>)",
          light: "rgb(var(--c-sand) / <alpha-value>)",
          soft: "rgb(var(--c-sand-soft) / <alpha-value>)",
          deep: "rgb(var(--c-sand-deep) / <alpha-value>)",
          border: "rgb(var(--c-sand-border) / <alpha-value>)",
        },
        // Deep espresso for dark sections
        espresso: {
          DEFAULT: "#1E1A16",
          soft: "#2A241F",
          muted: "#4A423A",
        },
        // Terracotta / clay accent
        clay: {
          DEFAULT: "#A5674C",
          soft: "#B98066",
          deep: "#8A5238",
        },
        // Marigold / amber accent (Home 2 — sampled from the hero lily)
        accent: {
          DEFAULT: "#EBB84B",
          soft: "#F5C95F",
          deep: "#E0A82E",
        },
        // Text on dark
        cream: {
          DEFAULT: "#EDE7DD",
          soft: "#C9C0B2",
          muted: "#938A7C",
        },
        // Ink tones for text — variable-driven like sand
        ink: {
          DEFAULT: "rgb(var(--c-ink) / <alpha-value>)",
          soft: "rgb(var(--c-ink-soft) / <alpha-value>)",
          muted: "rgb(var(--c-ink-muted) / <alpha-value>)",
        },
      },
      maxWidth: {
        content: "1180px",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        marquee: "marquee 38s linear infinite",
      },
    },
  },
  plugins: [],
};
