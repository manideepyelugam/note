import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import ThemeProvider from './contexts/ThemeContext.jsx'
import GeminiProvider from './contexts/GeminiContext.jsx'
import { SpacesProvider } from './contexts/SpacesContext.jsx'
import { NoteProvider } from './contexts/NoteContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <NoteProvider>

  <SpacesProvider>

  <GeminiProvider>
  <ThemeProvider>
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
  </ThemeProvider>
  </GeminiProvider>
  </SpacesProvider>
  </NoteProvider>


)

