import Link from 'next/link'

const items = [
  'Words', //
  'Pictures',
  'Code',
  'Facts',
]

export const Nav: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <nav className={`${className} border-t-8 border-black`}>
      <ul className="">
        {items.map(item => {
          return (
            <li className="my-6 group cursor-pointer" key={item}>
              <Link href={`/${item.toLowerCase()}`}>
                <a className="py-1 uppercase font-mono tracking-widest text-sm splat-underline">
                  {item}
                </a>
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
