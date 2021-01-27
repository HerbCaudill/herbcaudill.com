import Link from 'next/link'
import Date from './Date'
import { PostData } from '../lib/types'

export const Posts: React.FC<{ posts: PostData[] }> = ({ posts }) => {
  return (
    <div className="flex flex-col">
      {posts.map(({ id, date, title, subtitle, description, image }) => (
        <Link href={`/posts/${id}`} key={id}>
          <div
            className={`
              flex flex-row group py-2
              border-t border-black
              hover:bg-gray-400 hover:bg-opacity-5 transition-all duration-500 ease-in-out
              cursor-pointer`}
          >
            {/* Image, date */}
            <div className="w-1/12 flex-shrink-0 -mt-2 text-xs tracking-widest font-mono uppercase mr-5">
              <div className="w-full h-12 mb-2 bg-gray-100 ">
                <img
                  className="object-cover w-full h-12 luminosity opacity-50"
                  src={image}
                />
              </div>
              <Date dateString={date} />
            </div>

            {/* Title */}
            <div className="w-3/12 flex-shrink-0 -mt-1 pr-12 ">
              <a
                className="font-serif text-2xl leading-none splat-underline"
                dangerouslySetInnerHTML={{ __html: title }}
              />
              <div
                className="font-bold py-1 leading-tight text-sm mb-12"
                dangerouslySetInnerHTML={{ __html: subtitle }}
              />
            </div>

            {/* Description */}
            <div
              className="w-4/12 flex-shrink-0 text-xs text-gray-700 font-mono "
              dangerouslySetInnerHTML={{ __html: description }}
            />

            <div className="w-3/12 flex-shrink-0">{/* Tags */}</div>
          </div>
        </Link>
      ))}
    </div>
  )
}
