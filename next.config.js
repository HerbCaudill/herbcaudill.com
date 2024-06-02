/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'], // add mdx
  redirects() {
    return [
      {
        source: '/',
        destination: '/words',
        permanent: true,
      },
    ]
  },
  rewrites() {
    return [
      {
        source: '/words/drafts',
        destination: '/words?includeDrafts=true',
      },
    ]
  },
  webpack: config => {
    config.resolve.fallback = { fs: false }

    return config
  },
}

const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    // If you use remark-gfm, you'll need to use next.config.mjs
    // as the package is ESM only
    // https://github.com/remarkjs/remark-gfm#install
    // remarkPlugins: [],
    // rehypePlugins: [],
  },
})

// Merge MDX config with Next.js config
module.exports = withMDX(nextConfig)
