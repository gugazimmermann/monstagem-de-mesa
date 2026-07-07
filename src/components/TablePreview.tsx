import type { CSSProperties } from 'react'
import type { TableSetting, TablewareItem } from '../types'
import { getItemById } from '../data/catalog'
import {
  hasDimensions,
  isRoundItem,
  sizedLayerStyle,
} from '../utils/dimensions'
import './TablePreview.css'

interface TablePreviewProps {
  setting: TableSetting
}

function colorVars(item: TablewareItem): CSSProperties {
  const { primary, secondary = primary, accent = primary } = item.colors
  return {
    '--c-primary': primary,
    '--c-secondary': secondary,
    '--c-accent': accent,
  } as CSSProperties
}

function sizedStyle(item: TablewareItem): CSSProperties {
  if (!hasDimensions(item)) return {}
  return sizedLayerStyle(item)
}

function TableclothLayer({ item }: { item: TablewareItem }) {
  const pattern = item.pattern ?? 'solid'

  return (
    <div
      className={`tablecloth tablecloth--${pattern}`}
      style={colorVars(item)}
      aria-label={item.name}
    />
  )
}

function ChargerLayer({ item }: { item: TablewareItem }) {
  if (!hasDimensions(item)) return null

  const round = isRoundItem(item)

  return (
    <div
      className={`layer layer--sized charger ${round ? 'layer--round' : ''} ${item.image ? 'charger--image' : ''}`}
      style={{ ...sizedStyle(item), ...(!item.image ? colorVars(item) : {}) }}
      aria-label={item.name}
    >
      {item.image && <img src={item.image} alt="" draggable={false} />}
    </div>
  )
}

function LugarAmericanoLayer({ item }: { item: TablewareItem }) {
  if (!hasDimensions(item)) return null

  const round = isRoundItem(item)

  return (
    <div
      className={`layer layer--sized lugar-americano ${round ? 'layer--round' : 'lugar-americano--rect'}`}
      style={sizedStyle(item)}
      aria-label={item.name}
    >
      {item.image && <img src={item.image} alt="" draggable={false} />}
    </div>
  )
}

function PlateLayer({
  item,
  variant,
}: {
  item: TablewareItem
  variant: 'raso' | 'fundo'
}) {
  if (!hasDimensions(item)) return null

  const variantClass = variant === 'fundo' ? 'plate--fundo' : 'plate--raso'

  return (
    <div
      className={`layer layer--sized layer--round plate ${variantClass} ${item.image ? 'plate--image' : ''}`}
      style={{ ...sizedStyle(item), ...(!item.image ? colorVars(item) : {}) }}
      aria-label={item.name}
    >
      {item.image ? (
        <img src={item.image} alt="" draggable={false} />
      ) : (
        <div className="plate__inner" />
      )}
    </div>
  )
}

export function TablePreview({ setting }: TablePreviewProps) {
  const toalha = getItemById(setting.toalha)
  const lugarAmericano = getItemById(setting.lugarAmericano)
  const charger = getItemById(setting.charger)
  const plateRaso = getItemById(setting.plateRaso)
  const plateFundo = getItemById(setting.plateFundo)

  const baseLayer = lugarAmericano ?? charger

  const summary = [toalha, lugarAmericano, charger, plateRaso, plateFundo]
    .filter(Boolean)
    .map((item) => item!.name)
    .join(', ')

  const isEmpty = !toalha && !lugarAmericano && !charger && !plateRaso && !plateFundo

  return (
    <div className="table-preview" role="img" aria-label={`Montagem de mesa: ${summary || 'vazia'}`}>
      <div className={`table-surface ${toalha ? 'table-surface--cloth' : ''}`}>
        {toalha && <TableclothLayer item={toalha} />}
        <div className="table-edge" />
        <div className="place-setting">
          {baseLayer?.category === 'lugarAmericano' && (
            <LugarAmericanoLayer item={baseLayer} />
          )}
          {baseLayer?.category === 'charger' && <ChargerLayer item={baseLayer} />}
          {plateRaso && <PlateLayer item={plateRaso} variant="raso" />}
          {plateFundo && <PlateLayer item={plateFundo} variant="fundo" />}
        </div>
        {isEmpty && (
          <p className="table-preview__empty">Selecione itens para montar a mesa</p>
        )}
      </div>
    </div>
  )
}
