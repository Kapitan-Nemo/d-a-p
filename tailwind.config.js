const defaultTheme = require('tailwindcss/defaultTheme')

export default {
  theme: {
    extend: {
      fontFamily: {
        sans: ['Courier New', ...defaultTheme.fontFamily.sans],
      },
      spacing: {
        1: '6px',
        2: '12px',
        3: '16px',
        4: '24px',
        5: '32px',
        6: '48px',
      },
    },
  },
}
