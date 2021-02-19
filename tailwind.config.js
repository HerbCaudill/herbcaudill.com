const { fonts, fontWeight } = require('./theme/fonts')
const { colors } = require('./theme/colors')
const { splat } = require('./theme/splat')
const { spacing } = require('tailwindcss/defaultTheme')
const { allFractions, gap, halfGap } = require('./theme/columnFractions')

const { condensed, emoji, mono, sans, serif, sansText, serifText } = fonts

module.exports = {
  theme: {
    extend: {
      screens: {
        md: '500px',
        lg: '1000px',
        xl: '1200px',
      },

      spacing: (theme, { negative }) => ({
        ...allFractions,
        ...negative(allFractions),
        G: gap,
      }),

      width: (theme, { negative }) => ({
        '6/4': `calc(${(100 * 6) / 4}% + ${halfGap})`,
        '3/2': `calc(${(100 * 3) / 2}% + ${halfGap})`,
        ...allFractions,
        ...negative(allFractions),
        G: gap,
      }),

      colors,
      fontWeight,

      fontFamily: {
        mono: [mono, emoji, 'monospace'],
        sans: [sans, emoji, 'sans-serif'],
        condensed: [condensed, emoji, 'sans-serif'],
        serif: [serif, emoji, 'serif'],
      },

      fontSize: {
        '2xs': '.65rem',
        xs: '.75rem',
        sm: '.95rem',
      },

      padding: {
        '100%': '100%',
        '50%': '50%',
      },

      listStyleType: {
        square: 'square',
      },

      letterSpacing: {
        extrawide: '0.2em',
      },

      borderWidth: {
        '05': '0.01rem',
        10: '10px',
        12: '12px',
        14: '14px',
        16: '16px',
      },

      backgroundImage: {
        // hand-drawn underline
        'splat-black': splat('#444'),
        'splat-red': splat(colors.red['700']),
      },

      backgroundSize: {
        // hand-drawn underline
        underline: '100% min(5px, .3em)',
      },

      // animation

      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-5deg)' },
          '0%, 100%': { transform: 'rotate(-6deg)' },
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
        // posts index table
        posts: '100px .4fr .6fr 100px',
      },

      gridTemplateAreas: {
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

  purge: ['./pages/**/*.tsx', './components/**/*.tsx'],
  plugins: [],
}
