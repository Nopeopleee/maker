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
        primary: "var(--primary)",
      },
      fontFamily: {
        sans: ["Roboto", "sans-serif"], // 設置 Roboto 為 sans 字型
      },
    },
  },
  plugins: [],
};
export default config;
