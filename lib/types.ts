export type PostData = {
  id: string

  title: string
  subtitle: string

  date: string

  description: string
  content: string

  draft: boolean

  image?: string
  caption?: string
  thumbnail: string

  tags: string[]

  originalPublication: string
  originalUrl: string
  context: string
}
