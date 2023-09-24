import fs from 'fs'
import path from 'path'
import { imageExtensions, imagesDir } from './constants'

/** Finds an image with the given name in the images directory for the given post */
const getImagePath = (name: string) => (id: string) => {
  const imageDir = path.join(imagesDir, id)
  for (const ext of imageExtensions) {
    const imagePath = path.join(imageDir, `${name}.${ext}`)
    if (fs.existsSync(imagePath)) return `/images/posts/${id}/${name}.${ext}`
  }
  return null
}

// the banner is any image file named _banner (_banner.jpg, _banner.png, etc.)
export const getBannerImage = getImagePath('_banner')

// use the banner as thumbnail if no thumbnail exists
export const getThumbnailImage = (id: string) => getImagePath('_thumbnail')(id) || getBannerImage(id)
