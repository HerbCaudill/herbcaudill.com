import { GetStaticProps } from 'next'
import { Head } from '../components/Head'
import { Avatar } from '../components/Avatar'
import { Footer } from '../components/Footer'
import { Header } from '../components/Header'
import { Nav } from '../components/Nav'
import { Posts } from '../components/Posts'
import { siteDescription, siteTitle } from '../lib/constants'
import { posts } from '../lib/posts'
import { PostData } from '../lib/types'

const IndexLayout: React.FC<{ allPosts: PostData[] }> = ({ allPosts }) => {
  return (
    <>
      <Head>
        <title>{siteTitle} | Words</title>
        <meta name="og:title" content={siteTitle} />
        <meta name="description" content={siteDescription} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <div
        className={`
      container 
      grid gap-5
      grid-cols-4 md:grid-cols-12 
      w-full md:max-w-screen-lg 
      md:m-auto`}
      >
        {/* Avatar */}
        <header
          className={`
            py-12 text-center
            md:col-span-2 lg:col-span-1
          `}
        >
          <Avatar size="lg" />
        </header>

        {/* Herb Caudill/Words etc. */}
        <header className="col-start-2 col-span-3 md:col-start-4 md:col-span-9 flex items-center ">
          <Header title="Words" />
        </header>

        {/* Words / Pictures / Facts */}
        <Nav
          className={`
          hidden md:block
          md:col-span-2 lg:col-span-1
          `}
        />

        {/* Main content area */}
        <main className="col-span-4 md:col-start-4 md:col-span-9">
          <Posts posts={allPosts} />
        </main>

        {/* github/twitter/email links */}
        <Footer className="col-span-4 md:col-span-12 " />
      </div>
    </>
  )
}

export default IndexLayout

export const getStaticProps: GetStaticProps = async () => {
  const allPosts = posts()
  return {
    props: {
      allPosts,
    },
  }
}
