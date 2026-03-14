import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { renderWithProviders } from '@/test/render'
import NotFoundPage from './NotFoundPage'

const renderPage = () =>
  renderWithProviders(
    <MemoryRouter>
      <NotFoundPage />
    </MemoryRouter>,
  )

describe('NotFoundPage', () => {
  it('renders 404 heading', () => {
    renderPage()
    expect(screen.getByRole('heading', { name: '404' })).toBeInTheDocument()
  })

  it('renders page not found message', () => {
    renderPage()
    expect(screen.getByText('Page not found.')).toBeInTheDocument()
  })

  it('renders a link back to the catalogue', () => {
    renderPage()
    const link = screen.getByRole('link', { name: /back to catalogue/i })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/')
  })
})
