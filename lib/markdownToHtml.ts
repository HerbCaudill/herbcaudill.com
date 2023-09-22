import { marked } from 'marked'
import hljs from 'highlight.js/lib/core'

import javascript from 'highlight.js/lib/languages/javascript'
hljs.registerLanguage('js', javascript)
hljs.registerLanguage('jsx', javascript)
hljs.registerLanguage('javascript', javascript)

import typescript from 'highlight.js/lib/languages/typescript'
hljs.registerLanguage('ts', typescript)
hljs.registerLanguage('tsx', typescript)
hljs.registerLanguage('typescript', typescript)

import css from 'highlight.js/lib/languages/css'
hljs.registerLanguage('css', css)

import html from 'highlight.js/lib/languages/xml'
hljs.registerLanguage('html', html)

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

marked.setOptions({
  gfm: true, // GitHub flavored markdownn
  sanitize: false, // No need since I control the markdown being processed
  smartLists: true,
  smartypants: true, // smart quotes
})

marked.use({
  renderer: {
    paragraph: handleDefList,
  },
  highlight: function (code) {
    return hljs.highlightAuto(code).value
  },
})

export const markdownToHtml = (input: string) => (input ? marked(input) : '')
