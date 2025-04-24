// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "#ffffff",
        foreground: "#0c0c0c",
        accent: "#3b82f6",
        muted: "#a1a1aa",
        border: "#1f1f1f",
        card: "#111111",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
