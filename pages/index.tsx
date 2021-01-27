import { GetStaticProps } from 'next'
import Head from 'next/head'
import { Layout } from '../components/Layout'
import { posts } from '../lib/posts'
import { PostData } from '../lib/types'
import { Posts } from '../components/Posts'
import { Header } from '../components/Header'
import { siteTitle } from '../components/constants'

export default function Home({ allPosts }: { allPosts: PostData[] }) {
  return (
    <Layout header={<Header title="Words" />}>
      <Head>
        <title>{siteTitle} | Words</title>
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
