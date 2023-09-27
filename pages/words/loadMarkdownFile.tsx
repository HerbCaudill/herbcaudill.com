import { markdownToHtml } from 'lib/markdownToHtml'
import { Markdown } from 'lib/types'
import fs from 'fs'

export const loadMarkdownFile = async (filePath: string) => {
  const markdown = fs.readFileSync(filePath, 'utf8') as Markdown

  return markdownToHtml(markdown)
}
