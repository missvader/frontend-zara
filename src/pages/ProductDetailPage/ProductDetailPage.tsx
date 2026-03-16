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
        {/* Back bar: ancho completo, sticky */}
        <Container className={styles.backBar}>
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

        {/* Contenido principal: Container size="content" (max-width 1200px) */}
        <Container size="content" as="section" aria-labelledby="product-name">
          {/* Product row */}
          <div className={styles.productRow}>
            <div className={styles.imageCol}>
              <img
                key={toHttps(selectedColor?.imageUrl ?? fallbackImageUrl)}
                src={toHttps(selectedColor?.imageUrl ?? fallbackImageUrl)}
                alt={`${product.brand} ${product.name}`}
                className={styles.mainImage}
              />
            </div>

            <div className={styles.infoCol}>
              <div className={styles.titlePrice}>
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

          {/* Specs: dentro del mismo Container que el productRow */}
          <section className={styles.specs} aria-label="Specifications">
            <h2 className={styles.sectionTitle}>SPECIFICATIONS</h2>
            <SpecificationsTable specs={product.specs} />
          </section>

          {/* Similar: dentro del mismo Container */}
          {product.similarProducts.length > 0 && (
            <SimilarProducts
              products={product.similarProducts}
              productId={product.id}
              onCardClick={(id) => navigate(`/product/${id}`)}
            />
          )}
        </Container>
      </main>
    </>
  )
}

export default ProductDetailPage
