import { markdownToHtml } from './markdownToHtml'
import { parseFile } from './posts'

export const loadMarkdownFile = (fileName: string) => {
  const { data, content } = parseFile(fileName)
  return {
    data,
    content: markdownToHtml(content),
  }
}
