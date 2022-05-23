const colors = require('tailwindcss/colors')

module.exports = {
  mode: 'jit',
  content:[
    "./assets/**/*.css",
    "./assets/*.css",
    "./components/*.{vue,js}",
    "./components/**/*.{vue,js}",
    "./pages/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.js",
    "./*.{vue,js}",
  ],
  theme: {
    extend:{
      colors:{
        emerald: colors.emerald,
        fuchsia: colors.fuchsia,
        shade: colors.gray,
        gray:'#595454',
        orange:'#F8DDCB',
        violet:'#EEE7E7',
        pink:'#BE2BBB',
        white:'#FFFFFF'
      },
      minHeight:{
        3: '3rem',
        4: '4rem',
        5: '5rem',
        6: '6rem',
        7: '7rem',
        8: '8rem',
        9: '9rem',
        10: '10rem',
        15: '15rem',
        20: '20rem'
      },
      fill:(theme)=>({
        fuchsia: theme('colors.fuchsia.700'),
        green: theme('colors.green.800'),
        shade: theme('colors.shade'),
        gray: theme('colors.gray'),
        orange: theme('colors.orange'),
        violet: theme('colors.violet'),
        pink: theme('colors.pink'),
        white: theme('colors.white')
      })
    },
  },
  plugins: [],
}