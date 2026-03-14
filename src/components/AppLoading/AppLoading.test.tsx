import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { renderWithProviders } from '@/test/render'
import { AppLoading } from './AppLoading'

describe('AppLoading', () => {
  it('renders the Navbar navigation', () => {
    renderWithProviders(
      <MemoryRouter>
        <AppLoading />
      </MemoryRouter>,
    )
    expect(screen.getByRole('navigation')).toBeInTheDocument()
  })

  it('renders the loading progress bar', () => {
    renderWithProviders(
      <MemoryRouter>
        <AppLoading />
      </MemoryRouter>,
    )
    expect(screen.getByRole('progressbar')).toBeInTheDocument()
  })
})
