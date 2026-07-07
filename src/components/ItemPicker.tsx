import type { CSSProperties } from 'react'
import type { Category, CategoryId, TableSetting, TablewareItem } from '../types'
import { getItemsByCategory } from '../data/catalog'
import { formatDimensions, hasDimensions } from '../utils/dimensions'
import './ItemPicker.css'

interface ItemPickerProps {
  categories: Category[]
  activeCategory: CategoryId
  setting: TableSetting
  onCategoryChange: (category: CategoryId) => void
  onSelect: (category: CategoryId, itemId: string | null) => void
}

function ItemSwatch({ item }: { item: TablewareItem }) {
  if (item.image) {
    return (
      <span className="item-card__swatch item-card__swatch--image" aria-hidden="true">
        <img src={item.image} alt="" />
      </span>
    )
  }

  const { primary, secondary = primary, accent = primary } = item.colors
  const pattern = item.pattern ?? 'solid'

  return (
    <span
      className={`item-card__swatch item-card__swatch--fabric item-card__swatch--${pattern}`}
      style={
        {
          '--c-primary': primary,
          '--c-secondary': secondary,
          '--c-accent': accent,
        } as CSSProperties
      }
      aria-hidden="true"
    />
  )
}

export function ItemPicker({
  categories,
  activeCategory,
  setting,
  onCategoryChange,
  onSelect,
}: ItemPickerProps) {
  const categoryItems = getItemsByCategory(activeCategory)
  const activeMeta = categories.find((c) => c.id === activeCategory)
  const selectedId = setting[activeCategory]

  return (
    <div className="item-picker">
      <nav className="item-picker__tabs" aria-label="Categorias de louça">
        {categories.map((category) => {
          const isActive = category.id === activeCategory
          const hasSelection = Boolean(setting[category.id])

          return (
            <button
              key={category.id}
              type="button"
              className={`item-picker__tab ${isActive ? 'is-active' : ''} ${hasSelection ? 'has-selection' : ''}`}
              onClick={() => onCategoryChange(category.id)}
              aria-pressed={isActive}
            >
              {category.label}
            </button>
          )
        })}
      </nav>

      <div className="item-picker__panel">
        <header className="item-picker__header">
          <div>
            <h2>{activeMeta?.label}</h2>
            <p>{activeMeta?.description}</p>
          </div>
          {selectedId && (
            <button
              type="button"
              className="item-picker__clear"
              onClick={() => onSelect(activeCategory, null)}
            >
              Remover
            </button>
          )}
        </header>

        <ul className="item-picker__grid">
          {categoryItems.map((item) => {
            const isSelected = selectedId === item.id

            return (
              <li key={item.id}>
                <button
                  type="button"
                  className={`item-card ${isSelected ? 'is-selected' : ''}`}
                  onClick={() => onSelect(activeCategory, item.id)}
                  aria-pressed={isSelected}
                >
                  <ItemSwatch item={item} />
                  <span className="item-card__body">
                    <span className="item-card__name">{item.name}</span>
                    {hasDimensions(item) && (
                      <span className="item-card__size">{formatDimensions(item)}</span>
                    )}
                    {item.description && (
                      <span className="item-card__desc">{item.description}</span>
                    )}
                  </span>
                  {isSelected && <span className="item-card__check" aria-hidden="true">✓</span>}
                </button>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
