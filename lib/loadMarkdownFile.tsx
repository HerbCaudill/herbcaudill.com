import fs from 'fs'
import { serialize } from 'next-mdx-remote/serialize'
import highlight from 'rehype-highlight'
import gfm from 'remark-gfm'
import smartypants from 'remark-smartypants'
import { getFileNameFromId } from './getFileNameFromId'

export const loadMarkdownFile = async (filePath: string) => {
  const fileText = fs.readFileSync(filePath, 'utf8')

  const serialized = await serialize(fileText, {
    parseFrontmatter: true,
    mdxOptions: {
      remarkPlugins: [
        gfm, // github-flavored markdown
        smartypants, // smart quotes
      ],
      rehypePlugins: [
        // @ts-ignore - types are wrong
        highlight, // code syntax highlighting
      ],
    },
  })
  return serialized
}

export const loadMarkdownFileById = async (id: string) => {
  const fileName = getFileNameFromId(id)
  return loadMarkdownFile(fileName)
}
