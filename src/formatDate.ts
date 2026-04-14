/**
 * This function converts an ISO 8601 date string into readable text.
 * @param dateString - ISO date string (e.g., "2026-04-02T19:52:00Z")
 * @returns A formatted string like "April 2, 2026", or null if the input is invalid
 * @example
 * formatDate("2026-04-02T19:52:00Z") // "April 2, 2026"
 * formatDate("blah-blah-blah") // null
 * formatDate(null) // null
 */
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
