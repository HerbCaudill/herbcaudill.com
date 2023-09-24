/** Post IDs start with the date in YYYYMMDD format */
export const getDateFromId = (id: string) => {
  const date = id.split('-')[0]
  return `${date.slice(0, 4)}-${date.slice(4, 6)}-${date.slice(6, 8)}`
}
