import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#F8FAF7",
        foreground: "#1E2A22",
        primary: {
          DEFAULT: "#2F6B47",
          hover: "#265A3B",
          dark: "#1E472F",
          light: "#3E8A5C",
        },
        mint: {
          DEFAULT: "#E6F0E8",
          light: "#F0F6F2",
          dark: "#CFE3D3",
        },
        footer: "#17261E",
        ink: {
          DEFAULT: "#1E2A22",
          light: "#2B3C31",
          deep: "#0F1612",
        },
        muted: {
          DEFAULT: "#5B6B60",
          light: "#829488",
          dark: "#445048",
        },
        popular: {
          DEFAULT: "#FBEFC7",
          text: "#78350F",
        },
      },
      fontFamily: {
        lora: ["var(--font-lora)", "Georgia", "serif"],
        sans: ["var(--font-dm-sans)", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
      },
      borderRadius: {
        'xl': '16px',
        '2xl': '20px',
        '3xl': '24px',
        '4xl': '28px',
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(30, 42, 34, 0.05), 0 2px 6px -1px rgba(30, 42, 34, 0.03)',
        'lift': '0 12px 30px -4px rgba(47, 107, 71, 0.12), 0 4px 12px -2px rgba(30, 42, 34, 0.04)',
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.07)',
      },
      animation: {
        'float-slow': 'floatSlow 6s ease-in-out infinite',
        'sway': 'sway 4s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 2.5s ease-in-out infinite',
      },
      keyframes: {
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        sway: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        pulseSubtle: {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.05)', opacity: '0.92' },
        },
      },
    },
  },
  plugins: [],
};

export default config;

