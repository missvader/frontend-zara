import { render, type RenderOptions } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { type ReactNode } from 'react'
import { CartProvider } from '@/context/CartContext'

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  })

interface WrapperProps {
  children: ReactNode
}

export const renderWithProviders = (ui: ReactNode, options?: RenderOptions) => {
  const testQueryClient = createTestQueryClient()

  const Wrapper = ({ children }: WrapperProps) => (
    <QueryClientProvider client={testQueryClient}>
      <CartProvider>{children}</CartProvider>
    </QueryClientProvider>
  )

  return render(ui, { wrapper: Wrapper, ...options })
}
