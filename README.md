# Montagem de Mesa

Aplicação web (React + Vite + TypeScript) para **montar uma composição de mesa** escolhendo peças por categoria (toalha, lugar americano, sousplat, pratos etc.) e vendo a **pré-visualização** conforme você seleciona.

O **catálogo de itens** é carregado de uma **API mock** (emulando banco de dados) com `json-server` em desenvolvimento e pelo `server.mjs` em produção.

## Principais conceitos do sistema

- **Catálogo (mock DB)**: o “banco” é um arquivo JSON (`db/db.json`).
  - Endpoints:
    - `GET /api/categorias`
    - `GET /api/itens`
- **Frontend consumindo API**: o app faz `fetch` em `/api/categorias` e `/api/itens`.
  - No desenvolvimento, o Vite faz **proxy** de `/api/*` para `http://localhost:3001/*`.
  - Em produção, o `server.mjs` serve o frontend (`dist/`) e a API no mesmo domínio.
- **Regras de seleção**: lugar americano e sousplat são **mutuamente exclusivos** (selecionar um remove o outro).

## Como rodar (desenvolvimento)

Pré-requisitos: Node.js + npm.

1) Instalar dependências:

```bash
npm install
```

2) Gerar o “banco” (`db/db.json`) a partir do catálogo local:

```bash
npm run db:gen
```

3) Subir a API mock + frontend juntos:

```bash
npm run dev:full
```

- A API mock sobe em `http://localhost:3001`.
- O Vite pode usar outra porta caso `5173` esteja ocupada (ele mostra a URL no terminal).
- Abra a URL do **Vite** (ex.: `http://localhost:5173/`), não a do json-server (`http://localhost:3001`).

## Como rodar (produção local)

```bash
npm run db:gen
npm run build
npm start
```

Abra `http://localhost:3000`.

## Deploy no Render

**Importante:** não use **Static Site** sozinho. O app precisa de um servidor Node para expor `/api/*`.

Crie um **Web Service** (Node):

| Campo | Valor |
|-------|-------|
| **Build Command** | `npm install && npm run db:gen && npm run build` |
| **Start Command** | `npm start` |
| **Environment** | Node |

O Render define a variável `PORT` automaticamente. O `server.mjs` usa essa porta.

## Scripts úteis

- `npm run dev`: sobe o Vite.
- `npm run db`: sobe o `json-server` apontando para `db/db.json`.
- `npm run db:gen`: gera/atualiza `db/db.json` a partir do catálogo local.
- `npm run dev:full`: roda `db` + `dev` em paralelo.
- `npm run build`: build de produção.
- `npm start`: sobe o servidor de produção (`server.mjs`).
- `npm run preview`: pré-visualiza build (só frontend, sem API).
- `npm run lint`: roda `oxlint`.

## Estrutura (alto nível)

- `src/aplicacao/App.tsx`: tela principal (tabs de categorias, resumo e seleção).
- `src/funcionalidades/catalogo/*`: carregamento do catálogo via API, provider e exports.
- `src/funcionalidades/mesa/*`: componentes de seleção (`SeletorItens`) e preview (`PreVisualizacaoMesa`).
- `db/db.json`: “banco” servido pela API.
- `scripts/gerar-db.ts`: gerador do `db/db.json`.
- `server.mjs`: servidor de produção (frontend + API).

## Observações

- O app está configurado como **read-only** do ponto de vista da UI (sem CRUD).
