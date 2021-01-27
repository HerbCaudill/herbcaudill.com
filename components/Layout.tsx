import Head from 'next/head'
import { Nav } from './Nav'
import { Footer } from './Footer'
import Link from 'next/link'
import { name, siteTitle } from './constants'

export const Layout: React.FC<LayoutProps> = ({ children, header }) => {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content={siteTitle} />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <div className="container mx-auto h-screen grid grid-cols-md grid-rows-md grid-areas-md gap-x-24 gap-y-4">
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
