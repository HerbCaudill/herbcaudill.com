import { postsDir } from 'lib/constants'
import path from 'path'

export const getFileNameFromId = (id: string) => path.join(postsDir, `${id}.mdx`)
