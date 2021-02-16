import Link from 'next/link'

const items = ['Words', 'Pictures', 'Code', 'Facts']

export const Nav: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <nav className={`${className} border-t-8 border-black`}>
      <ul className="">
        {items.map(item => {
          return (
            <li className="my-6 group cursor-pointer" key={item}>
              <Link href={`/`}>
                <a className="py-2 uppercase font-mono tracking-widest text-xs splat-underline">
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
