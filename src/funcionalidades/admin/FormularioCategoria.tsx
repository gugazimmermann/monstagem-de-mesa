import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import type { Categoria } from '../../compartilhado/tipos'
import {
  carregarDadosCliente,
  obterSessao,
  salvarDadosCliente,
  slugifyCategoria,
} from '../../dados/repositorioClientes'
import './PainelAdmin.css'
import './LoginAdmin.css'

export function FormularioCategoria() {
  const navegar = useNavigate()
  const clienteId = obterSessao()!

  const [rotulo, setRotulo] = useState('')
  const [descricao, setDescricao] = useState('')
  const [erro, setErro] = useState<string | null>(null)

  function salvarCategoria(evento: FormEvent) {
    evento.preventDefault()
    setErro(null)

    const rotuloTrim = rotulo.trim()
    if (!rotuloTrim) {
      setErro('Informe o rótulo da categoria.')
      return
    }

    const dadosAtuais = carregarDadosCliente(clienteId)!
    let id = slugifyCategoria(rotuloTrim)
    const idsExistentes = new Set(dadosAtuais.categorias.map((c) => c.id))
    if (idsExistentes.has(id)) {
      id = `${id}-${Date.now()}`
    }

    const nova: Categoria = {
      id,
      rotulo: rotuloTrim,
      descricao: descricao.trim(),
    }

    salvarDadosCliente(clienteId, {
      ...dadosAtuais,
      categorias: [...dadosAtuais.categorias, nova],
    })
    navegar(`/admin/painel/categorias/${id}`)
  }

  return (
    <div className="admin-painel">
      <header className="admin-painel__header">
        <div>
          <p className="admin-painel__eyebrow">Categorias</p>
          <h1>Nova categoria</h1>
        </div>
        <div className="admin-painel__acoes">
          <Link className="btn btn--ghost" to="/admin/painel">
            Voltar
          </Link>
        </div>
      </header>

      {erro && (
        <p className="admin-painel__alerta admin-painel__alerta--erro" role="alert">
          {erro}
        </p>
      )}

      <section className="admin-painel__secao">
        <form className="admin-painel__form" onSubmit={salvarCategoria}>
          <label className="admin-field">
            <span>Rótulo</span>
            <input
              type="text"
              value={rotulo}
              onChange={(e) => setRotulo(e.target.value)}
              required
            />
          </label>

          <label className="admin-field">
            <span>Descrição</span>
            <textarea
              rows={3}
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
            />
          </label>

          <div className="admin-painel__form-acoes">
            <button type="submit" className="btn btn--primary">
              Criar categoria
            </button>
            <Link className="btn btn--ghost" to="/admin/painel">
              Cancelar
            </Link>
          </div>
        </form>
      </section>
    </div>
  )
}
