import { useState, type FormEvent } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import {
  autenticar,
  definirSessao,
  obterSessao,
} from '../../dados/repositorioClientes'
import './LoginAdmin.css'

export function LoginAdmin() {
  const navegar = useNavigate()
  const [login, setLogin] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState<string | null>(null)

  if (obterSessao()) {
    return <Navigate to="/admin/painel" replace />
  }

  function aoEnviar(evento: FormEvent) {
    evento.preventDefault()
    setErro(null)

    const cliente = autenticar(login, senha)
    if (!cliente) {
      setErro('Login ou senha inválidos.')
      return
    }

    definirSessao(cliente.id)
    navegar('/admin/painel', { replace: true })
  }

  return (
    <div className="admin-login">
      <form className="admin-login__card" onSubmit={aoEnviar}>
        <header className="admin-login__header">
          <h1>Admin</h1>
          <p>Entre com o login e senha do seu cliente.</p>
        </header>

        <label className="admin-field">
          <span>Login</span>
          <input
            type="text"
            name="login"
            autoComplete="username"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            required
          />
        </label>

        <label className="admin-field">
          <span>Senha</span>
          <input
            type="password"
            name="senha"
            autoComplete="current-password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
        </label>

        {erro && <p className="admin-login__erro" role="alert">{erro}</p>}

        <button type="submit" className="btn btn--primary admin-login__submit">
          Entrar
        </button>
      </form>
    </div>
  )
}
