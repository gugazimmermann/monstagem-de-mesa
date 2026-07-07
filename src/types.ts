export type CategoryId =
  | 'toalha'
  | 'lugarAmericano'
  | 'charger'
  | 'plateRaso'
  | 'plateFundo'

export type FabricPattern =
  | 'solid'
  | 'linen'
  | 'stripes'
  | 'gingham'
  | 'damask'
  | 'dots'
  | 'herringbone'
  | 'border'

export interface ItemDimensions {
  largura: number
  comprimento: number
}

export interface TablewareItem {
  id: string
  name: string
  category: CategoryId
  /** Public URL for product photos (e.g. sousplats) */
  image?: string
  /** CSS color tokens used by the preview renderer when no image is set */
  colors: {
    primary: string
    secondary?: string
    accent?: string
  }
  /** Largura em cm (exceto toalhas) */
  largura?: number
  /** Comprimento em cm (exceto toalhas) */
  comprimento?: number
  /** Fabric pattern for tablecloths */
  pattern?: FabricPattern
  description?: string
}

export type TableSetting = Record<CategoryId, string | null>

export interface Category {
  id: CategoryId
  label: string
  description: string
}
