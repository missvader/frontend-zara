import { useRef, useEffect } from 'react'
import type { ProductListItem } from '@/types'
import { PhoneCard } from '@/components/PhoneCard/PhoneCard'
import styles from './SimilarProducts.module.scss'

interface SimilarProductsProps {
  products: ProductListItem[]
  productId: string
  onCardClick: (id: string) => void
}

export const SimilarProducts = ({ products, productId, onCardClick }: SimilarProductsProps) => {
  const scrollRef = useRef<HTMLUListElement>(null)

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollLeft = 0
  }, [productId])

  return (
    <section className={styles.section} aria-label="Similar products">
      <h2 className={styles.title}>SIMILAR ITEMS</h2>
      <ul ref={scrollRef} className={styles.list}>
        {products.map((product) => (
          <li key={product.id} className={styles.item}>
            <PhoneCard product={product} onClick={onCardClick} />
          </li>
        ))}
      </ul>
    </section>
  )
}
