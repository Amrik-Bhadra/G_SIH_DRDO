/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'custom-gradient': 'linear-gradient(to right, #3C8CE7, #00EAFF)',
        'black-gradient':'linear-gradient(to right,#29323C,#485563)',
      },
    },
  },
  plugins: [],
}