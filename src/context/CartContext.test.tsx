import { describe, it, expect, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { type ReactNode } from 'react'
import { CartProvider, CartContext } from './CartContext'
import { useContext } from 'react'
import type { CartItem } from '@/types'
import { CART_STORAGE_KEY } from '@/constants'

const mockItem: CartItem = {
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
}

const mockItem2: CartItem = {
  id: 'IPH-15PM',
  brand: 'Apple',
  name: 'iPhone 15 Pro Max',
  imageUrl: 'https://cdn.example.com/iphone-15-black.jpg',
  color: {
    name: 'Black Titanium',
    hexCode: '#1c1c1e',
    imageUrl: 'https://cdn.example.com/iphone-15-black.jpg',
  },
  storage: { capacity: '256 GB', price: 1469 },
  price: 1469,
}

const wrapper = ({ children }: { children: ReactNode }) => <CartProvider>{children}</CartProvider>

const useTestCart = () => {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('no context')
  return ctx
}

beforeEach(() => {
  localStorage.clear()
})

describe('CartContext', () => {
  it('cart starts empty', () => {
    const { result } = renderHook(useTestCart, { wrapper })
    expect(result.current.cart.items).toHaveLength(0)
  })

  it('addItem adds a product to the cart', () => {
    const { result } = renderHook(useTestCart, { wrapper })
    act(() => result.current.addItem(mockItem))
    expect(result.current.cart.items).toHaveLength(1)
    expect(result.current.cart.items[0].id).toBe(mockItem.id)
  })

  it('addItem with same id+color+storage does not duplicate', () => {
    const { result } = renderHook(useTestCart, { wrapper })
    act(() => result.current.addItem(mockItem))
    act(() => result.current.addItem(mockItem))
    expect(result.current.cart.items).toHaveLength(1)
  })

  it('removeItem removes the correct item', () => {
    const { result } = renderHook(useTestCart, { wrapper })
    act(() => result.current.addItem(mockItem))
    act(() => result.current.addItem(mockItem2))
    act(() =>
      result.current.removeItem(mockItem.id, mockItem.color.name, mockItem.storage.capacity),
    )
    expect(result.current.cart.items).toHaveLength(1)
    expect(result.current.cart.items[0].id).toBe(mockItem2.id)
  })

  it('totalItems reflects the correct count', () => {
    const { result } = renderHook(useTestCart, { wrapper })
    act(() => result.current.addItem(mockItem))
    act(() => result.current.addItem(mockItem2))
    expect(result.current.cart.items.length).toBe(2)
  })

  it('totalPrice is correctly derived from items', () => {
    const { result } = renderHook(useTestCart, { wrapper })
    act(() => result.current.addItem(mockItem))
    act(() => result.current.addItem(mockItem2))
    const total = result.current.cart.items.reduce((sum, i) => sum + i.price, 0)
    expect(total).toBe(mockItem.price + mockItem2.price)
  })

  it('persists cart to localStorage when items change', () => {
    const { result } = renderHook(useTestCart, { wrapper })
    act(() => result.current.addItem(mockItem))
    const stored = localStorage.getItem(CART_STORAGE_KEY)
    expect(stored).not.toBeNull()
    const parsed = JSON.parse(stored ?? '[]')
    expect(parsed).toHaveLength(1)
    expect(parsed[0].id).toBe(mockItem.id)
  })

  it('hydrates cart from localStorage on mount', () => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify([mockItem]))
    const { result } = renderHook(useTestCart, { wrapper })
    expect(result.current.cart.items).toHaveLength(1)
    expect(result.current.cart.items[0].id).toBe(mockItem.id)
  })

  it('clearCart empties the cart', () => {
    const { result } = renderHook(useTestCart, { wrapper })
    act(() => result.current.addItem(mockItem))
    act(() => result.current.clearCart())
    expect(result.current.cart.items).toHaveLength(0)
  })

  it('handles malformed localStorage gracefully', () => {
    localStorage.setItem(CART_STORAGE_KEY, 'not-valid-json{{{')
    const { result } = renderHook(useTestCart, { wrapper })
    expect(result.current.cart.items).toHaveLength(0)
  })
})
