import { describe, it, expect } from 'vitest'
import { http, HttpResponse } from 'msw'
import { server } from '@/mocks/server'
import { mockProducts } from '@/mocks/fixtures/products'
import { mockProductDetail } from '@/mocks/fixtures/productDetail'
import { getProducts, getProduct } from './api'

const API_BASE = 'https://prueba-tecnica-api-tienda-moviles.onrender.com'

describe('getProducts', () => {
  it('returns the product list', async () => {
    const products = await getProducts({ limit: 20 })
    expect(products).toHaveLength(mockProducts.length)
    expect(products[0]).toMatchObject({ id: mockProducts[0].id })
  })

  it('deduplicates products by id', async () => {
    const duplicate = { ...mockProducts[0] }
    server.use(
      http.get(`${API_BASE}/products`, () => HttpResponse.json([...mockProducts, duplicate])),
    )
    const products = await getProducts()
    const ids = products.map((p) => p.id)
    const uniqueIds = [...new Set(ids)]
    expect(ids).toHaveLength(uniqueIds.length)
  })

  it('sends the x-api-key header on every request', async () => {
    let capturedKey: string | null = null
    server.use(
      http.get(`${API_BASE}/products`, ({ request }) => {
        capturedKey = request.headers.get('x-api-key')
        return HttpResponse.json(mockProducts)
      }),
    )
    await getProducts()
    expect(capturedKey).toBe('87909682e6cd74208f41a6ef39fe4191')
  })

  it('passes the search parameter when provided', async () => {
    let capturedUrl: string | null = null
    server.use(
      http.get(`${API_BASE}/products`, ({ request }) => {
        capturedUrl = request.url
        return HttpResponse.json([])
      }),
    )
    await getProducts({ search: 'Samsung' })
    expect(capturedUrl).toContain('search=Samsung')
  })

  it('passes the limit parameter when provided', async () => {
    let capturedUrl: string | null = null
    server.use(
      http.get(`${API_BASE}/products`, ({ request }) => {
        capturedUrl = request.url
        return HttpResponse.json([])
      }),
    )
    await getProducts({ limit: 5 })
    expect(capturedUrl).toContain('limit=5')
  })

  it('throws an error on a non-ok response', async () => {
    server.use(http.get(`${API_BASE}/products`, () => new HttpResponse(null, { status: 500 })))
    await expect(getProducts()).rejects.toThrow('Failed to fetch products: 500')
  })
})

describe('getProduct', () => {
  it('returns the full product detail by id', async () => {
    const product = await getProduct(mockProductDetail.id)
    expect(product.id).toBe(mockProductDetail.id)
    expect(product.specs).toBeDefined()
    expect(product.colorOptions).toHaveLength(mockProductDetail.colorOptions.length)
  })

  it('throws an error on a non-ok response', async () => {
    server.use(http.get(`${API_BASE}/products/:id`, () => new HttpResponse(null, { status: 404 })))
    await expect(getProduct('unknown-id')).rejects.toThrow()
  })
})
