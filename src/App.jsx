import React from 'react'
import Routers from './routes/Routers'
import { BrowserRouter } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Routers />
    </BrowserRouter>
  )
}

export default App