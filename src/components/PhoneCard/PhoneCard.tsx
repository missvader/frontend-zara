import type { ProductListItem } from '@/types'
import { toHttps } from '@/utils/url'
import styles from './PhoneCard.module.scss'

interface PhoneCardProps {
  product: ProductListItem
  onClick: (id: string) => void
}

export const PhoneCard = ({ product, onClick }: PhoneCardProps) => {
  const { id, brand, name, basePrice, imageUrl } = product
  const formattedPrice = `${basePrice.toLocaleString('de-DE')} EUR`

  return (
    <article className={styles.card} aria-label={`${brand} ${name}, from ${basePrice} EUR`}>
      <button
        type="button"
        className={styles.cardBtn}
        aria-label={`${brand} ${name}, from ${basePrice} EUR`}
        onClick={() => onClick(id)}
      >
        <div className={styles.imageWrapper}>
          <img
            src={toHttps(imageUrl)}
            alt={`${brand} ${name}`}
            className={styles.image}
            loading="lazy"
          />
        </div>
        <div className={styles.info}>
          <p className={styles.brand}>{brand.toUpperCase()}</p>
          <p className={styles.name}>{name}</p>
          <p className={styles.price}>{formattedPrice}</p>
        </div>
      </button>
    </article>
  )
}
