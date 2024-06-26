import { IndexLayout } from 'components/IndexLayout'
import { loadMdxFile } from 'lib/loadMdxFile'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { MDXRemote } from 'next-mdx-remote'
import path from 'path'

const FactsIndex = ({ serializedContent }: Props) => {
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
            <MDXRemote {...serializedContent} />
          </article>
        </div>
      </div>
    </IndexLayout>
  )
}

export default FactsIndex

const factsFilePath = path.join(process.cwd(), '/content/facts.mdx')

export const getStaticProps: GetStaticProps = async () => {
  const serializedContent = await loadMdxFile(factsFilePath)
  return {
    props: { serializedContent },
  }
}

type Props = InferGetStaticPropsType<typeof getStaticProps>
