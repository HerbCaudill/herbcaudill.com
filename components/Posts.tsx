import Link from 'next/link'
import { Date } from './Date'
import { PostData } from '../lib/types'
import { Tag } from './Tag'

export const Posts: React.FC<{ posts: PostData[] }> = ({ posts }) => {
  return (
    <main className="col-span-4 md:col-start-4 md:col-span-9">
      {posts.map(
        ({ id, date, title, subtitle, description, thumbnail, tags }) => (
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
              {/* image, date */}
              <div className="col-span-1 md:col-span-2">
                <div className="w-full relative overflow-hidden pb-100% md:pb-50% mb-2">
                  <img
                    className="absolute w-full h-full object-cover border "
                    src={thumbnail}
                  />
                </div>
                <Date
                  dateString={date}
                  className={`hidden md:block text-2xs tracking-widest font-mono uppercase`}
                />
              </div>

              {/* Title */}
              <div className="col-span-3">
                <a
                  className="font-sans font-bold text-lg tracking-tight leading-none md:leading-none splat-underline"
                  dangerouslySetInnerHTML={{ __html: title }}
                />
                <div
                  className="font-mono leading-tight md:leading-tight py-1 text-sm  md:font-serif md:text-base  "
                  dangerouslySetInnerHTML={{ __html: subtitle }}
                />
              </div>

              {/* Description */}
              <div
                className="hidden md:block col-span-4 lg:col-span-3 text-xs text-gray-700 font-mono "
                dangerouslySetInnerHTML={{ __html: description }}
              />

              <div className="hidden lg:block">
                {tags.map(tag => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </div>
            </div>
          </Link>
        )
      )}
    </main>
  )
}
