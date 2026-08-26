import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import { AppSettingsProvider } from './context/AppSettingsContext'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppSettingsProvider>
      <HashRouter>
        <App />
      </HashRouter>
    </AppSettingsProvider>
  </StrictMode>,
)
