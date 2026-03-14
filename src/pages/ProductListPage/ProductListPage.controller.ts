import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getProducts } from '@/lib/api'
import { useSearch } from '@/hooks/useSearch'
import { usePageTitle } from '@/hooks/usePageTitle'
import { MAX_PRODUCTS } from '@/constants'

export const useProductListController = () => {
  const { query, inputValue, handleSearch, handleClear } = useSearch()
  const navigate = useNavigate()

  usePageTitle('Smartphones')

  const {
    data: products = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['phones', query],
    queryFn: () => getProducts({ search: query, limit: MAX_PRODUCTS }),
    staleTime: 1000 * 60 * 5,
  })

  const handleCardClick = (id: string) => navigate(`/product/${id}`)

  return {
    products,
    isLoading,
    isError,
    inputValue,
    resultCount: products.length,
    handleSearch,
    handleClear,
    handleCardClick,
  }
}
