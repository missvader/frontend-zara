import type { ReactNode } from 'react'
import styles from './Button.module.scss'

interface ButtonProps {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'ghost'
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  onClick?: () => void
  'aria-label'?: string
}

export const Button = ({
  children,
  variant = 'primary',
  disabled = false,
  type = 'button',
  onClick,
  'aria-label': ariaLabel,
}: ButtonProps) => (
  <button
    type={type}
    className={`${styles.button} ${styles[variant]}`}
    disabled={disabled}
    onClick={onClick}
    aria-label={ariaLabel}
    aria-disabled={disabled}
  >
    {children}
  </button>
)
