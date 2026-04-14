import { describe, it, expect } from 'vitest'
import { statusToColor } from '../src/statusToColor'

describe('statusToColor', () => {
  it('returns "gray" for draft status', () => {
    expect(statusToColor('draft')).toBe('gray')
  })

  it('returns "yellow" for review status', () => {
    expect(statusToColor('review')).toBe('yellow')
  })

  it('returns "green" for published status', () => {
    expect(statusToColor('published')).toBe('green')
  })

  it('returns null for invalid status', () => {
    expect(statusToColor('hello')).toBeNull()
  })

  it('returns null for empty string', () => {
    expect(statusToColor('')).toBeNull()
  })

  it('returns null for random string', () => {
    expect(statusToColor('acs-3310')).toBeNull()
  })

  it('returns null for status with wrong case', () => {
    expect(statusToColor('Draft')).toBeNull()
    expect(statusToColor('PUBLISHED')).toBeNull()
  })

  it('returns null for numeric input', () => {
    expect(statusToColor('456')).toBeNull()
  })

  it('returns null for status with extra spaces', () => {
    expect(statusToColor(' review ')).toBeNull()
  })
})
