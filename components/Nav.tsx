import Link from 'next/link'

const items = ['Words', 'Pictures', 'Projects', 'Facts']

export const Nav: React.FC = () => {
  return (
    <nav className="grid-in-nav border-t-8 border-black">
      <ul className="">
        {items.map(item => {
          return (
            <li className="my-6 group cursor-pointer" key={item}>
              <Link href={`/`}>
                <a
                  className="py-2 uppercase font-mono tracking-widest text-xs"
                  href={`/`}
                >
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
