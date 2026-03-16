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
    <button
      type="button"
      className={styles.card}
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
          <div className={styles.brand}>{brand}</div>
          <div className={styles.name}>{name}</div>
        </div>
        <div className={styles.price}>{basePrice} EUR</div>
      </div>
    </button>
  )
}
