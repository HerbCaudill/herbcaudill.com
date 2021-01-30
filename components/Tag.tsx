export const Tag: React.FC<TagProps> = ({ children }) => {
  return (
    <span className="rounded-md border border-gray-500 text-gray-700 uppercase text-xs font-mono inline-block px-3">
      {children}
    </span>
  )
}
interface TagProps {}
