import rehypeRaw from 'rehype-raw'
import rehypeStringify from 'rehype-stringify'
import remarkGfm from 'remark-gfm'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import { unified } from 'unified'
import { Html, Markdown } from './types'
import matter from 'gray-matter'
import remarkSmartypants from 'remark-smartypants'
import rehypeHighlight from 'rehype-highlight'

export const markdownToHtml = async (input?: Markdown) => {
  if (!input || input === '') return '' as Html

  // strip out the frontmatter
  const { content } = matter(input)

  const html = await unified()
    .use(remarkParse)

    // Github-flavored markdown
    .use(remarkGfm)

    // Curly quotes, em dashes
    .use(remarkSmartypants)

    // This lets HTML embedded in markdown pass through.
    // See http://unifiedjs.com/learn/recipe/remark-html/
    //We don't need to sanitize because we control the markdown source.
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw) // Parse the raw HTML strings

    // Apply syntax highlighting to code blocks
    .use(rehypeHighlight)

    .use(rehypeStringify)
    .process(content)

  return String(html) as Html
}
