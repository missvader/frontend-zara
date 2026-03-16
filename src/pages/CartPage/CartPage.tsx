import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Navbar } from '@/components/Navbar/Navbar'
import { CartItem } from '@/components/CartItem/CartItem'
import { Container } from '@/components/Container/Container'
import { useCart } from '@/hooks/useCart'
import { usePageTitle } from '@/hooks/usePageTitle'
import styles from './CartPage.module.scss'

const CartPage = () => {
  const { cart, removeItem } = useCart()
  const navigate = useNavigate()
  const [removingId, setRemovingId] = useState<string | null>(null)

  usePageTitle(`Cart (${cart.items.length})`)

  const totalPrice = cart.items.reduce((sum, item) => sum + item.price, 0)

  const handleRemove = (id: string, colorName: string, capacity: string) => {
    const key = `${id}-${colorName}-${capacity}`
    setRemovingId(key)
    setTimeout(() => {
      removeItem(id, colorName, capacity)
      setRemovingId(null)
    }, 600)
  }

  return (
    <>
      <Navbar />
      <Container as="main" className={styles.page}>
        <h1 className={styles.title}>CART ({cart.items.length})</h1>

        {cart.items.length === 0 ? (
          <div className={styles.empty}>
            <button type="button" className={styles.continueButton} onClick={() => navigate('/')}>
              CONTINUE SHOPPING
            </button>
          </div>
        ) : (
          <>
            <ul className={styles.itemsList}>
              {cart.items.map((item) => {
                const key = `${item.id}-${item.color.name}-${item.storage.capacity}`
                const isFading = removingId === key
                return (
                  <li key={key} className={`${styles.itemRow} ${isFading ? styles.fadeOut : ''}`}>
                    <CartItem
                      item={item}
                      onRemove={() => handleRemove(item.id, item.color.name, item.storage.capacity)}
                    />
                  </li>
                )
              })}
            </ul>

            <div className={styles.footer}>
              <div className={styles.totalRow}>
                <span>TOTAL</span>
                <span>{totalPrice.toLocaleString('de-DE')} EUR</span>
              </div>
              <div className={styles.actions}>
                <button
                  type="button"
                  className={styles.continueButton}
                  onClick={() => navigate('/')}
                >
                  CONTINUE SHOPPING
                </button>
                <button type="button" className={styles.payButton}>
                  PAY
                </button>
              </div>
            </div>
          </>
        )}
      </Container>
    </>
  )
}

export default CartPage
