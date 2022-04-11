const defaultTheme = require('tailwindcss/defaultTheme');

function withOpacityValue(variable) {
  return ({ opacityValue }) => {
    if (opacityValue === undefined) {
      return `hsla(var(${variable}))`;
    }
    return `hsla(var(${variable}),${opacityValue})`;
  };
}

const config = {
  darkMode: 'class',

  content: ['./src/**/*.{html,js,svelte,ts}'],

  theme: {
    screens: {
      mobile: '375px',
      desktop: '1440px',
    },
    colors: {
      elements: withOpacityValue('--elements'),
      background: withOpacityValue('--background'),
      text: withOpacityValue('--text'),
      input: withOpacityValue('--input'),
    },
    extend: {
      fontFamily: {
        sans: ['Nunito Sans', ...defaultTheme.fontFamily.sans],
      },
    },
  },

  plugins: [require('@tailwindcss/forms')],
};

module.exports = config;
