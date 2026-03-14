import { Link } from 'react-router-dom'
import { Navbar } from '@/components/Navbar/Navbar'
import styles from './NotFoundPage.module.scss'

const NotFoundPage = () => (
  <>
    <Navbar />
    <main className={styles.page}>
      <h1 className={styles.title}>404</h1>
      <p className={styles.message}>Page not found.</p>
      <Link to="/" className={styles.link}>
        Back to catalogue
      </Link>
    </main>
  </>
)

export default NotFoundPage
