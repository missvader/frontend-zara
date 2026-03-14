import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Navbar } from '@/components/Navbar/Navbar'
import { Button } from '@/components/Button/Button'
import { CartItem } from '@/components/CartItem/CartItem'
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
      <main className={styles.page}>
        <div className={styles.titleBar}>
          <h1 className={styles.title}>CART ({cart.items.length})</h1>
        </div>

        {cart.items.length === 0 ? (
          <div className={styles.empty}>
            <Button variant="secondary" onClick={() => navigate('/')}>
              CONTINUE SHOPPING
            </Button>
          </div>
        ) : (
          <>
            <ul className={styles.itemsArea}>
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
                <Button variant="secondary" onClick={() => navigate('/')}>
                  CONTINUE SHOPPING
                </Button>
                <Button variant="primary">PAY</Button>
              </div>
            </div>
          </>
        )}
      </main>
    </>
  )
}

export default CartPage
