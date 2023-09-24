import fs from 'fs'
import { markdownToHtml } from './markdownToHtml'
import { PostMetadata, PostContent, Markdown, RawMetadata, ParsedFile } from './types'
import { loadMarkdownFile } from './loadMarkdownFile'
import { getBannerImage, getThumbnailImage } from './getBannerImage'
import { parseFile } from './parseFile'
import { getDateFromId } from './getDateFromId'
import { postsDir } from './constants'
import { byDateDescending } from './byDateDescending'

/** Returns metadata for all posts (omits the full content) */
export const allPostsMetadata = () =>
  fs
    .readdirSync(postsDir)
    .map(fileName => getPostMetadata(parseFile(fileName)))
    .sort(byDateDescending)

/** Returns just the metadata of one post (omits the full content) */
export const getPostMetadata = ({ id, data: metadata }: Omit<ParsedFile, 'content'>): PostMetadata => {
  return {
    ...metadata,

    id,
    date: getDateFromId(id),

    // interpret underscores as non-breaking spaces in title and subtitle
    title: metadata.title?.replace('_', '&nbsp;') || '',
    subtitle: metadata.subtitle?.replace('_', '&nbsp;') || '',

    // convert markdown to html
    description: markdownToHtml(metadata.description),
    caption: markdownToHtml(metadata.caption),
    context: markdownToHtml(metadata.context),

    // find images in this post's corresponding directory in public/images/posts
    image: getBannerImage(id),
    thumbnail: getThumbnailImage(id),

    // convert tags string to array
    tags: metadata.tags ? metadata.tags.split(',').map((t: string) => t.trim()) : [],
  }
}

/** Returns the full content of a post (including metadata) */
export const loadPost = (id: string): PostContent => {
  const { content, data } = loadMarkdownFile(`${id}.mdx`)
  const metadata = getPostMetadata({ id, data })

  return {
    ...metadata,
    content: content.replace(/\$\$\//g, `/images/posts/${id}/`),
  }
}

export const relatedPosts = (id: string): PostMetadata[] => {
  // for now the related posts are just the previous and following posts in order

  // find current post
  const publishedPosts = allPostsMetadata().filter(post => post.id === id || !post.draft) // don't include drafts (except possibly this one)
  const thisIndex = publishedPosts.findIndex(post => post.id === id)
  const lastIndex = publishedPosts.length - 1

  // wrap around if we're at the beginning or end of the list
  const prevIndex = thisIndex > 0 ? thisIndex - 1 : lastIndex
  const nextIndex = thisIndex < lastIndex ? thisIndex + 1 : 0

  return [prevIndex, nextIndex].map(i => publishedPosts[i])
}
