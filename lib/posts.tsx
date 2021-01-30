import fs from 'fs'
import path from 'path'
import parse from 'gray-matter'
import { PostData } from './types'
import { markdownToHtml } from './markdownToHtml'

const postsDir = path.join(process.cwd(), '/posts')

export const posts = () =>
  getAllPostIds()
    .map(id => post(id))
    .sort(byDate)

export const post = (id: string): PostData => {
  const fullPath = path.join(postsDir, `${id}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const parsedContents = parse(fileContents)
  const postData = parsedContents.data
  return {
    id,
    ...(postData as PostData),
    thumbnail: postData.thumbnail ?? postData.image,
    title: postData.title.replace('_', '&nbsp;'),
    subtitle: postData.subtitle.replace('_', '&nbsp;'),
    content: parsedContents.content,
    contentHtml: markdownToHtml(parsedContents.content),
    tags: postData.tags
      ? postData.tags.split(',').map((t: string) => t.trim())
      : [],
  }
}

export const getAllPostIds = () =>
  fs.readdirSync(postsDir).map(fileName => fileName.replace(/\.md$/, ''))

export const getAllPostIdParams = () =>
  getAllPostIds().map(id => ({ params: { id } }))

export const byDate = (a: PostData, b: PostData) => (a.date < b.date ? 1 : -1)
