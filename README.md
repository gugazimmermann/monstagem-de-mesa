# Montagem de Mesa

Aplicação web (React + Vite + TypeScript) para **montar uma composição de mesa** escolhendo peças por categoria (toalha, lugar americano, sousplat, pratos etc.) e vendo a **pré-visualização** conforme você seleciona.

O catálogo fica em um **arquivo JSON** (`src/dados/catalogo.json`) importado diretamente pelo app — sem API, sem banco de dados e sem servidor backend.

## Como rodar

Pré-requisitos: Node.js + npm.

```bash
npm install
npm run dev
```

Abra a URL exibida no terminal (geralmente `http://localhost:5173`).

## Deploy no Render (Static Site)

| Campo | Valor |
|-------|-------|
| **Build Command** | `npm install && npm run build` |
| **Publish Directory** | `dist` |

Não é necessário Start Command.

## Editar o catálogo

Edite `src/dados/catalogo.json`. O arquivo contém:

- `categorias`: lista de categorias (toalha, sousplat, etc.)
- `itens`: lista de produtos com nome, cores, imagem e dimensões

Depois de alterar, rode `npm run dev` ou `npm run build` para ver as mudanças.

## Scripts úteis

- `npm run dev` — desenvolvimento com hot reload
- `npm run build` — build de produção (`dist/`)
- `npm run preview` — pré-visualiza o build localmente
- `npm run lint` — roda o oxlint

## Estrutura

- `src/aplicacao/App.tsx` — tela principal
- `src/dados/catalogo.json` — catálogo de itens
- `src/funcionalidades/catalogo/` — funções de acesso ao catálogo
- `src/funcionalidades/mesa/` — seletor de itens e pré-visualização da mesa
- `public/imgs/` — fotos dos produtos

## Regras do app

- Lugar americano e sousplat são **mutuamente exclusivos** (selecionar um remove o outro).
