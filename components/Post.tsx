import { Nav } from 'components/Nav'
import { PostData } from 'lib/types'
import { Date } from 'components/Date'
import { DraftBlurb } from 'components/DraftBlurb'
import { PostLink } from 'components/PostLink'

export const Post: React.FC<PostProps> = ({
  title,
  subtitle,
  description,
  draft,
  image,
  caption,
  content,
  date,
  originalPublication,
  originalUrl,
  context,
  relatedPosts,
}) => {
  return (
    <div
      className={`
          Post
          grid grid-cols-1 md:grid-cols-12 gap-G 
          col-span-4 md:col-span-12
        `}
    >
      {/* Cover image */}
      {image ? (
        <div className="-mx-G md:mx-0 md:col-span-12">
          <img src={image} className="w-full h-48 md:h-64 object-cover object-right" />
        </div>
      ) : (
        <div className="-mx-G md:mx-0 md:mb-16 lg:mb-48 md:col-span-12 " />
      )}

      {/* caption */}
      <p
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
          className="font-bold font-sans tracking-tight text-xl mt-2"
          dangerouslySetInnerHTML={{ __html: subtitle }}
        />

        <DraftBlurb draft={draft} className="mt-2 w-7/9" />
      </div>

      <Nav
        className={`
          hidden md:block
          md:mt-24 
          md:col-span-2 lg:col-span-1 row-span-2
            `}
      />

      <div
        className={`use-ink-underline
            md:col-span-9 md:col-start-4 md:mt-24
            border-t border-gray-400 `}
      >
        {/* Description */}
        <p className=" pt-6 mb-12 font-mono text-sm text-left" dangerouslySetInnerHTML={{ __html: description }}></p>
      </div>

      {/* Article body */}
      <article
        className={`
          text-gray-700 text-base sm:text-lg font-serif 
          md:col-start-4 md:col-span-9 
          lg:col-start-4 lg:col-span-7`}
      >
        <div dangerouslySetInnerHTML={{ __html: content }} />

        <DraftBlurb draft={draft} className="mt-2" />
      </article>

      {/* Context */}
      <aside
        className={`
          text-xs font-sans context mb-G 
          md:col-start-4 md:col-span-9 
          lg:col-start-4 lg:col-span-7
          
          md:grid md:gap-G
          md:grid-cols-9
          lg:grid-cols-7

          border-t-4 border-black        
      `}
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
    </div>
  )
}

export interface PostProps extends PostData {
  relatedPosts: PostData[]
}
