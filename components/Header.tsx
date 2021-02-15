import Link from 'next/link'
import { name } from '../lib/constants'

export const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <h1 className="text-2xl md:text-3xl lg:text-4xl font-serif tracking-tight">
      <Link href="/">
        <a className="font-light splat-underline">{name}</a>
      </Link>
      <span className="font-thin ml-3">/</span>
      <span className="font-bold font-sans text-lg md:text-xl lg:text-2xl">
        {title}
      </span>
    </h1>
  )
}
interface HeaderProps {
  title: string
}
