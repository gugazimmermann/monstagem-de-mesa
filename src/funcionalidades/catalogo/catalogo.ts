import type { Categoria, ConfiguracaoMesa, IdCategoria, ItemMesa } from '../../compartilhado/tipos'
import dados from '../../dados/catalogo.json'

export const categorias = dados.categorias as Categoria[]
export const itens = dados.itens as ItemMesa[]

/** Mesa vazia — estado inicial e resultado de "Limpar tudo" */
export const configuracaoVazia: ConfiguracaoMesa = {
  toalha: null,
  lugarAmericano: null,
  sousplat: null,
  pratoRaso: null,
  pratoFundo: null,
}

export function obterItemPorId(id: string | null): ItemMesa | null {
  if (!id) return null
  return itens.find((item) => item.id === id) ?? null
}

export function obterItensPorCategoria(idCategoria: IdCategoria): ItemMesa[] {
  return itens.filter((item) => item.categoria === idCategoria)
}
