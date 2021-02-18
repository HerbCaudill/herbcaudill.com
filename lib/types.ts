export type PostData = {
  id: string
  title: string
  subtitle: string
  description: string
  date: string
  content: string // markdown
  contentHtml: string
  image: string
  caption: string
  thumbnail?: string
  tags: string[]
}
