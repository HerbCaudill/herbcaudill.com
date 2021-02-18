import { GetStaticPaths, GetStaticProps } from 'next'
import { Avatar } from '../../components/Avatar'
import { Footer } from '../../components/Footer'
import { Header } from '../../components/Header'
import { Head } from '../../components/Head'
import { Nav } from '../../components/Nav'
import { getAllPostIdParams, post } from '../../lib/posts'
import { PostData } from '../../lib/types'
import { siteTitle } from '../../lib/constants'

const PostLayout: React.FC<{ postData: PostData }> = ({ postData }) => {
  const {
    id,
    title,
    subtitle,
    description,
    image,
    caption,
    contentHtml,
  } = postData

  return (
    <>
      <Head>
        <title>{`${title} | ${siteTitle}`}</title>
        <meta name="description" content={description} />
        <meta name="og:url" content={`https://hc3.me/posts/${id}`} />
        <meta name="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />
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
        <div
          className={`
            grid grid-cols-1 md:grid-cols-12 gap-5
            col-span-4 md:col-span-12
        `}
        >
          {/* Cover image */}
          <div className="-mx-5 md:mx-0 md:col-span-12">
            <img src={image} className="w-full h-48 md:h-64 object-cover" />
          </div>

          {/* caption */}
          <p
            className="caption md:col-span-3 md:mt-0 leading-normal"
            dangerouslySetInnerHTML={{ __html: caption }}
          />

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
            <h2
              className="font-bold font-sans tracking-tight text-xl mt-2"
              dangerouslySetInnerHTML={{ __html: subtitle }}
            />
          </div>

          <Nav
            className={`
              hidden md:block
              md:mt-24 
              md:col-span-2 lg:col-span-1 row-span-2
            `}
          />

          <div
            className={`
            md:col-span-9 md:col-start-4 md:mt-24
            border-t border-gray-400 `}
          >
            {/* Description */}
            <p
              className="pt-6 mb-12 font-mono text-sm text-left"
              dangerouslySetInnerHTML={{ __html: description }}
            ></p>
          </div>

          {/* Article body */}
          <article
            className={`
            
              md:col-span-9 md:col-start-4
              lg:col-start-4 lg:col-span-7`}
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />
        </div>

        {/* github/twitter/email links */}
        <Footer className="col-span-4 md:col-span-12 " />
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
