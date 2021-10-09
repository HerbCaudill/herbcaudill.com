module.exports = {
  plugins: {
    tailwindcss: {},
    'postcss-preset-env': {
      stage: 1,
      features: {
        'nesting-rules': true,
      },
    },
  },
}
