import marked from 'marked'

marked.setOptions({
  gfm: true,
  sanitize: false,
  smartLists: true,
  smartypants: true,
})

export const markdownToHtml = (input: string) => (input ? marked(input) : '')
