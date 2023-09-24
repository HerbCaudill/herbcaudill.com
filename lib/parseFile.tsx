import fs from 'fs'
import path from 'path'
import parse from 'gray-matter'
import { Markdown, RawMetadata } from './types'
import { postsDir } from './constants'

/** Loads the file for the given post and parses the gray matter */
export const parseFile = (fileName: string) => {
  const fileText = fs.readFileSync(path.join(postsDir, fileName), 'utf8')
  const { data, content } = parse(fileText)
  const id = path.basename(fileName, path.extname(fileName))
  return {
    id,
    data: data as RawMetadata,
    content: content as Markdown,
  }
}
