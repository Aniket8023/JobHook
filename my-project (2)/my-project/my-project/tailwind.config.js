/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'mine-shaft': {
    '50': '#ffffff',
    '100': '#ffffff',
    '200': '#ffffff',
    '300': '#ffffff',
    '400': '#ffffff',
    '500': '#6d6d6d',
    '600': '#5d5d5d',
    '700': '#4f4f4f',
    '800': '#454545',
    '900': '#3d3d3d',
    '950': '#2d2d2d',
},
'bright-sun': {
    '50': '#fffbeb',
    '100': '#fff3c6',
    '200': '#ffe588',
    '300': '#ffd149',
    '400': '#ffbd20',
    '500': '#f99b07',
    '600': '#dd7302',
    '700': '#b75006',
    '800': '#943c0c',
    '900': '#7a330d',
    '950': '#461902',
},


      }
    },
  },
  plugins: [],
}