import type { CSSProperties } from 'react'
import type { ConfiguracaoMesa, ItemMesa } from '../../../../compartilhado/tipos'
import { useCatalogo } from '../../../catalogo'
import {
  estiloCamadaDimensionada,
  itemRedondo,
  temDimensoes,
} from '../../../../compartilhado/utils/dimensoes'
import './PreVisualizacaoMesa.css'

interface PropsPreVisualizacaoMesa {
  configuracao: ConfiguracaoMesa
}

function varsCores(item: ItemMesa): CSSProperties {
  const { primaria, secundaria = primaria, destaque = primaria } = item.cores
  return {
    '--c-primary': primaria,
    '--c-secondary': secundaria,
    '--c-accent': destaque,
  } as CSSProperties
}

function estiloDimensionado(item: ItemMesa): CSSProperties {
  if (!temDimensoes(item)) return {}
  return estiloCamadaDimensionada(item)
}

function CamadaToalha({ item }: { item: ItemMesa }) {
  const padrao = item.padrao ?? 'solid'

  return (
    <div
      className={`tablecloth tablecloth--${padrao}`}
      style={varsCores(item)}
      aria-label={item.nome}
    />
  )
}

function CamadaSousplat({ item }: { item: ItemMesa }) {
  if (!temDimensoes(item)) return null

  const redondo = itemRedondo(item)

  return (
    <div
      className={`layer layer--sized sousplat ${redondo ? 'layer--round' : ''} ${item.imagem ? 'sousplat--image' : ''}`}
      style={{ ...estiloDimensionado(item), ...(!item.imagem ? varsCores(item) : {}) }}
      aria-label={item.nome}
    >
      {item.imagem && <img src={item.imagem} alt="" draggable={false} />}
    </div>
  )
}

function CamadaLugarAmericano({ item }: { item: ItemMesa }) {
  if (!temDimensoes(item)) return null

  const redondo = itemRedondo(item)

  return (
    <div
      className={`layer layer--sized lugar-americano ${redondo ? 'layer--round' : 'lugar-americano--rect'}`}
      style={estiloDimensionado(item)}
      aria-label={item.nome}
    >
      {item.imagem && <img src={item.imagem} alt="" draggable={false} />}
    </div>
  )
}

function CamadaPrato({
  item,
  variante,
}: {
  item: ItemMesa
  variante: 'raso' | 'fundo'
}) {
  if (!temDimensoes(item)) return null

  const classeVariante = variante === 'fundo' ? 'plate--fundo' : 'plate--raso'

  return (
    <div
      className={`layer layer--sized layer--round plate ${classeVariante} ${item.imagem ? 'plate--image' : ''}`}
      style={{ ...estiloDimensionado(item), ...(!item.imagem ? varsCores(item) : {}) }}
      aria-label={item.nome}
    >
      {item.imagem ? (
        <img src={item.imagem} alt="" draggable={false} />
      ) : (
        <div className="plate__inner" />
      )}
    </div>
  )
}

export function PreVisualizacaoMesa({ configuracao }: PropsPreVisualizacaoMesa) {
  const { obterItemPorId } = useCatalogo()
  const toalha = obterItemPorId(configuracao.toalha)
  const lugarAmericano = obterItemPorId(configuracao.lugarAmericano)
  const sousplat = obterItemPorId(configuracao.sousplat)
  const pratoRaso = obterItemPorId(configuracao.pratoRaso)
  const pratoFundo = obterItemPorId(configuracao.pratoFundo)

  const camadaBase = lugarAmericano ?? sousplat

  const resumo = [toalha, lugarAmericano, sousplat, pratoRaso, pratoFundo]
    .filter(Boolean)
    .map((item) => item!.nome)
    .join(', ')

  const vazia = !toalha && !lugarAmericano && !sousplat && !pratoRaso && !pratoFundo

  return (
    <div
      className="table-preview"
      role="img"
      aria-label={`Montagem de mesa: ${resumo || 'vazia'}`}
    >
      <div className={`table-surface ${toalha ? 'table-surface--cloth' : ''}`}>
        {toalha && <CamadaToalha item={toalha} />}
        <div className="table-edge" />
        <div className="place-setting">
          {camadaBase?.categoria === 'lugarAmericano' && <CamadaLugarAmericano item={camadaBase} />}
          {camadaBase?.categoria === 'sousplat' && <CamadaSousplat item={camadaBase} />}
          {pratoRaso && <CamadaPrato item={pratoRaso} variante="raso" />}
          {pratoFundo && <CamadaPrato item={pratoFundo} variante="fundo" />}
        </div>
        {vazia && <p className="table-preview__empty">Selecione itens para montar a mesa</p>}
      </div>
    </div>
  )
}

