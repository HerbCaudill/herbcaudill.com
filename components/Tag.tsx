export const Tag: React.FC<TagProps> = ({ children }) => {
  return (
    <span className="border border-gray-500 text-gray-700 uppercase text-2xs font-mono inline-block px-2 py-1">
      {children}
    </span>
  )
}
interface TagProps {}
