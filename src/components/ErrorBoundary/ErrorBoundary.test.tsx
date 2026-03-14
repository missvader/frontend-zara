import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ErrorBoundary } from './ErrorBoundary'

const ThrowingChild = () => {
  throw new Error('render error')
}

describe('ErrorBoundary', () => {
  it('shows the fallback UI when a child throws a render error', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {})
    render(
      <ErrorBoundary>
        <ThrowingChild />
      </ErrorBoundary>,
    )
    expect(screen.getByRole('alert')).toBeInTheDocument()
    spy.mockRestore()
  })
})
