import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { formatRelativeDate } from '../src/formatRelativeDate'

describe('formatRelativeDate', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('returns "just now" for dates less than 1 minute ago', () => {
    const now = new Date('2026-04-09T12:00:00Z')
    vi.setSystemTime(now)
    
    const thirtySecondsAgo = new Date(now.getTime() - 30 * 1000).toISOString()
    expect(formatRelativeDate(thirtySecondsAgo)).toBe('just now')
  })

  it('returns "X min ago" for dates less than 60 minutes ago', () => {
    const now = new Date('2026-04-09T12:00:00Z')
    vi.setSystemTime(now)
    
    const fiveMinutesAgo = new Date(now.getTime() - 5 * 60 * 1000).toISOString()
    expect(formatRelativeDate(fiveMinutesAgo)).toBe('5 min ago')
  })

  it('returns "X hours ago" for dates less than 24 hours ago', () => {
    const now = new Date('2026-04-09T12:00:00Z')
    vi.setSystemTime(now)
    
    const threeHoursAgo = new Date(now.getTime() - 3 * 60 * 60 * 1000).toISOString()
    expect(formatRelativeDate(threeHoursAgo)).toBe('3 hours ago')
  })

  it('returns "yesterday" for dates exactly 1 day ago', () => {
    const now = new Date('2026-04-09T12:00:00Z')
    vi.setSystemTime(now)
    
    const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString()
    expect(formatRelativeDate(oneDayAgo)).toBe('yesterday')
  })

  it('returns "X days ago" for dates 2-7 days ago', () => {
    const now = new Date('2026-04-09T12:00:00Z')
    vi.setSystemTime(now)
    
    const threeDaysAgo = new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000).toISOString()
    expect(formatRelativeDate(threeDaysAgo)).toBe('3 days ago')
  })

  it('returns formatted date for dates more than 7 days ago', () => {
    const now = new Date('2026-04-09T12:00:00Z')
    vi.setSystemTime(now)
    
    const tenDaysAgo = new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000).toISOString()
    expect(formatRelativeDate(tenDaysAgo)).toBe('March 30, 2026')
  })

  it('returns formatted date for future dates', () => {
    const now = new Date('2026-04-09T12:00:00Z')
    vi.setSystemTime(now)
    
    const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000).toISOString()
    expect(formatRelativeDate(tomorrow)).toBe('April 10, 2026')
  })

  it('returns null for invalid date string', () => {
    expect(formatRelativeDate('not-a-date')).toBeNull()
  })

  it('returns null for empty string', () => {
    expect(formatRelativeDate('')).toBeNull()
  })

  it('returns null for null input', () => {
    expect(formatRelativeDate(null)).toBeNull()
  })

  it('returns null for undefined input', () => {
    expect(formatRelativeDate(undefined)).toBeNull()
  })

  it('handles edge case at exactly 60 minutes', () => {
    const now = new Date('2026-04-09T12:00:00Z')
    vi.setSystemTime(now)
    
    const sixtyMinutesAgo = new Date(now.getTime() - 60 * 60 * 1000).toISOString()
    expect(formatRelativeDate(sixtyMinutesAgo)).toBe('1 hours ago')
  })

  it('handles edge case at exactly 24 hours', () => {
    const now = new Date('2026-04-09T12:00:00Z')
    vi.setSystemTime(now)
    
    const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString()
    expect(formatRelativeDate(twentyFourHoursAgo)).toBe('yesterday')
  })

  it('handles dates at exactly 7 days ago', () => {
    const now = new Date('2026-04-09T12:00:00Z')
    vi.setSystemTime(now)
    
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString()
    expect(formatRelativeDate(sevenDaysAgo)).toBe('7 days ago')
  })
})
