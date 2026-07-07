import type { Category, TableSetting, TablewareItem } from '../types'
import { inferDimensions } from '../utils/dimensions'

export const categories: Category[] = [
  {
    id: 'toalha',
    label: 'Toalhas',
    description: 'Toalhas de mesa que cobrem a superfície',
  },
  {
    id: 'lugarAmericano',
    label: 'Lugares Americanos',
    description: 'Lugares americanos no lugar do sousplat (não combina com sousplat)',
  },
  {
    id: 'charger',
    label: 'Sousplats',
    description: 'Sousplats no lugar do lugar americano (não combina com lugar americano)',
  },
  {
    id: 'plateRaso',
    label: 'Pratos Rasos',
    description: 'Pratos rasos para o centro do lugar',
  },
  {
    id: 'plateFundo',
    label: 'Pratos Fundos',
    description: 'Pratos fundos e especiais sobre o prato raso',
  },
]

const SOUSPLAT_DIR = '/imgs/Sousplats'

/** Product photos in public/imgs/Sousplats */
const sousplatFiles = [
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

function slugify(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

function imageItems(
  files: readonly string[],
  category: Exclude<TablewareItem['category'], 'toalha'>,
  dir: string,
  fallbackColors: TablewareItem['colors'],
): TablewareItem[] {
  return files.map((file) => {
    const name = file.replace(/\.(png|jpe?g)$/i, '')
    const { largura, comprimento } = inferDimensions(name, category)
    return {
      id: `${category}-${slugify(name)}`,
      name,
      category,
      image: `${dir}/${encodeURIComponent(file)}`,
      colors: fallbackColors,
      largura,
      comprimento,
    }
  })
}

const chargerItems = imageItems(sousplatFiles, 'charger', SOUSPLAT_DIR, {
  primary: '#c4a574',
  secondary: '#e8d4b0',
  accent: '#8b6914',
})

const PRATO_RASO_DIR = '/imgs/Pratos Rasos'

/** Product photos in public/imgs/Pratos Rasos */
const pratoRasoFiles = [
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

const plateColors = {
  primary: '#faf8f5',
  secondary: '#e8e4df',
  accent: '#d0cbc4',
} as const

const PRATO_FUNDO_DIR = '/imgs/Pratos Fundos'

/** Product photos in public/imgs/Pratos Fundos */
const pratoFundoFiles = [
  'Prato Coração Funny.png',
  'Prato Fundo Frutos do Mar.png',
  'Prato para Risoto.png',
] as const

const plateRasoItems = imageItems(pratoRasoFiles, 'plateRaso', PRATO_RASO_DIR, plateColors)
const plateFundoItems = imageItems(pratoFundoFiles, 'plateFundo', PRATO_FUNDO_DIR, plateColors)

const LUGAR_AMERICANO_DIR = '/imgs/Lugares Americanos'

/** Product photos in public/imgs/Lugares Americanos */
const lugarAmericanoFiles = [
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

const lugarAmericanoItems = imageItems(
  lugarAmericanoFiles,
  'lugarAmericano',
  LUGAR_AMERICANO_DIR,
  {
    primary: '#e8dcc8',
    secondary: '#f5efe4',
    accent: '#c4b49a',
  },
)

const toalhaItems: TablewareItem[] = [
  {
    id: 'toalha-branco-linho',
    name: 'Branco linho',
    category: 'toalha',
    pattern: 'linen',
    colors: { primary: '#f7f3ec', secondary: '#ebe4d8', accent: '#d9d0c2' },
    description: 'Linho branco natural',
  },
  {
    id: 'toalha-marfim-classico',
    name: 'Marfim clássico',
    category: 'toalha',
    pattern: 'solid',
    colors: { primary: '#f3ead8', secondary: '#e8dcc4', accent: '#d4c4a8' },
    description: 'Tom creme elegante',
  },
  {
    id: 'toalha-azul-marinho',
    name: 'Azul marinho',
    category: 'toalha',
    pattern: 'solid',
    colors: { primary: '#1a3358', secondary: '#274870', accent: '#0f1f36' },
    description: 'Azul profundo formal',
  },
  {
    id: 'toalha-verde-eucalipto',
    name: 'Verde eucalipto',
    category: 'toalha',
    pattern: 'linen',
    colors: { primary: '#8fa88a', secondary: '#a8c0a2', accent: '#6e8a68' },
    description: 'Verde suave botânico',
  },
  {
    id: 'toalha-bordo-formal',
    name: 'Bordô formal',
    category: 'toalha',
    pattern: 'damask',
    colors: { primary: '#6b2d3a', secondary: '#8a3d4a', accent: '#4a1c28' },
    description: 'Bordô com motivação sutil',
  },
  {
    id: 'toalha-listras-preto-branco',
    name: 'Listras preto e branco',
    category: 'toalha',
    pattern: 'stripes',
    colors: { primary: '#f8f6f2', secondary: '#2a2a2a', accent: '#e8e4de' },
    description: 'Listras clássicas',
  },
  {
    id: 'toalha-xadrez-vichy',
    name: 'Xadrez vichy vermelho',
    category: 'toalha',
    pattern: 'gingham',
    colors: { primary: '#f8f4f0', secondary: '#c43c3c', accent: '#e8d8d0' },
    description: 'Xadrez campestre',
  },
  {
    id: 'toalha-rosa-poa',
    name: 'Rosa com poás',
    category: 'toalha',
    pattern: 'dots',
    colors: { primary: '#f8e8ec', secondary: '#e8a0b0', accent: '#f0d0d8' },
    description: 'Rosa claro com poás',
  },
  {
    id: 'toalha-dourado-festa',
    name: 'Dourado festa',
    category: 'toalha',
    pattern: 'border',
    colors: { primary: '#f5ecd4', secondary: '#c9a227', accent: '#e8d8a8' },
    description: 'Dourado com barra decorativa',
  },
  {
    id: 'toalha-cinza-grafite',
    name: 'Cinza grafite',
    category: 'toalha',
    pattern: 'herringbone',
    colors: { primary: '#5a5e64', secondary: '#6e747c', accent: '#3e4248' },
    description: 'Cinza com textura espinha',
  },
  {
    id: 'toalha-bege-natural',
    name: 'Bege natural',
    category: 'toalha',
    pattern: 'linen',
    colors: { primary: '#d8c8b0', secondary: '#e8dcc8', accent: '#b8a488' },
    description: 'Bege de algodão cru',
  },
  {
    id: 'toalha-azul-celeste',
    name: 'Azul celeste',
    category: 'toalha',
    pattern: 'stripes',
    colors: { primary: '#d8eaf4', secondary: '#7ab0d0', accent: '#c0dcec' },
    description: 'Listras em azul claro',
  },
]

export const items: TablewareItem[] = [
  ...toalhaItems,
  ...lugarAmericanoItems,
  ...chargerItems,
  ...plateRasoItems,
  ...plateFundoItems,
]

/** Mesa vazia — estado inicial e resultado de "Limpar tudo" */
export const emptySetting: TableSetting = {
  toalha: null,
  lugarAmericano: null,
  charger: null,
  plateRaso: null,
  plateFundo: null,
}

export function getItemById(id: string | null): TablewareItem | null {
  if (!id) return null
  return items.find((item) => item.id === id) ?? null
}

export function getItemsByCategory(categoryId: string): TablewareItem[] {
  return items.filter((item) => item.category === categoryId)
}
