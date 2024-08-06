import type { Config } from "tailwindcss";
const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      '3xl': { max: '1680px' },
      '3xl+': { min: '1681px' },
      '2.5xl': { max: '1600px' },
      '2xl': { max: '1440px' },
      '1xl': { max: '1366px' },
      xl: { max: '1279px' },
      lg: { max: '1024px' },
      'lg+': { min: '1025px' },
      md: { max: '768px' },
      'md+': { min: '769px' },
      sm: { max: '850px' },
      'sm+': { min: '851px' },
      xs: { max: '425px' },

      // Tailwind defaults (renamed for migration).
      tsm: { min: '640px' },
      tmd: { min: '768px' },
      tlg: { min: '1024px' },
      txl: { min: '1280px' },
      t2xl: { min: '1536px' },
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;