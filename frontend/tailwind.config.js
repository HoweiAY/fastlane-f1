/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "f1-r": ["f1-r", "sans-serif"],
        "f1-b": ["f1-b", "sans-serif"],
        "f1-bl": ["f1-bl", "sans-serif"],
        "f1-w": ["f1-w", "sans-serif"],
      },
    },
  },
  plugins: [],
}

