import path from 'path'
import { postsDir } from './constants'
import { loadMdxFile } from './loadMdxFile'
import { getPostMetadata } from './getPostMetadata'
import { RawMetadata } from './types'

export const getPostMetadataByFilename = async (fileName: string) => {
  const filePath = path.join(postsDir, fileName)
  const { frontmatter } = await loadMdxFile(filePath)
  return getPostMetadata(fileName, frontmatter as RawMetadata)
}
