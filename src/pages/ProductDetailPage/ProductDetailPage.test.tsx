import { describe, it, expect } from 'vitest'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { http, HttpResponse } from 'msw'
import { renderWithProviders } from '@/test/render'
import { mockProductDetail } from '@/mocks/fixtures/productDetail'
import { server } from '@/mocks/server'
import ProductDetailPage from './ProductDetailPage'

const renderPage = (id = mockProductDetail.id) =>
  renderWithProviders(
    <MemoryRouter initialEntries={[`/product/${id}`]}>
      <Routes>
        <Route path="/product/:id" element={<ProductDetailPage />} />
        <Route path="/cart" element={<div>Cart page</div>} />
      </Routes>
    </MemoryRouter>,
  )

describe('ProductDetailPage', () => {
  it('renders product name and brand after loading', async () => {
    renderPage()
    expect(
      await screen.findByRole('heading', { name: new RegExp(mockProductDetail.name, 'i') }),
    ).toBeInTheDocument()
    expect(screen.getByText(mockProductDetail.brand.toUpperCase())).toBeInTheDocument()
  })

  it('ADD TO CART is disabled initially', async () => {
    renderPage()
    await screen.findByRole('heading', { name: new RegExp(mockProductDetail.name, 'i') })
    expect(screen.getByRole('button', { name: /add to cart/i })).toBeDisabled()
  })

  it('ADD TO CART is disabled when only color is selected', async () => {
    const user = userEvent.setup()
    renderPage()
    await screen.findByRole('heading', { name: new RegExp(mockProductDetail.name, 'i') })

    await user.click(screen.getByRole('button', { name: /select color titanium black/i }))

    expect(screen.getByRole('button', { name: /add to cart/i })).toBeDisabled()
  })

  it('ADD TO CART is disabled when only storage is selected', async () => {
    const user = userEvent.setup()
    renderPage()
    await screen.findByRole('heading', { name: new RegExp(mockProductDetail.name, 'i') })

    await user.click(screen.getByRole('button', { name: /select 256 gb/i }))

    expect(screen.getByRole('button', { name: /add to cart/i })).toBeDisabled()
  })

  it('ADD TO CART is enabled when both color and storage are selected', async () => {
    const user = userEvent.setup()
    renderPage()
    await screen.findByRole('heading', { name: new RegExp(mockProductDetail.name, 'i') })

    await user.click(screen.getByRole('button', { name: /select color titanium black/i }))
    await user.click(screen.getByRole('button', { name: /select 256 gb/i }))

    expect(screen.getByRole('button', { name: /add to cart/i })).not.toBeDisabled()
  })

  it('price updates when a different storage is selected', async () => {
    const user = userEvent.setup()
    renderPage()
    await screen.findByRole('heading', { name: new RegExp(mockProductDetail.name, 'i') })

    expect(screen.getByText(/from 1\.319 eur/i)).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /select 512 gb/i }))

    expect(screen.getByText('1.439 EUR')).toBeInTheDocument()
  })

  it('image updates when a different color is selected', async () => {
    const user = userEvent.setup()
    renderPage()
    await screen.findByRole('heading', { name: new RegExp(mockProductDetail.name, 'i') })

    const initialSrc = screen
      .getByRole('img', { name: new RegExp(mockProductDetail.name, 'i') })
      .getAttribute('src')

    await user.click(screen.getByRole('button', { name: /select color titanium gray/i }))

    await waitFor(() => {
      const src = screen
        .getByRole('img', { name: new RegExp(mockProductDetail.name, 'i') })
        .getAttribute('src')
      expect(src).not.toBe(initialSrc)
    })
  })

  it('adds item to cart and navigates to /cart on button click', async () => {
    const user = userEvent.setup()
    renderPage()
    await screen.findByRole('heading', { name: new RegExp(mockProductDetail.name, 'i') })

    await user.click(screen.getByRole('button', { name: /select color titanium black/i }))
    await user.click(screen.getByRole('button', { name: /select 256 gb/i }))
    await user.click(screen.getByRole('button', { name: /add to cart/i }))

    expect(await screen.findByText('Cart page')).toBeInTheDocument()
  })

  it('shows 404 message for unknown product', async () => {
    renderPage('not-found')
    expect(await screen.findByRole('alert')).toHaveTextContent('Product not found.')
  })

  it('renders all specification rows', async () => {
    renderPage()
    await screen.findByRole('heading', { name: new RegExp(mockProductDetail.name, 'i') })
    const { specs } = mockProductDetail
    expect(screen.getByText(specs.screen)).toBeInTheDocument()
    expect(screen.getByText(specs.resolution)).toBeInTheDocument()
    expect(screen.getByText(specs.processor)).toBeInTheDocument()
    expect(screen.getByText(specs.mainCamera)).toBeInTheDocument()
    expect(screen.getByText(specs.selfieCamera)).toBeInTheDocument()
    expect(screen.getByText(specs.battery)).toBeInTheDocument()
    expect(screen.getByText(specs.os)).toBeInTheDocument()
    expect(screen.getByText(specs.screenRefreshRate)).toBeInTheDocument()
  })

  it('renders the similar products section', async () => {
    renderPage()
    await screen.findByRole('heading', { name: new RegExp(mockProductDetail.name, 'i') })
    expect(screen.getByText('iPhone 15 Pro Max')).toBeInTheDocument()
  })

  it('shows selected color name under swatches after selecting it', async () => {
    const user = userEvent.setup()
    renderPage()
    await screen.findByRole('heading', { name: new RegExp(mockProductDetail.name, 'i') })
    await user.click(screen.getByRole('button', { name: /select color titanium black/i }))
    expect(screen.getByText('Titanium Black')).toBeInTheDocument()
  })

  it('shows loading state while fetching', () => {
    renderPage()
    expect(screen.getByRole('progressbar')).toBeInTheDocument()
  })

  it('shows error message for non-404 errors', async () => {
    server.use(http.get('*/products/:id', () => new HttpResponse(null, { status: 500 })))
    renderPage()
    const alert = await screen.findByRole('alert')
    expect(alert).toHaveTextContent('Failed to load product. Please try again.')
  })
})
