import { describe, test, expect } from 'vitest'
import { cn } from '@/lib/utils'

describe('cn', () => {
  test('joins class names', () => {
    expect(cn('foo', 'bar')).toBe('foo bar')
  })

  test('filters falsy values', () => {
    expect(cn('foo', false, 'bar', undefined, null, '')).toBe('foo bar')
  })

  test('returns empty string for no args', () => {
    expect(cn()).toBe('')
  })
})
