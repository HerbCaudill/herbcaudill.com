export const DraftBlurb: React.FC<{ draft: boolean; className?: string }> = ({ draft, className = '' }) =>
  draft ? (
    <div
      className={`border-4 flex flex-col  border-red-700 text-red-700 mt-8 ${className}
      sm:flex-row md:w-5/9`}
    >
      <div
        className={`p-2 text-2xl font-extrabold font-sans border-b border-red-700
        sm:text-3xl sm:border-b-0 sm:border-r sm:pr-12`}
      >
        DRAFT
      </div>
      <div
        className={`p-2 text-2xs font-mono
          sm:text-xs`}
      >
        Thanks for prereading this post! I'd love to know what you think — feel free to email me at{' '}
        <a className="font-semibold ink-underline-on-hover " target="_blank" href="mailto:herb@herbcaudill.com">
          herb@herbcaudill.com
        </a>
        . Please don't share it widely until I've published it.
      </div>
    </div>
  ) : null
