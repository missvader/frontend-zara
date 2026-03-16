import type { ProductListItem } from '@/types'
import { toHttps } from '@/utils/url'
import styles from './PhoneCard.module.scss'

interface PhoneCardProps {
  product: ProductListItem
  onClick: (id: string) => void
}

export const PhoneCard = ({ product, onClick }: PhoneCardProps) => {
  const { id, brand, name, basePrice, imageUrl } = product

  return (
    <article className={styles.card}>
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
          <div className={styles.brandName}>
            <span className={styles.brand}>{brand.toUpperCase()}</span>
            <span className={styles.name}>{name}</span>
          </div>
          <span className={styles.price}>{basePrice.toLocaleString('de-DE')} EUR</span>
        </div>
      </button>
    </article>
  )
}
