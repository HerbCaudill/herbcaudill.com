import fs from 'fs'
import { serialize } from 'next-mdx-remote/serialize'
import { getFileNameFromId } from './getFileNameFromId'

export const loadMarkdownFile = async (filePath: string) => {
  const fileText = fs.readFileSync(filePath, 'utf8')
  const serialized = await serialize(fileText, { parseFrontmatter: true })
  return serialized
}

export const loadMarkdownFileById = async (id: string) => {
  const fileName = getFileNameFromId(id)
  return loadMarkdownFile(fileName)
}
