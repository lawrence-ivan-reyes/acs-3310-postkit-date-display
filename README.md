# PostKit: Date & Status Display Library
## Purpose
Format dates and post status values into display strings.

## Exports
### `formatDate(dateString: string | null | undefined): string | null`
Converts an ISO 8601 date string into readable text.

- Input: `dateString` - ISO date string (e.g., 2026-04-02T19:52:00Z")
- Output: formatted string like `"April 2, 2026"` or `null` if invalid 

---

### `formatRelativeDate(dateString: string | null | undefined): string | null`
Returns a relative time label compared to now.

- Input: `dateString` - ISO date string 
- Output: A label or `null` if invalid

| **Condition**     | **Output**                  |
| ----------------- | --------------------------- |
| < 1 min ago       | "just now"                  |
| < 60 min ago      | "x min ago"                 |
| < 24 hours ago    | "x hours ago"               |
| 1 day ago         | "yesterday"                 |
| 2-7 days ago      | "x days ago"                |
| 7+ days ago       | Same output as `formatDate` |

---

### `statusToLabel(status: string): string | null`
Maps a status to a display label.

- Input: `status` - see `PostStatus` below
- Output: Label string, or `null` if invalid

| **Input**   | **Output**  |
| ----------- | ----------- |
| "draft"     | "Draft"     |
| "review"    | "In Review" |
| "published" | "Published" |

---

### `statusToColor(status: string): string | null`
Maps a status to a colour token for styling.

- Input: `status` - see `PostStatus` below
- Output: token string or `null` if invalid

| **Input**   | **Output** |
| ----------- | -----------|
| "draft"     | "gray"     |
| "review"    | "yellow"   |
| "published" | "green"    |

---

## Types
### `PostStatus`
The set of supported status strings.

```ts
export type PostStatus = "draft" | "review" | "published"
```

## Example Usage
```ts
import { formatDate, formatRelativeDate, statusToLabel, statusToColor } from "postkit-date-status-display" 
 
formatDate("2026-04-02T20:16:00Z") // "April 2, 2026" 
formatDate("blah-blah-blah") // null 

formatRelativeDate("2026-04-02T20:16:00Z") // "just now" 
formatRelativeDate("2026-04-01T08:00:00Z") // "yesterday" 
formatRelativeDate("2026-01-01T00:00:00Z") // "January 1, 2026" 

statusToLabel("review") // "In Review" 
statusToLabel("hello") // null 

statusToColor("published") // "green" 
statusToColor("acs-3310") // null
```

## Edge Cases
| **Scenario**                       | **Behaviour**                                        |
| ---------------------------------- | ---------------------------------------------------- |
| Dates with no timezone             | Treated as UTC, returns formatted date               |
| Future date (`formatDate`)         | Formats normally, no special handling                |
| Future date (`formatRelativeDate`) | Returns same output as `formatDate`                  |
| Empty string `""`                  | Returns `null`                                       |
| `null` or `undefined` passed in    | Returns `null`                                       |
| Invalid status (e.g. `"hello"`)    | `statusToLabel` and `statusToColor` return `null`    |

## Design Notes
- Relative dates stop at 7 days - beyond this should fall back to the absolute date
  - "2 months ago" gets vague and can be hard to trust - showing the actual date is clearer and more useful
- `null` instead of throwing an error keeps the UI code simple
  - If a function throws an error, the app crashes unless there's extra code to catch it
- Colour tokens are semantic names, not hex codes - consumer decides what "green" means in their UI
  - This way, the consumer can actually control what those colours look like in their app

### Timezone-less inputs are treated as UTC
ISO-style strings without a timezone (like `"2026-04-02T19:52:00"`) can be interpreted differently depending on where they’re run. Treating them as UTC keeps things predictable and avoids surprises when the same data is formatted on different machines.
