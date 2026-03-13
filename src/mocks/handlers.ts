import { http, HttpResponse } from 'msw'
import { mockProducts } from './fixtures/products'
import { mockProductDetail } from './fixtures/productDetail'

const API_BASE = 'https://prueba-tecnica-api-tienda-moviles.onrender.com'

export const handlers = [
  http.get(`${API_BASE}/products`, ({ request }) => {
    const url = new URL(request.url)
    const search = url.searchParams.get('search')?.toLowerCase()
    const limit = url.searchParams.get('limit')

    let products = [...mockProducts]

    if (search) {
      products = products.filter(
        (p) => p.name.toLowerCase().includes(search) || p.brand.toLowerCase().includes(search),
      )
    }

    if (limit) {
      products = products.slice(0, Number(limit))
    }

    return HttpResponse.json(products)
  }),

  http.get(`${API_BASE}/products/:id`, ({ params }) => {
    const { id } = params
    if (id === mockProductDetail.id) {
      return HttpResponse.json(mockProductDetail)
    }
    if (id === 'not-found') {
      return new HttpResponse(null, { status: 404 })
    }
    return new HttpResponse(null, { status: 404 })
  }),
]
