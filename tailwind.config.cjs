/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {},
    colors: {
      raisinBlack: '#241f25',
      lightGray: '#d5d4d5',
      darkLiver: '#514e52',
      silverFoil: '#afadb0',
      lavenderGray: '#c3c3c9',
      onyx: '#3c373d',
      crayola: '#7a6bcf',
      lightCrayola: '#978bd2',
      darkCrayola: '#695fa3',
      green: '#7bb64f',
      lightGreen: '#80bc51',
      darkGreen: '#6d994a',
    }
  },
  plugins: [require('tailwindcss-global-dark')],
  darkMode: 'class'
}
