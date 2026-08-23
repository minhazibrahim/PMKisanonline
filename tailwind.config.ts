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
        primary: {
          DEFAULT: "#1B5E20",
          dark: "#0D3B10",
          light: "#4C8C4A",
        },
        gold: "#FFB300",
        darkgray: "#212121",
      },
    },
  },
  plugins: [],
};
export default config;