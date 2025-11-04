import type { Config } from "tailwindcss";

const config: Config = {
  // Add paths to all of your template files
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    // If you're using the 'app' directory:
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        // --- This is the "slot machine" reel animation ---
        reel: {
          "0%": { transform: "translateY(0)" },
          // This moves the reel up by 50% (the height of one full list)
          "100%": { transform: "translateY(-50%)" },
        },
        // --- This is the "landing" animation for the found opponent ---
        land: {
          "0%": { opacity: "0", transform: "translateY(-100px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        // --- This is for the progress bar ---
        "loading-bar": {
          "0%": { width: "0%", "background-color": "#DC2626" }, // cyan-500
          "50%": { width: "70%", "background-color": "#DC2626" }, // cyan-300
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
