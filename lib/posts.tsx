import fs from 'fs'
import path from 'path'
import parse from 'gray-matter'
import { PostData } from './types'

const postsDir = path.join(process.cwd(), '/posts')

export const posts = () =>
  getAllPostIds()
    .map(id => post(id))
    .sort(byDate)

export const post = (id: string) => {
  const fullPath = path.join(postsDir, `${id}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const postData = { id, ...parse(fileContents).data } as PostData
  postData.title = postData.title.replace('_', '&nbsp;')
  postData.subtitle = postData.subtitle.replace('_', '&nbsp;')
  return postData
}

export const getAllPostIds = () =>
  fs.readdirSync(postsDir).map(fileName => fileName.replace(/\.md$/, ''))

export const getAllPostIdParams = () =>
  getAllPostIds().map(id => ({ params: { id } }))

export const byDate = (a: PostData, b: PostData) => (a.date < b.date ? 1 : -1)
