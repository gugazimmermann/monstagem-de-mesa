import type { CSSProperties } from 'react'
import type { DimensoesItem, IdCategoria, ItemMesa } from '../tipos'

type CategoriaMedida = Exclude<IdCategoria, 'toalha'>

const PADROES_CATEGORIA: Record<CategoriaMedida, DimensoesItem> = {
  sousplat: { largura: 33, comprimento: 33 },
  lugarAmericano: { largura: 35, comprimento: 48 },
  pratoRaso: { largura: 28, comprimento: 28 },
  pratoFundo: { largura: 22, comprimento: 22 },
}

const PADROES_REDONDO: Partial<Record<CategoriaMedida, number>> = {
  sousplat: 33,
  lugarAmericano: 38,
  pratoRaso: 28,
  pratoFundo: 22,
}

/** Referência visual: maior peça (comprimento) mapeada à área do lugar */
export const REFERENCIA_PREVIEW_CM = 48

export function inferirDimensoes(
  nome: string,
  categoria: CategoriaMedida,
): DimensoesItem {
  const matchRet = nome.match(/(\d+)\s*x\s*(\d+)\s*cm/i)
  if (matchRet) {
    return {
      largura: Number(matchRet[1]),
      comprimento: Number(matchRet[2]),
    }
  }

  const matchDiam = nome.match(/(\d+(?:[.,]\d+)?)\s*cm/i)
  if (matchDiam) {
    const diametro = parseFloat(matchDiam[1].replace(',', '.'))
    return { largura: diametro, comprimento: diametro }
  }

  if (/redondo/i.test(nome)) {
    const diametro = PADROES_REDONDO[categoria] ?? PADROES_CATEGORIA[categoria].largura
    return { largura: diametro, comprimento: diametro }
  }

  if (categoria === 'lugarAmericano' && /retangular/i.test(nome)) {
    return { largura: 35, comprimento: 45 }
  }

  if (/base mdf/i.test(nome)) {
    return { largura: 35, comprimento: 35 }
  }

  if (/mini sousplat/i.test(nome)) {
    return { largura: 25, comprimento: 25 }
  }

  return { ...PADROES_CATEGORIA[categoria] }
}

export function temDimensoes(
  item: ItemMesa,
): item is ItemMesa & DimensoesItem {
  return item.largura != null && item.comprimento != null
}

export function itemRedondo(item: ItemMesa & DimensoesItem): boolean {
  return item.largura === item.comprimento || /redondo/i.test(item.nome)
}

export function formatarDimensoes(item: ItemMesa & DimensoesItem): string {
  if (item.largura === item.comprimento) {
    return `Ø ${formatarCm(item.largura)} cm`
  }
  return `${formatarCm(item.largura)} × ${formatarCm(item.comprimento)} cm`
}

function formatarCm(valor: number): string {
  return Number.isInteger(valor) ? String(valor) : valor.toFixed(1).replace('.', ',')
}

export function estiloCamadaDimensionada(item: ItemMesa & DimensoesItem): CSSProperties {
  return {
    '--item-largura': item.largura,
    '--item-comprimento': item.comprimento,
  } as CSSProperties
}

