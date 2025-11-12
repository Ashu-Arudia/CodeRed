import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        reel: {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(-50%)" },
        },
        land: {
          "0%": { opacity: "0", transform: "translateY(-100px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "loading-bar": {
          "0%": { width: "0%", "background-color": "#DC2626" },
          "50%": { width: "70%", "background-color": "#DC2626" },
          "100%": { width: "100%", "background-color": "#DC2626" },
        },
      },
      animation: {
        reel: "reel 1.5s linear infinite",
        land: "land 0.5s ease-out forwards",
        "loading-bar": "loading-bar 10s linear forwards",
      },
    },
  },
  plugins: [],
};
export default config;
