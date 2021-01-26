import Layout from '../../components/Layout'
import { getAllPostIdParams, post } from '../../lib/posts'
import Head from 'next/head'
import Date from '../../components/Date'
import { GetStaticPaths, GetStaticProps } from 'next'
import { PostData } from '../../lib/types'
import { markdownToHtml } from '../../lib/markdownToHtml'

const Post = ({ postData }: { postData: PostData }) => (
  <Layout>
    <Head>
      <title>{postData.title}</title>
    </Head>
    <article>
      <h1>{postData.title}</h1>
      <div>
        <Date dateString={postData.date} />
      </div>
      <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
    </article>
  </Layout>
)

export default Post

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const postData = post(params.id as string)
  const contentHtml = await markdownToHtml(postData.content)
  return {
    props: {
      postData: {
        ...postData,
        contentHtml,
      },
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: getAllPostIdParams(),
  fallback: false,
})
