import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { SearchBar } from './SearchBar'

const renderSearchBar = (value = '', resultCount = 20) =>
  render(<SearchBar value={value} resultCount={resultCount} onChange={vi.fn()} onClear={vi.fn()} />)

describe('SearchBar', () => {
  it('renders the search input', () => {
    renderSearchBar()
    expect(screen.getByRole('searchbox')).toBeInTheDocument()
  })

  it('shows the result count', () => {
    renderSearchBar('', 5)
    expect(screen.getByText('5 RESULTS')).toBeInTheDocument()
  })

  it('clear button is hidden when input is empty', () => {
    renderSearchBar('')
    expect(screen.queryByRole('button', { name: /clear/i })).not.toBeInTheDocument()
  })

  it('clear button appears when input has text', () => {
    renderSearchBar('samsung')
    expect(screen.getByRole('button', { name: /clear/i })).toBeInTheDocument()
  })

  it('calls onChange when user types', async () => {
    const handleChange = vi.fn()
    render(<SearchBar value="" resultCount={0} onChange={handleChange} onClear={vi.fn()} />)
    await userEvent.type(screen.getByRole('searchbox'), 'apple')
    expect(handleChange).toHaveBeenCalled()
  })

  it('calls onClear when clear button is clicked', async () => {
    const handleClear = vi.fn()
    render(<SearchBar value="test" resultCount={0} onChange={vi.fn()} onClear={handleClear} />)
    await userEvent.click(screen.getByRole('button', { name: /clear/i }))
    expect(handleClear).toHaveBeenCalledTimes(1)
  })
})
