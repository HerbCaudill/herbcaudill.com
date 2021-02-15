import '../theme/global.css'
import { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="p-5">
      <Component {...pageProps} />
    </div>
  )
}
