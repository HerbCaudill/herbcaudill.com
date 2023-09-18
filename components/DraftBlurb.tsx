export const DraftBlurb: React.FC<{ draft: boolean; className?: string }> = ({ draft, className = '' }) =>
  draft ? (
    <div className={`mt-8 border-4 grid grid-cols-7 border-red-700  text-red-700 font-sans font ${className}`}>
      <div className="p-2 col-span-3 text-3xl font-extrabold border-r border-red-700">DRAFT</div>
      <div className="p-2 col-span-4 text-sm">
        Thanks for prereading this post! I'd love to know what you think — feel free to DM me at{' '}
        <a
          className="font-semibold hover:underline"
          target="_blank"
          href={`https://twitter.com/messages/compose?recipient_id=16202589&text=article+feedback`}
          data-screen-name="@herbcaudill"
        >
          @herbcaudill
        </a>
        . Please don't share it widely until I've published it.
      </div>
    </div>
  ) : null
