import type { CSSProperties } from 'react'
import type { CategoryId, ItemDimensions, TablewareItem } from '../types'

type MeasuredCategory = Exclude<CategoryId, 'toalha'>

const CATEGORY_DEFAULTS: Record<MeasuredCategory, ItemDimensions> = {
  charger: { largura: 33, comprimento: 33 },
  lugarAmericano: { largura: 35, comprimento: 48 },
  plateRaso: { largura: 28, comprimento: 28 },
  plateFundo: { largura: 22, comprimento: 22 },
}

const ROUND_DEFAULTS: Partial<Record<MeasuredCategory, number>> = {
  charger: 33,
  lugarAmericano: 38,
  plateRaso: 28,
  plateFundo: 22,
}

/** Referência visual: maior peça (comprimento) mapeada à área do lugar */
export const PREVIEW_REFERENCE_CM = 48

export function inferDimensions(
  name: string,
  category: MeasuredCategory,
): ItemDimensions {
  const rectMatch = name.match(/(\d+)\s*x\s*(\d+)\s*cm/i)
  if (rectMatch) {
    return {
      largura: Number(rectMatch[1]),
      comprimento: Number(rectMatch[2]),
    }
  }

  const diameterMatch = name.match(/(\d+(?:[.,]\d+)?)\s*cm/i)
  if (diameterMatch) {
    const diameter = parseFloat(diameterMatch[1].replace(',', '.'))
    return { largura: diameter, comprimento: diameter }
  }

  if (/redondo/i.test(name)) {
    const diameter = ROUND_DEFAULTS[category] ?? CATEGORY_DEFAULTS[category].largura
    return { largura: diameter, comprimento: diameter }
  }

  if (category === 'lugarAmericano' && /retangular/i.test(name)) {
    return { largura: 35, comprimento: 45 }
  }

  if (/base mdf/i.test(name)) {
    return { largura: 35, comprimento: 35 }
  }

  if (/mini sousplat/i.test(name)) {
    return { largura: 25, comprimento: 25 }
  }

  return { ...CATEGORY_DEFAULTS[category] }
}

export function hasDimensions(
  item: TablewareItem,
): item is TablewareItem & ItemDimensions {
  return item.largura != null && item.comprimento != null
}

export function isRoundItem(item: TablewareItem & ItemDimensions): boolean {
  return item.largura === item.comprimento || /redondo/i.test(item.name)
}

export function formatDimensions(item: TablewareItem & ItemDimensions): string {
  if (item.largura === item.comprimento) {
    return `Ø ${formatCm(item.largura)} cm`
  }
  return `${formatCm(item.largura)} × ${formatCm(item.comprimento)} cm`
}

function formatCm(value: number): string {
  return Number.isInteger(value) ? String(value) : value.toFixed(1).replace('.', ',')
}

export function sizedLayerStyle(item: TablewareItem & ItemDimensions): CSSProperties {
  return {
    '--item-largura': item.largura,
    '--item-comprimento': item.comprimento,
  } as CSSProperties
}
