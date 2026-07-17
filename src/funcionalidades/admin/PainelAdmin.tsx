import { useMemo, useState, type ChangeEvent, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import type { DadosCliente } from '../../compartilhado/tipos'
import {
  carregarDadosCliente,
  limparSessao,
  obterClientePorId,
  obterSessao,
  salvarDadosCliente,
} from '../../dados/repositorioClientes'
import './PainelAdmin.css'
import './LoginAdmin.css'
import './EditarCategoria.css'

export function PainelAdmin() {
  const navegar = useNavigate()
  const clienteId = obterSessao()!
  const clienteSeed = obterClientePorId(clienteId)

  const [dados, setDados] = useState<DadosCliente>(() => carregarDadosCliente(clienteId)!)
  const [nome, setNome] = useState(dados.nome)
  const [logo, setLogo] = useState(dados.logo)
  const [mensagem, setMensagem] = useState<string | null>(null)
  const [erro, setErro] = useState<string | null>(null)

  const linkPublico = useMemo(
    () => (clienteSeed ? `/c/${clienteSeed.slug}` : '/'),
    [clienteSeed],
  )

  function persistir(proximo: DadosCliente) {
    salvarDadosCliente(clienteId, proximo)
    setDados(proximo)
  }

  function salvarPerfil(evento: FormEvent) {
    evento.preventDefault()
    setErro(null)
    const nomeTrim = nome.trim()
    if (!nomeTrim) {
      setErro('Informe o nome do cliente.')
      return
    }

    const proximo: DadosCliente = { ...dados, nome: nomeTrim, logo: logo.trim() || dados.logo }
    persistir(proximo)
    setMensagem('Perfil salvo.')
  }

  function aoEscolherLogo(evento: ChangeEvent<HTMLInputElement>) {
    const arquivo = evento.target.files?.[0]
    if (!arquivo) return

    const leitor = new FileReader()
    leitor.onload = () => {
      if (typeof leitor.result === 'string') {
        setLogo(leitor.result)
      }
    }
    leitor.readAsDataURL(arquivo)
  }

  function excluirCategoria(id: string) {
    const ok = window.confirm('Excluir esta categoria? Os itens vinculados também serão removidos.')
    if (!ok) return

    const categorias = dados.categorias.filter((c) => c.id !== id)
    const itens = dados.itens.filter((item) => item.categoria !== id)
    persistir({ ...dados, categorias, itens })
    setMensagem('Categoria excluída.')
  }

  function sair() {
    limparSessao()
    navegar('/admin', { replace: true })
  }

  return (
    <div className="admin-painel">
      <header className="admin-painel__header">
        <div>
          <p className="admin-painel__eyebrow">Painel do cliente</p>
          <h1>{dados.nome}</h1>
        </div>
        <div className="admin-painel__acoes">
          <Link className="btn btn--ghost" to={linkPublico}>
            Ver montagem
          </Link>
          <button type="button" className="btn btn--ghost" onClick={sair}>
            Sair
          </button>
        </div>
      </header>

      {(mensagem || erro) && (
        <p className={erro ? 'admin-painel__alerta admin-painel__alerta--erro' : 'admin-painel__alerta'} role="status">
          {erro ?? mensagem}
        </p>
      )}

      <section className="admin-painel__secao">
        <h2>Perfil</h2>
        <form className="admin-painel__form" onSubmit={salvarPerfil}>
          <label className="admin-field">
            <span>Nome</span>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
          </label>

          <label className="admin-field">
            <span>Logo</span>
            <input type="file" accept="image/*" onChange={aoEscolherLogo} />
          </label>

          {logo && (
            <div className="admin-painel__logo-preview">
              <img src={logo} alt={`Logo ${nome}`} />
            </div>
          )}

          <button type="submit" className="btn btn--primary">
            Salvar perfil
          </button>
        </form>
      </section>

      <section className="admin-painel__secao">
        <div className="admin-itens__cabecalho">
          <h2>Categorias ({dados.categorias.length})</h2>
          <Link className="btn btn--primary" to="/admin/painel/categorias/novo">
            Nova categoria
          </Link>
        </div>

        <ul className="admin-categorias">
          {dados.categorias.length === 0 && (
            <li className="admin-categorias__vazio">Nenhuma categoria ainda.</li>
          )}
          {dados.categorias.map((categoria) => {
            const qtdItens = dados.itens.filter((i) => i.categoria === categoria.id).length
            return (
              <li key={categoria.id} className="admin-categorias__item">
                <div>
                  <strong>
                    {categoria.rotulo}{' '}
                    <span className="admin-categorias__qtd">
                      ({qtdItens} {qtdItens === 1 ? 'item' : 'itens'})
                    </span>
                  </strong>
                  {categoria.descricao && <p>{categoria.descricao}</p>}
                </div>
                <div className="admin-categorias__acoes">
                  <Link
                    className="btn btn--ghost"
                    to={`/admin/painel/categorias/${categoria.id}`}
                  >
                    Editar
                  </Link>
                  <button
                    type="button"
                    className="btn btn--ghost"
                    onClick={() => excluirCategoria(categoria.id)}
                  >
                    Excluir
                  </button>
                </div>
              </li>
            )
          })}
        </ul>
      </section>
    </div>
  )
}
