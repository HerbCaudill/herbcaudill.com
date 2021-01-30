import { Layout } from '../../components/Layout'
import { getAllPostIdParams, post } from '../../lib/posts'
import Head from 'next/head'
import { GetStaticPaths, GetStaticProps } from 'next'
import { PostData } from '../../lib/types'
import { Post } from '../../components/Post'

const PostLayout = ({ postData }: { postData: PostData }) => {
  const { title, image } = postData
  const header = (
    <div>
      <img src={image} className="w-full h-40 object-cover" />
    </div>
  )

  return (
    <Layout header={header}>
      <Head>
        <title>{title}</title>
      </Head>
      <Post {...postData} />
    </Layout>
  )
}

export default PostLayout

export const getStaticProps: GetStaticProps = async ({ params }) => ({
  props: {
    postData: post(params.id as string),
  },
})

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: getAllPostIdParams(),
  fallback: false,
})
