import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Routes from './Routes/Routes'
import FrankStoreContext from './Context/FrankStoreContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import('preline')
const queryClint = new QueryClient()
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClint}>
      <FrankStoreContext>
        <Routes></Routes>
      </FrankStoreContext>
    </QueryClientProvider>
  </React.StrictMode>,
)
