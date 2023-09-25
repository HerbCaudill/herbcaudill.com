import 'highlight.js/styles/rainbow.css'
import { AppProps } from 'next/app'
import 'theme/index.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="p-G">
      <Component {...pageProps} />
    </div>
  )
}
