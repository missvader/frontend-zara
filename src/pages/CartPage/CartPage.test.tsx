import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { renderWithProviders } from '@/test/render'
import { CART_STORAGE_KEY } from '@/constants'
import type { CartItem } from '@/types'
import CartPage from './CartPage'

const mockItems: CartItem[] = [
  {
    id: 'SMG-S24U',
    brand: 'Samsung',
    name: 'Galaxy S24 Ultra',
    imageUrl: 'https://cdn.example.com/samsung-s24-ultra-black.jpg',
    color: {
      name: 'Titanium Black',
      hexCode: '#2d2d2d',
      imageUrl: 'https://cdn.example.com/samsung-s24-ultra-black.jpg',
    },
    storage: { capacity: '256 GB', price: 1319 },
    price: 1319,
  },
  {
    id: 'IPH-15PM',
    brand: 'Apple',
    name: 'iPhone 15 Pro Max',
    imageUrl: 'https://cdn.example.com/iphone-15-pro-max.jpg',
    color: {
      name: 'Black Titanium',
      hexCode: '#1c1c1e',
      imageUrl: 'https://cdn.example.com/iphone-15-pro-max.jpg',
    },
    storage: { capacity: '256 GB', price: 1469 },
    price: 1469,
  },
]

const seedCart = (items: CartItem[] = mockItems) => {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
}

const renderPage = () =>
  renderWithProviders(
    <MemoryRouter initialEntries={['/cart']}>
      <Routes>
        <Route path="/cart" element={<CartPage />} />
        <Route path="/" element={<div>Home page</div>} />
      </Routes>
    </MemoryRouter>,
  )

afterEach(() => {
  localStorage.removeItem(CART_STORAGE_KEY)
})

describe('CartPage', () => {
  it('renders CART (0) when empty', () => {
    renderPage()
    expect(screen.getByRole('heading', { name: 'CART (0)' })).toBeInTheDocument()
  })

  it('shows CONTINUE SHOPPING button when cart is empty', () => {
    renderPage()
    expect(screen.getByRole('button', { name: /continue shopping/i })).toBeInTheDocument()
  })

  it('PAY button is present when there are items', () => {
    seedCart()
    renderPage()
    expect(screen.getByRole('button', { name: /pay/i })).toBeInTheDocument()
  })

  describe('with items', () => {
    beforeEach(() => seedCart())

    it('renders all cart items', () => {
      renderPage()
      expect(screen.getByText('Galaxy S24 Ultra')).toBeInTheDocument()
      expect(screen.getByText('iPhone 15 Pro Max')).toBeInTheDocument()
    })

    it('renders correct heading count', () => {
      renderPage()
      expect(screen.getByRole('heading', { name: 'CART (2)' })).toBeInTheDocument()
    })

    it('shows correct total price', () => {
      renderPage()
      // 1319 + 1469 = 2788 → de-DE format: 2.788
      expect(screen.getByText('2.788 EUR')).toBeInTheDocument()
    })

    it('removes item on Eliminar click', async () => {
      const user = userEvent.setup()
      renderPage()

      await user.click(screen.getByRole('button', { name: /remove galaxy s24 ultra from cart/i }))

      await waitFor(
        () => {
          expect(screen.queryByText('Galaxy S24 Ultra')).not.toBeInTheDocument()
        },
        { timeout: 1500 },
      )
    })

    it('CONTINUE SHOPPING navigates to /', async () => {
      const user = userEvent.setup()
      renderPage()

      await user.click(screen.getByRole('button', { name: /continue shopping/i }))

      expect(await screen.findByText('Home page')).toBeInTheDocument()
    })

    it('applies fadeOut class before removing item from DOM', async () => {
      const user = userEvent.setup()
      renderPage()
      await user.click(screen.getByRole('button', { name: /remove galaxy s24 ultra from cart/i }))
      const li = screen.getByText('Galaxy S24 Ultra').closest('li')
      expect(li).toHaveClass('fadeOut')
    })
  })
})
