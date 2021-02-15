import { parseISO, format } from 'date-fns'

export const Date: React.FC<{ dateString: string; className?: string }> = ({
  dateString,
  className,
}) => {
  const date = parseISO(dateString)
  return (
    <time dateTime={dateString} className={className}>
      {format(date, 'yyyy.LL.dd')}
    </time>
  )
}
