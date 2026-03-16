import { describe, it, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useSearch } from './useSearch'

describe('useSearch', () => {
  it('returns empty query initially', () => {
    const { result } = renderHook(() => useSearch())
    expect(result.current.inputValue).toBe('')
    expect(result.current.query).toBe('')
  })

  it('updates inputValue immediately on handleSearch', () => {
    const { result } = renderHook(() => useSearch())
    act(() => {
      result.current.handleSearch({
        target: { value: 'Samsung' },
      } as React.ChangeEvent<HTMLInputElement>)
    })
    expect(result.current.inputValue).toBe('Samsung')
  })

  it('query does not change until debounce delay passes', async () => {
    const { result } = renderHook(() => useSearch())
    act(() => {
      result.current.handleSearch({
        target: { value: 'Apple' },
      } as React.ChangeEvent<HTMLInputElement>)
    })
    expect(result.current.query).toBe('')
    await act(async () => {
      await new Promise((r) => setTimeout(r, 600))
    })
    expect(result.current.query).toBe('Apple')
  })

  it('handleClear resets inputValue to empty', () => {
    const { result } = renderHook(() => useSearch())
    act(() => {
      result.current.handleSearch({
        target: { value: 'Pixel' },
      } as React.ChangeEvent<HTMLInputElement>)
    })
    expect(result.current.inputValue).toBe('Pixel')
    act(() => result.current.handleClear())
    expect(result.current.inputValue).toBe('')
  })
})
