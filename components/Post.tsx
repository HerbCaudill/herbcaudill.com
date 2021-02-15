import { Date } from './Date'
import { PostData } from '../lib/types'

export const Post: React.FC<PostProps> = ({
  title,
  subtitle,
  description,
  date,
  contentHtml,
}) => {
  return (
    <div>
      <p className="mt-0 font-mono text-xs">
        “As if source code <i>rusted!</i>” — <i>Joel Spolsky</i>
      </p>
      <h1 className="font-serif font-extralight tracking-tighter leading-none text-6xl mt-12">
        {title}
      </h1>
      <h2 className="font-bold font-sans tracking-tight text-3xl mt-2">
        {subtitle}
      </h2>
      <p className="my-6 font-mono text-left">{description}</p>
      <div className="border-t border-gray-400 pt-4 mt-12 mb-6">
        <span className="font-sans font-bold text-sm mr-4">Herb Caudill</span>
        <Date
          className="font-sans text-xs tracking-extrawide "
          dateString={date}
        />
      </div>
      <article dangerouslySetInnerHTML={{ __html: contentHtml }} />
      {/* 
      <article className="text-xl font-serif font-regular pr-48">
        <blockquote>
          <p>
            “As if source code <em>rusted!”</em> — <em>Joel Spolsky</em>
          </p>
        </blockquote>
        <p>
          Almost two decades ago, Joel Spolsky excoriated Netscape for rewriting
          their codebase in his landmark essay{' '}
          <a href="https://www.joelonsoftware.com/2000/04/06/things-you-should-never-do-part-i/">
            Things You Should Never Do
          </a>
          .
        </p>
        <p>
          He concluded that{' '}
          <strong>
            a functioning application should never, ever be rewritten from the
            ground up
          </strong>
          . His argument turned on two points:
        </p>
        <ul>
          <li>
            The crufty-looking parts of the application’s codebase often embed
            hard-earned knowledge about corner cases and weird bugs.
          </li>
          <li>
            A rewrite is a lengthy undertaking that keeps you from improving on
            your existing product, during which time the competition is gaining
            on you.
          </li>
        </ul>

        <p>
          Not that it mattered. In the three years that Netscape stood still,
          Internet Explorer had taken all of its remaining market share:
        </p>
        <div className="Image -ml-48 ">
          <img
            src="https://miro.medium.com/1*2AJ0RM43DGspNNuRYSOtVA.png"
            className="border"
          />
          <caption>
            When the rewrite began, Netscape was losing ground quickly to
            Microsoft’s Internet Explorer. When the new browser was finally
            released three years later, it was buggy and slow; meanwhile
            Netscape’s market share had dwindled to practically nothing. (Chart
            adapted from{' '}
            <a href="https://en.wikipedia.org/wiki/Usage_share_of_web_browsers">
              Wikipedia
            </a>
            .)
          </caption>
        </div>
        <p>
          In 1999, while the rewrite was underway, AOL had acquired Netscape in
          a deal valued at $10 billion.
        </p>
        <p>
          Just two years after Netscape 6.0 was released, the Netscape team
          within AOL was disbanded.
        </p>
        <p>
          Mozilla, the open-source community that Netscape had created, would go
          on to release the Firefox browser in 2002 — after yet <em>another</em>
          ground-up rewrite. Firefox did manage to gain back some market share
          from Microsoft.
        </p>
      </article> */}
    </div>
  )
}
interface PostProps extends PostData {}
