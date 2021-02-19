import { Nav } from './Nav'
import { PostData } from '../lib/types'

export const Post: React.FC<PostProps> = ({
  title,
  subtitle,
  description,
  image,
  caption,
  content,
  context,
}) => {
  return (
    <div
      className={`
            grid grid-cols-1 md:grid-cols-12 gap-G 
            col-span-4 md:col-span-12
        `}
    >
      {/* Cover image */}
      <div className="-mx-G md:mx-0 md:col-span-12">
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
          text-gray-700 text-base sm:text-lg font-serif font-regular;
          md:col-span-9 md:col-start-4
          lg:col-start-4 lg:co  l-span-7`}
        dangerouslySetInnerHTML={{ __html: content }}
      />
      <aside className="md:col-span-3 md:relative">
        <div
          className="context md:absolute md:bottom-G mb-G "
          dangerouslySetInnerHTML={{ __html: context }}
        ></div>
      </aside>
    </div>
  )
}
interface PostProps extends PostData {}
