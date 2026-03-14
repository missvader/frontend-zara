import { describe, it, expect, vi } from 'vitest'
import { screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { renderWithProviders } from '@/test/render'
import { SimilarProducts } from './SimilarProducts'
import { mockProducts } from '@/mocks/fixtures/products'

const similar = mockProducts.slice(0, 3)

const renderSimilar = (productId = 'SMG-S24U') =>
  renderWithProviders(
    <MemoryRouter>
      <SimilarProducts products={similar} productId={productId} onCardClick={vi.fn()} />
    </MemoryRouter>,
  )

describe('SimilarProducts', () => {
  it('renders the similar products using PhoneCard', () => {
    renderSimilar()
    expect(screen.getAllByRole('article')).toHaveLength(3)
  })

  it('has an accessible region aria-label', () => {
    renderSimilar()
    expect(screen.getByRole('region', { name: /similar/i })).toBeInTheDocument()
  })

  it('renders the section title', () => {
    renderSimilar()
    expect(screen.getByText('SIMILAR ITEMS')).toBeInTheDocument()
  })
})
