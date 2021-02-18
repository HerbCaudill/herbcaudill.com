const { spacing } = require('tailwindcss/defaultTheme')

const columnFractions = (span, cols) => {
  const result = {}
  for (let i = 1; i <= cols; i++) {
    const value = `${(100 * i) / span}%`
    const offsetValue = `${value} + ${halfGap}`

    result[`${i}/${span}`] = `calc(${offsetValue})`
  }
  return result
}

const gap = spacing['5']
const halfGap = `(${gap} / 2)`

const allFractions = {
  ...columnFractions(6, 12),
  ...columnFractions(7, 12),
  ...columnFractions(9, 12),
}

module.exports = {
  columnFractions,
  gap,
  halfGap,
  allFractions,
}
