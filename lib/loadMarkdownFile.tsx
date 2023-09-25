import fs from 'fs'
import { serialize } from 'next-mdx-remote/serialize'
import rehypeHighlight from 'rehype-highlight'
import remarkGFM from 'remark-gfm'
import remarkSmartypants from 'remark-smartypants'
import { getFileNameFromId } from './getFileNameFromId'

export const loadMarkdownFile = async (filePath: string) => {
  const fileText = fs.readFileSync(filePath, 'utf8')

  const serialized = await serialize(fileText, {
    parseFrontmatter: true,
    mdxOptions: {
      remarkPlugins: [
        remarkGFM, // github-flavored markdown
        remarkSmartypants, // smart quotes
      ],
      rehypePlugins: [
        // @ts-ignore - types are wrong
        rehypeHighlight, // code syntax highlighting
      ],
    },
  })
  return serialized
}

export const loadMarkdownFileById = async (id: string) => {
  const fileName = getFileNameFromId(id)
  return loadMarkdownFile(fileName)
}
