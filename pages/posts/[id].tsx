import { Layout } from '../../components/Layout'
import { getAllPostIdParams, post } from '../../lib/posts'
import Head from 'next/head'
import Date from '../../components/Date'
import { GetStaticPaths, GetStaticProps } from 'next'
import { PostData } from '../../lib/types'

const Post = ({
  postData: { title, subtitle, image, date, contentHtml },
}: {
  postData: PostData
}) => {
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
      <article>
        <h1 className="font-serif font-light text-5xl">{title}</h1>
        <h2 className="font-bold text-2xl">{subtitle}</h2>
        <div className="font-mono text-sm tracking-widest mt-12 mb-6">
          <Date dateString={date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
      </article>
    </Layout>
  )
}

export default Post

export const getStaticProps: GetStaticProps = async ({ params }) => ({
  props: {
    postData: post(params.id as string),
  },
})

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: getAllPostIdParams(),
  fallback: false,
})
