import { Head } from 'components/Head'
import { Nav } from 'components/Nav'
import { siteDescription, siteTitle } from 'lib/constants'
import { Layout } from 'components/Layout'

export const IndexLayout: React.FC<IndexLayoutProps> = ({
  children,
  label,
}) => {
  return (
    <Layout label={label}>
      <Head>
        <title>{`${siteTitle} | ${label}`}</title>
        <meta name="og:title" content={`${siteTitle} | ${label}`} />
        <meta name="description" content={siteDescription} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <Nav className={`hidden md:block md:col-span-2 lg:col-span-1`} />

      <main className="col-span-4 md:col-start-4 md:col-span-9">
        {children}
      </main>
    </Layout>
  )
}
interface IndexLayoutProps {
  label: string
}
