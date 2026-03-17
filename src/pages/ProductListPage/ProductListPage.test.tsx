import { describe, it, expect } from 'vitest'
import { screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { http, HttpResponse } from 'msw'
import { renderWithProviders } from '@/test/render'
import { server } from '@/mocks/server'
import ProductListPage from './ProductListPage'

const renderPage = () =>
  renderWithProviders(
    <MemoryRouter>
      <ProductListPage />
    </MemoryRouter>,
  )

describe('ProductListPage', () => {
  it('renders 20 products on initial load', async () => {
    renderPage()
    const cards = await screen.findAllByRole('article')
    expect(cards).toHaveLength(20)
  })

  it('shows result count below search bar', async () => {
    renderPage()
    await screen.findAllByRole('article')
    expect(screen.getByText('20 RESULTS')).toBeInTheDocument()
  })

  it('filters products when search query is entered', async () => {
    const user = userEvent.setup()
    renderPage()
    await screen.findAllByRole('article')

    await user.type(screen.getByRole('searchbox'), 'Samsung')

    await waitFor(() => expect(screen.getAllByRole('article')).toHaveLength(3))
    expect(screen.getByText('3 RESULTS')).toBeInTheDocument()
  })

  it('shows 0 RESULTS when no match found', async () => {
    const user = userEvent.setup()
    renderPage()
    await screen.findAllByRole('article')

    await user.type(screen.getByRole('searchbox'), 'zxzxzxzx')

    await waitFor(() => expect(screen.getByText('0 RESULTS')).toBeInTheDocument())
    expect(screen.queryAllByRole('article')).toHaveLength(0)
  })

  it('clears search and resets list on clear button click', async () => {
    const user = userEvent.setup()
    renderPage()
    await screen.findAllByRole('article')

    await user.type(screen.getByRole('searchbox'), 'Samsung')
    await waitFor(() => expect(screen.getAllByRole('article')).toHaveLength(3))

    await user.click(screen.getByRole('button', { name: /clear search/i }))

    await waitFor(() => expect(screen.getAllByRole('article')).toHaveLength(20))
  })

  it('navigates to /product/:id on card click', async () => {
    const user = userEvent.setup()
    renderWithProviders(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<ProductListPage />} />
          <Route path="/product/:id" element={<div>Product detail page</div>} />
        </Routes>
      </MemoryRouter>,
    )
    const cards = await screen.findAllByRole('article')
    await user.click(within(cards[0]).getByRole('button'))
    expect(screen.getByText('Product detail page')).toBeInTheDocument()
  })

  it('shows loading state while fetching', () => {
    renderPage()
    expect(screen.getByRole('progressbar')).toBeInTheDocument()
  })

  it('shows error message when API fails', async () => {
    server.use(http.get('*/products', () => HttpResponse.error()))
    renderPage()
    const alert = await screen.findByRole('alert')
    expect(alert).toHaveTextContent(/failed to load products/i)
  })
})
