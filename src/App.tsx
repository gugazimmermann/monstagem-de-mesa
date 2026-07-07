import { useState } from 'react'
import { TablePreview } from './components/TablePreview'
import { ItemPicker } from './components/ItemPicker'
import { categories, emptySetting, getItemById } from './data/catalog'
import type { CategoryId, TableSetting } from './types'
import './App.css'

const brandName = 'Raffiner'
const brandLogo = '/logo/logo_h.webp'

function App() {
  const [setting, setSetting] = useState<TableSetting>(emptySetting)
  const [activeCategory, setActiveCategory] = useState<CategoryId>('toalha')

  function handleSelect(category: CategoryId, itemId: string | null) {
    setSetting((prev) => {
      const next: TableSetting = { ...prev, [category]: itemId }

      // Lugar americano e sousplat são mutuamente exclusivos
      if (itemId) {
        if (category === 'lugarAmericano') next.charger = null
        if (category === 'charger') next.lugarAmericano = null
      }

      return next
    })
  }

  function handleClearAll() {
    setSetting(emptySetting)
  }

  const selectedSummary = categories
    .map((category) => {
      const item = getItemById(setting[category.id])
      return item ? { category: category.label, item: item.name } : null
    })
    .filter(Boolean) as { category: string; item: string }[]

  return (
    <div className="app">
      <header className="app__header">
        <div>
          <img
            className="app__logo"
            src={brandLogo}
            alt={brandName}
          />
          <h1>Montagem de Mesa</h1>
          <p className="app__subtitle">
            Monte seu lugar à mesa escolhendo sousplats, pratos, taças, talheres e
            decorações. A mesa é atualizada conforme você seleciona cada peça.
          </p>
        </div>
        <div className="app__actions">
          <button type="button" className="btn btn--ghost" onClick={handleClearAll}>
            Limpar tudo
          </button>
        </div>
      </header>

      <main className="app__main">
        <section className="app__preview" aria-label="Pré-visualização da mesa">
          <TablePreview setting={setting} />
          {selectedSummary.length > 0 && (
            <ul className="setting-summary">
              {selectedSummary.map(({ category, item }) => (
                <li key={category}>
                  <span className="setting-summary__cat">{category}</span>
                  <span className="setting-summary__item">{item}</span>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="app__picker" aria-label="Seleção de itens">
          <ItemPicker
            categories={categories}
            activeCategory={activeCategory}
            setting={setting}
            onCategoryChange={setActiveCategory}
            onSelect={handleSelect}
          />
        </section>
      </main>
    </div>
  )
}

export default App
