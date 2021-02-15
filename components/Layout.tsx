import Head from 'next/head'
import { Nav } from './Nav'
import { Footer } from './Footer'
import Link from 'next/link'
import { name, siteTitle } from '../lib/constants'

export const Layout: React.FC<LayoutProps> = ({ children, header }) => {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content={siteTitle} />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <div
        className={`
          container 
          grid grid-cols-4 gap-5
          md:grid-cols-12 md:max-w-screen-lg md:m-auto
          lg:max-w-screen-xl
          w-full
          `}
      >
        {/* Avatar */}
        <header className="-mx-1 md:-mx-0 md:col-span-2 lg:col-span-1 text-center">
          <Link href="/">
            <img
              src="/images/avatar/glasses-head-sat-transp.png"
              className="w-full inline"
              style={{ maxWidth: '5rem' }}
              alt={name}
            />
          </Link>
        </header>

        {/* Herb Caudill/Words etc. */}
        <header className="col-start-2 col-span-3 md:col-start-4 md:col-span-9 flex items-center ">
          {header}
        </header>

        {/* Words / Pictures / Facts */}
        <Nav className="hidden md:block md:col-span-2 lg:col-span-1" />

        {/* Main content area */}
        <main className="col-span-4 md:col-start-4 md:col-span-9">
          {children}
        </main>

        {/* github/twitter/email links */}
        <Footer className="col-span-4 md:col-span-12 " />
      </div>
    </>
  )
}

interface LayoutProps {
  header: React.ReactNode
}
