const inlineSvg = svg => {
  svg = svg
    .replace(/\s+/gm, ' ') // collapse space
    .replace(/#/g, '%23') // escape # sign
    .trim()
  return `url("data:image/svg+xml;utf8,${svg}")`
}

exports.inlineSvg = inlineSvg
