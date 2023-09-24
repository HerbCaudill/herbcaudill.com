import { nightOwl as theme } from '@codesandbox/sandpack-themes'
import { Layout } from 'components/Layout'
import { Sandpack } from '@codesandbox/sandpack-react'

const SandpackTest = () => {
  return (
    <Layout compact label="SandpackTest">
      <div
        className={`
          text-gray-700 text-base sm:text-lg font-serif 
          md:col-start-4 md:col-span-9 
          lg:col-start-0 lg:col-span-12`}
      >
        <h1 className="font-bold font-sans text-xl">Sandpack Test</h1>
        <Sandpack
          files={{
            'index.js': index,
          }}
          theme={theme}
          template="vanilla"
          options={{ layout: 'console' }}
        />
      </div>
    </Layout>
  )
}

export default SandpackTest

const index = `
const message='The eagle flies at midnight'

const encoder = new TextEncoder()
const bytes = Array.from(encoder.encode(message))

console.clear()
console.log(bytes)
`
