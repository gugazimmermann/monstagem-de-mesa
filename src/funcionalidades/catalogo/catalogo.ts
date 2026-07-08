import type { Categoria, ConfiguracaoMesa, ItemMesa } from '../../compartilhado/tipos'
import { inferirDimensoes } from '../../compartilhado/utils/dimensoes'

export const categorias: Categoria[] = [
  {
    id: 'toalha',
    rotulo: 'Toalhas',
    descricao: 'Toalhas de mesa que cobrem a superfície',
  },
  {
    id: 'lugarAmericano',
    rotulo: 'Lugares Americanos',
    descricao: 'Lugares americanos no lugar do sousplat (não combina com sousplat)',
  },
  {
    id: 'sousplat',
    rotulo: 'Sousplats',
    descricao: 'Sousplats no lugar do lugar americano (não combina com lugar americano)',
  },
  {
    id: 'pratoRaso',
    rotulo: 'Pratos Rasos',
    descricao: 'Pratos rasos para o centro do lugar',
  },
  {
    id: 'pratoFundo',
    rotulo: 'Pratos Fundos',
    descricao: 'Pratos fundos e especiais sobre o prato raso',
  },
]

const DIR_SOUSPLAT = '/imgs/Sousplats'

/** Fotos dos produtos em public/imgs/Sousplats */
const arquivosSousplat = [
  'Base MDF 35cm.jpg',
  'Mini Sousplat 25cm Azul.jpg',
  'Mini Sousplat 25cm Lilás.png',
  'Mini Sousplat 25cm Rosé.png',
  'Mini Sousplat 25cm Verde.png',
  'Mini Sousplat Dourado 25cm.png',
  'Mini Sousplat Prata 25cm.png',
  'Sousplat Antique Home Style 2.jpg',
  'Sousplat Antique Home Style 3.png',
  'Sousplat Antique Home Style.png',
  'Sousplat Arabesco Dourado.png',
  'Sousplat Arabesco Fendi.png',
  'Sousplat Arabesco Prata.png',
  'Sousplat Arabesco Rosa.png',
  'Sousplat Basic Azul Marinho.png',
  'Sousplat Basic Camurça.png',
  'Sousplat Basic Verde Eucalipto.png',
  'Sousplat Branco.png',
  'Sousplat Delicate Azul Bebê.png',
  'Sousplat Delicate Lilás.png',
  'Sousplat Delicate Rosa Bebê.png',
  'Sousplat Delicate Verde.png',
  'Sousplat Detroit Fiber 38cm - Sisal.png',
  'Sousplat Dourado Brilho.png',
  'Sousplat Petit 25cm Algodão Rosa.png',
  'Sousplat Petit 25cm Capuccino.png',
  'Sousplat Petit 25cm Julie Rosa.png',
  'Sousplat Plissado Home Style.png',
  'Sousplat Preto.png',
  'Sousplat Vermelho Brilho.jpg',
  'Sousplat Vermelho Cronus.png',
  'Sousplat de Cristal Pearl Wolff.png',
  'Sousplat de Sisal 32cm.png',
] as const

