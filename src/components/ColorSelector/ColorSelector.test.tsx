import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ColorSelector } from './ColorSelector'
import type { ColorOption } from '@/types'

const colors: ColorOption[] = [
  { name: 'Titanium Black', hexCode: '#2d2d2d', imageUrl: 'https://cdn.example.com/black.jpg' },
  { name: 'Titanium Gray', hexCode: '#8a8a8a', imageUrl: 'https://cdn.example.com/gray.jpg' },
  { name: 'Titanium Violet', hexCode: '#6b5b7b', imageUrl: 'https://cdn.example.com/violet.jpg' },
]

describe('ColorSelector', () => {
  it('renders all color swatches', () => {
    render(<ColorSelector colors={colors} selected={null} onChange={vi.fn()} />)
    expect(screen.getAllByRole('button')).toHaveLength(3)
  })

  it('no swatch is selected by default', () => {
    render(<ColorSelector colors={colors} selected={null} onChange={vi.fn()} />)
    screen.getAllByRole('button').forEach((btn) => {
      expect(btn).toHaveAttribute('aria-pressed', 'false')
    })
  })

  it('applies aria-pressed true to the selected color', () => {
    render(<ColorSelector colors={colors} selected={colors[1]} onChange={vi.fn()} />)
    const buttons = screen.getAllByRole('button')
    expect(buttons[1]).toHaveAttribute('aria-pressed', 'true')
    expect(buttons[0]).toHaveAttribute('aria-pressed', 'false')
    expect(buttons[2]).toHaveAttribute('aria-pressed', 'false')
  })

  it('shows the selected color name', () => {
    render(<ColorSelector colors={colors} selected={colors[0]} onChange={vi.fn()} />)
    expect(screen.getByText(/Titanium Black/)).toBeInTheDocument()
  })

  it('calls onChange with the correct color when a swatch is clicked', async () => {
    const handleChange = vi.fn()
    render(<ColorSelector colors={colors} selected={null} onChange={handleChange} />)
    await userEvent.click(screen.getByLabelText('Select color Titanium Violet'))
    expect(handleChange).toHaveBeenCalledWith(colors[2])
  })
})
