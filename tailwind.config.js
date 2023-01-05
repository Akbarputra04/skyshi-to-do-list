/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#16ABF8',
        secondary: '#F4F4F4',
        danger: '#ED4C5C',
        orange: '#F8A541',
        success: '#00A790',
        info: '#428BC1',
        purple: '#8942C1',
      },
    },
  },
  plugins: [],
}
