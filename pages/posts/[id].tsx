import { getAllPostIdParams, post } from '../../lib/posts'
import Head from 'next/head'
import { GetStaticPaths, GetStaticProps } from 'next'
import { PostData } from '../../lib/types'
import { Post } from '../../components/Post'
import { Nav } from '../../components/Nav'
import { Date } from '../../components/Date'
import { Footer } from '../../components/Footer'
import { Header } from '../../components/Header'
import { siteTitle } from '../../lib/constants'
import { Avatar } from '../../components/Avatar'

const PostLayout: React.FC<{ postData: PostData }> = ({ postData }) => {
  const { title, subtitle, date, description, image } = postData

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="og:title" content={title} />
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
            -mx-1 md:-mx-0
            md:col-span-2 lg:col-span-1
            text-center`}
        >
          <Avatar size="sm" />
        </header>

        {/* Herb Caudill/Words */}
        <header
          className={`
          col-start-2 md:col-start-4
          col-span-3 md:col-span-9
          flex items-center `}
        >
          <Header title="Words" size="sm" />
        </header>

        {/* Main content area */}
        <div className="col-span-4 md:col-span-12 grid grid-cols-1 md:grid-cols-12 gap-5">
          {/* Cover image */}
          <div className="-mx-5 md:mx-0 md:col-span-12">
            <img src={image} className="w-full h-48 md:h-64 object-cover" />
          </div>

          {/* Caption */}
          <p className="Caption md:col-span-3 md:mt-0">
            “As if source code <i>rusted!</i>” <i>— Joel Spolsky</i>
          </p>

          <div className="md:col-span-9 mt-12 md:mt-0">
            {/* Title */}
            <h1
              className={`
                font-serif font-extralight tracking-tighter leading-none
                md:mt-0
                text-4xl md:text-5xl lg:text-6xl`}
            >
              {title}
            </h1>

            {/* Subtitle */}
            <h2 className="font-bold font-sans tracking-tight text-xl mt-2">
              {subtitle}
            </h2>
          </div>

          <Nav
            className={`
              hidden md:block
              md:mt-24 
              md:col-span-2 lg:col-span-1 row-span-2
              `}
          />

          <div className="md:col-span-9 md:col-start-4 md:mt-24 border-t border-gray-400 ">
            {/* Description */}
            <p className="pt-6 mb-12 font-mono text-sm text-left">
              {description}
            </p>
          </div>

          {/* Article body */}
          <article className="md:col-span-6 md:col-start-4">
            {/* <article dangerouslySetInnerHTML={{ __html: contentHtml }} /> */}

            <div className="text-xl font-serif font-regular">
              <p>
                Almost two decades ago, Joel Spolsky excoriated Netscape for
                rewriting their codebase in his landmark essay{' '}
                <a href="https://www.joelonsoftware.com/2000/04/06/things-you-should-never-do-part-i/">
                  Things You Should Never Do
                </a>
                .
              </p>
              <p>
                He concluded that{' '}
                <strong>
                  a functioning application should never, ever be rewritten from
                  the ground up
                </strong>
                . His argument turned on two points:
              </p>
              <ul>
                <li>
                  The crufty-looking parts of the application’s codebase often
                  embed hard-earned knowledge about corner cases and weird bugs.
                </li>
                <li>
                  A rewrite is a lengthy undertaking that keeps you from
                  improving on your existing product, during which time the
                  competition is gaining on you.
                </li>
              </ul>

              <p>
                Not that it mattered. In the three years that Netscape stood
                still, Internet Explorer had taken all of its remaining market
                share:
              </p>
              <div className="Image">
                <img
                  src="https://miro.medium.com/1*2AJ0RM43DGspNNuRYSOtVA.png"
                  className="border"
                />
                <p className="Caption">
                  When the rewrite began, Netscape was losing ground quickly to
                  Microsoft’s Internet Explorer. When the new browser was
                  finally released three years later, it was buggy and slow;
                  meanwhile Netscape’s market share had dwindled to practically
                  nothing. (Chart adapted from{' '}
                  <a href="https://en.wikipedia.org/wiki/Usage_share_of_web_browsers">
                    Wikipedia
                  </a>
                  .)
                </p>
              </div>
              <p>
                In 1999, while the rewrite was underway, AOL had acquired
                Netscape in a deal valued at $10 billion.
              </p>
              <blockquote>
                "The print-preview feature is gone, as is the ability to drag a
                Web site’s address-bar icon directly into the Bookmarks menu.
                You can no longer copy or paste a Web address in the Address bar
                by right-clicking there, either. And you have to resize the
                browser window every time you begin surfing; Navigator doesn’t
                remember how you had it the last time you ran the program. The
                most alarming flaw, however, is that you can’t highlight the
                entire Address bar with a single click."
              </blockquote>
              <p>
                Just two years after Netscape 6.0 was released, the Netscape
                team within AOL was disbanded.
              </p>
              <p>
                Mozilla, the open-source community that Netscape had created,
                would go on to release the Firefox browser in 2002 — after yet{' '}
                <em>another</em>
                ground-up rewrite. Firefox did manage to gain back some market
                share from Microsoft.
              </p>
            </div>
          </article>
        </div>

        {/* github/twitter/email links */}
        <Footer className="md:col-span-12 " />
      </div>
    </>
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

{
  /* <Layout header={header}>
<Head>
</Head>
</Layout> */
}
