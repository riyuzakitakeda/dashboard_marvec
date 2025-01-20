/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/scenes/**/*.{js,jsx,ts,tsx}", "./index.html"],
  theme: {
    extend: {
      screens: {'8': '1242px','9': '1400px', '10': '1555px', '12': '1872px'}
    },
  },
  plugins: [],
}

