import { describe, it, expect, vi } from 'vitest'
import { screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { renderWithProviders } from '@/test/render'
import { PhoneGrid } from './PhoneGrid'
import { mockProducts } from '@/mocks/fixtures/products'

const renderGrid = (isLoading = false) =>
  renderWithProviders(
    <MemoryRouter>
      <PhoneGrid products={mockProducts} isLoading={isLoading} onCardClick={vi.fn()} />
    </MemoryRouter>,
  )

describe('PhoneGrid', () => {
  it('renders the list of phone cards', () => {
    renderGrid()
    expect(screen.getAllByRole('article')).toHaveLength(mockProducts.length)
  })

  it('applies gridLoading class when isLoading is true', () => {
    const { container } = renderGrid(true)
    const list = container.querySelector('ul')
    expect(list).toHaveClass('gridLoading')
  })

  it('does not apply gridLoading class when isLoading is false', () => {
    const { container } = renderGrid(false)
    const list = container.querySelector('ul')
    expect(list).not.toHaveClass('gridLoading')
  })

  it('applies gridEnterOnce class on mount', () => {
    const { container } = renderGrid()
    const list = container.querySelector('ul')
    expect(list).toHaveClass('gridEnterOnce')
  })
})
