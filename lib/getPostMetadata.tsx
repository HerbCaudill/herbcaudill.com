import { markdownToHtml } from './markdownToHtml'
import { PostMetadata, ParsedFile, RawMetadata } from './types'
import { getBannerImage, getThumbnailImage } from './getImagePath'
import { getDateFromId } from './getDateFromId'
import { MDXRemoteSerializeResult } from 'next-mdx-remote'
import { getFileNameFromId } from './getFileNameFromId'
import { loadMarkdownFile } from './loadMarkdownFile'
import { postsDir } from './constants'
import path from 'path'
import { getIdFromFilename } from './getIdFromFilename'

/** Takes the raw metadata from a post's frontmatter and fleshes it out */
export const getPostMetadata = (id: string, serialized: MDXRemoteSerializeResult): PostMetadata => {
  const rawData = serialized.frontmatter as RawMetadata
  return {
    ...rawData,

    id,
    date: getDateFromId(id),

    // interpret underscores as non-breaking spaces in title and subtitle
    title: rawData.title.replace('_', '&nbsp;'),
    subtitle: rawData.subtitle.replace('_', '&nbsp;'),

    // convert markdown to html
    description: markdownToHtml(rawData.description),
    caption: markdownToHtml(rawData.caption),
    context: markdownToHtml(rawData.context),

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
