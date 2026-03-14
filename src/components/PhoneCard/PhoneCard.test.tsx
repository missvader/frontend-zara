import { describe, it, expect, vi } from 'vitest'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { renderWithProviders } from '@/test/render'
import { PhoneCard } from './PhoneCard'
import type { ProductListItem } from '@/types'

const product: ProductListItem = {
  id: 'SMG-S24U',
  brand: 'Samsung',
  name: 'Galaxy S24 Ultra',
  basePrice: 1319,
  imageUrl: 'http://cdn.example.com/samsung-s24-ultra.jpg',
}

const renderCard = (onClickFn = vi.fn()) =>
  renderWithProviders(
    <MemoryRouter>
      <PhoneCard product={product} onClick={onClickFn} />
    </MemoryRouter>,
  )

describe('PhoneCard', () => {
  it('renders the product name', () => {
    renderCard()
    expect(screen.getByText('Galaxy S24 Ultra')).toBeInTheDocument()
  })

  it('renders the brand in uppercase', () => {
    renderCard()
    expect(screen.getByText('SAMSUNG')).toBeInTheDocument()
  })

  it('renders the price formatted in EUR', () => {
    renderCard()
    expect(screen.getByText(/1\.319/)).toBeInTheDocument()
  })

  it('renders the image with the correct alt text', () => {
    renderCard()
    const img = screen.getByRole('img')
    expect(img).toHaveAttribute('alt', 'Samsung Galaxy S24 Ultra')
  })

  it('converts the imageUrl to https', () => {
    renderCard()
    const img = screen.getByRole('img')
    expect(img).toHaveAttribute('src', 'https://cdn.example.com/samsung-s24-ultra.jpg')
  })

  it('calls onClick with product id when clicked', async () => {
    const handleClick = vi.fn()
    renderCard(handleClick)
    await userEvent.click(screen.getByRole('button', { name: /Samsung Galaxy S24 Ultra/i }))
    expect(handleClick).toHaveBeenCalledWith('SMG-S24U')
  })

  it('is keyboard accessible via Enter key', async () => {
    const handleClick = vi.fn()
    renderCard(handleClick)
    screen.getByRole('button', { name: /Samsung Galaxy S24 Ultra/i }).focus()
    await userEvent.keyboard('{Enter}')
    expect(handleClick).toHaveBeenCalledWith('SMG-S24U')
  })
})
