import { formatDate } from './formatDate'

const MS_PER_MINUTE = 1000 * 60
const MS_PER_HOUR = MS_PER_MINUTE * 60
const MS_PER_DAY = MS_PER_HOUR * 24

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
