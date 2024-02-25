/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        poppings: ['Poppins', 'sans-serif'],
      },
      colors: {
        primaryBlue: '#0066ff',
        primaryBlueHover: '#0047b3',
        primaryGreen: '#009900',
        primaryGreenHover: '#006600',
      },
    },
  },
  plugins: [],
};
