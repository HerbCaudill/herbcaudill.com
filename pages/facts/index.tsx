import { IndexLayout } from 'components/IndexLayout'
import { loadMarkdownFile } from 'lib/loadMarkdownFile'
import { GetStaticProps } from 'next'
import path from 'path'

const FactsIndex: React.FC<{
  content: string
  metadata: Record<string, any>
}> = ({ content, metadata }) => {
  return (
    <IndexLayout label="Facts">
      <article
        className="w-9/12"
        dangerouslySetInnerHTML={{ __html: content }}
      ></article>
    </IndexLayout>
  )
}

export default FactsIndex

const factsFilePath = path.join(process.cwd(), '/content/facts.md')

export const getStaticProps: GetStaticProps = async () => ({
  props: loadMarkdownFile(factsFilePath),
})
