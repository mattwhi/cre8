/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./posts/**/*.{md,mdx}", // markdown content if using MDX or blog markdown
  ],
  darkMode: "class", // ✅ required for theme toggle
  theme: {
    extend: {
      animation: {
        fade: "fadeIn 0.3s ease-in-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0, transform: "translateY(10px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      },
      boxShadow: {
        glow: "0 0 10px rgba(255, 255, 255, 0.6)",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
