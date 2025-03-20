/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Tailwind sẽ quét các file JSX/TSX trong src
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};