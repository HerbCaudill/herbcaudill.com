import { IndexLayout } from 'components/IndexLayout'
import { Posts } from 'components/Posts'
import { allPostsMetadata } from 'lib/posts'
import { PostMetadata } from 'lib/types'
import { GetStaticProps } from 'next'

const Drafts = ({ posts }: { posts: PostMetadata[] }) => {
  return (
    <IndexLayout label="Words">
      <Posts posts={posts} includeDrafts={true} />
    </IndexLayout>
  )
}

export default Drafts

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      posts: allPostsMetadata(),
    },
  }
}
