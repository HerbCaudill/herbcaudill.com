import marked from 'marked'

const renderer = new marked.Renderer({
  gfm: true, // GitHub flavored markdownn
  sanitize: false, // No need since I control the markdown being processed
  smartLists: true,
  smartypants: true, // smart quotes
})

const handleDefList = (text: string) => {
  // Label
  // : Description
  var dlRegex = /(^|\n+)(\S.+)\n:(\s+)(\S.+)/

  var dl =
    '\n\n' +
    '<dl>' +
    '<dt><p>$2</p></dt>' +
    '<dd><p>$4</p></dd>' +
    '</dl>' +
    '\n\n'

  if (text.match(dlRegex)) {
    text = text.replace(dlRegex, dl)
    return text
  } else {
    return `<p>${text}</p>
`
  }
}
renderer.paragraph = handleDefList

marked.setOptions({ renderer })

export const markdownToHtml = (input: string) => (input ? marked(input) : '')
