import type { Config } from "tailwindcss";

const config: Config = {
  content: [
"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
      '3xl': '2000px'
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontSize: {
        h1: [
          "40px",
          {
            lineHeight: "48px",
          },
        ],
        h2: [
          "36px",
          {
            lineHeight: "44px",
          },
        ],
        h3: [
          "32px",
          {
            lineHeight: "40px",
          },
        ],
        h4: [
          "24px",
          {
            lineHeight: "32px",
          },
        ],
        h5: [
          "20px",
          {
            lineHeight: "28px",
          },
        ],
        h6: [
          "18px",
          {
            lineHeight: "26px",
          },
        ],
        p: [
          "16px",
          {
            lineHeight: "24px",
          },
        ],
        label: [
          "14px",
          {
            lineHeight: "22px",
          },
        ],
        "label-s": [
          "13px",
          {
            lineHeight: "21px",
          },
        ],
        footnote: [
          "12px",
          {
            lineHeight: "20px",
          },
        ],
      },
      fontFamily: {
        inter: ["Inter", "sans-serif", ],
      },
      fontWeight: {
        "semi-regular": "400",
        "regular": "500",
        "semi-bold": "600",
        "bold": "700",
        "bolder": "800",

      },

      colors: {
        "primary-color": "#13113B",
        "secondary-text": "#D9D9D9",
        "background-default": "#FAFAFA",
        "background-paper": "#FFFFFF",
        "text-primary": "#18181F",
        "text-secondary": "#6B7280",
        "secondary-400": "#FAB446",
        "secondary-500": "#FF7A33",
        "blue-800": "#00233E",
        "blue-700": "#014273",
        "blue-600": "#01589A",
        "blue-500": "#4182B3",
        "blue-400": "#679BC2",
        "blue-300": "#99BCD7",
        "blue-200": "#CCDEEB",
        "blue-100": "#E6EFF5",
        "sea-blue-100": "#EAF7FD",
        "sea-blue-200": "#D4EEF9",
        "sea-blue-300": "#A9DEF3",      
        "sea-blue-400": "#7ECDEE",
        "sea-blue-500": "#5EC1E9",
        "sea-blue-600": "#28ACE2",
        "sea-blue-700": "#1E81A9",
        "sea-blue-800": "#186788",
        "green-100": "#EDF7E8",
        "green-200": "#DBEED1",
        "green-300": "#B6DDA3",
        "green-400": "#92CC75",
        "green-500": "#77C053",
        "green-600": "#49AA19",
        "green-700": "#378013",
        "green-800": "#2C660F",
        
      },
    },

  },
  plugins: [],
};
export default config;
