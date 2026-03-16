import type { ProductListItem } from '@/types'
import { PhoneCard } from '@/components/PhoneCard/PhoneCard'
import styles from './PhoneGrid.module.scss'

interface PhoneGridProps {
  products: ProductListItem[]
  isLoading: boolean
  onCardClick: (id: string) => void
}

export const PhoneGrid = ({ products, isLoading, onCardClick }: PhoneGridProps) => {
  const itemsSignature = products.map((p) => p.id).join('-')

  return (
    <ul
      key={itemsSignature}
      className={`${styles.grid} ${styles.gridEnterOnce} ${isLoading ? styles.gridLoading : ''}`}
    >
      {products.map((product) => (
        <li key={product.id} role="article">
          <PhoneCard product={product} onClick={onCardClick} />
        </li>
      ))}
    </ul>
  )
}
