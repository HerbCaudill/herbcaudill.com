import { PostData } from 'lib/types'
import { PostLink } from './PostLink'

export const Posts: React.FC<{ posts: PostData[] }> = ({ posts }) => {
  const includeDrafts = false
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
