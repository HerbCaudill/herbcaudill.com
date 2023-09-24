import { Layout } from 'components/Layout'
import { Post, PostProps } from 'components/Post'
import { siteTitle } from 'lib/constants'
import { allPostsMetadata, loadPost, relatedPosts } from 'lib/posts'
import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'

import 'highlight.js/styles/rainbow.css'

const PostLayout = ({ postData }: { postData: PostProps }) => {
  const { id, title, description, image } = postData

  return (
    <Layout compact label="Words">
      <Head>
        <title>{`${title} | ${siteTitle}`}</title>
        <meta name="description" content={description} />
        <meta name="og:url" content={`https://herbcaudill.com/words/${id}`} />
        <meta name="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />
      </Head>
      <Post {...postData} />
    </Layout>
  )
}

export default PostLayout

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = params.id as string
  return {
    props: {
      postData: {
        ...loadPost(id),
        relatedPosts: relatedPosts(id),
      },
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: allPostsMetadata().map(({ id }) => ({ params: { id } })),
  fallback: false,
})
