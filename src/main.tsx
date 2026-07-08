import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './aplicacao/App.tsx'
import { CatalogoProvider } from './funcionalidades/catalogo'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CatalogoProvider>
      <App />
    </CatalogoProvider>
  </StrictMode>,
)
