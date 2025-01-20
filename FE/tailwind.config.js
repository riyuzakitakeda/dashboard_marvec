/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/scenes/**/*.{js,jsx,ts,tsx}", "./index.html"],
  theme: {
    extend: {
      screens: {'bigphone': '400px', 'bigscreen': '1928px'}
    },
  },
  plugins: [],
}

