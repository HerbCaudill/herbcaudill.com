import { PostMetadata } from '../lib/types'
import { PostLink } from './PostLink'

export const Posts = ({ posts, includeDrafts = false }: PostProps) => {
  const filteredPosts = includeDrafts
    ? posts // no filter if we're showing drafts
    : posts.filter(postData => postData.draft !== true) // otherwise filter drafts out
  return (
    <>
      {filteredPosts.map(postData => (
        <PostLink key={postData.id} {...postData} />
      ))}
    </>
  )
}

type PostProps = {
  posts: PostMetadata[]
  includeDrafts: boolean
}
