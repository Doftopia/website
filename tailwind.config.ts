import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "media",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      "dark-1": "#3E3F5B",
      "dark-2": "#24273A",
      "dark-3": "#111827",
      "light-1": "#cfc4ab",
      "light-2": "#a7a18d",
      "light-3": "#796f5a",
      green: "#3EB167",
      "light-green": "#a7c72b",
      orange: "#EC8E02",
      blue: "#5683D4",
      "dark-red": "#ba3232",
      "light-red": "#8f0e0e",
      black: "#000000",
      primary: "#A6A1A1",
      secondary: "#4D4D4D",
      white: "#FFFFFF",
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: { Concert_One: ["Concert One", "sans-serif"] },
    },
  },
  plugins: [],
};
export default config;
