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
          container h-screen mx-auto px-4
          sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg 
          grid grid-cols-md grid-rows-md grid-areas-layout-md gap-x-24 gap-y-4`}
      >
        {/* Avatar */}
        <header className="grid-in-logo  ">
          <Link href="/">
            <img
              className="grid-in-logo h-36 w-36 rounded-full object-cover"
              src="/images/avatar/glasses-head-sat-transp.png"
              alt={name}
            />
          </Link>
        </header>

        <header className="grid-in-header flex items-center ">{header}</header>

        <Nav />

        <main className="grid-in-content">{children}</main>

        <Footer />
      </div>
    </>
  )
}

interface LayoutProps {
  header: React.ReactNode
}
