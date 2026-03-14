import { Navbar } from '@/components/Navbar/Navbar'
import styles from './AppLoading.module.scss'

export const AppLoading = () => (
  <>
    <Navbar />
    <div className={styles.loadingBar} role="progressbar" aria-label="Loading" />
  </>
)
