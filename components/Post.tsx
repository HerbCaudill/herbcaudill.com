import Date from './Date'
import { PostData } from '../lib/types'

export const Post: React.FC<PostProps> = ({
  title,
  subtitle,
  date,
  contentHtml,
}) => {
  return (
    <article>
      <h1 className="font-serif font-extralight tracking-tighter leading-none text-6xl">
        {title}
      </h1>
      <h2 className="font-bold font-sans tracking-tight text-3xl mt-2">
        {subtitle}
      </h2>
      <div className="font-mono text-sm tracking-widest mt-12 mb-6">
        <Date dateString={date} />
      </div>
      <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
    </article>
  )
}
interface PostProps extends PostData {}
