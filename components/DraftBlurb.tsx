export const DraftBlurb: React.FC<{ draft: boolean; className?: string }> = ({
  draft,
  className = '',
}) =>
  draft ? (
    <div className={`border-2 border-red-700 p-3 text-red-700 font-mono text-sm ${className}`}>
      <b className="block">DRAFT ARTICLE</b> Thanks for prereading this post! Please don't share it
      widely until I've published it.
    </div>
  ) : null
