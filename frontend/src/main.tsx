import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import '@mysten/dapp-kit/dist/index.css'
import { SuiProvider } from './providers/SuiProvider'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SuiProvider>
      <App />
    </SuiProvider>
  </StrictMode>,
)