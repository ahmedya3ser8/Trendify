/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}","./node_modules/flowbite/**/*.js"],
  theme: {
    extend: {
      colors: {
        "main-color": "#8B5E35",
        "second-color": "#9B7E5C",
        "text-color": "#090F41",
        "second-text": "#9D9DAA",
        "bg-color": "#F6F6F6",
        "card-color": "#FFFFFF",
        "review-color": "#FFC000",
        "error-color": "#D00439",
        "bg-footer": "#2E2E2E",
      },
      fontFamily: {
        "caveat": ["Caveat", "serif"]
      }
    },
    container: {
      center: true
    }
  },
  plugins: [
    require('flowbite/plugin')
  ],
  darkMode: 'selector'
}
