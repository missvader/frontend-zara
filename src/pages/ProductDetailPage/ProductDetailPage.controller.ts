import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useParams, useNavigate } from 'react-router-dom'
import { getProduct } from '@/lib/api'
import { useCart } from '@/hooks/useCart'
import { usePageTitle } from '@/hooks/usePageTitle'
import type { ColorOption, StorageOption } from '@/types'

export const useProductDetailController = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { addItem } = useCart()

  const {
    data: product,
    isLoading,
    error,
    isError,
  } = useQuery({
    queryKey: ['phone-detail', id],
    queryFn: () => getProduct(id as string),
    staleTime: 1000 * 60 * 5,
    enabled: !!id,
    retry: false,
  })

  const [selectedColor, setSelectedColor] = useState<ColorOption | null>(null)
  const [selectedStorage, setSelectedStorage] = useState<StorageOption | null>(null)

  const canAddToCart = selectedColor !== null && selectedStorage !== null

  usePageTitle(product ? `${product.brand} ${product.name}` : undefined)

  const handleAddToCart = () => {
    if (!product || !canAddToCart) return
    addItem({
      id: product.id,
      brand: product.brand,
      name: product.name,
      imageUrl: (selectedColor as ColorOption).imageUrl,
      color: selectedColor as ColorOption,
      storage: selectedStorage as StorageOption,
      price: (selectedStorage as StorageOption).price,
    })
    navigate('/cart')
  }

  const is404 = isError && error instanceof Error && error.message.includes('404')

  return {
    product,
    isLoading,
    isError,
    is404,
    selectedColor,
    selectedStorage,
    canAddToCart,
    handleColorChange: setSelectedColor,
    handleStorageChange: setSelectedStorage,
    handleAddToCart,
  }
}
