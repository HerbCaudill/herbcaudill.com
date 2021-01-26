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
              flex flex-row group 
              py-2 border-t border-black
              hover:bg-gray-400 hover:bg-opacity-5 transition-all duration-500 ease-in-out
              cursor-pointer`}
          >
            <div
              className={`
                w-36 flex-shrink-0
                text-xs tracking-widest font-mono uppercase `}
            >
              <Date dateString={date} />
            </div>
            <div className="w-24 pb-8 flex-shrink-0">
              <img className="object-cover w-24 h-24" src={image} />
            </div>
            <div className="pl-3 pr-12 w-64 flex-shrink-0">
              <div>
                <a
                  className={`
                    font-serif text-2xl leading-7 
                    group-hover:bg-splat bg-bottom bg-underline bg-no-repeat`}
                  href={`/posts/${id}`}
                >
                  {title}
                </a>
              </div>
              <div className="font-bold leading-4 py-1">{subtitle}</div>
            </div>
            <div className="text-xs text-gray-700 font-mono">{description}</div>
            <div className="w-36 flex-shrink-0"></div>
          </div>
        </Link>
      ))}
    </div>
  )
}
