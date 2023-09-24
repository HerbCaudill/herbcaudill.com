import fs from 'fs'
import { byDateDescending } from 'lib/byDateDescending'
import { postsDir } from 'lib/constants'
import { getPostMetadataByFilename } from 'lib/getPostMetadata'

export const getAllPostsMetadata = async () => {
  const posts = await Promise.all(
    fs
      .readdirSync(postsDir)
      // get metadata for each file
      .map(async fileName => getPostMetadataByFilename(fileName))
  )
  return posts.sort(byDateDescending)
}
