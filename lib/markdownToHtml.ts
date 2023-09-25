import rehypeStringify from 'rehype-stringify'
import remarkGfm from 'remark-gfm'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import { unified } from 'unified'
import { Html, Markdown } from './types'

export const markdownToHtml = async (input?: Markdown) => {
  if (!input || input === '') return '' as Html

  const html = await unified() //
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeStringify)
    .process(input)

  return String(html) as Html
}
