# Montagem de Mesa

Aplicação web (React + Vite + TypeScript) para **montar uma composição de mesa** escolhendo peças por categoria (toalha, lugar americano, sousplat, pratos etc.) e vendo a **pré-visualização** conforme você seleciona.

O **catálogo de itens** é carregado de uma **API mock** (emulando banco de dados) com `json-server`.

## Principais conceitos do sistema

- **Catálogo (mock DB)**: o “banco” é um arquivo JSON (`db/db.json`) servido pelo `json-server`.\n  - Endpoints:\n    - `GET /categorias`\n    - `GET /itens`
- **Frontend consumindo API**: o app faz `fetch` em `/api/categorias` e `/api/itens`.\n  - No desenvolvimento, o Vite faz **proxy** de `/api/*` para `http://localhost:3001/*` (configurado em `vite.config.ts`).\n  - O carregamento/cache fica no `CatalogoProvider` (`src/funcionalidades/catalogo/CatalogoProvider.tsx`).
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

- A API mock sobe em `http://localhost:3001`.\n- O Vite pode usar outra porta caso `5173` esteja ocupada (ele mostra a URL no terminal).

## Como rodar (separado)

Em um terminal:

```bash
npm run db
```

Em outro terminal:

```bash
npm run dev
```

## Scripts úteis

- `npm run dev`: sobe o Vite.\n- `npm run db`: sobe o `json-server` apontando para `db/db.json`.\n- `npm run db:gen`: gera/atualiza `db/db.json` a partir do catálogo local.\n- `npm run dev:full`: roda `db` + `dev` em paralelo.\n- `npm run build`: build de produção.\n- `npm run preview`: pré-visualiza build.\n- `npm run lint`: roda `oxlint`.

## Estrutura (alto nível)

- `src/aplicacao/App.tsx`: tela principal (tabs de categorias, resumo e seleção).\n- `src/funcionalidades/catalogo/*`: carregamento do catálogo via API, provider e exports.\n- `src/funcionalidades/mesa/*`: componentes de seleção (`SeletorItens`) e preview (`PreVisualizacaoMesa`).\n- `db/db.json`: “banco” servido pelo `json-server`.\n- `scripts/gerar-db.ts`: gerador do `db/db.json`.

## Observações

- O app está configurado como **read-only** do ponto de vista da UI (sem CRUD). O `json-server` suporta `POST/PUT/DELETE` se você quiser evoluir para um painel de admin mais tarde.
