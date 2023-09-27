/** Given a date (2023-01-01) and a slug (my-latest-article) returns a normalized slug (20230101-my-latest-article)  */

export const getSlug = (date: string, slug: string) => `${date.replace(/-/g, '')}-${slug}`
