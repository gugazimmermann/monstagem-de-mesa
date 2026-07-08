import { createServer } from 'node:http'
import { readFile } from 'node:fs/promises'
import { createReadStream, existsSync } from 'node:fs'
import { extname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const raiz = fileURLToPath(new URL('.', import.meta.url))
const dist = join(raiz, 'dist')
const caminhoDb = join(raiz, 'db', 'db.json')
const porta = Number(process.env.PORT) || 3000

const mime = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
}

let dbCache = null

async function carregarDb() {
  if (!dbCache) {
    const conteudo = await readFile(caminhoDb, 'utf-8')
    dbCache = JSON.parse(conteudo)
  }
  return dbCache
}

function responderJson(res, status, dados) {
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
  })
  res.end(JSON.stringify(dados))
}

async function servirApi(req, res, pathname) {
  const db = await carregarDb()

  if (pathname === '/api/categorias') {
    responderJson(res, 200, db.categorias)
    return true
  }

  if (pathname === '/api/itens') {
    responderJson(res, 200, db.itens)
    return true
  }

  return false
}

function servirArquivoEstatico(req, res, caminhoArquivo) {
  const tipo = mime[extname(caminhoArquivo)] ?? 'application/octet-stream'
  res.writeHead(200, { 'Content-Type': tipo })
  createReadStream(caminhoArquivo).pipe(res)
}

const servidor = createServer(async (req, res) => {
  try {
    const url = new URL(req.url ?? '/', `http://${req.headers.host}`)
    const pathname = url.pathname

    if (await servirApi(req, res, pathname)) return

    let caminhoArquivo = join(dist, pathname)

    if (pathname !== '/' && existsSync(caminhoArquivo) && !caminhoArquivo.endsWith('.html')) {
      servirArquivoEstatico(req, res, caminhoArquivo)
      return
    }

    const indexHtml = join(dist, 'index.html')
    if (!existsSync(indexHtml)) {
      responderJson(res, 500, {
        erro: 'Build não encontrado. Rode npm run build antes de iniciar o servidor.',
      })
      return
    }

    servirArquivoEstatico(req, res, indexHtml)
  } catch (erro) {
    responderJson(res, 500, { erro: String(erro) })
  }
})

servidor.listen(porta, () => {
  console.log(`Servidor em http://localhost:${porta}`)
})
