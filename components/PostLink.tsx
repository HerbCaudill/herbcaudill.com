import Link from 'next/link'
import { Date } from './Date'
import { PostData } from 'lib/types'
import { Tag } from './Tag'

export const PostLink: React.FC<PostLinkProps> = ({
  id,
  date,
  title,
  subtitle,
  description,
  thumbnail,
  tags,
}) => (
  <Link href={`/words/${id}`} key={id}>
    <div
      className={`
        grid gap-G
        grid-cols-4 md:grid-cols-9
        border-t border-gray-400
        pt-2 pb-7
        group
        hover:bg-gray-400 hover:bg-opacity-5 transition-all duration-500 ease-in-out
        cursor-pointer
      `}
    >
      <div className="col-span-1 md:col-span-3">
        <div className="w-full relative overflow-hidden pb-100% md:pb-50% mb-2">
          <img
            className="absolute w-full h-full object-cover border"
            src={thumbnail}
          />
        </div>
      </div>

      <div className="col-span-3">
        <a
          className="font-sans font-bold text-lg tracking-tight leading-none md:leading-none splat-underline-on-hover"
          dangerouslySetInnerHTML={{ __html: title }}
        />
        <div
          className="font-mono leading-tight md:leading-tight py-1 text-xs md:font-serif md:text-base"
          dangerouslySetInnerHTML={{ __html: subtitle }}
        />
        <Date
          dateString={date}
          className="hidden mt-3 md:block text-2xs tracking-widest font-mono uppercase"
        />
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
  </Link>
)

interface PostLinkProps extends PostData {}
