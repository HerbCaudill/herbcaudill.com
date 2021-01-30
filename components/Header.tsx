import Link from 'next/link'
import { name } from '../lib/constants'

export const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <h1 className="text-4xl font-serif tracking-tight">
      <Link href="/">
        <a className="font-light splat-underline">{name}</a>
      </Link>
      <span className="font-thin ml-3">/</span>
      <span className="font-bold font-sans text-2xl">{title}</span>
    </h1>
  )
}
interface HeaderProps {
  title: string
}
