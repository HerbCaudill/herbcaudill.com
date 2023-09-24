import { IndexLayout } from 'components/IndexLayout'
import { PostMetadata } from 'lib/types'
import { GetStaticProps } from 'next'

const Drafts = ({ posts }: { posts: PostMetadata[] }) => {
  return <IndexLayout label="Words">{/* <Posts posts={posts} includeDrafts={true} /> */}</IndexLayout>
}

export default Drafts

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      posts: [],
    },
  }
}
