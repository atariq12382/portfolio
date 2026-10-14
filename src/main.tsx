import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BootProvider } from '@/context/BootContext.tsx'
import { ChaosModeProvider } from '@/context/ChaosModeContext.tsx'
import { RootLayout } from './layout/RootLayout.tsx'
import { applySiteMeta } from '@/lib/siteMeta'

applySiteMeta()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BootProvider>
      <ChaosModeProvider>
        <RootLayout>
          <App />
        </RootLayout>
      </ChaosModeProvider>
    </BootProvider>
  </StrictMode>,
)
