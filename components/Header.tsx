import Link from 'next/link'
import { name } from '../lib/constants'
import cx from 'classnames'

export const Header: React.FC<HeaderProps> = ({ title, size = 'lg' }) => {
  const lg = size === 'lg'
  return (
    <h1
      className={cx({
        'text-2xl md:text-3xl lg:text-4xl': lg,
        'text-lg md:text-xl lg:text-2xl': !lg,
      })}
    >
      <Link href="/">
        <>
          <a
            href="/"
            className={cx(
              'font-serif font-light tracking-tight',
              'splat-underline cursor-pointer'
            )}
          >
            {name}
          </a>
          <span className={cx('font-thin ml-3')}>/</span>
        </>
      </Link>
      <span
        className={cx(
          {
            'text-lg md:text-xl lg:text-2xl': lg,
            'text-sm md:text-base lg:text-lg': !lg,
          },
          'font-sans font-bold'
        )}
      >
        {title}
      </span>
    </h1>
  )
}
interface HeaderProps {
  title: string
  size?: 'sm' | 'lg'
}
