import type { Config } from "tailwindcss";

export default {
  content: [
    "./ocas/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
} satisfies Config;
module.exports = {
  theme: {
    extend: {
      animation: {
        border: 'borderGlow 3s infinite',
      },
      keyframes: {
        borderGlow: {
          '0%': { borderColor: '#ff0000' },
          '33%': { borderColor: '#00ff00' },
          '66%': { borderColor: '#0000ff' },
          '100%': { borderColor: '#ff0000' },
        },
      },
    },
  },
}
