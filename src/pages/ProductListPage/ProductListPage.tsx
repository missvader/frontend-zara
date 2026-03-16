import { Navbar } from '@/components/Navbar/Navbar'
import { SearchBar } from '@/components/SearchBar/SearchBar'
import { PhoneGrid } from '@/components/PhoneGrid/PhoneGrid'
import { AppLoading } from '@/components/AppLoading/AppLoading'
import { ErrorMessage } from '@/components/ErrorMessage/ErrorMessage'
import { Container } from '@/components/Container/Container'
import { useProductListController } from './ProductListPage.controller'
import styles from './ProductListPage.module.scss'

const ProductListPage = () => {
  const {
    products,
    isLoading,
    isError,
    inputValue,
    resultCount,
    handleSearch,
    handleClear,
    handleCardClick,
  } = useProductListController()

  if (isLoading && products.length === 0) return <AppLoading />
  if (isError) return <ErrorMessage message="Failed to load products. Please try again." />

  return (
    <>
      <Navbar />
      <main className={styles.page}>
        <Container className={styles.searchContainer}>
          <SearchBar
            value={inputValue}
            resultCount={resultCount}
            onChange={handleSearch}
            onClear={handleClear}
          />
        </Container>
        <Container>
          <PhoneGrid products={products} isLoading={isLoading} onCardClick={handleCardClick} />
        </Container>
      </main>
    </>
  )
}

export default ProductListPage
