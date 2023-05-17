const defaultTheme = require('tailwindcss/defaultTheme')

export default {
  theme: {
    container: {
      padding: {
        DEFAULT: '1rem',
      },
    },
    extend: {
      fontFamily: {
        sans: ['Courier New', ...defaultTheme.fontFamily.sans],
      },
      spacing: {
        1: '5px',
        2: '10px',
        3: '15px',
        4: '20px',
        5: '25px',
        6: '30px',
        7: '35px',
        8: '40px',
        9: '45px',
        10: '50px',
        11: '55px',
        12: '60px',
        13: '65px',
        14: '70px',
        15: '75px',
        16: '80px',
        17: '85px',
        18: '90px',
        19: '95px',
        20: '100px',
      },
    },
  },
}
