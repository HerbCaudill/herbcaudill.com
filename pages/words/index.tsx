import { IndexLayout } from 'components/IndexLayout'
import { Posts } from 'components/Posts'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { getAllPostsMetadata } from '../../lib/getAllPostsMetadata'
import { useRouter } from 'next/router'
import Head from 'next/head'

const WordsIndex = ({ posts }: Props) => {
  const includeDrafts = useRouter().query.includeDrafts === 'true'
  return (
    <>
      <Head>
        {/* hide drafts from search engines */}
        {includeDrafts && <meta name="robots" content="noindex" />}
      </Head>

      <IndexLayout label="Words">
        <Posts posts={posts} includeDrafts={includeDrafts} />
      </IndexLayout>
    </>
  )
}

export default WordsIndex

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const posts = await getAllPostsMetadata()
  return {
    props: { posts },
  }
}

type Props = InferGetStaticPropsType<typeof getStaticProps>
