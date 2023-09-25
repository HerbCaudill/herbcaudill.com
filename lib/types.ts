export type Markdown = string & { __markdown: true }
export type Html = string & { __html: true }

export type RawMetadata = {
  title: string
  subtitle: string

  date: string
  slug: string

  description: Markdown
  caption?: Markdown
  context?: Markdown

  draft?: boolean
  tags?: string
  originalPublication?: string
  originalUrl?: string
}

export type PostMetadata = {
  id: string

  slug: string
  date: string

  title: string
  subtitle: string

  description: Html
  caption?: Html
  context?: Html

  draft?: boolean
  tags: string[]
  originalPublication?: string
  originalUrl?: string

  image: string
  thumbnail: string
}
