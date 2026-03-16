import { useNavigate } from 'react-router-dom'
import { Navbar } from '@/components/Navbar/Navbar'
import { AppLoading } from '@/components/AppLoading/AppLoading'
import { ErrorMessage } from '@/components/ErrorMessage/ErrorMessage'
import { ColorSelector } from '@/components/ColorSelector/ColorSelector'
import { StorageSelector } from '@/components/StorageSelector/StorageSelector'
import { SpecificationsTable } from '@/components/SpecificationsTable/SpecificationsTable'
import { SimilarProducts } from '@/components/SimilarProducts/SimilarProducts'
import { Container } from '@/components/Container/Container'
import { toHttps } from '@/utils/url'
import chevronLeftUrl from '@/assets/chevron-left.svg'
import { useProductDetailController } from './ProductDetailPage.controller'
import styles from './ProductDetailPage.module.scss'

const ProductDetailPage = () => {
  const navigate = useNavigate()
  const {
    product,
    isLoading,
    isError,
    is404,
    selectedColor,
    selectedStorage,
    canAddToCart,
    handleColorChange,
    handleStorageChange,
    handleAddToCart,
  } = useProductDetailController()

  if (isLoading) return <AppLoading />
  if (isError)
    return (
      <ErrorMessage
        message={is404 ? 'Product not found.' : 'Failed to load product. Please try again.'}
      />
    )
  if (!product) return null

  const minPrice = Math.min(...product.storageOptions.map((s) => s.price))
  const displayPrice = selectedStorage ? selectedStorage.price : null
  const fallbackImageUrl = product.imageUrl ?? product.colorOptions[0]?.imageUrl

  return (
    <>
      <Navbar />
      <main className={styles.page}>
        <Container>
          <button
            type="button"
            className={styles.backBtn}
            onClick={() => navigate('/')}
            aria-label="Back to catalogue"
          >
            <img src={chevronLeftUrl} alt="" className={styles.backIcon} aria-hidden="true" />
            <span className={styles.backLabel}>Back</span>
          </button>
        </Container>

        <Container
          size="content"
          as="section"
          className={styles.wrapper}
          aria-labelledby="product-name"
        >
          <div className={styles.header}>
            <div className={styles.imageWrapper}>
              <img
                key={toHttps(selectedColor?.imageUrl ?? fallbackImageUrl)}
                src={toHttps(selectedColor?.imageUrl ?? fallbackImageUrl)}
                alt={`${product.brand} ${product.name}`}
                className={styles.image}
              />
            </div>

            <div className={styles.infoColumn}>
              <div className={styles.info}>
                <p className={styles.brand}>{product.brand.toUpperCase()}</p>
                <h1 id="product-name" className={styles.name}>
                  {product.brand} {product.name}
                </h1>
                <p className={styles.price}>
                  {displayPrice !== null
                    ? `${displayPrice.toLocaleString('de-DE')} EUR`
                    : `FROM ${minPrice.toLocaleString('de-DE')} EUR`}
                </p>
              </div>

              <div className={styles.selectors}>
                <StorageSelector
                  options={product.storageOptions}
                  selected={selectedStorage}
                  onChange={handleStorageChange}
                />
                <ColorSelector
                  colors={product.colorOptions}
                  selected={selectedColor}
                  onChange={handleColorChange}
                />
              </div>

              <button
                type="button"
                className={styles.addBtn}
                onClick={handleAddToCart}
                disabled={!canAddToCart}
                aria-label="Add to cart"
              >
                ADD TO CART
              </button>
            </div>
          </div>

          <section className={styles.specs} aria-label="Specifications">
            <h2 className={styles.sectionTitle}>SPECIFICATIONS</h2>
            <SpecificationsTable specs={product.specs} />
          </section>
        </Container>

        {product.similarProducts.length > 0 && (
          <Container size="content">
            <SimilarProducts
              products={product.similarProducts}
              productId={product.id}
              onCardClick={(id) => navigate(`/product/${id}`)}
            />
          </Container>
        )}
      </main>
    </>
  )
}

export default ProductDetailPage