function slugificar(valor: string): string {
  return valor
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

function itensComImagem(
  arquivos: readonly string[],
  categoria: Exclude<ItemMesa['categoria'], 'toalha'>,
  dir: string,
  coresPadrao: ItemMesa['cores'],
): ItemMesa[] {
  return arquivos.map((arquivo) => {
    const nome = arquivo.replace(/\.(png|jpe?g)$/i, '')
    const { largura, comprimento } = inferirDimensoes(nome, categoria)
    return {
      id: `${categoria}-${slugificar(nome)}`,
      nome,
      categoria,
      imagem: `${dir}/${encodeURIComponent(arquivo)}`,
      cores: coresPadrao,
      largura,
      comprimento,
    }
  })
}

const itensSousplat = itensComImagem(arquivosSousplat, 'sousplat', DIR_SOUSPLAT, {
  primaria: '#c4a574',
  secundaria: '#e8d4b0',
  destaque: '#8b6914',
})

const DIR_PRATO_RASO = '/imgs/Pratos Rasos'

/** Fotos dos produtos em public/imgs/Pratos Rasos */
const arquivosPratoRaso = [
  'Prato Raso Bunny - Cenoura.png',
  'Prato Raso Celebrate Bege.png',
  'Prato Raso Celebrate Verde.png',
  'Prato Raso Celebrate Vermelho.png',
  'Prato Raso Coelha Rosa.png',
  'Prato Raso Coup Navy.png',
  'Prato Raso Cristal Pearl.png',
  'Prato Raso Flamingo Diamond Filete de Prata.png',
  'Prato Raso Flora Dalia.png',
  'Prato Raso Mar.png',
  'Prato Raso Nobre.png',
  'Prato Raso Roma 2.png',
  'Prato Raso Roma.png',
  'Prato Raso Stripes Rosa 29cm.png',
  'Prato Raso Unni Avelã.png',
  'Prato Raso Verde Esmeralda 29cm.png',
  'Prato Raso Vivant Areia 27cm.png',
] as const

const coresPrato = {
  primaria: '#faf8f5',
  secundaria: '#e8e4df',
  destaque: '#d0cbc4',
} as const

const DIR_PRATO_FUNDO = '/imgs/Pratos Fundos'

/** Fotos dos produtos em public/imgs/Pratos Fundos */
const arquivosPratoFundo = [
  'Prato Coração Funny.png',
  'Prato Fundo Frutos do Mar.png',
  'Prato para Risoto.png',
] as const

const itensPratoRaso = itensComImagem(arquivosPratoRaso, 'pratoRaso', DIR_PRATO_RASO, coresPrato)
const itensPratoFundo = itensComImagem(arquivosPratoFundo, 'pratoFundo', DIR_PRATO_FUNDO, coresPrato)

const DIR_LUGAR_AMERICANO = '/imgs/Lugares Americanos'

/** Fotos dos produtos em public/imgs/Lugares Americanos */
const arquivosLugarAmericano = [
  'Capar para Base MDF Off White com Arabesco.png',
  'Lugar Americano Costela de Adão.png',
  'Lugar Americano Folha Rosê Dupla Face.png',
  'Lugar Americano Grama Sintética.png',
  'Lugar Americano Linho Misto Bege.png',
  'Lugar Americano Linhão Bege.png',
  'Lugar Americano Organza Rosa 28x42cm (Toalha para Bandeja).png',
  'Lugar Americano Redondo Nylon com Bordado Cru.png',
  'Lugar Americano Redondo Nylon com Bordado Lilás.png',
  'Lugar Americano Redondo Renda Branco.png',
  'Lugar Americano Redondo Verde Bordado.png',
  'Lugar Americano Redondo Verde com Festonê.jpg',
  'Lugar Americano Redondo com Bordado Azul.png',
  'Lugar Americano Redondo com Bordado Flor Branco.png',
  'Lugar Americano Redondo com Bordado Rosa.png',
  'Lugar Americano Renda Bege.png',
  'Lugar Americano Renda Branco.png',
  'Lugar Americano Renda Verde Musgo.png',
  'Lugar Americano Renda Verde.png',
  'Lugar Americano Renda Vermelho.png',
  'Lugar Americano Retangular Nylon com Bordado Ocre.png',
  'Lugar Americano Vermelho.png',
  'Lugar Americano de Palha.png',
  'Lugar americano Xadrez.png',
] as const

const itensLugarAmericano = itensComImagem(
  arquivosLugarAmericano,
  'lugarAmericano',
  DIR_LUGAR_AMERICANO,
  {
    primaria: '#e8dcc8',
    secundaria: '#f5efe4',
    destaque: '#c4b49a',
  },
)

const itensToalha: ItemMesa[] = [
  {
    id: 'toalha-branco-linho',
    nome: 'Branco linho',
    categoria: 'toalha',
    padrao: 'linen',
    cores: { primaria: '#f7f3ec', secundaria: '#ebe4d8', destaque: '#d9d0c2' },
    descricao: 'Linho branco natural',
  },
  {
    id: 'toalha-marfim-classico',
    nome: 'Marfim clássico',
    categoria: 'toalha',
    padrao: 'solid',
    cores: { primaria: '#f3ead8', secundaria: '#e8dcc4', destaque: '#d4c4a8' },
    descricao: 'Tom creme elegante',
  },
  {
    id: 'toalha-azul-marinho',
    nome: 'Azul marinho',
    categoria: 'toalha',
    padrao: 'solid',
    cores: { primaria: '#1a3358', secundaria: '#274870', destaque: '#0f1f36' },
    descricao: 'Azul profundo formal',
  },
  {
    id: 'toalha-verde-eucalipto',
    nome: 'Verde eucalipto',
    categoria: 'toalha',
    padrao: 'linen',
    cores: { primaria: '#8fa88a', secundaria: '#a8c0a2', destaque: '#6e8a68' },
    descricao: 'Verde suave botânico',
  },
  {
    id: 'toalha-bordo-formal',
    nome: 'Bordô formal',
    categoria: 'toalha',
    padrao: 'damask',
    cores: { primaria: '#6b2d3a', secundaria: '#8a3d4a', destaque: '#4a1c28' },
    descricao: 'Bordô com motivação sutil',
  },
  {
    id: 'toalha-listras-preto-branco',
    nome: 'Listras preto e branco',
    categoria: 'toalha',
    padrao: 'stripes',
    cores: { primaria: '#f8f6f2', secundaria: '#2a2a2a', destaque: '#e8e4de' },
    descricao: 'Listras clássicas',
  },
  {
    id: 'toalha-xadrez-vichy',
    nome: 'Xadrez vichy vermelho',
    categoria: 'toalha',
    padrao: 'gingham',
    cores: { primaria: '#f8f4f0', secundaria: '#c43c3c', destaque: '#e8d8d0' },
    descricao: 'Xadrez campestre',
  },
  {
    id: 'toalha-rosa-poa',
    nome: 'Rosa com poás',
    categoria: 'toalha',
    padrao: 'dots',
    cores: { primaria: '#f8e8ec', secundaria: '#e8a0b0', destaque: '#f0d0d8' },
    descricao: 'Rosa claro com poás',
  },
  {
    id: 'toalha-dourado-festa',
    nome: 'Dourado festa',
    categoria: 'toalha',
    padrao: 'border',
    cores: { primaria: '#f5ecd4', secundaria: '#c9a227', destaque: '#e8d8a8' },
    descricao: 'Dourado com barra decorativa',
  },
  {
    id: 'toalha-cinza-grafite',
    nome: 'Cinza grafite',
    categoria: 'toalha',
    padrao: 'herringbone',
    cores: { primaria: '#5a5e64', secundaria: '#6e747c', destaque: '#3e4248' },
    descricao: 'Cinza com textura espinha',
  },
  {
    id: 'toalha-bege-natural',
    nome: 'Bege natural',
    categoria: 'toalha',
    padrao: 'linen',
    cores: { primaria: '#d8c8b0', secundaria: '#e8dcc8', destaque: '#b8a488' },
    descricao: 'Bege de algodão cru',
  },
  {
    id: 'toalha-azul-celeste',
    nome: 'Azul celeste',
    categoria: 'toalha',
    padrao: 'stripes',
    cores: { primaria: '#d8eaf4', secundaria: '#7ab0d0', destaque: '#c0dcec' },
    descricao: 'Listras em azul claro',
  },
]

export const itens: ItemMesa[] = [
  ...itensToalha,
  ...itensLugarAmericano,
  ...itensSousplat,
  ...itensPratoRaso,
  ...itensPratoFundo,
]

/** Mesa vazia — estado inicial e resultado de "Limpar tudo" */
export const configuracaoVazia: ConfiguracaoMesa = {
  toalha: null,
  lugarAmericano: null,
  sousplat: null,
  pratoRaso: null,
  pratoFundo: null,
}

export function obterItemPorId(id: string | null): ItemMesa | null {
  if (!id) return null
  return itens.find((item) => item.id === id) ?? null
}

export function obterItensPorCategoria(idCategoria: string): ItemMesa[] {
  return itens.filter((item) => item.categoria === idCategoria)
}

