import type { ProductSpecs } from '@/types'
import styles from './SpecificationsTable.module.scss'

interface SpecificationsTableProps {
  specs: ProductSpecs
}

const SPEC_LABELS: Record<keyof ProductSpecs, string> = {
  screen: 'Screen',
  resolution: 'Resolution',
  processor: 'Processor',
  mainCamera: 'Main camera',
  selfieCamera: 'Selfie camera',
  battery: 'Battery',
  os: 'Operating system',
  screenRefreshRate: 'Screen refresh rate',
}

export const SpecificationsTable = ({ specs }: SpecificationsTableProps) => (
  <dl className={styles.list}>
    {(Object.keys(specs) as Array<keyof ProductSpecs>).map((key) => (
      <div key={key} className={styles.row}>
        <dt className={styles.term}>{SPEC_LABELS[key]}</dt>
        <dd className={styles.detail}>{specs[key]}</dd>
      </div>
    ))}
  </dl>
)
