import marked from 'marked'
export const markdownToHtml = (markdown: string) =>
  markdown ? marked(markdown) : ''
