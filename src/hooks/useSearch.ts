import { useState } from 'react'
import { useDebounce } from './useDebounce'
import { SEARCH_DEBOUNCE_MS } from '@/constants'

export const useSearch = () => {
  const [inputValue, setInputValue] = useState('')
  const query = useDebounce(inputValue, SEARCH_DEBOUNCE_MS)

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)

  const handleClear = () => setInputValue('')

  return { query, inputValue, handleSearch, handleClear }
}
