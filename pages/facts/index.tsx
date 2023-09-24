import { IndexLayout } from 'components/IndexLayout'
import fs from 'fs'
import { GetStaticProps } from 'next'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import path from 'path'

const FactsIndex = (props: MDXRemoteSerializeResult) => {
  return (
    <IndexLayout label="Facts">
      <div
        className={`
          grid grid-cols-1 md:grid-cols-12 gap-G 
          col-span-4 md:col-span-12`}
      >
        <div className="md:col-span-12 mt-12 md:mt-0">
          <article
            className={`
              md:col-start-4 md:col-span-9 
              lg:col-start-4 lg:col-span-7`}
          >
            <MDXRemote {...props} />
          </article>
        </div>
      </div>
    </IndexLayout>
  )
}

export default FactsIndex

const factsFilePath = path.join(process.cwd(), '/content/facts.md')

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: await loadMarkdownFile(factsFilePath),
  }
}

const loadMarkdownFile = async (filePath: string) => {
  const fileText = fs.readFileSync(filePath, 'utf8')
  const serialized = await serialize(fileText)
  return serialized
}
