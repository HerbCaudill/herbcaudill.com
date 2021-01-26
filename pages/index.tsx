import { GetStaticProps } from 'next'
import Head from 'next/head'
import Layout, { siteTitle } from '../components/Layout'
import { posts } from '../lib/posts'
import { PostData } from '../lib/types'
import { Posts } from '../components/Posts'

export default function Home({ allPosts }: { allPosts: PostData[] }) {
  return (
    <Layout>
      <Head>
        <title>{siteTitle}</title>
      </Head>

      <section>
        <Posts posts={allPosts} />
      </section>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const allPosts = posts()
  return {
    props: {
      allPosts,
    },
  }
}
