import type { ColorOption } from '@/types'
import styles from './ColorSelector.module.scss'

interface ColorSelectorProps {
  colors: ColorOption[]
  selected: ColorOption | null
  onChange: (color: ColorOption) => void
}

export const ColorSelector = ({ colors, selected, onChange }: ColorSelectorProps) => (
  <fieldset className={styles.fieldset}>
    <legend className={styles.legend}>COLOR. PICK YOUR FAVORITE</legend>
    <div className={styles.swatches}>
      {colors.map((color) => {
        const isSelected = selected?.name === color.name
        return (
          <button
            key={color.name}
            type="button"
            aria-label={`Select color ${color.name}`}
            aria-pressed={isSelected}
            className={`${styles.swatch} ${isSelected ? styles.swatchSelected : ''}`}
            style={{ backgroundColor: color.hexCode }}
            onClick={() => onChange(color)}
            title={color.name}
          />
        )
      })}
      {selected && <p className={styles.selectedColorName}>{selected.name}</p>}
    </div>
  </fieldset>
)
