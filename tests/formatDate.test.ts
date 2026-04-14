import { describe, it, expect } from 'vitest'
import { formatDate } from '../src/formatDate'

describe('formatDate', () => {
  it('formats a valid ISO date string to readable format', () => {
    expect(formatDate('2026-04-02T19:52:00Z')).toBe('April 2, 2026')
  })

  it('formats a date-only string correctly', () => {
    expect(formatDate('2026-01-15')).toBe('January 15, 2026')
  })

  it('handles dates without timezone as UTC', () => {
    expect(formatDate('2026-12-25T00:00:00')).toBe('December 25, 2026')
  })

  it('returns null for invalid date string', () => {
    expect(formatDate('blah-blah-blah')).toBeNull()
  })

  it('returns null for empty string', () => {
    expect(formatDate('')).toBeNull()
  })

  it('returns null for null input', () => {
    expect(formatDate(null)).toBeNull()
  })

  it('returns null for undefined input', () => {
    expect(formatDate(undefined)).toBeNull()
  })

  it('formats future dates normally', () => {
    expect(formatDate('2030-06-15T12:00:00Z')).toBe('June 15, 2030')
  })

  it('formats dates at the start of the year', () => {
    expect(formatDate('2026-01-01T00:00:00Z')).toBe('January 1, 2026')
  })

  it('formats dates at the end of the year', () => {
    expect(formatDate('2026-12-31T23:59:59Z')).toBe('December 31, 2026')
  })

  it('returns null for impossible dates', () => {
    expect(formatDate('2026-13-40')).toBeNull()
  })
})
