import type { Categoria, ConfiguracaoMesa, IdCategoria, ItemMesa } from '../../compartilhado/tipos'

/** Mesa vazia a partir das categorias do cliente */
export function criarConfiguracaoVazia(categorias: Categoria[]): ConfiguracaoMesa {
  return Object.fromEntries(categorias.map((c) => [c.id, null]))
}

export function obterItemPorId(itens: ItemMesa[], id: string | null): ItemMesa | null {
  if (!id) return null
  return itens.find((item) => item.id === id) ?? null
}

export function obterItensPorCategoria(
  itens: ItemMesa[],
  idCategoria: IdCategoria,
): ItemMesa[] {
  return itens.filter((item) => item.categoria === idCategoria)
}
