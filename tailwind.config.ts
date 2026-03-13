import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Dark palette (hero, nav, footer, dark sections)
        dark: "#0A0A0A",
        "dark-light": "#111111",
        "dark-lighter": "#1A1A1A",
        // Light palette (main body)
        light: "#FFFFFF",
        "light-secondary": "#F7F7F7",
        "light-tertiary": "#EFEFEF",
        // Accent (light gold / prestige)
        accent: "#C5A55A",
        "accent-hover": "#B8963F",
        "accent-soft": "#F8F3E8",
        // Neutral
        silver: "#C0C0C0",
        "silver-dark": "#888888",
        navy: "#1A1A2E",
        "navy-light": "#25253d",
        // Text
        heading: "#0A0A0A",
        body: "#444444",
        muted: "#888888",
        faint: "#CCCCCC",
        // Borders
        border: "#E8E8E8",
        "border-dark": "#D0D0D0",
      },
      fontFamily: {
        display: ["var(--font-playfair)", "serif"],
        body: ["var(--font-dm-sans)", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "fade-in-up": "fadeInUp 0.6s ease-out forwards",
        "slide-in-left": "slideInLeft 0.6s ease-out forwards",
        "slide-in-right": "slideInRight 0.6s ease-out forwards",
        "scale-in": "scaleIn 0.5s ease-out forwards",
        "pulse-slow": "pulse 3s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideInLeft: {
          "0%": { opacity: "0", transform: "translateX(-30px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        slideInRight: {
          "0%": { opacity: "0", transform: "translateX(30px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
