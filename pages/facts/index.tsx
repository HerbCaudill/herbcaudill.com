import { IndexLayout } from 'components/IndexLayout'
import { loadMarkdownFile } from 'lib/loadMarkdownFile'
import { Html } from 'lib/types'
import { GetStaticProps } from 'next'
import path from 'path'

const FactsIndex = ({ content }: { content: Html }) => {
  return (
    <IndexLayout label="Facts">
      <div
        className={`
                  grid grid-cols-1 md:grid-cols-12 gap-G 
                  col-span-4 md:col-span-12
      `}
      >
        <div className="md:col-span-12 mt-12 md:mt-0">
          <article
            className={`
        md:col-start-4 md:col-span-9 
        lg:col-start-4 lg:col-span-7
        
        `}
            dangerouslySetInnerHTML={{ __html: content }}
          ></article>
        </div>
      </div>
    </IndexLayout>
  )
}

export default FactsIndex

const factsFilePath = path.join(process.cwd(), '/content/facts.md')

export const getStaticProps: GetStaticProps = async () => ({
  props: loadMarkdownFile(factsFilePath),
})
