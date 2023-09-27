import { get } from 'http'
import { getBannerImage, getThumbnailImage } from './getImagePath'
import { getSlug } from './getSlug'
import { markdownToHtml } from './markdownToHtml'
import { PostMetadata, RawMetadata } from './types'
import { getIdFromFilename } from './getIdFromFilename'

/** Takes the raw metadata from a post's frontmatter and fleshes it out */
export const getPostMetadata = async (fileName: string, rawData: RawMetadata): Promise<PostMetadata> => {
  const id = getIdFromFilename(fileName)
  return {
    ...rawData,

    fileName, // we need this to know if it's md or mdx
    id,
    slug: getSlug(rawData.date, rawData.slug),

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
