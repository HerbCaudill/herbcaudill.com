import marked from 'marked'

marked.setOptions({
  gfm: true,
  sanitize: false,
  smartLists: true,
  smartypants: true,
})

export const markdownToHtml = (markdown: string) =>
  markdown ? marked(markdown) : ''
