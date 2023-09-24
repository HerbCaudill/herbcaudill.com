import { PostMetadata } from './types'

export const byDateDescending = (a: PostMetadata, b: PostMetadata) => (a.date < b.date ? 1 : -1)
