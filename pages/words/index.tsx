import { InferGetStaticPropsType } from 'next'
import { IndexLayout } from 'components/IndexLayout'
import { Posts } from 'components/Posts'
import { allPostsMetadata } from 'lib/posts'
import { PostData } from 'lib/types'
import { GetStaticProps } from 'next'

const WordsIndex = ({ posts }: Props) => {
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
      posts: allPostsMetadata(),
    },
  }
}

type Props = InferGetStaticPropsType<typeof getStaticProps>
