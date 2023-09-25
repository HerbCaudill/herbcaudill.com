import { MDXRemoteSerializeResult } from 'next-mdx-remote'
import path from 'path'
import { postsDir } from './constants'
import { getFileNameFromId } from './getFileNameFromId'
import { getIdFromFilename } from './getIdFromFilename'
import { getBannerImage, getThumbnailImage } from './getImagePath'
import { loadMarkdownFile } from './loadMarkdownFile'
import { markdownToHtml } from './markdownToHtml'
import { PostMetadata, RawMetadata } from './types'

/** Takes the raw metadata from a post's frontmatter and fleshes it out */
export const getPostMetadata = async (id: string, serialized: MDXRemoteSerializeResult): Promise<PostMetadata> => {
  const rawData = serialized.frontmatter as RawMetadata
  return {
    ...rawData,

    id,

    // interpret underscores as non-breaking spaces in title and subtitle
    title: rawData.title.replace('_', '&nbsp;'),
    subtitle: rawData.subtitle.replace('_', '&nbsp;'),

    // convert markdown to html
    description: await markdownToHtml(rawData.description),
    caption: await markdownToHtml(rawData.caption),
    context: await markdownToHtml(rawData.context),

    // find images in this post's corresponding directory in public/images/posts
    image: getBannerImage(id),
    thumbnail: getThumbnailImage(id),

    // convert tags string to array
    tags: rawData.tags ? rawData.tags.split(',').map((t: string) => t.trim()) : [],
  }
}

export const getPostMetadataById = async (id: string) => {
  const fileName = getFileNameFromId(id)
  const serialized = await loadMarkdownFile(fileName)
  return getPostMetadata(id, serialized)
}

export const getPostMetadataByFilename = async (fileName: string) => {
  const filePath = path.join(postsDir, fileName)
  const serialized = await loadMarkdownFile(filePath)
  const id = getIdFromFilename(fileName)
  return getPostMetadata(id, serialized)
}
