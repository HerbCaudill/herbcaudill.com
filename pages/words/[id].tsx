import { Date } from 'components/Date'
import { DraftBlurb } from 'components/DraftBlurb'
import { Layout } from 'components/Layout'
import { Nav } from 'components/Nav'
import { PostLink } from 'components/PostLink'
import fs from 'fs'
import { postsDir, siteTitle } from 'lib/constants'
import { getIdFromFilename } from 'lib/getIdFromFilename'
import { getPostMetadata } from 'lib/getPostMetadata'
import { getRelatedPosts } from 'lib/getRelatedPosts'
import { loadMarkdownFileById } from 'lib/loadMarkdownFile'
import { PostMetadata } from 'lib/types'
import { GetStaticPaths, GetStaticProps } from 'next'
import { MDXRemote } from 'next-mdx-remote'
import Head from 'next/head'

const PostLayout = ({ metadata, compiledSource, relatedPosts }: Props) => {
  const { id, image, title, subtitle, description, draft, caption, date, originalPublication, originalUrl, context } =
    metadata

  return (
    <Layout compact label="Words">
      <Head>
        <title>{`${title} | ${siteTitle}`}</title>
        <meta name="description" content={description} />
        <meta name="og:url" content={`https://herbcaudill.com/words/${id}`} />
        <meta name="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />

        {/* hide drafts from search engines */}
        {draft && <meta name="robots" content="noindex" />}
      </Head>
      <div
        className={`
          Post
          grid grid-cols-1 md:grid-cols-12 gap-G 
          col-span-4 md:col-span-12`}
      >
        {/* Cover image */}
        {image ? (
          <div className="-mx-G md:mx-0 md:col-span-12">
            <img src={image} className="w-full " />
          </div>
        ) : (
          <div className="-mx-G md:mx-0 md:mb-16 lg:mb-48 md:col-span-12 " />
        )}

        {/* caption */}
        <div
          className="caption use-ink-underline md:col-span-2 md:mt-0 leading-normal"
          dangerouslySetInnerHTML={{ __html: caption }}
        />

        <div className="relative md:col-span-9 md:col-start-4 mt-12 md:mt-0">
          {/* Title */}
          <h1
            className={`
            font-serif font-extralight tracking-tighter leading-none
            md:mt-0
            text-4xl md:text-5xl lg:text-6xl`}
            dangerouslySetInnerHTML={{ __html: title }}
          />

          {/* Subtitle */}
          <h2
            className="font-bold font-sans tracking-tight text-md sm:text-xl leading-tight mt-2"
            dangerouslySetInnerHTML={{ __html: subtitle }}
          />

          <DraftBlurb draft={draft} />
        </div>

        <Nav
          className={`
          hidden md:block
          md:mt-24 
          md:col-span-2 lg:col-span-1 row-span-2`}
        />

        <div
          className={`use-ink-underline
            md:col-span-9 md:col-start-4 md:mt-24
            border-t border-gray-400 `}
        >
          {/* Description */}
          <div className=" pt-6 mb-12 font-mono text-sm text-left" dangerouslySetInnerHTML={{ __html: description }} />
        </div>

        {/* Article body */}
        <div
          className={`
          text-gray-700 text-base sm:text-lg font-serif 
          md:col-start-4 md:col-span-9 
          lg:col-start-4 lg:col-span-7`}
        >
          <article>
            <MDXRemote frontmatter={metadata} compiledSource={compiledSource} scope={{}} />
          </article>

          <DraftBlurb draft={draft} />
        </div>

        {/* Context */}
        <aside
          className={`
          text-xs font-sans context mb-G 
          md:col-start-4 md:col-span-9 
          lg:col-start-4 lg:col-span-7
          
          md:grid md:gap-G
          md:grid-cols-9
          lg:grid-cols-7

          border-t-4 border-black`}
        >
          <div className="col-span-3 pr-G">
            <p className="font-mono tracking-extrawide">
              <Date dateString={date} />
            </p>
            {originalPublication && originalUrl ? (
              <p className="font-bold">
                Originally published on <a href={originalUrl}>{originalPublication}</a>.
              </p>
            ) : null}
          </div>
          <div
            className="leading-normal col-start-4 md:col-span-6 lg:col-span-4"
            dangerouslySetInnerHTML={{ __html: context }}
          />
        </aside>

        {/* Related */}
        <div className="md:col-span-9 md:col-start-4">
          <h3 className="mb-G text-2xl font-sans font-bold">Related</h3>
          {relatedPosts.map(postData => (
            <PostLink key={postData.id} {...postData} />
          ))}
        </div>
      </div>{' '}
    </Layout>
  )
}

export default PostLayout

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = params.id as string
  const postData = await loadPost(id)
  return {
    props: {
      ...postData,
      relatedPosts: await getRelatedPosts(id),
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: fs.readdirSync(postsDir).map(fileName => ({
    params: {
      id: getIdFromFilename(fileName),
    },
  })),
  fallback: false,
})

const loadPost = async (id: string) => {
  const serialized = await loadMarkdownFileById(id)

  const metadata = await getPostMetadata(id, serialized)
  const compiledSource = serialized.compiledSource.replace(/\$\$\//g, `/images/posts/${id}/`)

  return {
    metadata,
    compiledSource,
  }
}

type Props = {
  metadata: PostMetadata
  compiledSource: string
  relatedPosts: PostMetadata[]
}
