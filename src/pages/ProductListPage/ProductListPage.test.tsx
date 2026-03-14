import { describe, it, expect } from 'vitest'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { renderWithProviders } from '@/test/render'
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
})
