import fs from 'fs'
import path from 'path'
import { loadMarkdownFile } from './loadMarkdownFile'
import { markdownToHtml } from './markdownToHtml'
import { PostData } from './types'

const postsDir = path.join(process.cwd(), '/content/posts')

export const posts = () =>
  getAllPostIds()
    .map(id => post(id))
    .sort(byDate)

export const post = (id: string): PostData => {
  const fullPath = path.join(postsDir, `${id}.md`)
  const { content, metadata } = loadMarkdownFile(fullPath)
  return {
    id,
    ...(metadata as PostData),
    title: metadata.title.replace('_', '&nbsp;'),
    subtitle: metadata.subtitle.replace('_', '&nbsp;'),
    content: content,
    tags: metadata.tags ? metadata.tags.split(',').map((t: string) => t.trim()) : [],
    context: markdownToHtml(metadata.context),
  }
}

export const relatedPosts = (id: string): PostData[] => {
  // for now the related posts are just the previous and following posts in order

  // find current post
  const allPosts = posts()
  const thisIndex = allPosts.findIndex(post => post.id === id)
  const lastIndex = allPosts.length - 1

  // wrap around if we're at the beginning or end of the list
  const prevIndex = thisIndex > 0 ? thisIndex - 1 : lastIndex
  const nextIndex = thisIndex < lastIndex ? thisIndex + 1 : 0

  return [prevIndex, nextIndex].map(i => allPosts[i])
}

export const getAllPostIds = () =>
  fs.readdirSync(postsDir).map(fileName => fileName.replace(/\.md$/, ''))

export const getAllPostIdParams = () => getAllPostIds().map(id => ({ params: { id } }))

export const byDate = (a: PostData, b: PostData) => (a.date < b.date ? 1 : -1)
