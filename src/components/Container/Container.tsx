import type { ElementType, ReactNode } from 'react'
import styles from './Container.module.scss'

interface ContainerProps {
  children: ReactNode
  size?: 'full' | 'content'
  as?: ElementType
  className?: string
}

export const Container = ({
  children,
  size = 'full',
  as: Tag = 'div',
  className,
}: ContainerProps) => (
  <Tag
    className={[styles.container, size === 'content' ? styles.sizeContent : '', className ?? '']
      .filter(Boolean)
      .join(' ')}
  >
    {children}
  </Tag>
)
