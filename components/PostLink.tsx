import { PostMetadata } from 'lib/types'
import Link from 'next/link'
import { useRef } from 'react'

const env = process.env.NODE_ENV
const isProd = env === 'production'

export const PostLink = ({ id, date, title, subtitle, description, draft, thumbnail }: PostLinkProps) => {
  const link = useRef<HTMLAnchorElement>(null)
  return (
    <div
      className={`
          PostLink
          grid gap-G
          grid-cols-4 md:grid-cols-9
          border-t border-gray-400
          pt-2 pb-7
          hover:bg-gray-400 hover:bg-opacity-5 transition-all duration-500 ease-in-out
          cursor-pointer
          ${isProd && draft ? 'opacity-25' : ''}
        `}
      onClick={_ => {
        link.current.click()
      }}
    >
      <div className="col-span-1 md:col-span-3">
        <div className="w-full relative overflow-hidden pb-100% md:pb-50% mb-2">
          <img className="absolute w-full h-full object-cover border" src={thumbnail} />
        </div>
      </div>
      <div className="col-span-3">
        <Link
          href={`/words/${id}`}
          ref={link}
          key={id}
          className="font-sans font-bold text-lg tracking-tight leading-none md:leading-none "
          dangerouslySetInnerHTML={{ __html: title }}
        />
        <div
          className="font-mono leading-tight md:leading-tight py-1 text-xs md:font-serif md:text-base"
          dangerouslySetInnerHTML={{ __html: subtitle }}
        />
        {/* <Date dateString={date} className="hidden mt-3 md:block text-2xs tracking-widest font-mono uppercase" /> */}
      </div>
      <div
        className="hidden md:block col-span-3 text-2xs lg:text-xs text-gray-700 font-mono"
        dangerouslySetInnerHTML={{ __html: description }}
      />
      {/* <div className="hidden lg:block">
          {tags.map(tag => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div> */}
    </div>
  )
}

interface PostLinkProps extends PostMetadata {}
