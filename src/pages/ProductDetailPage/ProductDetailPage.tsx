import { useNavigate } from 'react-router-dom'
import { Navbar } from '@/components/Navbar/Navbar'
import { AppLoading } from '@/components/AppLoading/AppLoading'
import { ErrorMessage } from '@/components/ErrorMessage/ErrorMessage'
import { Button } from '@/components/Button/Button'
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
              key={toHttps(selectedColor?.imageUrl ?? product.imageUrl)}
              src={toHttps(selectedColor?.imageUrl ?? product.imageUrl)}
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

            {/* Color selector */}
            <fieldset className={styles.fieldset}>
              <legend className={styles.legend}>
                Color: {selectedColor ? selectedColor.name : 'Pick your favourite'}
              </legend>
              <div className={styles.swatches}>
                {product.colorOptions.map((color) => (
                  <button
                    key={color.name}
                    type="button"
                    aria-label={`Select color ${color.name}`}
                    aria-pressed={selectedColor?.name === color.name}
                    className={`${styles.swatch} ${selectedColor?.name === color.name ? styles.swatchSelected : ''}`}
                    style={{ backgroundColor: color.hexCode }}
                    onClick={() => handleColorChange(color)}
                  />
                ))}
              </div>
            </fieldset>

            {/* Storage selector */}
            <fieldset className={styles.fieldset}>
              <legend className={styles.legend}>Storage: How much space do you need?</legend>
              <div className={styles.storageOptions}>
                {product.storageOptions.map((option) => (
                  <button
                    key={option.capacity}
                    type="button"
                    aria-label={`Select ${option.capacity}, ${option.price} EUR`}
                    aria-pressed={selectedStorage?.capacity === option.capacity}
                    className={`${styles.storageBtn} ${selectedStorage?.capacity === option.capacity ? styles.storageBtnSelected : ''}`}
                    onClick={() => handleStorageChange(option)}
                  >
                    {option.capacity}
                  </button>
                ))}
              </div>
            </fieldset>

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

        {/* Specs */}
        <section className={styles.specs} aria-label="Specifications">
          <h2 className={styles.sectionTitle}>SPECIFICATIONS</h2>
          <dl className={styles.specsList}>
            {Object.entries(product.specs).map(([key, value]) => (
              <div key={key} className={styles.specRow}>
                <dt className={styles.specKey}>{key}</dt>
                <dd className={styles.specValue}>{value}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* Similar products */}
        {product.similarProducts.length > 0 && (
          <section className={styles.similar} aria-label="Similar products">
            <h2 className={styles.sectionTitle}>SIMILAR ITEMS</h2>
            <ul className={styles.similarList}>
              {product.similarProducts.map((similar) => (
                <li key={similar.id}>
                  <button
                    type="button"
                    className={styles.similarCard}
                    onClick={() => navigate(`/product/${similar.id}`)}
                    aria-label={`${similar.brand} ${similar.name}`}
                  >
                    <img
                      src={toHttps(similar.imageUrl)}
                      alt={`${similar.brand} ${similar.name}`}
                      className={styles.similarImg}
                      loading="lazy"
                    />
                    <p className={styles.similarBrand}>{similar.brand.toUpperCase()}</p>
                    <p className={styles.similarName}>{similar.name}</p>
                    <p className={styles.similarPrice}>
                      {similar.basePrice.toLocaleString('de-DE')} EUR
                    </p>
                  </button>
                </li>
              ))}
            </ul>
          </section>
        )}
      </main>
    </>
  )
}

export default ProductDetailPage
