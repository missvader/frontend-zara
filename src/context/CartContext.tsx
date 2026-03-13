import { createContext, useReducer, useEffect, type ReactNode } from 'react'
import type { CartState, CartItem } from '@/types'
import { CART_STORAGE_KEY } from '@/constants'

interface CartContextValue {
  cart: CartState
  addItem: (item: CartItem) => void
  removeItem: (id: string, colorName: string, capacity: string) => void
  clearCart: () => void
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'REMOVE_ITEM'; id: string; colorName: string; capacity: string }
  | { type: 'CLEAR_CART' }
  | { type: 'HYDRATE'; payload: CartItem[] }

const initialState: CartState = { items: [] }

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const exists = state.items.some(
        (i) =>
          i.id === action.payload.id &&
          i.color.name === action.payload.color.name &&
          i.storage.capacity === action.payload.storage.capacity,
      )
      if (exists) return state
      return { items: [...state.items, action.payload] }
    }
    case 'REMOVE_ITEM':
      return {
        items: state.items.filter(
          (i) =>
            !(
              i.id === action.id &&
              i.color.name === action.colorName &&
              i.storage.capacity === action.capacity
            ),
        ),
      }
    case 'CLEAR_CART':
      return { items: [] }
    case 'HYDRATE':
      return { items: action.payload }
    default:
      return state
  }
}

export const CartContext = createContext<CartContextValue | null>(null)

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, dispatch] = useReducer(cartReducer, initialState)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored) as CartItem[]
        if (Array.isArray(parsed)) {
          dispatch({ type: 'HYDRATE', payload: parsed })
        }
      }
    } catch {
      // malformed localStorage — start with empty cart
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart.items))
  }, [cart.items])

  const addItem = (item: CartItem) => dispatch({ type: 'ADD_ITEM', payload: item })

  const removeItem = (id: string, colorName: string, capacity: string) =>
    dispatch({ type: 'REMOVE_ITEM', id, colorName, capacity })

  const clearCart = () => dispatch({ type: 'CLEAR_CART' })

  return (
    <CartContext.Provider value={{ cart, addItem, removeItem, clearCart }}>
      {children}
    </CartContext.Provider>
  )
}
