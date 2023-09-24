import { Marked } from 'marked'

import { markedHighlight } from 'marked-highlight'
import { markedSmartypants } from 'marked-smartypants'

import hljs from 'highlight.js'
import { Html, Markdown } from './types'

const handleDefList = (text: string) => {
  // Label
  // : Description
  var dlRegex = /(^|\n+)(\S.+)\n:(\s+)(\S.+)/

  var dl = '\n\n' + '<dl>' + '<dt><p>$2</p></dt>' + '<dd><p>$4</p></dd>' + '</dl>' + '\n\n'

  if (text.match(dlRegex)) {
    text = text.replace(dlRegex, dl)
    return text
  } else {
    return `<p>${text}</p>\n`
  }
}

const marked = new Marked(
  {
    async: false,
    gfm: true, // GitHub flavored markdown
    renderer: { paragraph: handleDefList },
  },
  markedHighlight({
    langPrefix: 'hljs language-',
    highlight: (code, language) => {
      if (language && hljs.getLanguage(language)) {
        return hljs.highlight(code, { language }).value
      } else {
        return hljs.highlightAuto(code).value
      }
    },
  }),
  markedSmartypants()
)

export const markdownToHtml = (input: Markdown) => (input ? marked.parse(input) : '') as Html
