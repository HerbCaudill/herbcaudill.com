const { fonts, fontWeight } = require('./theme/fonts')
const { colors } = require('./theme/colors')
const { splat } = require('./theme/splat')

const { condensed, emoji, mono, sans, serif } = fonts

module.exports = {
  purge: ['./pages/**/*.tsx', './components/**/*.tsx'],

  plugins: [require('@savvywombat/tailwindcss-grid-areas')],

  theme: {
    extend: {
      fontFamily: {
        mono: [mono, emoji, 'monospace'],
        sans: [sans, emoji, 'sans-serif'],
        condensed: [condensed, emoji, 'sans-serif'],
        serif: [serif, emoji, 'serif'],
      },
      colors,
      fontWeight,

      // hand-drawn underline

      backgroundImage: {
        splat: splat('red'),
      },
      backgroundSize: {
        underline: '100% 4px',
      },

      // animation

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

      // grids

      gridTemplateColumns: {
        sm: '100%',
        md: '100px 1fr',
        posts: '100px .4fr .6fr 100px',
      },
      gridTemplateRows: {
        md: '150px minmax(950px, 1fr) 70px',
      },
      gridTemplateAreas: {
        sm: ['logo', 'header', 'nav', 'content', 'footer'],
        md: ['logo header', 'nav  content', '.    footer'],
        posts: ['image date title description tags'],
      },
    },
  },

  variants: {
    opacity: ({ after }) => after(['group-hover', 'group-focus']),
    textColor: ({ after }) => after(['group-hover', 'group-focus']),
    boxShadow: ({ after }) => after(['group-hover', 'group-focus']),
    backgroundImage: ({ after }) =>
      after(['group-hover', 'hover', 'group-focus']),
  },

  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
}
