import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { SpecificationsTable } from './SpecificationsTable'
import type { ProductSpecs } from '@/types'

const specs: ProductSpecs = {
  screen: '6.8" Dynamic AMOLED 2X',
  resolution: '3088 x 1440 pixels',
  processor: 'Snapdragon 8 Gen 3',
  mainCamera: '200MP + 12MP + 10MP + 50MP',
  selfieCamera: '12MP',
  battery: '5000 mAh',
  os: 'Android 14',
  screenRefreshRate: '120Hz',
}

describe('SpecificationsTable', () => {
  it('renders all spec rows', () => {
    render(<SpecificationsTable specs={specs} />)
    expect(screen.getByText('6.8" Dynamic AMOLED 2X')).toBeInTheDocument()
    expect(screen.getByText('Snapdragon 8 Gen 3')).toBeInTheDocument()
    expect(screen.getByText('5000 mAh')).toBeInTheDocument()
    expect(screen.getByText('Android 14')).toBeInTheDocument()
  })

  it('uses a dl with dt and dd elements', () => {
    const { container } = render(<SpecificationsTable specs={specs} />)
    expect(container.querySelector('dl')).toBeInTheDocument()
    expect(container.querySelectorAll('dt').length).toBe(Object.keys(specs).length)
    expect(container.querySelectorAll('dd').length).toBe(Object.keys(specs).length)
  })
})
