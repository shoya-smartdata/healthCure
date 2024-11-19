/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",   // Ensure Tailwind processes your HTML files
    "./src/**/*.{js,jsx,ts,tsx}",  // Process JSX/TSX files in your src folder
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
