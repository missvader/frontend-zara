import type { CartItem as CartItemType } from '@/types'
import { toHttps } from '@/utils/url'
import styles from './CartItem.module.scss'

interface CartItemProps {
  item: CartItemType
  onRemove: () => void
}

export const CartItem = ({ item, onRemove }: CartItemProps) => (
  <div className={styles.wrapper}>
    <div className={styles.imageWrapper}>
      <img
        src={toHttps(item.imageUrl)}
        alt={`${item.brand} ${item.name}`}
        className={styles.image}
        loading="lazy"
      />
    </div>
    <div className={styles.info}>
      <div>
        <p className={styles.brand}>{item.brand.toUpperCase()}</p>
        <p className={styles.name}>{item.name}</p>
        <p className={styles.meta}>
          {item.color.name} · {item.storage.capacity}
        </p>
        <p className={styles.price}>{item.price.toLocaleString('de-DE')} EUR</p>
      </div>
      <button
        type="button"
        aria-label={`Remove ${item.name} from cart`}
        className={styles.removeBtn}
        onClick={onRemove}
      >
        Eliminar
      </button>
    </div>
  </div>
)
