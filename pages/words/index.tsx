import { IndexLayout } from 'components/IndexLayout'
import { Posts } from 'components/Posts'
import fs from 'fs'
import { byDateDescending } from 'lib/byDateDescending'
import { postsDir } from 'lib/constants'
import { getIdFromFilename } from 'lib/getIdFromFilename'
import { getPostMetadata } from 'lib/posts'
import { RawMetadata } from 'lib/types'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { serialize } from 'next-mdx-remote/serialize'
import path from 'path'

const WordsIndex = ({ posts }: Props) => {
  return (
    <IndexLayout label="Words">
      <Posts posts={posts} includeDrafts={false} />
    </IndexLayout>
  )
}

export default WordsIndex

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      posts: await getAllPosts(),
    },
  }
}

const getAllPosts = async () => {
  const posts = await Promise.all(
    fs.readdirSync(postsDir).map(async fileName => {
      const id = getIdFromFilename(fileName)
      const fileText = fs.readFileSync(path.join(postsDir, fileName), 'utf8')

      // use next-mdx-remote to parse frontmatter for each file
      const serialized = await serialize(fileText, { parseFrontmatter: true })
      const data = serialized.frontmatter as RawMetadata

      // process the metadata
      return getPostMetadata({ id, data })
    })
  )
  return posts.sort(byDateDescending)
}

type Props = InferGetStaticPropsType<typeof getStaticProps>
