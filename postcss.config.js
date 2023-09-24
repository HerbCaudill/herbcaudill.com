module.exports = {
  plugins: {
    'tailwindcss/nesting': {},
    tailwindcss: {},
    'postcss-preset-env': {
      stage: 1,
      features: {
        'nesting-rules': false,
      },
    },
  },
}
