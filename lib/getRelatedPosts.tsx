import { getAllPostsMetadata } from './getAllPostsMetadata'
import { PostMetadata } from './types'

export const getRelatedPosts = async (id: string) => {
  // for now the related posts are just the previous and following posts in order
  // find current post
  const allPosts = await getAllPostsMetadata()
  const publishedPosts = allPosts.filter(post => post.id === id || !post.draft) // don't include drafts (except possibly this one)
  const thisIndex = publishedPosts.findIndex(post => post.id === id)
  const lastIndex = publishedPosts.length - 1

  // wrap around if we're at the beginning or end of the list
  const prevIndex = thisIndex > 0 ? thisIndex - 1 : lastIndex
  const nextIndex = thisIndex < lastIndex ? thisIndex + 1 : 0

  return [prevIndex, nextIndex].map(i => publishedPosts[i]) as PostMetadata[]
}
