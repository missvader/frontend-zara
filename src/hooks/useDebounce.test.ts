import { describe, it, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useDebounce } from './useDebounce'

describe('useDebounce', () => {
  it('returns the initial value immediately', () => {
    const { result } = renderHook(() => useDebounce('hello', 300))
    expect(result.current).toBe('hello')
  })

  it('updates the value after the delay', async () => {
    const { result, rerender } = renderHook(({ value }) => useDebounce(value, 100), {
      initialProps: { value: 'initial' },
    })
    rerender({ value: 'updated' })
    expect(result.current).toBe('initial')
    await act(async () => {
      await new Promise((r) => setTimeout(r, 150))
    })
    expect(result.current).toBe('updated')
  })

  it('does not update before the delay has passed', async () => {
    const { result, rerender } = renderHook(({ value }) => useDebounce(value, 300), {
      initialProps: { value: 'initial' },
    })
    rerender({ value: 'updated' })
    await act(async () => {
      await new Promise((r) => setTimeout(r, 100))
    })
    expect(result.current).toBe('initial')
  })
})
