import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { StorageSelector } from './StorageSelector'
import type { StorageOption } from '@/types'

const options: StorageOption[] = [
  { capacity: '256 GB', price: 1319 },
  { capacity: '512 GB', price: 1439 },
  { capacity: '1 TB', price: 1679 },
]

describe('StorageSelector', () => {
  it('renders all storage options', () => {
    render(<StorageSelector options={options} selected={null} onChange={vi.fn()} />)
    expect(screen.getAllByRole('button')).toHaveLength(3)
    expect(screen.getByText('256 GB')).toBeInTheDocument()
    expect(screen.getByText('512 GB')).toBeInTheDocument()
    expect(screen.getByText('1 TB')).toBeInTheDocument()
  })

  it('no option is selected by default', () => {
    render(<StorageSelector options={options} selected={null} onChange={vi.fn()} />)
    screen.getAllByRole('button').forEach((btn) => {
      expect(btn).toHaveAttribute('aria-pressed', 'false')
    })
  })

  it('applies aria-pressed true to the selected option', () => {
    render(<StorageSelector options={options} selected={options[1]} onChange={vi.fn()} />)
    const buttons = screen.getAllByRole('button')
    expect(buttons[1]).toHaveAttribute('aria-pressed', 'true')
    expect(buttons[0]).toHaveAttribute('aria-pressed', 'false')
    expect(buttons[2]).toHaveAttribute('aria-pressed', 'false')
  })

  it('calls onChange with the correct option when clicked', async () => {
    const handleChange = vi.fn()
    render(<StorageSelector options={options} selected={null} onChange={handleChange} />)
    await userEvent.click(screen.getByLabelText('Select 1 TB, 1679 EUR'))
    expect(handleChange).toHaveBeenCalledWith(options[2])
  })
})
