const { fonts, fontWeight } = require('./theme/fonts')
const { colors } = require('./theme/colors')
const { inkUnderline, inkStrikethrough } = require('./theme/ink')
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

      minWidth: (theme, { breakpoints }) => ({
        ...allFractions,
        ...breakpoints(theme('screens')),
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
        '2xs': ['0.625rem', { lineHeight: '0.9rem' }],
        xs: ['0.75rem', { lineHeight: '1rem' }],
        sm: ['0.875rem', { lineHeight: '1.25rem' }],
        base: ['1rem', { lineHeight: '1.5rem' }],
        lg: ['1.125rem', { lineHeight: '1.75rem' }],
        xl: ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
        '7xl': ['4.5rem', { lineHeight: '1' }],
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['8rem', { lineHeight: '1' }],
        yuge: ['min(25vw,25rem)', { lineHeight: '0.8' }],
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
        'u-ink-black': inkUnderline('#444'),
        'u-ink-red': inkUnderline(colors.red['800']),
        'u-ink-black-1': inkUnderline('#444', 1),
        'u-ink-red-1': inkUnderline(colors.red['800'], 1),
        'del-ink-black': inkStrikethrough(),
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

  purge: ['./pages/**/*.tsx', './components/**/*.tsx', './**/*.css'],
  plugins: [],
}
