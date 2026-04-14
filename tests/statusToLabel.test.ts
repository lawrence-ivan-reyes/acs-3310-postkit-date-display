import { describe, it, expect } from 'vitest'
import { statusToLabel } from '../src/statusToLabel'

describe('statusToLabel', () => {
  it('returns "Draft" for draft status', () => {
    expect(statusToLabel('draft')).toBe('Draft')
  })

  it('returns "In Review" for review status', () => {
    expect(statusToLabel('review')).toBe('In Review')
  })

  it('returns "Published" for published status', () => {
    expect(statusToLabel('published')).toBe('Published')
  })

  it('returns null for invalid status', () => {
    expect(statusToLabel('hello')).toBeNull()
  })

  it('returns null for empty string', () => {
    expect(statusToLabel('')).toBeNull()
  })

  it('returns null for random string', () => {
    expect(statusToLabel('acs-3310')).toBeNull()
  })

  it('returns null for status with wrong case', () => {
    expect(statusToLabel('Draft')).toBeNull()
    expect(statusToLabel('DRAFT')).toBeNull()
  })

  it('returns null for numeric input', () => {
    expect(statusToLabel('123')).toBeNull()
  })

  it('returns null for status with extra spaces', () => {
    expect(statusToLabel(' draft ')).toBeNull()
  })
})
