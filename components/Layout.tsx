import { Avatar } from './Avatar'
import { Footer } from './Footer'
import { Header } from './Header'
import cx from 'classnames'
export const Layout: React.FC<LayoutProps> = ({
  children,
  label,
  compact = false,
}) => {
  return (
    <>
      <div
        className={`
          container 
          grid gap-G
          grid-cols-4 md:grid-cols-12 
          w-full max-w-full md:max-w-screen-lg lg:max-w-screen-xl
          md:m-auto`}
        // smaller than this & we just shrink to fit
        style={{ minWidth: 300 }}
      >
        <header
          className={cx(
            { 'py-12': !compact },
            'text-center',
            'md:col-span-2 lg:col-span-1'
          )}
        >
          <Avatar size={compact ? 'sm' : 'lg'} />
        </header>

        <header
          className={`
          col-start-2 md:col-start-4 
          col-span-3 md:col-span-9
          flex items-center `}
        >
          <Header title={label} size={compact ? 'sm' : 'lg'} />
        </header>
        {children}

        <Footer className="col-span-4 md:col-span-12 " />
      </div>
    </>
  )
}
interface LayoutProps {
  label: string
  compact?: boolean
}
