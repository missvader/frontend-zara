import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ErrorMessage } from './ErrorMessage'

describe('ErrorMessage', () => {
  it('renders the message text', () => {
    render(<ErrorMessage message="Something went wrong" />)
    expect(screen.getByText('Something went wrong')).toBeInTheDocument()
  })

  it('has role alert for screen readers', () => {
    render(<ErrorMessage message="Error!" />)
    expect(screen.getByRole('alert')).toBeInTheDocument()
  })
})
