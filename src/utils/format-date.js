export const formatToMySQLDateTime = (isoString) => {
  const date = new Date(isoString)

  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const seconds = String(date.getSeconds()).padStart(2, '0')

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}

export const formatToPrimeVueDateTime = (mysqlDateTime) => {
  const [datePart, timePart] = mysqlDateTime.split(' ')

  const [year, month, day] = datePart.split('-')
  const [hours, minutes, seconds] = timePart.split(':')

  const date = new Date(Date.UTC(year, month - 1, day, hours, minutes, seconds))

  return date.toISOString()
}
