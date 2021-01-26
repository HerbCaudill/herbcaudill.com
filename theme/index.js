const { colors } = require('./colors')
const { splat } = require('./splat')

const condensed = 'IBM Plex Sans Condensed'
const emoji = 'Segoe UI Emoji'
const mono = 'IBM Plex Mono'
const sans = 'IBM Plex Sans'
const serif = 'IBM Plex Serif'

const theme = {
  extend: {
    fontFamily: {
      mono: [mono, emoji, 'monospace'],
      sans: [sans, emoji, 'sans-serif'],
      condensed: [condensed, emoji, 'sans-serif'],
      serif: [serif, emoji, 'serif'],
    },
    zIndex: {},
    colors: {
      ...colors,
    },
    fontWeight: {
      thin: 100,
      extralight: 200,
      light: 300,
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    backgroundImage: {
      // splat: splat('red'),
      splat: 'url(/images/splat/splat.2.svg)',
    },
    backgroundSize: {
      underline: '100% 4px',
    },

    keyframes: {
      wiggle: {
        '0%, 100%': { transform: 'rotate(-3deg)' },
        '50%': { transform: 'rotate(3deg)' },
      },
    },
    animation: {
      wiggle: 'wiggle 1s ease-in-out infinite',
      'spin-fast': 'spin 500ms linear infinite',
    },
  },
}

exports.theme = theme
