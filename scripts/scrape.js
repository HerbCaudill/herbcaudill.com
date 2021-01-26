const fs = require('fs')
const path = require('path')
const fetch = require('node-fetch')
const mediumToMarkdown = require('medium-to-markdown')
const prettier = require('prettier')

const urls = [
  'https://medium.com/@herbcaudill/lessons-from-6-software-rewrite-stories-635e4c8f7c22',
  'https://medium.com/all-the-things/a-web-application-with-no-web-server-61000a6aed8f',
  'https://medium.com/all-the-things/data-types-for-humans-ea2dd63a19db',
  'https://medium.com/all-the-things/a-secret-agent-database-for-the-rest-of-us-de39abfb2a08',
  'https://medium.com/all-the-things/a-single-infinitely-customizable-app-for-everything-else-9abed7c5b5e7',
  'https://medium.com/all-the-things/the-trouble-with-saas-279694551b25',
]

const scrapeFromMedium = async url => {
  const markdown_raw = await mediumToMarkdown.convertFromUrl(url)
  const markdown = prettier.format(markdown_raw, { parser: 'markdown' })
  const fileName = url.replace(
    /.*\/([-a-z0-9]+)\-([a-z0-9]+)$/,
    'scrapes/$1.md'
  )
  const filePath = path.join(__dirname, fileName)
  fs.writeFileSync(filePath, markdown)
}

urls.forEach(scrapeFromMedium)
