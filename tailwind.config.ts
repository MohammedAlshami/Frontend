import { nextui } from "@nextui-org/theme";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@tailus/themer/dist/components/**/*.{js,ts}",
    "node_modules/preline/dist/*.js",
    "./node_modules/@nextui-org/theme/dist/components/(dropdown|skeleton|popover|menu|divider|button|ripple|spinner).js"
  ],
  theme: {
    extend: {
      colors: {
        bg: "#FCFCFD",
        icon: "#6B7280",
        accent: "#FFFFFFFF",
        textLight: "#FFFFFFFF",
        textDark: "#171717",
      },
      keyframes: {
        "logo-cloud": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(calc(-100% - 4rem))" },
        },
      },
      animation: {
        "logo-cloud": "logo-cloud 30s linear infinite",
      },
    },
  },
  plugins: [require("preline/plugin"), require("daisyui"), nextui()],
};

export default config;
