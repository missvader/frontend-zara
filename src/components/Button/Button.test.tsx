import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button } from './Button'

describe('Button', () => {
  it('renders children', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument()
  })

  it('applies the variant class', () => {
    const { container } = render(<Button variant="primary">Buy</Button>)
    expect(container.firstChild).toHaveClass('primary')
  })

  it('is disabled when the disabled prop is set', () => {
    render(<Button disabled>Disabled</Button>)
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('calls onClick when not disabled', async () => {
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>Click</Button>)
    await userEvent.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('does not call onClick when disabled', async () => {
    const handleClick = vi.fn()
    render(
      <Button disabled onClick={handleClick}>
        No click
      </Button>,
    )
    await userEvent.click(screen.getByRole('button'))
    expect(handleClick).not.toHaveBeenCalled()
  })
})
