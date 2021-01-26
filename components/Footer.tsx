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
  { url: 'mailto:h@hc3.me', icon: 'envelope', label: 'h@hc3.me' },
]

export const Footer: React.FC = () => {
  return (
    <footer className="grid-in-footer text-xs font-semibold">
      <div className="flex gap-8 ">
        {links.map(d => {
          return (
            <div key={d.icon}>
              <img
                src={`/images/icons/${d.icon}.svg`}
                className="w-6 h-6 inline mr-2"
              />
              <a className="pb-1" target="_blank" href={d.url}>
                {d.label}
              </a>
            </div>
          )
        })}
      </div>
    </footer>
  )
}
