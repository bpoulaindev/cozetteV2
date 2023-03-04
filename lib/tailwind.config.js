const { Palette } = require('./palette');
module.exports = {
  theme: {
    screens: {
      sm: '380px',
      md: '420px',
      lg: '680px',
      tablet: '1024px'
    },
    extend: {
      colors: Palette,
      fontSize: {
        '2.5xl': '1.7rem'
      }
    }
  }
};
