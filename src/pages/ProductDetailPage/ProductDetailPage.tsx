import { useNavigate } from 'react-router-dom'
import { Navbar } from '@/components/Navbar/Navbar'
import { AppLoading } from '@/components/AppLoading/AppLoading'
import { ErrorMessage } from '@/components/ErrorMessage/ErrorMessage'
import { Button } from '@/components/Button/Button'
import { ColorSelector } from '@/components/ColorSelector/ColorSelector'
import { StorageSelector } from '@/components/StorageSelector/StorageSelector'
import { SpecificationsTable } from '@/components/SpecificationsTable/SpecificationsTable'
import { SimilarProducts } from '@/components/SimilarProducts/SimilarProducts'
import { toHttps } from '@/utils/url'
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
        <button
          type="button"
          className={styles.backBtn}
          onClick={() => navigate('/')}
          aria-label="Back to catalogue"
        >
          ← Back
        </button>

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
            <p className={styles.brand}>{product.brand.toUpperCase()}</p>
            <h1 className={styles.name}>{product.name}</h1>

            <p className={styles.price}>
              {displayPrice !== null
                ? `${displayPrice.toLocaleString('de-DE')} EUR`
                : `FROM ${minPrice.toLocaleString('de-DE')} EUR`}
            </p>

            <ColorSelector
              colors={product.colorOptions}
              selected={selectedColor}
              onChange={handleColorChange}
            />

            <StorageSelector
              options={product.storageOptions}
              selected={selectedStorage}
              onChange={handleStorageChange}
            />

            <Button
              variant="primary"
              disabled={!canAddToCart}
              aria-label="Add to cart"
              onClick={handleAddToCart}
            >
              ADD TO CART
            </Button>
          </div>
        </div>

        <section className={styles.specs} aria-label="Specifications">
          <h2 className={styles.sectionTitle}>SPECIFICATIONS</h2>
          <SpecificationsTable specs={product.specs} />
        </section>

        {product.similarProducts.length > 0 && (
          <SimilarProducts
            products={product.similarProducts}
            productId={product.id}
            onCardClick={(id) => navigate(`/product/${id}`)}
          />
        )}
      </main>
    </>
  )
}

export default ProductDetailPage
