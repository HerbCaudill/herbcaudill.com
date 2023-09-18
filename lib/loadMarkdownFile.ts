import fs from 'fs'
import parse from 'gray-matter'
import { markdownToHtml } from './markdownToHtml'

export const loadMarkdownFile = (path: string) => {
  const fileContents = fs.readFileSync(path, 'utf8')
  const { content, data } = parse(fileContents)

  // convert markdown to HTML
  const htmlContent = markdownToHtml(content)

  return { metadata: data, content: htmlContent }
}
