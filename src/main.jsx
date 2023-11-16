import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Routes from './Routes/Routes'
import FrankStoreContext from './Context/FrankStoreContext'
import('preline')
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <FrankStoreContext>
      <Routes></Routes>
    </FrankStoreContext>
  </React.StrictMode>,
)
