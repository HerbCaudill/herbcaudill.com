import { GetStaticProps } from 'next'
import { Posts } from 'components/Posts'
import { posts } from 'lib/posts'
import { PostData } from 'lib/types'
import { IndexLayout } from 'components/IndexLayout'

const WordsIndex: React.FC<{ posts: PostData[] }> = ({ posts }) => {
  return (
    <IndexLayout label="Words">
      <Posts posts={posts} />
    </IndexLayout>
  )
}

export default WordsIndex

export const getStaticProps: GetStaticProps = async () => ({
  props: {
    posts: posts(),
  },
})
