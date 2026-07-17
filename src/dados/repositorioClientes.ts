import type { Cliente, DadosCliente, ItemMesa, Categoria } from '../compartilhado/tipos'
import seedClientes from './clientes.json'
import seedCatalogo from './catalogo.json'

const PREFIXO_CLIENTE = 'montagem:cliente:'
const CHAVE_SESSAO = 'montagem:sessao'

function chaveCliente(id: string): string {
  return `${PREFIXO_CLIENTE}${id}`
}

export function listarClientes(): Cliente[] {
  return seedClientes.clientes as Cliente[]
}

export function obterClientePorId(id: string): Cliente | null {
  return listarClientes().find((c) => c.id === id) ?? null
}

export function obterClientePorSlug(slug: string): Cliente | null {
  return listarClientes().find((c) => c.slug === slug) ?? null
}

export function obterClientePorLogin(login: string): Cliente | null {
  const normalizado = login.trim().toLowerCase()
  return listarClientes().find((c) => c.login.toLowerCase() === normalizado) ?? null
}

function dadosIniciais(cliente: Cliente): DadosCliente {
  if (cliente.id === 'raffiner') {
    return {
      nome: cliente.nome,
      logo: cliente.logo,
      categorias: seedCatalogo.categorias as Categoria[],
      itens: seedCatalogo.itens as ItemMesa[],
    }
  }

  return {
    nome: cliente.nome,
    logo: cliente.logo,
    categorias: [],
    itens: [],
  }
}

export function carregarDadosCliente(id: string): DadosCliente | null {
  const cliente = obterClientePorId(id)
  if (!cliente) return null

  try {
    const bruto = localStorage.getItem(chaveCliente(id))
    if (bruto) {
      return JSON.parse(bruto) as DadosCliente
    }
  } catch {
    // seed abaixo
  }

  const dados = dadosIniciais(cliente)
  salvarDadosCliente(id, dados)
  return dados
}

export function salvarDadosCliente(id: string, dados: DadosCliente): void {
  localStorage.setItem(chaveCliente(id), JSON.stringify(dados))
}

export function autenticar(login: string, senha: string): Cliente | null {
  const cliente = obterClientePorLogin(login)
  if (!cliente || cliente.senha !== senha) return null
  return cliente
}

export function obterSessao(): string | null {
  return sessionStorage.getItem(CHAVE_SESSAO)
}

export function definirSessao(clienteId: string): void {
  sessionStorage.setItem(CHAVE_SESSAO, clienteId)
}

export function limparSessao(): void {
  sessionStorage.removeItem(CHAVE_SESSAO)
}

export function slugifyCategoria(rotulo: string): string {
  const base = rotulo
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

  return base || `categoria-${Date.now()}`
}
