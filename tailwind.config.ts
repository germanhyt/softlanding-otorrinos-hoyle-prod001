import typography from "@tailwindcss/typography";
import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "1.2rem",
        md: "1.5rem",
        lg: "2rem",
        xl: "3rem",
        "2xl": "6rem",
        "3xl": "6rem",
        "4xl": "6rem",
      },
      screens: {
        xs: "375px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
        "3xl": "1536px",
        "4xl": "1536px",
      },
    },
    extend: {
      screens: {
        xs: "375px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
        "3xl": "1920px",
        "4xl": "2560px",
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ['"Roboto Serif"', "Georgia", "ui-serif", "serif"],
        dm: ['"DM Sans"', "ui-sans-serif", "system-ui", "sans-serif"],
      },
      colors: {
        brand: {
          navy: {
            DEFAULT: "#0D1146",
            deep: "#141246",
            muted: "#2E2A6E",
          },
          blue: {
            DEFAULT: "#3A5AFE",
            hover: "#2F4DE6",
            soft: "#E8EDFF",
          },
          footer: "#1A3673",
          lavender: "#EDEAF8",
          glass: "rgba(255, 255, 255, 0.18)",
          dark: {
            DEFAULT: "#0D1146",
          },
          neutral: {
            white: "#FFFFFF",
            mist: "#F9F8F6",
            fog: "#F7F6FB",
            black: "#050709",
          },
        },
        primary: {
          DEFAULT: "#3A5AFE",
          dark: "#2F4DE6",
        },
        text: {
          DEFAULT: "#0D1146",
          muted: "#4B5563",
          soft: "#2A2F5A",
        },
        background: {
          DEFAULT: "#FFFFFF",
          muted: "#F9F8F6",
          dark: "#0D1146",
        },
      },
      backgroundImage: {
        "gradient-primary":
          "linear-gradient(135deg, #2E2A6E 0%, #3A5AFE 100%)",
      },
    },
  },
  plugins: [typography],
} satisfies Config;
