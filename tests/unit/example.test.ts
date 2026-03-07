import { describe, it, expect } from 'vitest'

describe('Example Test Suite', () => {
  it('should add numbers correctly', () => {
    expect(1 + 1).toBe(2)
  })

  it('should check string operations', () => {
    const str = 'hello'
    expect(str.toUpperCase()).toBe('HELLO')
  })
})
