import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { CartItem } from './CartItem'
import type { CartItem as CartItemType } from '@/types'

const item: CartItemType = {
  id: 'SMG-S24U',
  brand: 'Samsung',
  name: 'Galaxy S24 Ultra',
  imageUrl: 'http://cdn.example.com/samsung-s24-ultra-black.jpg',
  color: {
    name: 'Titanium Black',
    hexCode: '#2d2d2d',
    imageUrl: 'http://cdn.example.com/black.jpg',
  },
  storage: { capacity: '256 GB', price: 1319 },
  price: 1319,
}

describe('CartItem', () => {
  it('renders the product name', () => {
    render(<CartItem item={item} onRemove={vi.fn()} />)
    expect(screen.getByText('Galaxy S24 Ultra')).toBeInTheDocument()
  })

  it('renders the selected color and storage', () => {
    render(<CartItem item={item} onRemove={vi.fn()} />)
    expect(screen.getByText(/Titanium Black/)).toBeInTheDocument()
    expect(screen.getByText(/256 GB/)).toBeInTheDocument()
  })

  it('renders the price', () => {
    render(<CartItem item={item} onRemove={vi.fn()} />)
    expect(screen.getByText(/1\.319/)).toBeInTheDocument()
  })

  it('renders the image with the correct alt and converts to https', () => {
    render(<CartItem item={item} onRemove={vi.fn()} />)
    const img = screen.getByRole('img')
    expect(img).toHaveAttribute('alt', 'Samsung Galaxy S24 Ultra')
    expect(img).toHaveAttribute('src', 'https://cdn.example.com/samsung-s24-ultra-black.jpg')
  })

  it('calls onRemove when Eliminar is clicked', async () => {
    const handleRemove = vi.fn()
    render(<CartItem item={item} onRemove={handleRemove} />)
    await userEvent.click(screen.getByRole('button', { name: /Remove Galaxy S24 Ultra/i }))
    expect(handleRemove).toHaveBeenCalledTimes(1)
  })

  it('Eliminar button has an accessible aria-label', () => {
    render(<CartItem item={item} onRemove={vi.fn()} />)
    expect(
      screen.getByRole('button', { name: /Remove Galaxy S24 Ultra from cart/i }),
    ).toBeInTheDocument()
  })
})
