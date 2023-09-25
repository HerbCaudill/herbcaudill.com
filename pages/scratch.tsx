import highlight from 'rehype-highlight'
import gfm from 'remark-gfm'
import smartypants from 'remark-smartypants'
import { Layout } from 'components/Layout'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'

import fs from 'fs'
import path from 'path'

export default function TestPage({ mdx, source }: { mdx: string; source: MDXRemoteSerializeResult }) {
  return (
    <Layout compact label="Scratch">
      <div
        className={`
          text-gray-700 text-base sm:text-lg font-serif 
          md:col-start-4 md:col-span-9 
          lg:col-start-4 lg:col-span-7`}
      >
        <article>
          <MDXRemote {...source} />

          {/* <pre className="text-sm">{mdx}</pre> */}
        </article>
      </div>
    </Layout>
  )
}

export async function getStaticProps() {
  const mdx = fs.readFileSync(path.join(process.cwd(), 'content/scratch.mdx'), 'utf8')

  const source = await serialize(mdx, {
    parseFrontmatter: true,
    mdxOptions: {
      remarkPlugins: [
        gfm, // github-flavored markdown
        smartypants, // smart quotes
      ],
      rehypePlugins: [
        // @ts-ignore - types are wrong
        highlight, // code syntax highlighting
      ],
    },
  })
  return { props: { mdx, source } }
}
