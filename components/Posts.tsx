import Link from 'next/link'
import { Date } from './Date'
import { PostData } from '../lib/types'
import { Tag } from './Tag'

export const Posts: React.FC<{ posts: PostData[] }> = ({ posts }) => {
  return (
    <div>
      {posts.map(
        ({ id, date, title, subtitle, description, thumbnail, tags }) => (
          <Link href={`/posts/${id}`} key={id}>
            <div
              className={`
                grid grid-cols-4
                gap-5
                
                md:grid-cols-9

                border-t border-gray-400
                pt-2 pb-7
                hover:bg-gray-400 hover:bg-opacity-5 transition-all duration-500 ease-in-out
                cursor-pointer
              `}
            >
              {/* Image, date */}
              <div className="col-span-1 md:col-span-2">
                <div className="w-full relative overflow-hidden pb-100% md:pb-50% mb-2">
                  <img
                    className="absolute w-full h-full object-cover border "
                    src={thumbnail}
                  />
                </div>
                <Date
                  dateString={date}
                  className={`
                    hidden
                    md:block
                    text-2xs tracking-widest font-mono uppercase `}
                />
              </div>

              {/* Title */}
              <div className="col-span-3">
                <a
                  className="font-sans font-bold text-xl tracking-tight leading-none splat-underline"
                  dangerouslySetInnerHTML={{ __html: title }}
                />
                <div
                  className="font-mono leading-none md:leading-tight py-1 text-sm  md:font-serif md:text-base  "
                  dangerouslySetInnerHTML={{ __html: subtitle }}
                />
              </div>

              {/* Description */}
              <div
                className="hidden md:block col-span-4 lg:col-span-3 text-2xs lg:text-xs text-gray-700 font-mono "
                dangerouslySetInnerHTML={{ __html: description }}
              />

              <div className="hidden lg:block">
                {tags.map(tag => (
                  <Tag>{tag}</Tag>
                ))}
              </div>
            </div>
          </Link>
        )
      )}
    </div>
  )
}
