import { GetStaticPaths, GetStaticProps } from 'next'
import { Head } from 'components/Head'
import { Layout } from 'components/Layout'
import { Post } from 'components/Post'
import { siteTitle } from 'lib/constants'
import { getAllPostIdParams, post } from 'lib/posts'
import { PostData } from 'lib/types'

const PostLayout: React.FC<{ postData: PostData }> = ({ postData }) => {
  const { id, title, description, image } = postData

  return (
    <Layout compact label="Words">
      <Head>
        <title>{`${title} | ${siteTitle}`}</title>
        <meta name="description" content={description} />
        <meta name="og:url" content={`https://hc3.me/posts/${id}`} />
        <meta name="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />
      </Head>
      <Post {...postData} />
    </Layout>
  )
}

export default PostLayout

export const getStaticProps: GetStaticProps = async ({ params }) => ({
  props: { postData: post(params.id as string) },
})

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: getAllPostIdParams(),
  fallback: false,
})
