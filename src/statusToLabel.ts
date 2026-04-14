import { PostStatus } from './types'

/**
 * This function maps a post status to a display label.
 * @param status - A PostStatus value: "draft", "review", or "published"
 * @returns A human-readable label, or null if the status is invalid
 * @example
 * statusToLabel("review") // "In Review"
 * statusToLabel("draft") // "Draft"
 * statusToLabel("hello") // null
 */
export function statusToLabel(status: string): string | null {
  const statusMap: Record<PostStatus, string> = {
    draft: "Draft",
    review: "In Review",
    published: "Published"
  }

  if (status in statusMap) {
    return statusMap[status as PostStatus]
  }

  return null
}
