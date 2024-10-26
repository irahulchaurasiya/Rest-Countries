/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        nunito: ['Nunito Sans', 'sans-serif'],
      },
      colors: {
        darkBlueDME: 'hsl(209, 23%, 22%)',
        veryDarkBlueDMB: 'hsl(207, 26%, 17%)',
        veryDarkBlueLMT: 'hsl(200, 15%, 8%)',
        darkGrayLMI: 'hsl(0, 0%, 52%)',
        veryLightGrayLMB: 'hsl(0, 0%, 98%)',
        whiteDMTLME: 'hsl(0, 0%, 100%)',
      },
    },
  },
  plugins: [],
}