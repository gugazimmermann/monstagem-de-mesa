import type { Categoria, ItemMesa } from '../../compartilhado/tipos'

export type RespostaCatalogo = {
  categorias: Categoria[]
  itens: ItemMesa[]
}

async function buscarJson<T>(url: string): Promise<T> {
  const resp = await fetch(url)
  if (!resp.ok) {
    throw new Error(`Falha ao carregar ${url}: ${resp.status} ${resp.statusText}`)
  }
  return (await resp.json()) as T
}

export async function carregarCatalogo(): Promise<RespostaCatalogo> {
  const [categorias, itens] = await Promise.all([
    buscarJson<Categoria[]>('/api/categorias'),
    buscarJson<ItemMesa[]>('/api/itens'),
  ])

  return { categorias, itens }
}

