import cx from 'classnames'
import Link from 'next/link'
import { useRouter } from 'next/router'

const items = [
  'Words',
  // 'Pictures',
  // 'Projects',
  'Facts',
]

export const Nav = ({ className }: { className?: string }) => {
  const router = useRouter()

  return (
    <nav className={`${className} border-t-8 border-black`}>
      <ul className="uppercase font-mono tracking-widest text-xs ">
        {items.map((item, i) => {
          const url = '/' + item.toLowerCase()
          const isActive = router.pathname.startsWith(url)
          return (
            <li className="my-7 py-1 group cursor-pointer " key={item}>
              <Link
                href={url}
                className={cx('py-1', 'ink-underline-on-hover', {
                  'font-bold': isActive,
                })}
              >
                {item}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
