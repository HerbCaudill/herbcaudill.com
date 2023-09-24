import fs from 'fs'
import path from 'path'
import parse from 'gray-matter'
import { markdownToHtml } from './markdownToHtml'
import { PostMetadata, PostContent, Markdown, RawMetadata } from './types'

const postsDir = path.join(process.cwd(), '/content/posts')
const imagesDir = path.join(process.cwd(), '/public/images/posts')

/** Returns metadata for all posts (omits the full content) */
export const allPostsMetadata = () =>
  fs
    .readdirSync(postsDir)
    .map(fileName => getPostMetadata(parseFile(fileName)))
    .sort(byDateDescending)

/** Returns just the metadata of one post (omits the full content) */
export const getPostMetadata = (parsedFile: ParsedFile): PostMetadata => {
  const { id, data: metadata } = parsedFile

  return {
    ...metadata,

    id,
    date: getDateFromId(id),

    // interpret underscores as non-breaking spaces in title and subtitle
    title: metadata.title.replace('_', '&nbsp;'),
    subtitle: metadata.subtitle.replace('_', '&nbsp;'),

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

type ParsedFile = {
  id: string
  data: RawMetadata
  content: Markdown
}

/** Returns the full content of a post (including metadata) */
export const loadPost = (id: string): PostContent => {
  const parsedFile = parseFile(`${id}.md`)
  const metadata = getPostMetadata(parsedFile)

  const content =
    //  convert markdown to html
    markdownToHtml(parsedFile.content)
      // fix image paths
      .replace(/\$\$\//g, `/images/posts/${id}/`)

  return {
    ...metadata,
    content,
  }
}

const parseFile = (fileName: string) => {
  const fileText = fs.readFileSync(path.join(postsDir, fileName), 'utf8')
  const { data, content } = parse(fileText)
  const id = path.basename(fileName, path.extname(fileName))
  return {
    id,
    data: data as RawMetadata,
    content: content as Markdown,
  }
}

/** Finds an image with the given name in the images directory for the given post */
const getImagePath = (name: string) => (id: string) => {
  const imageDir = path.join(imagesDir, id)
  const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg']
  for (const ext of imageExtensions) {
    const imagePath = path.join(imageDir, `${name}.${ext}`)
    if (fs.existsSync(imagePath)) return `/images/posts/${id}/${name}.${ext}`
  }
  return null
}

// the banner is any image file named _banner (_banner.jpg, _banner.png, etc.)
const getBannerImage = getImagePath('_banner')

// use the banner as thumbnail if no thumbnail exists
const getThumbnailImage = (id: string) => getImagePath('_thumbnail')(id) || getBannerImage(id)

/** Post IDs start with the date in YYYYMMDD format */
const getDateFromId = (id: string) => {
  const date = id.split('-')[0]
  return `${date.slice(0, 4)}-${date.slice(4, 6)}-${date.slice(6, 8)}`
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

export const byDateDescending = (a: PostMetadata, b: PostMetadata) => (a.date < b.date ? 1 : -1)
