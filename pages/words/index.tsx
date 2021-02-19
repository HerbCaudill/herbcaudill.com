import { GetStaticProps } from 'next'
import { Head } from '../../components/Head'
import { Nav } from '../../components/Nav'
import { Posts } from '../../components/Posts'
import { siteDescription, siteTitle } from '../../lib/constants'
import { posts } from '../../lib/posts'
import { PostData } from '../../lib/types'
import { Layout } from '../../components/Layout'

const WordsIndex: React.FC<{ posts: PostData[] }> = ({ posts }) => {
  return (
    <Layout>
      <Head>
        <title>{siteTitle} | Words</title>
        <meta name="og:title" content={siteTitle} />
        <meta name="description" content={siteDescription} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      {/* Nav is hidden on small screens */}
      <Nav className={`hidden md:block md:col-span-2 lg:col-span-1`} />

      <Posts posts={posts} />
    </Layout>
  )
}

export default WordsIndex

export const getStaticProps: GetStaticProps = async () => ({
  props: {
    posts: posts(),
  },
})
