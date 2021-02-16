import Link from 'next/link'
import { name } from '../lib/constants'

export const Header: React.FC<HeaderProps> = ({ title, size = 'lg' }) => {
  return (
    <h1>
      <Link href="/">
        <>
          <a
            className={`
          ${
            size === 'lg'
              ? 'text-2xl md:text-3xl lg:text-4xl'
              : 'text-lg md:text-xl lg:text-2xl'
          }
          font-serif font-light tracking-tight
          splat-underline`}
          >
            {name}
          </a>
          <span className="font-thin ml-3">/</span>
        </>
      </Link>
      <span
        className={`
          ${
            size === 'lg'
              ? 'text-lg md:text-xl lg:text-2xl'
              : 'text-sm md:text-base lg:text-lg'
          }
        font-sans font-bold `}
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
