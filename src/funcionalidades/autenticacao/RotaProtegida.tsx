import { Navigate, useLocation } from 'react-router-dom'
import { obterSessao } from '../../dados/repositorioClientes'
import type { ReactNode } from 'react'

interface PropsRotaProtegida {
  children: ReactNode
}

export function RotaProtegida({ children }: PropsRotaProtegida) {
  const localizacao = useLocation()
  const sessao = obterSessao()

  if (!sessao) {
    return <Navigate to="/admin" replace state={{ from: localizacao.pathname }} />
  }

  return children
}
