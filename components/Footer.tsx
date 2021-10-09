const links = [
  {
    url: 'https://github.com/herbcaudill',
    icon: 'github',
    label: 'herbcaudill',
  },
  {
    url: 'https://twitter.com/herbcaudill',
    icon: 'twitter',
    label: '@herbcaudill',
  },
  {
    url: 'mailto:herb@herbcaudill.com',
    icon: 'envelope',
    label: 'herb@herbcaudill.com',
  },
]

export const Footer: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <footer
      className={`${className} 
        grid grid-cols-4 gap-G
        border-t border-gray-400 
        p-G py-10 md:p-0 md:py-10
        mt-G -mx-G md:-m-0
        `}
    >
      <>
        <div className="hidden md:block col-span-1 font-mono text-2xs">
          &copy; {new Date().getFullYear()} Herb Caudill
        </div>
        <div className="col-span-3 flex flex-col gap-2">
          {links.map(d => {
            return (
              <div key={d.icon}>
                <img src={`/images/icons/${d.icon}.svg`} className="w-6 h-6 inline mr-2" />
                <a
                  className="pb-1 text-xs font-semibold ink-underline-on-hover"
                  target="_blank"
                  href={d.url}
                >
                  {d.label}
                </a>
              </div>
            )
          })}
        </div>
      </>
    </footer>
  )
}
