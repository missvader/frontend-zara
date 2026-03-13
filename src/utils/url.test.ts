import { describe, it, expect } from 'vitest'
import { toHttps } from './url'

describe('toHttps', () => {
  it('converts http:// URLs to https://', () => {
    expect(toHttps('http://example.com/image.jpg')).toBe('https://example.com/image.jpg')
  })

  it('leaves https:// URLs unchanged', () => {
    expect(toHttps('https://example.com/image.jpg')).toBe('https://example.com/image.jpg')
  })

  it('leaves strings that are not URLs unchanged', () => {
    expect(toHttps('not-a-url')).toBe('not-a-url')
    expect(toHttps('')).toBe('')
  })
})
