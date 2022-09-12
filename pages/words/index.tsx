import { IndexLayout } from 'components/IndexLayout'
import { Posts } from 'components/Posts'
import { posts } from 'lib/posts'
import { PostData } from 'lib/types'
import { GetStaticProps } from 'next'

const WordsIndex: React.FC<{ posts: PostData[] }> = ({ posts }) => {
  return (
    <IndexLayout label="Words">
      <Posts posts={posts} includeDrafts={false} />
    </IndexLayout>
  )
}

export default WordsIndex

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      posts: posts(),
    },
  }
}
