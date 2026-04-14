import { PostStatus } from './types'

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
