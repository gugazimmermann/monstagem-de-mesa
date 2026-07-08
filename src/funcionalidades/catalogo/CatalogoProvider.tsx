import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

import type { Categoria, ConfiguracaoMesa, IdCategoria, ItemMesa } from '../../compartilhado/tipos'
import { carregarCatalogo } from './catalogoApi'
import { configuracaoVazia as configuracaoVaziaLocal } from './catalogo'

type Indices = {
  porId: Map<string, ItemMesa>
  porCategoria: Map<IdCategoria, ItemMesa[]>
}

export type CatalogoContextValue = {
  carregando: boolean
  erro: string | null
  categorias: Categoria[]
  configuracaoVazia: ConfiguracaoMesa
  obterItemPorId: (id: string | null) => ItemMesa | null
  obterItensPorCategoria: (idCategoria: IdCategoria) => ItemMesa[]
}

const CatalogoContext = createContext<CatalogoContextValue | null>(null)

function criarIndices(itens: ItemMesa[]): Indices {
  const porId = new Map<string, ItemMesa>()
  const porCategoria = new Map<IdCategoria, ItemMesa[]>()

  for (const item of itens) {
    porId.set(item.id, item)
    const lista = porCategoria.get(item.categoria) ?? []
    lista.push(item)
    porCategoria.set(item.categoria, lista)
  }

  return { porId, porCategoria }
}

export function CatalogoProvider({ children }: { children: ReactNode }) {
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState<string | null>(null)
  const [categorias, setCategorias] = useState<Categoria[]>([])
  const [itens, setItens] = useState<ItemMesa[]>([])

  useEffect(() => {
    let ativo = true
    setCarregando(true)
    setErro(null)

    carregarCatalogo()
      .then((resp) => {
        if (!ativo) return
        setCategorias(resp.categorias)
        setItens(resp.itens)
      })
      .catch((e: unknown) => {
        if (!ativo) return
        setErro(e instanceof Error ? e.message : String(e))
      })
      .finally(() => {
        if (!ativo) return
        setCarregando(false)
      })

    return () => {
      ativo = false
    }
  }, [])

  const indices = useMemo(() => criarIndices(itens), [itens])

  const value = useMemo<CatalogoContextValue>(() => {
    return {
      carregando,
      erro,
      categorias,
      configuracaoVazia: configuracaoVaziaLocal,
      obterItemPorId: (id) => (id ? indices.porId.get(id) ?? null : null),
      obterItensPorCategoria: (idCategoria) => indices.porCategoria.get(idCategoria) ?? [],
    }
  }, [carregando, erro, categorias, indices])

  return <CatalogoContext.Provider value={value}>{children}</CatalogoContext.Provider>
}

export function useCatalogo(): CatalogoContextValue {
  const ctx = useContext(CatalogoContext)
  if (!ctx) {
    throw new Error('useCatalogo deve ser usado dentro de <CatalogoProvider>')
  }
  return ctx
}

