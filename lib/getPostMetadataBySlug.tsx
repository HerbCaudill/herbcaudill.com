import { getAllPostsMetadata } from './getAllPostsMetadata'

export const getPostMetadataBySlug = async (slug: string) => {
  const allPosts = await getAllPostsMetadata()
  const post = allPosts.find(p => p.slug === slug)
  if (!post) throw new Error(`No post found with slug ${slug}`)
  return post
}
