import { Link, useParams } from 'react-router-dom'
import {
  carregarDadosCliente,
  obterClientePorSlug,
} from '../dados/repositorioClientes'
import App from './App'
import './App.css'

export function PaginaCliente() {
  const { slug } = useParams<{ slug: string }>()
  const cliente = slug ? obterClientePorSlug(slug) : null
  const dados = cliente ? carregarDadosCliente(cliente.id) : null

  if (!cliente || !dados) {
    return (
      <div className="app app--mensagem">
        <h1>Cliente não encontrado</h1>
        <p className="app__subtitle">
          Não existe um cliente com o endereço <code>/c/{slug}</code>.
        </p>
        <Link className="btn btn--primary" to="/c/raffiner">
          Ir para Raffiner
        </Link>
      </div>
    )
  }

  return <App key={cliente.id} dados={dados} />
}
