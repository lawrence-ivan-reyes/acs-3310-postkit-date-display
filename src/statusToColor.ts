import { PostStatus } from './types'

/**
 * This function maps a post status to a color token for styling and returns semantic color names, not hex codes.
 * @param status - A PostStatus value: "draft", "review", or "published"
 * @returns A color token ("gray", "yellow", or "green"), or null if the status is invalid
 * @example
 * statusToColor("published") // "green"
 * statusToColor("draft") // "gray"
 * statusToColor("acs-3310") // null
 */
export function statusToColor(status: string): string | null {
  const colorMap: Record<PostStatus, string> = {
    draft: "gray",
    review: "yellow",
    published: "green"
  }

  if (status in colorMap) {
    return colorMap[status as PostStatus]
  }

  return null
}
