import { Link } from 'react-router-dom'
import { useCart } from '@/hooks/useCart'
import logoUrl from '@/assets/mbst-logo.svg'
import BagIcon from '@/assets/icons/BagIcon'
import { Container } from '@/components/Container/Container'
import styles from './Navbar.module.scss'

export const Navbar = () => {
  const { cart } = useCart()
  const totalItems = cart.items.length

  return (
    <header className={styles.header}>
      <Container className={styles.inner}>
        <Link to="/" className={styles.logoLink} aria-label="Home">
          <img src={logoUrl} alt="MBST" className={styles.logo} loading="lazy" />
        </Link>
        <Link to="/cart" className={styles.cartLink} aria-label={`Cart, ${totalItems} items`}>
          <div className={styles.bagInner}>
            <BagIcon />
            <span className={styles.cartCount}>{totalItems}</span>
          </div>
        </Link>
      </Container>
    </header>
  )
}
