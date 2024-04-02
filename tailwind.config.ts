import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "media",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  // theme: {
  //   colors: {
  //     "dark-1": "#3E3F5B",
  //     "dark-2": "#24273A",
  //     "dark-3": "#111827",
  //     green: "#3EB167",
  //     blue: "#5683D4",
  //     red: "#DE5555",
  //     black: "#000000",
  //     primary: "#A6A1A1",
  //     secondary: "#4D4D4D",
  //     white: "#FFFFFF",
  //   },
  //   extend: {
  //     backgroundImage: {
  //       "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
  //       "gradient-conic":
  //         "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
  //     },
  //   },
  // },
  plugins: [],
};
export default config;