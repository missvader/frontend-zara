import { describe, it, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { type ReactNode } from 'react'
import { CartProvider } from '@/context/CartContext'
import { useCart } from './useCart'
import type { CartItem } from '@/types'

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

const wrapper = ({ children }: { children: ReactNode }) => <CartProvider>{children}</CartProvider>

describe('useCart', () => {
  it('throws an error when used outside CartProvider', () => {
    expect(() => renderHook(() => useCart())).toThrow('useCart must be used within CartProvider')
  })

  it('returns cart state from context', () => {
    const { result } = renderHook(() => useCart(), { wrapper })
    expect(result.current.cart.items).toHaveLength(0)
  })

  it('addItem adds an item to the cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper })
    act(() => result.current.addItem(mockItem))
    expect(result.current.cart.items).toHaveLength(1)
  })

  it('removeItem removes the item from the cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper })
    act(() => result.current.addItem(mockItem))
    act(() =>
      result.current.removeItem(mockItem.id, mockItem.color.name, mockItem.storage.capacity),
    )
    expect(result.current.cart.items).toHaveLength(0)
  })
})
