import { parseISO, format } from 'date-fns'

export const Date = ({ dateString, className }: { dateString: string; className?: string }) => {
  console.log({ dateString })
  const date = parseISO(dateString)
  return (
    <time dateTime={dateString} className={className}>
      {format(date, 'yyyy.LL.dd')}
    </time>
  )
}
