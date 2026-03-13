import { API_BASE_URL, API_KEY } from '@/constants'
import type { ProductListItem, ProductDetail } from '@/types'

const headers = { 'x-api-key': API_KEY }

interface GetProductsParams {
  search?: string
  limit?: number
}

export const getProducts = async ({ search, limit }: GetProductsParams = {}): Promise<
  ProductListItem[]
> => {
  const params = new URLSearchParams()
  if (search) params.set('search', search)
  if (limit) params.set('limit', String(limit))

  const res = await fetch(`${API_BASE_URL}/products?${params}`, { headers })
  if (!res.ok) throw new Error(`Failed to fetch products: ${res.status}`)

  const data: ProductListItem[] = await res.json()

  const seen = new Set<string>()
  return data.filter((p) => {
    if (seen.has(p.id)) return false
    seen.add(p.id)
    return true
  })
}

export const getProduct = async (id: string): Promise<ProductDetail> => {
  const res = await fetch(`${API_BASE_URL}/products/${id}`, { headers })
  if (!res.ok) throw new Error(`Failed to fetch product ${id}: ${res.status}`)
  return res.json() as Promise<ProductDetail>
}
