import { IndexLayout } from 'components/IndexLayout'
import { Posts } from 'components/Posts'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { getAllPostsMetadata } from './getAllPostsMetadata'

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
      posts: await getAllPostsMetadata(),
    },
  }
}

type Props = InferGetStaticPropsType<typeof getStaticProps>
