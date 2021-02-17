import { GetStaticProps } from 'next'
import Head from 'next/head'
import { Avatar } from '../components/Avatar'
import { Footer } from '../components/Footer'
import { Header } from '../components/Header'
import { Nav } from '../components/Nav'
import { Posts } from '../components/Posts'
import { siteTitle } from '../lib/constants'
import { posts } from '../lib/posts'
import { PostData } from '../lib/types'

const IndexLayout: React.FC<{ allPosts: PostData[] }> = ({ allPosts }) => {
  return (
    <>
      <Head>
        <title>{siteTitle} | Words</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content={siteTitle} />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Serif:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Condensed:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&display=swap"
          rel="stylesheet"
        />
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
