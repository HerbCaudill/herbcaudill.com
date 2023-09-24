import 'theme/index.css'
import { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="p-G">
      <Component {...pageProps} />
    </div>
  )
}
