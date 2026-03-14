import type { ChangeEvent } from 'react'
import styles from './SearchBar.module.scss'

interface SearchBarProps {
  value: string
  resultCount: number
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  onClear: () => void
}

export const SearchBar = ({ value, resultCount, onChange, onClear }: SearchBarProps) => (
  <div className={styles.wrapper}>
    <div className={styles.inputRow}>
      <input
        type="search"
        role="searchbox"
        aria-label="Search for a smartphone"
        aria-controls="results-count"
        placeholder="Search for a smartphone…"
        value={value}
        onChange={onChange}
        className={styles.input}
      />
      {value && (
        <button
          type="button"
          aria-label="Clear search"
          onClick={onClear}
          className={styles.clearBtn}
        >
          ✕
        </button>
      )}
    </div>
    <p id="results-count" aria-live="polite" aria-atomic="true" className={styles.count}>
      {resultCount} RESULTS
    </p>
  </div>
)
