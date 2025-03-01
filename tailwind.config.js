/** @type {import('tailwindcss').Config} */
export default {
  content: [  "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",],
    // darkMode: 'selector',
    theme: {
    extend: {
      colors: {
        greenBase: 'rgb(133, 164, 139)',
        greenDark: 'rgb(40, 58, 51)',
        greenTitle: 'rgb(122, 128, 50)',
        greyLight: 'rgb(218, 220, 216)',
        gold: 'rgb(115, 80, 0)',
        gold1: 'rgb(137, 100, 80)',
        bezchBase: 'rgb(219, 186, 167)',
        bezchBase1: 'rgb(234, 208, 188)',
        bezchBase2: 'rgb(238, 217, 192)',
        bezchBase3: 'rgb(251, 243, 241)',
        bezchDark: 'rgb(131, 107, 91)',
        headerDark: 'rgb(20, 27, 33)'
      }, 
      fontFamily: {
        nunito: ['Nunito', 'sans-serif'],
        corintia: ['Corinthia', 'sans-serif']
      },
    },
  },
  plugins: [],
 
}


