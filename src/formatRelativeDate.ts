import { formatDate } from './formatDate'

const MS_PER_MINUTE = 1000 * 60
const MS_PER_HOUR = MS_PER_MINUTE * 60
const MS_PER_DAY = MS_PER_HOUR * 24

/**
 * This function returns a relative time label compared to now.
 * Dates older than 7 days fall back to formatDate output.
 * @param dateString - ISO date string (e.g., "2026-04-02T19:52:00Z")
 * @returns A relative time string like "just now", "5 min ago", "yesterday", or null if invalid
 * @example
 * formatRelativeDate("2026-04-02T20:16:00Z") // "just now" (if called immediately)
 * formatRelativeDate("2026-04-01T08:00:00Z") // "yesterday"
 * formatRelativeDate("2026-01-01T00:00:00Z") // "January 1, 2026"
 */
export function formatRelativeDate(dateString: string | null | undefined): string | null {
  if (!dateString || dateString === "") {
    return null
  }

  const date = new Date(dateString)
  
  if (isNaN(date.getTime())) {
    return null
  }

  const diffMs = Date.now() - date.getTime()

  if (diffMs < 0) {
    return formatDate(dateString)
  }

  const diffMinutes = Math.floor(diffMs / MS_PER_MINUTE)
  const diffHours = Math.floor(diffMs / MS_PER_HOUR)
  const diffDays = Math.floor(diffMs / MS_PER_DAY)

  if (diffMinutes < 1) return "just now"
  if (diffMinutes < 60) return `${diffMinutes} min ago`
  if (diffHours < 24) return `${diffHours} hours ago`
  if (diffDays === 1) return "yesterday"
  if (diffDays <= 7) return `${diffDays} days ago`

  return formatDate(dateString)
}
