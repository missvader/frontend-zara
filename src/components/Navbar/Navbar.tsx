import { Link } from 'react-router-dom'
import { useCart } from '@/hooks/useCart'
import styles from './Navbar.module.scss'

export const Navbar = () => {
  const { cart } = useCart()
  const totalItems = cart.items.length

  return (
    <nav className={styles.nav} aria-label="Main navigation">
      <div className={styles.inner}>
        <Link to="/" className={styles.logo}>
          SMARTPHONES
        </Link>
        <Link to="/cart" aria-label={`Cart, ${totalItems} items`} className={styles.cartLink}>
          <span aria-hidden="true">&#128722;</span>
          <span className={styles.cartCount}>{totalItems}</span>
        </Link>
      </div>
    </nav>
  )
}
