export function formatDate(dateString: string | null | undefined): string | null {
  if (!dateString || dateString === "") {
    return null
  }

  const date = new Date(dateString)
  
  if (isNaN(date.getTime())) {
    return null
  }

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ]

  const month = months[date.getUTCMonth()]
  const day = date.getUTCDate()
  const year = date.getUTCFullYear()

  return `${month} ${day}, ${year}`
}
