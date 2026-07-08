import { useState } from 'react'
import { PreVisualizacaoMesa, SeletorItens } from '../funcionalidades/mesa'
import { categorias, configuracaoVazia, obterItemPorId } from '../funcionalidades/catalogo'
import type { ConfiguracaoMesa, IdCategoria } from '../compartilhado/tipos'
import './App.css'

const nomeMarca = 'Raffiner'
const logoMarca = '/logo/logo_h.webp'

export default function App() {
  const [configuracao, setConfiguracao] = useState<ConfiguracaoMesa>(configuracaoVazia)
  const [categoriaAtiva, setCategoriaAtiva] = useState<IdCategoria>('toalha')

  function selecionar(categoria: IdCategoria, idItem: string | null) {
    setConfiguracao((anterior) => {
      const proxima: ConfiguracaoMesa = { ...anterior, [categoria]: idItem }

      // Lugar americano e sousplat são mutuamente exclusivos
      if (idItem) {
        if (categoria === 'lugarAmericano') proxima.sousplat = null
        if (categoria === 'sousplat') proxima.lugarAmericano = null
      }

      return proxima
    })
  }

  function limparTudo() {
    setConfiguracao(configuracaoVazia)
  }

  const resumoSelecionado = categorias
    .map((categoria) => {
      const item = obterItemPorId(configuracao[categoria.id])
      return item ? { categoria: categoria.rotulo, item: item.nome } : null
    })
    .filter(Boolean) as { categoria: string; item: string }[]

  return (
    <div className="app">
      <header className="app__header">
        <div>
          <img className="app__logo" src={logoMarca} alt={nomeMarca} />
          <h1>Montagem de Mesa</h1>
          <p className="app__subtitle">
            Monte seu lugar à mesa escolhendo sousplats, pratos, taças, talheres e
            decorações. A mesa é atualizada conforme você seleciona cada peça.
          </p>
        </div>
        <div className="app__actions">
          <button type="button" className="btn btn--ghost" onClick={limparTudo}>
            Limpar tudo
          </button>
        </div>
      </header>

      <main className="app__main">
        <section className="app__preview" aria-label="Pré-visualização da mesa">
          <PreVisualizacaoMesa configuracao={configuracao} />
          {resumoSelecionado.length > 0 && (
            <ul className="setting-summary">
              {resumoSelecionado.map(({ categoria, item }) => (
                <li key={categoria}>
                  <span className="setting-summary__cat">{categoria}</span>
                  <span className="setting-summary__item">{item}</span>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="app__picker" aria-label="Seleção de itens">
          <SeletorItens
            categorias={categorias}
            categoriaAtiva={categoriaAtiva}
            configuracao={configuracao}
            aoMudarCategoria={setCategoriaAtiva}
            aoSelecionar={selecionar}
          />
        </section>
      </main>
    </div>
  )
}
