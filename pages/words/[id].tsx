import { Layout } from 'components/Layout'
import { Post, PostProps } from 'components/Post'
import { siteTitle } from 'lib/constants'
import { getAllPostIdParams, post, relatedPosts } from 'lib/posts'
import { GetStaticPaths, GetStaticProps } from 'next'

import 'highlight.js/styles/rainbow.css'

import Head from 'next/head'

const PostLayout = ({ postData }: { postData: PostProps }) => {
  const { id, title, description, image } = postData

  return (
    <Layout compact label="Words">
      <Head>
        <title>{`${title} | ${siteTitle}`}</title>
        <meta name="description" content={description} />
        <meta name="og:url" content={`https://herbcaudill.com/posts/${id}`} />
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
        ...post(id),
        relatedPosts: relatedPosts(id),
      },
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: getAllPostIdParams(),
  fallback: false,
})
