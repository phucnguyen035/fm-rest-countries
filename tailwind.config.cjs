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
      blue: {
        default: withOpacityValue('--blue'),
        bg: withOpacityValue('--blue-dark'),
        text: withOpacityValue('--blue-darker'),
      },
      gray: {
        input: withOpacityValue('--gray'),
        background: withOpacityValue('--gray-light'),
      },
      white: withOpacityValue('--white'),
    },
    extend: {
      fontFamily: {
        sans: ['Nunito', ...defaultTheme.fontFamily.sans],
      },
    },
  },

  plugins: [],
};

module.exports = config;
