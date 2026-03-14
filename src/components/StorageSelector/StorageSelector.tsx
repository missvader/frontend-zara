import type { StorageOption } from '@/types'
import styles from './StorageSelector.module.scss'

interface StorageSelectorProps {
  options: StorageOption[]
  selected: StorageOption | null
  onChange: (option: StorageOption) => void
}

export const StorageSelector = ({ options, selected, onChange }: StorageSelectorProps) => (
  <fieldset className={styles.fieldset}>
    <legend className={styles.legend}>Storage: How much space do you need?</legend>
    <div className={styles.options}>
      {options.map((option) => {
        const isSelected = selected?.capacity === option.capacity
        return (
          <button
            key={option.capacity}
            type="button"
            aria-label={`Select ${option.capacity}, ${option.price} EUR`}
            aria-pressed={isSelected}
            className={`${styles.option} ${isSelected ? styles.optionSelected : ''}`}
            onClick={() => onChange(option)}
          >
            {option.capacity}
          </button>
        )
      })}
    </div>
  </fieldset>
)
