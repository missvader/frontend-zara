import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { renderWithProviders } from '@/test/render'
import { Navbar } from './Navbar'

const renderNavbar = () =>
  renderWithProviders(
    <MemoryRouter>
      <Navbar />
    </MemoryRouter>,
  )

describe('Navbar', () => {
  it('renders the logo with a link to /', () => {
    renderNavbar()
    const logo = screen.getByRole('link', { name: /smartphones/i })
    expect(logo).toBeInTheDocument()
    expect(logo).toHaveAttribute('href', '/')
  })

  it('renders the cart link with correct item count', () => {
    renderNavbar()
    const cartLink = screen.getByRole('link', { name: /cart, 0 items/i })
    expect(cartLink).toBeInTheDocument()
  })

  it('cart link has an accessible aria-label', () => {
    renderNavbar()
    expect(screen.getByLabelText(/cart, \d+ items/i)).toBeInTheDocument()
  })
})
