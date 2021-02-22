import fs from 'fs'
import parse from 'gray-matter'
import { markdownToHtml } from './markdownToHtml'

export const loadMarkdownFile = (path: string) => {
  const fileContents = fs.readFileSync(path, 'utf8')
  const parsedContents = parse(fileContents)
  const metadata = parsedContents.data
  const content = markdownToHtml(parsedContents.content)
  return { metadata, content }
}
