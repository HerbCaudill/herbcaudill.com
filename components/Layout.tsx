import Head from 'next/head'
import { Nav } from './Nav'
import { Footer } from './Footer'

export const name = 'Herb Caudill'
export const siteTitle = 'Herb Caudill | Blog'
export const year = new Date().getFullYear()

export default function Layout({ children }: { children: React.ReactNode }) {
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
        <header className="grid-in-logo ">
          <img
            className="grid-in-logo h-36 w-36 rounded-full object-cover"
            src="/images/avatar/glasses-head-sat-transp.png"
            alt={name}
          />
        </header>

        {/* Header */}
        <header className="grid-in-header flex items-center ">
          <h1 className="text-4xl font-serif tracking-tight">
            <span className="font-light">{name}</span>
            <span className="font-thin ml-3">/</span>
            <span className="font-bold font-sans text-2xl">Words</span>
          </h1>
        </header>

        <Nav />

        <main className="grid-in-content">{children}</main>

        <Footer />
      </div>
    </>
  )
}
