import Link from 'next/link'
import { name } from 'lib/constants'

export const Avatar = ({ size = 'lg' }: AvatarProps) => {
  return (
    <Link href="/">
      <img
        src="/images/avatar/glasses-head-sat-transp.png"
        className="w-full inline"
        style={{ maxWidth: size === 'sm' ? '3rem' : '5rem' }}
        alt={name}
      />
    </Link>
  )
}
interface AvatarProps {
  size: 'sm' | 'lg'
}
