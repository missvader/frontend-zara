import styles from './ErrorMessage.module.scss'

interface ErrorMessageProps {
  message: string
}

export const ErrorMessage = ({ message }: ErrorMessageProps) => (
  <div role="alert" className={styles.container}>
    <p className={styles.message}>{message}</p>
  </div>
)
