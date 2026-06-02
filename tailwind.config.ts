import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#172126",
        mist: "#f5f8f7",
        clinical: "#0f766e",
        pulse: "#e2495d",
        graphite: "#647176",
        ion: "#2f6fed",
        amber: "#a26814"
      },
      boxShadow: {
        glass: "0 24px 80px rgba(32, 64, 72, 0.12)",
        hairline: "0 0 0 1px rgba(21, 47, 53, 0.08)"
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"]
      }
    }
  },
  plugins: []
};

export default config;
