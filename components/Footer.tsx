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
  { url: 'mailto:h@hc3.me', icon: 'envelope', label: 'herb@hc3.me' },
]

export const Footer: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <footer
      className={`${className} 
        grid grid-cols-4 gap-5
        border-t border-gray-400 
        p-5 py-10 md:p-0 md:py-10
        mt-5 -mx-5 md:-m-0
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
                <img
                  src={`/images/icons/${d.icon}.svg`}
                  className="w-6 h-6 inline mr-2"
                />
                <a
                  className="pb-1 text-xs font-semibold "
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
