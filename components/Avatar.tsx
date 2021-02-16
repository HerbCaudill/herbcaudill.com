import Link from 'next/link'
import { name } from '../lib/constants'

export const Avatar: React.FC<AvatarProps> = ({ size = 'lg' }) => {
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
