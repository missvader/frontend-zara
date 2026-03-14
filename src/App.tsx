import { lazy, Suspense, type ReactNode } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'
import { CartProvider } from '@/context/CartContext'
import { AppLoading } from '@/components/AppLoading/AppLoading'
import { ErrorBoundary } from '@/components/ErrorBoundary/ErrorBoundary'

const ProductListPage = lazy(() => import('./pages/ProductListPage/ProductListPage'))
const ProductDetailPage = lazy(() => import('./pages/ProductDetailPage/ProductDetailPage'))
const CartPage = lazy(() => import('./pages/CartPage/CartPage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage/NotFoundPage'))

const queryClient = new QueryClient()

export const AppProviders = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={queryClient}>
    <CartProvider>{children}</CartProvider>
  </QueryClientProvider>
)

const SuspenseLayout = () => (
  <Suspense fallback={<AppLoading />}>
    <Outlet />
  </Suspense>
)

const router = createBrowserRouter([
  {
    element: <SuspenseLayout />,
    children: [
      { path: '/', element: <ProductListPage /> },
      { path: '/product/:id', element: <ProductDetailPage /> },
      { path: '/cart', element: <CartPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])

export const App = () => (
  <ErrorBoundary>
    <AppProviders>
      <RouterProvider router={router} />
    </AppProviders>
  </ErrorBoundary>
)
