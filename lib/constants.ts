import path from 'path'

export const name = 'Herb Caudill'
export const siteTitle = 'Herb Caudill'
export const siteDescription = `Herb Caudill's personal site`
export const year = new Date().getFullYear()

export const postsDir = path.join(process.cwd(), '/content/posts')
export const imagesDir = path.join(process.cwd(), '/public/images/posts')

export const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg']
