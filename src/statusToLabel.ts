import { PostStatus } from './types'

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
