import Link from 'next/link'
import { name } from 'lib/constants'
import cx from 'classnames'

export const Header = ({ title, size = 'lg' }: HeaderProps) => {
  const lg = size === 'lg'
  return (
    <h1
      className={cx('py-2 ', {
        'text-xl sm:text-2xl md:text-3xl lg:text-4xl': lg,
        'text-lg md:text-xl lg:text-2xl': !lg,
      })}
    >
      <Link
        href="/"
        className={cx(
          'font-serif font-light tracking-tight',
          'ink-underline-on-hover cursor-pointer whitespace-nowrap'
        )}
      >
        {name}
        <span className={cx('font-thin ml-3')}>/</span>
      </Link>
      <span
        className={cx(
          {
            'text-base sm:text-lg md:text-xl lg:text-2xl': lg,
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
