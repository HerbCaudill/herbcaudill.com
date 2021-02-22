import { PostData } from 'lib/types'
import { PostLink } from './PostLink'

export const Posts: React.FC<{ posts: PostData[] }> = ({ posts }) => {
  return (
    <>
      {posts.map(postData => (
        <PostLink key={postData.id} {...postData} />
      ))}
    </>
  )
}
