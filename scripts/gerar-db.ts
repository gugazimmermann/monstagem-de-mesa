import { mkdir, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

import { categorias, itens } from '../src/funcionalidades/catalogo/catalogo'

type DbJson = {
  categorias: typeof categorias
  itens: typeof itens
}

const aqui = dirname(fileURLToPath(import.meta.url))
const caminhoDb = resolve(aqui, '../db/db.json')

async function main() {
  const db: DbJson = { categorias, itens }

  await mkdir(dirname(caminhoDb), { recursive: true })
  await writeFile(caminhoDb, JSON.stringify(db, null, 2) + '\n', 'utf-8')

  // eslint-disable-next-line no-console
  console.log(`OK: gerado ${caminhoDb} (${db.categorias.length} categorias, ${db.itens.length} itens)`)
}

main().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err)
  process.exitCode = 1
})

