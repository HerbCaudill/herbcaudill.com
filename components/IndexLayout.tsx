import { Nav } from 'components/Nav'
import { Layout } from 'components/Layout'

export const IndexLayout = ({ children, label }: Props) => {
  return (
    <Layout label={label}>
      <Nav className={`hidden md:block md:col-span-2 lg:col-span-1`} />

      <main className="col-span-4 md:col-start-4 md:col-span-9">{children}</main>
    </Layout>
  )
}
interface Props {
  children: React.ReactNode
  label: string
}
