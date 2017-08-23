
import React from 'react'
import { renderRoutes } from 'react-router-config'

import AppBar from '../AppBar'

const App = ({ route }) => (
  <div>
    <AppBar />
    <main className='route-container'>
      {renderRoutes(route.routes)}
    </main>
  </div>
)

export default App
