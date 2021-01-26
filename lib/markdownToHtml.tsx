import remark from 'remark'
import html from 'remark-html'

export const markdownToHtml = async (markdown: string): Promise<string> => {
  // Use remark to convert markdown into HTML string
  const processedContent = await remark().use(html).process(markdown)
  return processedContent.toString()
}
