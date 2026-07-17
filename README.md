# Montagem de Mesa

Aplicação web (React + Vite + TypeScript) para **montar uma composição de mesa** escolhendo peças por categoria e vendo a **pré-visualização** conforme você seleciona.

Suporta **vários clientes**: cada um tem login no admin, nome/logo próprios e categorias editáveis. Os dados ficam em **JSON de seed** + **localStorage** (sem banco de dados).

## Como rodar

Pré-requisitos: Node.js + npm.

```bash
npm install
npm run dev
```

Abra a URL exibida no terminal (geralmente `http://localhost:5173`).

## Rotas

| Rota | Descrição |
|------|-----------|
| `/` | Redireciona para `/c/raffiner` |
| `/c/:slug` | Montagem pública do cliente |
| `/admin` | Login do cliente |
| `/admin/painel` | Painel (nome, logo, CRUD de categorias) |

Credenciais seed do Raffiner: login `raffiner` / senha `admin123`.

## Dados e persistência

- [`src/dados/clientes.json`](src/dados/clientes.json) — lista de clientes (login, senha, slug, nome e logo iniciais)
- [`src/dados/catalogo.json`](src/dados/catalogo.json) — catálogo seed do Raffiner (categorias + itens)
- Após o primeiro acesso, o perfil e o catálogo de cada cliente são gravados em `localStorage` (`montagem:cliente:{id}`)
- A sessão do admin fica em `sessionStorage`

Alterações feitas no painel valem **só naquele navegador**. Limpar o storage do site volta ao seed.

Para cadastrar outro cliente, adicione um objeto em `clientes.json` e recarregue (o catálogo inicial será vazio até você criar categorias no admin).

## Deploy no Render (Static Site)

| Campo | Valor |
|-------|-------|
| **Build Command** | `npm install && npm run build` |
| **Publish Directory** | `dist` |

Como é uma SPA com rotas (`/admin`, `/c/*`), é **obrigatório** um rewrite para `index.html`. Sem isso, só `/` funciona; `/admin` e `/c/raffiner` retornam 404 ao abrir direto ou atualizar a página.

No Dashboard do serviço → **Redirects/Rewrites** → adicionar:

| Source | Destination | Action |
|--------|-------------|--------|
| `/*` | `/index.html` | **Rewrite** |

O arquivo [`render.yaml`](render.yaml) já declara essa regra para deploys via Blueprint.

## Scripts úteis

- `npm run dev` — desenvolvimento com hot reload
- `npm run build` — build de produção (`dist/`)
- `npm run preview` — pré-visualiza o build localmente
- `npm run lint` — roda o oxlint

## Estrutura

- `src/aplicacao/` — rotas e tela pública da montagem
- `src/dados/` — JSON seed + repositório localStorage
- `src/funcionalidades/admin/` — login e painel
- `src/funcionalidades/autenticacao/` — rota protegida
- `src/funcionalidades/catalogo/` — helpers do catálogo
- `src/funcionalidades/mesa/` — seletor e pré-visualização

## Regras do app

- Lugar americano e sousplat são **mutuamente exclusivos** quando ambas as categorias existem (ids `lugarAmericano` e `sousplat`).
